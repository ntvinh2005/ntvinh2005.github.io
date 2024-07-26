class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 100;
        this.raySpread = Math.PI/2;

        this.rays = [];
        this.readings = [];
    }
    #setRays(){
        this.rays = [];
        for (let i=0; i<this.rayCount; i++) {
            const rayAngle = this.raySpread/2 - this.raySpread/(this.rayCount-1)*i+this.car.angle; 

            const start = {x: this.car.x, y: this.car.y};
            const end = {x: this.car.x - this.rayLength*Math.sin(rayAngle), y: this.car.y - this.rayLength*Math.cos(rayAngle)}

            this.rays.push([start, end]);
        }
    }
    #getReadings(ray, roadBorders, traffic){
        //console.log(roadBorders)
        let touches = [];
        for (let i = 0; i<roadBorders.length; i++){
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            )
            if (touch) {
                touches.push(touch);
            }
        }

        for (let i=0; i<traffic.length; i++) {
            const poly = traffic[i].polygon
            for (let j=0; j<poly.length; j++) {
                const value = getIntersection(
                    ray[0], 
                    ray[1], 
                    poly[j], 
                    poly[(j+1)%poly.length]
                )
                if (value) touches.push(value)
            }
        }

        if (touches.length == 0) return null;
        else {
            const offsets = touches.map(elem => elem.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(elem => elem.offsets = minOffset);
        }
    }
    update(roadBorders, traffic){
        this.#setRays();
        this.readings = [];
        for (let i=0; i<this.rays.length; i++){
            this.readings.push(this.#getReadings(this.rays[i], roadBorders, traffic));
        }
    }

    draw(context) {
        for (let i = 0; i<this.rayCount; i++) {
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "blue";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(end.x, end.y);
            context.stroke()

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            context.lineTo(end.x, end.y);
            context.stroke()
        }
    }
}