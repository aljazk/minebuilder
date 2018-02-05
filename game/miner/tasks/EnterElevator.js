class EnterElevator extends Task{
	constructor(obj, target_floor){
		super ("Enter elevator line", "Wait for elevator going to floor "+target_floor);
		this.target = target_floor;
		this.object = obj;
	}
	
	funct(t){
		this.object.target_floor = this.target;
		if(this.object.floor != this.object.target_floor){
			this.object.findBuilding("Elevator").cabin.enter(this.object, this.object.floor, t);
		}
		return t;
	}
}