class Tasks{
	constructor(name){
		this.list = [];
		this.new_task = true;
		this.obj_name = name;
	}
	 
	do(timestamp){
		var e = this.list[0];
		if (e != null){
			if(this.new_task){
				if (settings.tasks.print){
					console.log(this.obj_name+": Starting task: "+e.name+": "+e.description);
				}
				this.new_task = false;
			}
			timestamp = e.do(timestamp);
			// console.log(e.complete);
			if (e.complete()){ //if task was complete
				if (settings.tasks.print){
					console.log(this.obj_name+": Task \""+e.name+"\" complete ("+e.description+")", timestamp);
				}
				//console.log(this.list);
				this.new_task = true;
				var index = this.list.indexOf(e);
				this.list.splice(index, 1);
				//start next task with leftover time 
				if (this.list.length > 0) {
					this.do(timestamp);
				} else {
					return timestamp;
				}
			}
		}
	}
	 
	 tryComplete(){
		 
	 }
	 
	 add(t){
		 this.list.push(t);
	 }
	 
	 force(t){
		 this.list.unshift(t);
	 }
}

class Task{
	constructor(name, des, func, comp){
		this.dont_add;
		this.name = name;
		this.description = des;
		if (func == null){
			this.funct = function (t) { return t;}; //if task doesnt have any function and its just condition check
		} else {
			this.funct = func;
		}
		if (typeof comp == "function"){
			this.complete = comp; //function that return true if task has been completed
		} else { //if condition is passed as boolean it has one time step, so condition is always true
			this.complete = function (){
				return true;
			}
		}
	}
	
	do(timestamp){
		return this.funct(timestamp);
	}
}




