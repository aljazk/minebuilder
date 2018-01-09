class Object{
	constructor(x, y, sx, sy){
		this.position = {x: x, y:y};
		this.size = {x: sx, y:sy};
		this.color = "black";
	}
	
	_makeDisplay(){
		this.display = document.createElement("div");
		this.display.classList.add("game_display");
		this.display.classList.add("movable");
		this.display.style.width = this.size.x;
		this.display.style.height = this.size.y;
		this.display.style.left = this.position.x;
		this.display.style.top = this.position.y;
		var canvas_div = document.getElementById("canvas_div");
		canvas_div.append(this.display);
	}
	
	move(timestamp){
		
	}
	
	draw(c){
		c.ctx.fillStyle = this.color;
		c.drawRect(this);
	}
}