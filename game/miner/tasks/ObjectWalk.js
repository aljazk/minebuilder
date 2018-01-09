class ObjectWalk extends Walk{
	constructor(obj, target, desc){
		super(obj, target.position.x, desc);
		this.funct = function(timestamp){
			var target_pos = obj.position.x;
			if (obj.position.x < target.position.x - obj.size.x/2){
				target_pos = target_pos = target.position.x - obj.size.x/2;
			} else if (obj.position.x > target.position.x + target.size.x - obj.size.x/2) {
				target_pos = target.position.x + target.size.x - obj.size.x/2;
			}
			var dest = target_pos;
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
	}
}