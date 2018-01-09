class EnterElevator extends Task{
	constructor(obj, elevator, target_floor){
		var funct = function(t){
			obj.target_floor = target_floor;
			if(obj.floor != obj.target_floor){
				elevator.cabin.enter(obj, obj.floor, t);
			}
			return t;
		}
		super ("Enter elevator line", "Wait for elevator going to floor "+target_floor, funct);
	}
}