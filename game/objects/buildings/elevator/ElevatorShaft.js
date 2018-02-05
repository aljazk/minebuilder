class ElevatorShaft extends Object{
	constructor(x, y, width){
		super(x,y, width, 0);
		this.color  = "transparent";
	}
	
	extend(){
		this.size.y += settings.floor_size+ settings.floor_gap;
	}
}