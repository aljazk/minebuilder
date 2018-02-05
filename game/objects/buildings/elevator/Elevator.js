class Elevator extends Building{
	constructor(x, y, sx, sy){
		if (sx == null) sx = 20;
		if (sy == null) sy = 80;
		super(x, y, sx, sy);
		this.cabin = new ElevatorCabin(this.position.x+this.size.x/2-settings.elevator.size.x/2, this.position.y+this.size.y-settings.elevator.size.y, settings.elevator.size.x, settings.elevator.size.y);
		this.shaft = new ElevatorShaft(this.cabin.position.x, this.position.y+this.size.y, this.cabin.size.x, 0);
		this.name = "Elevator";
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