class World{
	constructor(){
		this.gui = new GUI();
		window.camera_position(500,100);
		window.gui = this.gui;
		this.last_frame = 0;
		this.removeDisplays();
		this.mine = new Mine();
	}
	
	move(timestamp){
		timestamp -= this.last_frame;
		this.last_frame += timestamp;
		this.mine.move(timestamp);
	}
	
	clear(c){
		c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);
	}
	
	removeDisplays(){
		var canvas_div = document.getElementById("canvas_div");
		var elements = canvas_div.querySelectorAll(".game_display");
		for(var i=0; i<elements.length; i++){
			canvas_div.removeChild(elements[i]);
		}
	}
	
	draw(c){
		this.clear(c);
		this.mine.draw(c);
	}
}