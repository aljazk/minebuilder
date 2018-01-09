class Miners{
	constructor(x, y){
		this.miners = [];
		this.spawn_point = {x: x, y: y};
		this.miner_size = {x: 5, y: 8};
	}
	
	_findOpenId(){
		var id = 0;
		while (true){
			var found = true;
			for(var i=0; i<this.miners.length; i++){
				var e = this.miners[i];
				if (e.id == id){
					id ++;
					found = false;
					break;
				}	
			}
			if (found){
				return id;
			}
		}
	}
	
	add(){
		this.miners.push(new Miner(this.spawn_point.x, this.spawn_point.y - this.miner_size.y, this.miner_size.x, this.miner_size.y, this._findOpenId()));
	}
	
	get(id){
		for(var i=0; i<this.miners.length; i++){
			var e = this.miners[i];
			if (e.id == id){
				return e;
			}
		}
		return null;
	}
	
	work(miner_id, floor, side, storage, n){
		//get miner
		var miner = this.get(miner_id);
		if (miner == undefined){
			console.log("Error in Miner.js:work(): Miner "+miner_id+" doesn\'t exist.");
			return;
		}
		//get floor
		var ofloor = this.floors.getFloor(floor);
		if (ofloor == undefined || floor == 0){
			console.log("Error in Miner.js:work(): Miner cannot work in floor: "+floor);
			return;
		}
		//get tunnel
		var tunnel = ofloor.tunnel[side];
		if (tunnel == undefined){
			console.log("Error in Miner.js:work(): Invalid tunnel: "+side);
			return;
		}
		//fixes variable n;
		if (n == undefined || !Number.isInteger(n) || n < 0){
			n = 1;
		}
		//find work position
		var pos = tunnel.getEnd();
		if (side == "right"){
			pos -= miner.size.x;
		}
		
		//repeat work n times
		for(var i=0; i<n; i++){
			miner.tasks.add(new Task("Try to work", "Miner checks if work is possible", null, function(){ return !miner.sack.full(); }));
			//walk to work floor
			var cabin = this.elevator.cabin;
			this.goTo(miner_id, NaN , floor, "Walk to work.");
			
			//start work
			miner.tasks.add(new Work(miner, tunnel));
		
			//return to base
			this.goTo(miner_id, this.spawn_point.x, 0, "Walk to base.");
			this.drop(miner_id, storage);
		}
	}
	
	goTo(miner_id, position, floor, desc){ //enter position NaN if you just want to walk to floor
		if (typeof position != "number" && !(position instanceof Object)){
			console.log("Error in Miner.js:goTo(): Position must be a number or \"Object\". You gave:"+position);
			return;
		}
		var miner = this.get(miner_id);
		if (miner != null){
			if(floor != null){
				miner.enterElevator(this.elevator, floor);
			}
			if (position instanceof Object){
				miner.tasks.add(new ObjectWalk(miner, position, desc));
			} else if (!isNaN(position)) {
				miner.tasks.add(new Walk(miner, position, desc));
			}
		} else {
			console.log("Error in Miners:goTo(): Miner with id "+miner_id+" doesnt exist.");
		}
	}
	
	drop(miner_id, storage){
		this.goTo(miner_id, storage, 0, "Walk to storage");
		var miner = this.get(miner_id);
		miner.tasks.add(new Drop(miner, storage));
	}
	
	move(c){
		this.miners.forEach(function (e){
			e.move(c);
		});
	}
	
	draw(c){
		this.miners.forEach(function (e){
			e.draw(c);
		});
	}
	
	setElevator(e){
		this.elevator = e;
	}
	
	setFloors(f){
		this.floors = f;
		this.spawn_point.y = this.floors.ground_pos;
	}
}


class Miner extends Object{
	constructor(x, y, sx, sy, id){
		super(x, y, sx, sy);
		this.walking = false;
		this.speed = settings.miner.speed;
		this.color = "blue";
		this.id = id;
		this.floor = 0;
		this.target_floor = 0;
		this.in_elevator = false;
		this.in_line = false;
		this.tasks = new Tasks("Miner "+this.id);
		this.sack = new Sack(100);
		this.max_carry = settings.miner.max_carry;
		this.power = settings.miner.power;
	}
	
	getSpeed(){
		var mpl = 0;
		if (this.sack.stored > 0){
			mpl = this.sack.stored;
		}
		return this.speed - mpl * Math.pow(this.max_carry, -1) * this.speed;
	}
	
	_enterElevator(){
		
		return true;
	}
	
	enterElevator(elevator, floor){
		if(elevator == null){
			console.log("Miner "+this.id+" cannot find an elevator");
			return false;
		}
		this.tasks.add(new ElevatorWalk(this, elevator, floor));
		this.tasks.add(new EnterElevator(this, elevator, floor));
		var o = this;
		this.tasks.add(new Task("Reach floor", "Wait for elevator to take you to desired floor", function(t){return t;}, function(){return o.floor == o.target_floor;}));
		
	}
	
	
	move(timestamp){
		this.tasks.do(timestamp);
	}
	
	draw(c){
		if(this.in_line){
			this.color = "red";
		} else if (this.in_elevator){
			this.color = "yellow";
		} else {
			this.color = "blue";
		}
		super.draw(c);
	}
}