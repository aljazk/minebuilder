class Wagon extends Building{
	constructor (sx, sy){
		super(0, 0, sx, sy);
		this.color = "orange";
		this.weight = sx*sy;
		this.content = new StorageContent(this.size.x*this.size.y);
		this._makeDisplay();
		this.ore_array = [];
	}
	
	static getInfoAtributes(){
		var info = super.getInfoAtributes();
		return info;
	}
	
	getInfo(){
		var info = super.getInfo();
		info.push(this.content.stored);
		//console.log(this.ore_array);
		for(var i=0; i<this.ore_array.length; i++){
			var name = this.ore_array[i];
			info.push(this.content.getOreCount(name));
		}
		info.push(this.content.max_storage);
		return info;
	}
	
	updateOreArray(oa){
		this.ore_array = oa;
	}
	
	setId(id){
		super.setId(id);
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