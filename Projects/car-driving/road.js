class Road{
    constructor(x, width, laneCount = 5) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = this.x - this.width/2
        this.right = this.x + this.width/2

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {x:this.left, y:this.top}
        const topRight = {x:this.right, y:this.top}
        const bottomLeft = {x:this.left, y:this.bottom}
        const bottomRight = {x:this.right, y:this.bottom}
    
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]
    }
    getLaneCenter(laneIndex){
        let laneCenter = this.left + this.width/this.laneCount*laneIndex + this.width/this.laneCount/2
        return laneCenter
    }

    draw(context) {
        context.lineWidth = 5;
        context.strokeStyle = "white";

        for (var i=1; i<this.laneCount; i++) {
            context.setLineDash([20, 20]);
            context.beginPath();
            context.moveTo(this.left + this.width/this.laneCount*i, this.top);
            context.lineTo(this.left + this.width/this.laneCount*i, this.bottom);
            context.stroke();
        }
        context.setLineDash([]);
        this.borders.forEach((border) => {
            context.beginPath();
            context.moveTo(border[0].x, border[0].y);
            context.lineTo(border[1].x, border[1].y);
            context.stroke()
        })
    }
}