class Storage extends Building{
	constructor(x, y){
		super(x, y-10, 10,  10);
		this.color = "orange";
		this.content = new StorageContent(this.size.x*this.size.y);
		this.name = "Storage";
		this.upgrade = new UpgradeStorage();
	}
	
	static getInfoAtributes(){
		var info = super.getInfoAtributes();
		info.push("Stored");
		var ol = new OreList().get();
		for(var i=0; i<ol.length; i++){
			console.log(ol[i].name);
			info.push(ol[i].name);
		}
		info.push("Capacity");
		info.push("Upgrade");
		return info;
	}
	
	getInfo(){
		var info = super.getInfo();
		info.push(Math.round(this.content.stored));
		var ol = this.content.content;
		for(var i=0; i<ol.length; i++){
			info.push(ol[i].quantity);
		}
		info.push(this.content.max_storage);
		
		//button has to be cloned
		var upgrade_button = GUI.makeButton("Upgrade", this.upgrade_funct);
		info.push(upgrade_button);
		return info;
	}
	
	getDropSpeed(){
		return this.content.drop_speed;
	}
	
	setId(id){
		super.setId(id);
		this._makeDisplay();
	}
	
	setCapacity(){
		this.content.max_storage = this.size.x * this.size.y;
		if (this.capacity_p != null){
			this.capacity_p.innerHTML = "Capacity: "+this.content.max_storage;
		}
	}
	
	_makeDisplay(){
		super._makeDisplay();
		this.display.id = "storage_display_"+this.id;
		this.display.classList.add("storage_display");
		var name_p = document.createElement("p");
		name_p.innerHTML = this.name + " " + this.id;
		this.display.appendChild(name_p);
		this.stored_p = document.createElement("p");
		this.stored_p.innerHTML = this.content.getString();
		this.display.appendChild(this.stored_p);
		this.capacity_p = document.createElement("p");
		this.capacity_p.innerHTML = "Capacity: "+this.content.max_storage;
		this.display.appendChild(this.capacity_p);
	}
	
	upgrade(){
		return new UpgradeStorage();
	}
	
	full(){
		return this.content.isFull();
	}
	
	getOreCount(ore){
		return this.content.getOreCount(ore);
	}
	
	draw(c){
		super.draw(c);
		c.ctx.fillStyle = "rgb(139,69,19)";
		var pile_size = this.size.y * this.content.stored/this.content.max_storage;
		c.drawRect(this.position.x, this.position.y + this.size.y - pile_size, this.size.x, pile_size);
		//update storage content display
		if (this.stored_p != null){
			this.stored_p.innerHTML = this.content.getString();
		}
	}
	
}