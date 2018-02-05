class ElevatorContent{
	constructor(pos, width, size){
		this.margin = 2;
		this.pos = pos + this.margin;
		this.width = width - this.margin;
		this.spots = [];
		this.size = size;
		this.spot_width = this.width/this.size;
	}
	
	expand(){
		this.size ++;
	}
	
	full(){
		for(var i=0; i<this.size; i++){
			if(this.spots[i] == null){
				return false;
			}
		}
		return true;
	}
	
	_findFreeSpot(){
		for(var i=0; i<this.size; i++){
			if (this.spots[i] == null){
				return i;
			}
		}
		return null;
	}
	
	move(n){
		for(var i=0; i<this.size; i++){
			var e = this.spots[i];
			if (e != null){
				if (e.tasks.list[0].name != "Reach floor"){
					return false;
				}
				if (n != 0){
					e.position.y = n - e.size.y;
				}
			}
		}
		return true;
	}
	
	_getStandingPos(i){
		return this.pos + this.spot_width * i;
	}
	
	enter(obj, overkill){
		var spot = this._findFreeSpot();
		if (spot == null){ //there is no room in elevator
			if (settings.elevator.print){
				console.log("Elevator is full.");
			}
			return false;
		} else {
			this.spots[spot] = obj;
			obj.in_line = false;
			obj.tasks.force(new Walk(obj, this._getStandingPos(spot), "Walk into elevator.")); //moves task of walking into elevator in front
			if (settings.elevator.print){
				console.log("Miner "+obj.id+" entered elevator.");
			}
			obj.in_elevator = true;
			var walk_task = obj.tasks.list[0];
			walk_task.do(overkill); //do the walk to elevator
			//if there was enough overkill to complete the walk remove the task
			if(walk_task.complete()){
				obj.tasks.list.shift();
			}
			return true;
		}
	}
	
	leave(floor, overkill, n){
		for(var i=0; i<this.size; i++){
			var e = this.spots[i];
			if(e != null){
				e.floor = floor;
				if (e.target_floor == floor){
					e.in_line = false;
					e.in_elevator = false;
					e.position.y = n - e.size.y; //move to elevator position before leaving
					if (settings.elevator.print){
						console.log("Miner "+e.id+" left elevator.");
					}
					this.spots[i] = null;
					e.tasks.do(overkill);
				}
			}
		}
	}
}