class ElevatorCabin extends Object{
	constructor(x,y, sx, sy){
		super(x,y, sx, sy);
		this.start_y = y;
		this.color = "green";
		this.speed = settings.elevator.speed;
		this.floor = 0;
		this.floor_size = settings.floor_size + settings.floor_gap;
		this.floors = 0; //number of floors
		this.move_to = [];
		this.waiting = true;
		this.moving = false;
		this.pause_time = 1000;
		this.wait_time = this.pause_time;
		
		this.room = 10;
		this.content = new ElevatorContent(this.position.x, this.size.x, settings.elevator.room);
		this.waiting_lines = new WaitingLines();
	}
	
	_ifFloorExists(f){
		if(f >= 0 && f <= this.floors){
			return true;
		}
		return false;
	}
	
	extend(){
		this.floors ++;
		this.waiting_lines.extend();
	}
	
	enter(o, floor, t){
		if (o.position.y == null){
			console.log("Error in ElevatorCabin.js:enter(): Object cannot enter elevator cabin, variable position.y not found");
			return false;
		}
		//check if floor and position.y match
		var y = o.position.y;
		var floory = this.start_y + floor * this.floor_size;
		if (y < floory || y > floory+settings.floor_size){
			console.log("Error in ElevatorCabin.js:enter(): Position " + y + " and " + floory + " dont match, object is not in floor " +floor);
			return false;
		}
		var x = o.position.x;
		if (x != this.position.x){
			//console.log("WARNING in ElevatorCabin.js:enter(): Position " + x + " and " + this.position.x + " dont match, object is not next to elevator");
		}
		
		this.waiting_lines.add(floor, o);
		if (settings.elevator.print){
			console.log("Miner "+o.id+" entered waiting line in floor "+floor);
		}
		o.in_line = true;
		if(this.waiting_lines.getCount(floor) == 1){
			this.moveTo(floor);
			this.move(t);
		}
	}
	
	_floorStop(){//not complete
		if (this.room > 0){
			
			this.room --;
		} else {
			if (settings.elevator.print){
				console.log("Elevator full");
			}
			return false;
		}
	}
	
	leave(o){
		var index = this.content.indexOf(o);
		if (this.content.splice(index, 1)){
			this.room ++;
			o.in_line = false;
			o.in_elevator = false;
			return true;
		} else {
			return false;
		}
	}
	
	moveTo(floor){
		if(this._ifFloorExists(floor)){
			if(!this.move_to.includes(floor)){
				this.move_to.push(floor);
			}
		}
	}
	
	//sets stop time in floor, moves objects out of elevator and moves objects from waiting line to elevator
	wait(overkill){
		//remove objects from elevator
		this.content.leave(this.floor, overkill, this.position.y+this.size.y);
		
		while(!this.content.full()){
			//takes object from waiting line and adds it into elevator
			var obj = this.waiting_lines.remove(this.floor);
			if(obj != null){
				if(this.content.enter(obj, overkill)){//if object entered elevator
					this.moveTo(obj.target_floor); //add objects target floor to the move list
				}
			} else { //there is no more miners in waiting line
				break;
			}
		}
		
		//next in line calls elevator
		var p = this.waiting_lines.peek(this.floor);
		if(p != null){
			this.moveTo(this.floor);
		}
		//sets waiting time
		this.wait_time = this.pause_time - overkill;
		this.waiting = true;
	}
	
	_findMax(arr){
		var r = null;
		for(var i=0; i<arr.length; i++){
			if (r == null || arr[i] > r){
				r = arr[i];
			}
		}
		return r;
	}
	
	_findMin(arr){
		var r = null;
		for(var i=0; i<arr.length; i++){
			if (r == null || arr[i] < r){
				r = arr[i];
			}
		}
		return r;
	}
	
	_moveFront(n){
			 var i = -1;
			while((i = this.move_to.indexOf(n)) != -1){
				this.move_to.splice(i, 1);
			}
			this.move_to.unshift(n);
	}
	
	_findNextStop(){
		var current_floor = this.floor;
		var target_floor = this.move_to[0];
		if (target_floor == undefined){
			return null;
		}
		var floors_on_way = [];
		var moving_dir = "down";
		if (current_floor > target_floor){
			moving_dir = "up";
		}
		for(var i=0; i<this.move_to.length; i++){
			var f = this.move_to[i];
			if(moving_dir == "down"){
				if(f > current_floor && f < target_floor && this._getFloorPosition(f) >= this.position.y){
					floors_on_way.push(f);
				}
			} else if(moving_dir == "up"){
				if(f < current_floor && f > target_floor && this._getFloorPosition(f) <= this.position.y){
					floors_on_way.push(f);
				}
			}
		}
		var stop_f = null;
		if(moving_dir == "down"){
			stop_f = this._findMin(floors_on_way);
		} else if(moving_dir == "up"){
			stop_f = this._findMax(floors_on_way);
		}
		if (stop_f != null){
			this._moveFront(stop_f);
			if (settings.elevator.print){
				console.log("Elevator will stop on his way at floor: "+stop_f);
			}
		}
		return stop_f;
	}
	
	_getFloorPosition(i){
		return this.start_y + i * this.floor_size;
	}
	
	move(timestamp){
		//if elevator is in floor
		if (this.waiting){
			//countdown for how long will it wait
			this.wait_time -= timestamp;
			var all_ready = this.content.move(0);//make content do its tasks (move into elevator standing position)
			if(this.wait_time < 0){ //stop waiting
				if(all_ready){ //if all the content is in elevator
					this.waiting = false;
					timestamp = this.wait_time * -1; //continue loop with leftover time
				} else { //if not wait for 0.5 more sec
					this.wait_time = 500;
				}
			} else {
				return;
			}
		}
		
		//move to next floor in waiting list
		var to = this.move_to[0];
		if (to != null){
			var stop = this._findNextStop();
			if(stop != null){
				to = stop;
			}
			if (!this.moving){//if elevator just started moving
				if(this._ifFloorExists(to)){
					this.moving = true;
					if (settings.elevator.print){
						console.log("Elevator moving to floor: "+to);
					}
				} else {
					console.log("Error in ElevatorCabin.js:move(): floor "+to+" doesnt exists");
					this.move_to.shift();
					if(this.move_to.length > 0){//move to next floor on the list
						this.move(timestamp);
					}
					return;
				}
			}
			
			//move the elevator   add: stop on the way if passing floor that's on the list
			var y_to = this._getFloorPosition(to);
			var dist = y_to - this.position.y;
			if (dist < 0) dist *= -1;
			if(dist < this.speed * timestamp) { //if elevator reached the floor
				this.position.y = y_to;
				this.content.move(this.position.y+this.size.y);
				if (settings.elevator.print){
					console.log("Elevator reached floor "+to);
				}
				this.floor = to;
				this.moving = false;
				this.move_to.shift();
				this.wait(timestamp - dist / this.speed);
			} else { //keep moving elevator and its content
				if (this.position.y < y_to){
					this.position.y += this.speed*timestamp;
					this.content.move(this.position.y+this.size.y);
				}
				if (this.position.y > y_to){
					this.position.y -= this.speed*timestamp;
					this.content.move(this.position.y+this.size.y);
				}
			}
		}
	}
}