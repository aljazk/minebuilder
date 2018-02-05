class Camera{
	constructor(){
		this.keyup_binder = this.keyup.bind(this);
		this.keydown_binder = this.keydown.bind(this);
		this.limit = {};
		this.limit.up = 300;
		this.limit.down = 0;
		this.limit.left = 0;
		this.limit.right = 0;
		this.reset();
		this.move_key = {up: false, down: false, left: false, right: false};
		//make camera positioning function public
		window.camera_position = this.position.bind(this);
	}
	
	reset(){
		this.x = 0;
		this.y = 0;
		this.zoom = 1;
		this.speed = 0.5;
		window.addEventListener("keyup", this.keyup_binder, false);
		window.addEventListener("keydown", this.keydown_binder, false);
	}
	
	position(x,y){
		var canvas = document.getElementById("game_canvas");
		var old_x = this.x;
		var old_y = this.y;
		this.x = -x + canvas.width/2;
		this.y = -y + canvas.height/2;
		this._moveDivContent(this.x - old_x, this.y - old_y);
	}
	
	keyup(e){
		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
		var key = e.keyCode;
		if (key == 87 || key == 38){
			this.move_key.up = false;
		} else if (key == 83|| key == 40){
			this.move_key.down = false;
		} else if (key == 65 || key == 37){
			this.move_key.left = false;
		} else if (key == 68 || key == 39){
			this.move_key.right = false;
		}
	}
	
	keydown(e){
		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
		var key = e.keyCode;
		if (key == 87 || key == 38){
			this.move_key.up = true;
		} else if (key == 83|| key == 40){
			this.move_key.down = true;
		} else if (key == 65 || key == 37){
			this.move_key.left = true;
		} else if (key == 68 || key == 39){
			this.move_key.right = true;
		}
	}
	
	_bind(e){
		e.style.position = "absolute";
		var old_x = e.style.left;
		old_x = old_x.substring(0, old_x.length - 2);
		old_x = Number(old_x);
		var old_y = e.style.top;
		old_y = old_y.substring(0, old_y.length - 2);
		old_y = Number(old_y);
		e.style.left = (this.x + old_x) + "px";
		e.style.top = (this.y + old_y) + "px";
	}
	
	_moveDivContent(x, y){
		var canvas_div = document.getElementById("canvas_div");
		var elements = canvas_div.querySelectorAll(".movable");
		for(var i=0; i<elements.length; i++){
			var e = elements[i];
			//if element wasnt binded yet
			if(e.style.position != "absolute"){
				this._bind(e);
			} else {
				var old_x = e.style.left;
				old_x = old_x.substring(0, old_x.length - 2);
				old_x = Number(old_x);
				var old_y = e.style.top;
				old_y = old_y.substring(0, old_y.length - 2);
				old_y = Number(old_y);
				e.style.left = (x + old_x) + "px";
				e.style.top = (y + old_y) + "px";
			}
		}
	}
	
	move(timestamp){
		var x = 0;
		var y = 0;
		if(this.move_key.up){
			var move = timestamp * this.speed;
			if (this.limit.up != 0 && this.limit.up < this.y + move){
				move = this.limit.up - this.y;
			}
			this.y += move;
			y += move;
		}
		if (this.move_key.down){
			var move = timestamp * this.speed;
			if (this.limit.down != 0 && this.limit.down > this.y - move){
				move = this.y - this.limit.down;
			}
			this.y -= move;
			y -= move;
		}
		if (this.move_key.left){
			var move = timestamp * this.speed;
			if (this.limit.left != 0 && this.limit.left < this.x + move){
				move = this.limit.left - this.x;
			}
			this.x += move;
			x += move;
		}
		if (this.move_key.right){
			var move = timestamp * this.speed;
			if (this.limit.right != 0 && this.limit.right > this.x - move){
				move = this.x - this.limit.right;
			}
			this.x -= move;
			x -= move;
		}
		this._moveDivContent(x, y);
	}
}