class Tasks{
	constructor(name){
		this.list = [];
		this.new_task = true;
		this.obj_name = name;
	}
	
	stop(){
		this.list.length = 1;
	}
	
	getCurrentTaskName(){
		if (this.list[0] != null){
			return this.list[0].name;
		}
		return "Waiting";
	}
	
	_updateInfoList(){
		var table = document.getElementById("info_list_table");
		if (table != null){
			var tr =  table.getElementsByTagName("tr");
			//find task column
			var task_column = null;
			var args = document.getElementById("info_tr_undefined");
			args = args.getElementsByTagName("td");
			for (var i=0; i<args.length; i++){
				if (args[i].innerHTML == "Task"){
					task_column = i;
					break;
				}
			}
			//console.log(task_column);
			if (task_column == null) return; //there is no task column
			
			//find the row of the curent miner
			for(var i=1; i<tr.length; i++){
				//console.log(tr[i]);
				var td =  tr[i].getElementsByTagName("td");
				var str = td[0].innerHTML + " " + td[1].innerHTML;
				if (str == this.obj_name){
					//update task column
					td[task_column].innerHTML = this.getCurrentTaskName();
				}
			}
		}
	}
	
	do(timestamp){
		var e = this.list[0];
		if (e != null){
			if(this.new_task){
				this._updateInfoList(); //updates info display
				if (settings.tasks.print){
					console.log(this.obj_name+": Starting task: "+e.name+": "+e.description, timestamp);
				}
				this.new_task = false;
			}
			timestamp = e.do(timestamp);
			if (e.complete()){ //if task was complete
				if (settings.tasks.print){
					console.log(this.obj_name+": Task \""+e.name+"\" complete ("+e.description+")", timestamp);
					//alert("Pause");
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
			} else {
			}
			if (this.new_task){ //if new task was forced in process of ongoing task
				this.do(timestamp);
			}
		}
	}
	 
	 tryComplete(){
		 
	 }
	 
	 add(t){
		 this.list.push(t);
	 }
	 
	 force(t){
		 this.new_task = true;
		 this.list.unshift(t);
	 }
}

class Task{
	constructor(name, des, func, comp){
		this.dont_add;
		this.name = name;
		this.description = des;
		this.func = func;
		this.comp = comp;
	}
	
	funct(timestamp){
		if (typeof this.func == "function"){
			return this.func(timestamp);
		} else {
			return timestamp;
		}
	}
	
	complete(){
		if (typeof this.comp == "function"){
			return this.comp();
		} else {
			return true;
		}
	}
	
	do(timestamp){
		return this.funct(timestamp);
	}
}




