class MouseListener{
	constructor(){
		this.canvas = document.getElementById("canvas_div");
		this.canvas.addEventListener("mousemove", this.move.bind(this), false);
		this.x = 0;
		this.y = 0;
	}
	
	addClick(funct){
		this.canvas.addEventListener("click", funct, false);
	}
	
	move(e){
		this.x = e.clientX;
		this.y = e.clientY;
	}
}