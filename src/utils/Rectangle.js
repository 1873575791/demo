export default class Rectangle {
    constructor(color, startX, startY) {
        this.color = color;
        this.startX = startX;
        this.startY = startY;
        this.endX = startX;
        this.endY = startY;
    }

    get minX() {
        return Math.min(this.startX, this.endX);
    }
    get minY() {
        return Math.min(this.startY, this.endY);
    }
    get maxX() {
        return Math.max(this.startX, this.endX);
    }
    get maxY() {
        return Math.max(this.startY, this.endY);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.minX, this.minY);
        ctx.lineTo(this.maxX, this.minY);
        ctx.lineTo(this.maxX, this.maxY);
        ctx.lineTo(this.minX, this.maxY);
        ctx.lineTo(this.minX, this.minY);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
};