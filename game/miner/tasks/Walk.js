
class Walk extends Task{
	constructor(obj, dest, description){
		obj.walking = true;
		//get the destination value from given data (x coordinate)
		if (description == null){
			if (typeof dest == "string"){ //find the closes object
				description = "Walking to the closest "+dest+".";
			} else if (dest instanceof Object){ // find the closest wall of that object
				description = "Walking to object "+dest.name+" "+dest.id+".";
			} else {
				description = "Walking to destination "+dest+".";
			}
		}
		super ("Walk", description);
		this.object = obj;
		this.dest = dest;
		this.first = true;
	}
	
	funct(timestamp){
		this.object.walking = true;
		if (this.complete()){
			return timestamp;
		}
		if (this.first){
			if (typeof this.dest == "string"){ //find the closes object
				this.dest = this.object.findBuilding(this.dest);
				if (this.dest == null) {//there is no object of that type
					this.dest = this.object.position.x;
				}
			}
			if (this.dest instanceof Object){ // find the closest wall of that object
				this.dest = this.dest.getClosestEdge(this.object.getCenter().x) - this.object.size.x/2;
			}
			this.first = false;
		}
		var dist = this.dest - this.object.position.x;
		if(Math.abs(dist) > timestamp * this.object.getSpeed()){
			if(dist < 0){
				this.object.position.x -= timestamp * this.object.getSpeed();
			} else {
				this.object.position.x += timestamp * this.object.getSpeed();
			}
			return 0;
		} else {
			this.object.position.x = this.dest;
			this.object.walking = false;
			return timestamp - Math.abs(dist) / this.object.getSpeed();
		}
	}
	
	complete(){
		return !this.object.walking;
	}
}