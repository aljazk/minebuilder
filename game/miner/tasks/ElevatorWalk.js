class ElevatorWalk extends ObjectWalk{
	constructor(obj, elevator, floor){
		super(obj, elevator);
		super.description = "Walk to elevator if not in floor "+floor+".";
		super.name = "ELevator Walk";
		super.complete = function(){
			if (obj.floor == floor){
				return true;
			}
			return !obj.walking;
		}
	}
}