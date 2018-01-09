
class Walk extends Task{
	constructor(obj, dest, description){
		
		var funct = function(timestamp){ //moves miner and returns leftover time if he reached the destination
			var dist = dest - obj.position.x;
			if(Math.abs(dist) > timestamp * obj.getSpeed()){
				obj.walking = true;
				if(dist < 0){
					obj.position.x -= timestamp * obj.getSpeed();
				} else {
					obj.position.x += timestamp * obj.getSpeed();
				}
			} else {
				obj.position.x = dest;
				obj.walking = false;
				return timestamp - dist / obj.getSpeed();
			}
			return 0;
		}
		
		
		var condition = function(){
			return !obj.walking;
		}
		obj.walking = true;
		if (description == null){
			description = "Walk to destination "+obj.destination;
		} else {
			description += " Destination: " +dest+".";
		}
		super ("Walk", description, funct, condition);
	}
}