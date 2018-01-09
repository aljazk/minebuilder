class Elevator extends Object{
	constructor(x, y, sx, sy){
		super(x, y, sx, sy);
		this.cabin = new ElevatorCabin(this.position.x+this.size.x/2-settings.elevator.size.x/2, this.position.y+this.size.y-settings.elevator.size.y, settings.elevator.size.x, settings.elevator.size.y);
		this.shaft = new ElevatorShaft();
	}
	
	extend(){
		this.cabin.extend();
		this.shaft.extend();
	}
	
	goTo(i){
		this.cabin.moveTo(i);
	}
	
	move(timestamp){
		this.cabin.move(timestamp);
	}
	
	draw(c){
		super.draw(c);
		this.cabin.draw(c);
		this.shaft.draw(c);
	}
	 
}