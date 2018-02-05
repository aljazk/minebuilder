class ElevatorWalk extends Walk{
	constructor(obj, floor){
		super(obj, obj.findBuilding("Elevator"));
		this.description = "Walk to elevator if not in floor "+floor+".";
		this.name = "Elevator Walk";
		this.target = floor;
	}
	
	complete(){
		if (this.object.floor == this.target){
			if (settings.tasks.print){
				console.log("Object is already on floor "+this.target);
			}
			return true;
		}
		return !this.object.walking;
	}
}