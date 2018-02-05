class Tunnel extends Object{
	constructor(x, y, dir, floor, toughness){
		super(x, y, 0, settings.floor_size);
		this.direction = dir;
		this.floor = floor;
		this.length = 0;
		this.max_health = settings.tunnel_chunk_size * this.size.y;
		this.toughness = toughness;
		this.health = this.max_health;
		this.color = "gray";
		this.content = new TunnelContent();
		if (this.floor != 0){
			this._makeDisplay();
		}
	}
	
	_makeDisplay(){
		super._makeDisplay();
		this.display.classList.add("tunnel_display");
		this.display.classList.add(this.direction);
		var name_p = document.createElement("p");
		name_p.innerHTML = "Tunnel";
		if(this.direction == "left"){
			name_p.innerHTML = "Left tunnel";
		}
		if(this.direction == "right"){
			name_p.innerHTML = "Right tunnel";
		}
		this.progress_p = document.createElement("p");
		this.progress_p.innerHTML = this.health +"/"+ this.max_health;
		var prob_p = document.createElement("p");
		prob_p.innerHTML = this.content.getString();
		this.display.appendChild(name_p);
		this.display.appendChild(this.progress_p);
		this.display.appendChild(prob_p);
		this.display.style.width = this.size.x + settings.tunnel_chunk_size;
		if(this.direction == "left"){
			this.display.style.left = this.position.x - settings.tunnel_chunk_size;
		}
	}
	
	extend(){
		this.length ++;
		this.size.x = this.length * settings.tunnel_chunk_size;
		if(this.direction == "left"){
			this.position.x -= settings.tunnel_chunk_size;
		}
		this.health = this.max_health;
		var old_w = this.display.style.width;
		old_w = old_w.substring(0, old_w.length - 2);
		old_w = Number(old_w);
		var old_x = this.display.style.left;
		old_x = old_x.substring(0, old_x.length - 2);
		old_x = Number(old_x);
		this.display.style.width = old_w + settings.tunnel_chunk_size;
		if(this.direction == "left"){
			this.display.style.left = old_x - settings.tunnel_chunk_size;
		}
	}
	
	getEnd(){
		if (this.direction == "left"){
			return this.position.x;
		}
		return this.position.x + this.size.x;
	}
	
	_displayProgress(){
		this.progress_p.innerHTML = "Progress: "+Math.round(this.health) +"/"+ this.max_health;
	}
	
	dig(v){ //digs and return how many time it extended in process
		this.health -= v;
		if(this.health <= 0){
			var rem = this.health * -1;
			this.extend();
			this._displayProgress();
			return 1 + this.dig(rem);
		}
		this._displayProgress();
		return 0;
	}
	
	drawProgress(c){
		var add_chunk = 0;
		var s = this.size.x;
		if(this.direction == "left")
			s = -settings.tunnel_chunk_size;
		c.drawRect(this.position.x + s, this.position.y, settings.tunnel_chunk_size, this.size.y * (1-this.health/this.max_health));
	}
	
	draw(c){
		c.ctx.fillStyle = this.color;
		
		c.drawRect(this.position.x, this.position.y, this.size.x, this.size.y);
		this.drawProgress(c);
	}
}