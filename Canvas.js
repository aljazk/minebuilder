class Canvas {
	constructor(){
		this.canvas = document.getElementById("game_canvas");
		this.ctx = this.canvas.getContext("2d");
		this.camera = new Camera();
	}
	
	drawRectangle(x, y, sx, sy){
		drawRect(x,y,sx,sy);
	}
	
	drawRect(x, y, sx, sy){
		if (x instanceof Object){
			y = x.position.y;
			sx = x.size.x;
			sy = x.size.y;
			x = x.position.x;
		}
		//add: check if object will be seen
		this.ctx.fillRect(x + Math.round(this.camera.x), y + Math.round(this.camera.y), sx * this.camera.zoom, sy * this.camera.zoom);
	}
	
	strokeRect(x, y, sx, sy){
		if (x instanceof Object){
			y = x.position.y;
			sx = x.size.x;
			sy = x.size.y;
			x = x.position.x;
		}
		//add: check if object will be seen
		this.ctx.strokeRect(x + Math.round(this.camera.x), y + Math.round(this.camera.y), sx * this.camera.zoom, sy * this.camera.zoom);
	}
	
	
	drawImage(img, x, y, deg, sx, sy){
		deg = (typeof rot === 'undefined') ? 0 : deg;
		sx = (typeof sx === 'undefined') ? img.width : sx;
		sy = (typeof sy === 'undefined') ? img.height : sy;
		this.ctx.save();
		this.ctx.translate(x, y);
		this.ctx.rotate(deg*Math.PI/180);
		this.ctx.drawImage(img, -img.width/2, -img.height/2);
		this.ctx.restore();
	}
}