class Wagon extends Building{
	constructor (sx, sy){
		super(0, 0, sx, sy);
		this.color = "orange";
		this.weight = sx*sy;
		this.storage = this.size.x*this.size.y;
		this.stored = 0;
		this.drop_speed = 0.1;
		this.ore = new StorageContent();
		this._makeDisplay();
	}
	
	static getInfoAtributes(){
		var info = super.getInfoAtributes();
		return info;
	}
	
	getInfo(){
		var info = super.getInfo();
		info.push(Math.round(this.stored));
		info.push(this.storage);
		return info;
	}
	
	setId(id){
		super.setId(id);
	}
	
	draw(c){
		super.draw(c);
	}
}