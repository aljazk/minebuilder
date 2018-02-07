class Miner extends Object{
	constructor(x, y, sx, sy, id, find){
		super(x, y, sx, sy);
		this.findClosest = find;
		this.walking = false;
		this.speed = settings.miner.speed;
		this.color = "blue";
		this.id = id;
		this.floor = 0;
		this.target_floor = 0;
		this.in_elevator = false;
		this.in_line = false;
		this.tasks = new Tasks(this.name+" "+this.id);
		this.sack = new Sack(100);
		this.max_carry = settings.miner.max_carry;
		this.power = settings.miner.power;
	}
	
	getInfoAtributes(name){
		var info = super.getInfoAtributes();
		if (name == "Sack"){
			info.push("Carrying");
			info.push("Max Storage");
			info.push("");
			info.push("");
			info.push("");
		} else if (name == "Work"){
			info.push("Task");
			info.push("");
			info.push("");
		}
		return info;
	}
	
	getInfo(name){
		var info = super.getInfo();
		if (name == "Sack"){
			this.stored_p = document.createElement("p");
			this.stored_p.innerHTML = this.sack.content.stored;
			info.push(this.stored_p);
			info.push(this.sack.content.max_storage);
			info.push(new PickForm(this.pick.bind(this)).get());
			info.push(new DropForm(this.drop.bind(this)).get());
			info.push(new DropOnTrainForm(this.dropOnTrain.bind(this)).get());
		} else if (name == "Work"){
			info.push(this.tasks.getCurrentTaskName());
			
			//button has to be cloned
			var t = this;
			//var command_button = GUI.makeButton("Command", function(){ t._commandDisplay(); });
			info.push(new WorkForm(this.work.bind(this)).get());
			info.push(GUI.makeButton("Stop", function(){t.stop();}));
		}
		return info;
	}
	
	_commandDisplay(){
		var path_to_commands = "game/miner/commands/";
		var content = document.createElement("div");
		content.innerHTML = "<h2>Command "+this.getNameId()+":</h2>";
		var t = this;
		content.appendChild();
		content.appendChild(GUI.makeButton("Drop", function(){InfoList.close(), t.drop();}));
		content.appendChild(new PickForm(this.pick.bind(this)).get());
		InfoList.setContent(content);
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
	
	findBuilding(type){
		var c = this.getCenter();
		return this.findClosest(type, c.x, c.y);
	}
	
	enterElevator(elevator, floor, importance_type){
		if(elevator == null){
			console.log("Miner "+this.id+" cannot find an elevator");
			return false;
		}
		if (importance_type == undefined || importance_type == "add"){
			this.tasks.add(new ElevatorWalk(this, floor));
			this.tasks.add(new EnterElevator(this, floor));
			var o = this;
			this.tasks.add(new Task("Reach floor", "Wait for elevator to take you to floor "+ floor, function(t){return t;}, function(){return o.floor == o.target_floor;}));
		} else if (importance_type == "force"){
			var o = this;
			this.tasks.force(new Task("Reach floor", "Wait for elevator to take you to floor "+ floor, function(t){return t;}, function(){return o.floor == o.target_floor;}));
			this.tasks.force(new EnterElevator(this, floor));
			this.tasks.force(new ElevatorWalk(this, floor));
		} else {
			console.log("Error in Miner.js:enterElevator(): Invalid importance_type: "+importance_type+".");
		}
	}
	
	stop(){
		this.tasks.stop();
	}
	
	work(tunnel, n){ //n is the number of times to look throw work //add: make better work looping
		var miner = this;
		//fixes variable n;
		if (n == undefined || !Number.isInteger(n) || n < 0){
			n = 1;
		}
		//find work position
		var pos = tunnel.getEnd();
		if (tunnel.direction == "right"){
			pos -= miner.size.x;
		}
		
		//repeat work n times
		for(var i=0; i<n; i++){
			miner.tasks.add(new Task("Try to work", "Miner checks if work is possible", function(t){if (miner.sack.full()){miner.drop(null, "force");} return t;}, function(){ return !miner.sack.full(); }));
			//walk to work floor
			this.goTo(NaN , tunnel.floor, "Walk to work.");
			
			//start work
			miner.tasks.add(new Work(miner, tunnel));
		
			//return to base
			this.drop();
		}
	}
	
	goTo(position, floor, description, importance_type){ //enter position NaN if you just want to walk to floor
		if (typeof position != "number" && !(position instanceof Object) && typeof position != "string"){
			console.log("Error in Miner.js:goTo(): Position must be a number or \"Object\" or string. You gave:"+position);
			return;
		}
		var miner = this;
		if (miner != null){
			if (importance_type == "force"){
				miner.tasks.force(new Walk(miner, position, description));
			}
			if(floor != null){
				miner.enterElevator(this.findBuilding("Elevator"), floor, importance_type);
			}
			if (!(typeof position == "number" && isNaN(position))){
				if (importance_type == undefined || importance_type == "add"){
					miner.tasks.add(new Walk(miner, position, description));
				} else if (importance_type != "force"){
					console.log("Error in Miner.js:goTo(): Invalid importance_type: "+importance_type+".");
				}
			}
		} else {
			console.log("Error in Miners:goTo(): Miner with id "+miner_id+" doesnt exist.");
		}
	}
	
	drop(ore, importance_type){
		if (importance_type == "force"){
			this.tasks.force(new Drop(this, ore));
		} else {
			this.tasks.add(new Drop(this, ore));
		}
	}
	
	pick(ore, importance_type){
		if (importance_type == "force"){
			this.tasks.force(new Pick(this, ore));
		} else {
			this.tasks.add(new Pick(this, ore));
		}
	}
	
	dropOnTrain(ore, importance_type){
		if (importance_type == "force"){
			this.tasks.force(new DropOnTrain(this, ore));
		} else {
			this.tasks.add(new DropOnTrain(this, ore));
		}
	}
	
	move(timestamp){
		this.tasks.do(timestamp);
		if (this.stored_p != null){
			this.stored_p.innerHTML = this.sack.content.stored;
		}
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