class Storage extends Object{
	constructor(x, y){
		super(x, y-70, 300, 70);
		this.storage = this.size.x*this.size.y;
		this.stored = 0;
		this.color = "orange";
		this.drop_speed = 0.1;
		this.ore = new StorageContent();
		this._makeDisplay();
	}
	
	_makeDisplay(){
		super._makeDisplay();
		this.display.id = "storage_display_1";
		this.display.classList.add("storage_display");
		this.display.innerHTML = this.ore.getString();
	}
	
	//stores things into storage and return leftover if there is any (returns 0 if everything was stored)
	store(n){
		var space_left = this.storage - this.stored;
		var leftover = n - space_left;
		if (leftover <= 0){
			this.stored += n;
			return 0;
		} else {
			this.stored = this.storage;
			console.log("Storage full");
			return leftover;
		}
	}
	
	full(){
		return this.stored >= this.storage;
	}
	
	draw(c){
		super.draw(c);
		c.ctx.fillStyle = "rgb(139,69,19)";
		var pile_size = this.size.y * this.stored/this.storage;
		c.drawRect(this.position.x, this.position.y + this.size.y - pile_size, this.size.x, pile_size);
		//update storage content display
		this.display.innerHTML = this.ore.getString();
	}
	
}