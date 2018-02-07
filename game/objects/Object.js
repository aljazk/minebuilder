class Object{
	constructor(x, y, sx, sy){
		this.position = {x: x, y:y};
		this.size = {x: sx, y:sy};
		this.color = "black";
		this.name = this.constructor.name;
		this.id = 0;
		//add: needs a nice naming and id system
	}
	
	getInfoAtributes(){
		var info = [];
		info.push("Name");
		info.push("Id");
		return info;
	}
	
	getInfo(){
		var info = [];
		info.push(this.name);
		info.push(this.id);
		return info;
	}
	
	getNameId(){
		return this.name + " " + this.id;
	}
	
	setId(id){
		this.id = id;
	}
	
	_makeDisplay(){
		this.display = document.createElement("div");
		this.display.id = this.name.toLowerCase()+"_display_"+this.id;
		this.display.classList.add("object_display");
		this.display.classList.add(this.name.toLowerCase()+"_display");
		this.display.classList.add("movable");
		this.display.style.width = this.size.x;
		this.display.style.height = this.size.y;
		this.display.style.left = this.position.x;
		this.display.style.top = this.position.y;
		var canvas_div = document.getElementById("canvas_div");
		canvas_div.append(this.display);
	}
	
	getCenter(){
		var center = {};
		center.x = this.position.x + this.size.x/2;
		center.y = this.position.y + this.size.y/2;
		return center;
	}
	
	centerCamera(){
			window.camera_position(this.position.x+this.size.x/2, this.position.y+this.size.y/2);
	}
	
	getClosestEdge(x){
		var dist = Math.abs(this.position.x - x);
		var dist1 = Math.abs(this.position.x + this.size.x - x);
		if (dist < dist1){
			return this.position.x;
		} else {
			return this.position.x + this.size.x;
		}
	}
	
	move(timestamp){
	}
	
	draw(c){
		c.ctx.fillStyle = this.color;
		c.drawRect(this);
	}
}