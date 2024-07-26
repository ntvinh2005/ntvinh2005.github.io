class Car{
    constructor(x, y, width, height, type, maxSpeed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05
        this.angle = 0
        this.damaged = false
        
        this.control = new Controls(type); 
        this.useBrain = type == "MAIN";
        if (type!="NPC"){
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork(
                [this.sensor.rayCount, 6, 4]
            );
        }
        this.polygon = this.#createPolygons();
    }
    #createPolygons(){
        let points = [];
        const radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2))/2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - radius*Math.sin(this.angle + alpha),
            y: this.y - radius*Math.cos(this.angle + alpha)
        })
        points.push({
            x: this.x - radius*Math.sin(this.angle - alpha),
            y: this.y - radius*Math.cos(this.angle - alpha)
        })
        points.push({
            x: this.x - radius*Math.sin(this.angle + alpha + Math.PI),
            y: this.y - radius*Math.cos(this.angle + alpha + Math.PI)
        })
        points.push({
            x: this.x - radius*Math.sin(this.angle - alpha + Math.PI),
            y: this.y - radius*Math.cos(this.angle - alpha + Math.PI)
        })
        return points
    }

    #move(){
        if (this.control.forward == true) {
            this.speed += this.acceleration;
        }
        if (this.control.reverse == true) {
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed/2) {
            this.speed = -this.maxSpeed/2;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.control.left == true) {
            if (this.speed < 0)  this.angle -= 0.03;
            else if (this.speed > 0) this.angle += 0.03;
        }
        if (this.control.right == true) {
            if (this.speed > 0) this.angle -= 0.03;
            else if (this.speed < 0) this.angle += 0.03;
        }

        this.y -= Math.cos(this.angle)*this.speed
        this.x -= Math.sin(this.angle)*this.speed
    }
    #assessDamage(roadBorders, traffic){
        for (let i=0; i<roadBorders.length; i++){
            if (polyIntersects(this.polygon, roadBorders[i])) return true
        }
        for (let i=0; i<traffic.length; i++){
            if (polyIntersects(this.polygon, traffic[i].polygon)) return true
        }
        return false
    }
    update(borders, traffic) {
        if (!this.damaged){
            this.#move()
            this.polygon = this.#createPolygons()
            this.damaged = this.#assessDamage(borders, traffic)
        }
        if(this.sensor){
            this.sensor.update(borders, traffic)
            const offsets = this.sensor.readings.map(
                //1-offset to receive the high value when the obstacle is close and low value when obstacle is far away
                s=>{
                    if(s == null) return 0
                    else {
                        return 1 - s.offset
                    }
                }
            )
            //console.log(offsets)
            const outputs = NeuralNetwork.feedForward(offsets, this.brain)
            //console.log(outputs)

            if(this.useBrain){
                this.control.forward = outputs[0];
                this.control.reverse = outputs[1];
                this.control.left = outputs[2];
                this.control.right = outputs[3];
            }
        }

    }
    draw(context, drawSensor = false){
        if(this.damaged) context.fillStyle = "gray";
        else context.fillStyle = "black";

        context.beginPath();
        context.moveTo(this.polygon[0].x, this.polygon[0].y)
        for (let i = 1; i < this.polygon.length; i++) {
            context.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        context.fill()
        if (this.sensor && drawSensor){
            this.sensor.draw(context);
        }
    }
}