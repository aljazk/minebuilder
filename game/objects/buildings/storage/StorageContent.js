class StorageContent{
	constructor(v){ // add: maybe generating in here is not the best
		this.stored = 0;
		this.max_storage = v;
		this.drop_speed = 0.1;
		this.content = new OreList().get();
		for(var i=this.content.length-1; i>=0; i--){
			//probability info is only needed for generation and it can be deleted at this point
			delete this.content[i].max_prob;
			delete this.content[i].min_prob;
			this.set(i, 0);
		}
	}
	
	add(i, v){ //adds v to the storage, if storage gets full it return v that couldnt be stored
		if (typeof(i) == "string"){
			i = getId(i);
		}
		if (typeof(v) != "number"){
			console.log("Error in StorageContent.js:add(): v must be a number (You gave: ",v,").");
			return null;
		}
		this.content[i].quantity += v;
		this.stored += v;
		if (this.stored > this.max_storage){
			v = this.stored - this.max_storage;
			this.stored = this.max_storage;
			this.content[i].quantity -= v;
			//console.log("Storage full, "+v+" "+this.content[i].name+" couldnt be stored");
		} else {
			v = 0;
		}
		return v;
	}
	
	set(i, v){
		if (typeof(i) == "string"){
			i = getId(i);
		}
		if(this.content[i].quantity >= 0){
			this.stored -= this.content[i].quantity;
		}
		this.content[i].quantity = 0;
		return this.add(i, v);
	}
	
	take(i, v){
		if (typeof(i) == "string"){
			i = getId(i);
		}
		var move = this.content[i].quantity;
		if (typeof(move) != "number"){
			move = 0;
		}
		if(move > v){
			move = v;
		}
		this.content[i].quantity -= move;
		this.stored -= move;
		return v - move;
	}
	
	getId(name){
		for(var i=0; i<this.content.length; i++){
			var c = this.content[i];
			if (c.name == name){
				return i;
			}
		}
		return -1;
	}
	
	isFull(){
		return this.stored >= this.max_storage;
	}
	
	spaceLeft(){
		return this.max_storage - this.stored;
	}
	
	getSum(){ //returns sum of all the ore
		var sum = 0;
		for(var i=0; i<this.content.length; i++){
			if (this.content[i].quantity != null){
				sum += this.content[i].quantity;
			}
		}
		return sum;
	}
	
	getOreCount(name){
		for(var i=0; i< this.content.length; i++){
			var c = this.content[i];
			if (c.name == name){
				if (c.quantity == undefined){
					return 0;
				}
				return c.quantity;
			}
		}
		return null;
	}
	
	getOreArray(){
		var arr = [];
		for(var i=0; i<this.content.length; i++){
			if(this.content[i].quantity > 0){
				arr.push(this.content[i].name);
			}
		}
		return arr;
	}
	
	getQuantityArray(){
		var arr = [];
		for(var i=0; i<this.content.length; i++){
			if(this.content[i].quantity > 0){
				arr.push(this.content[i].quantity);
			}
		}
		return arr;
	}
	
	getString(){
		var str = "";
		for(var i=0; i<this.content.length; i++){
			if(this.content[i].quantity > 0){
				str += this.content[i].name + ": " + this.content[i].quantity + "<br>";
			}
		}
		str += "Sum: " + this.getSum();
		return str;
	}
	
	_moveOre(v, storage, i){ //move ore from storage to this and return how much ore couldnt be moved
		var move = storage.content[i].quantity;
		if (typeof(move) != "number"){
			move = 0;
		}
		if(move > v){
			move = v;
		}
		move -= this.add(i, move);
		storage.take(i, move);
		if (storage.content[i].quantity < 0 || typeof(storage.content[i].quantity) != "number") {
			console.log("Error in StorageContent.js_moveOre(): quantity of "+storage[i].name+" was set to: "+storage[i].quantity);
		}
		return v - move;
	}
	
	transfer(v, storage, ore){
		if (ore == undefined){ // move all the ore
			for(var i=this.content.length-1; i>=0; i--){
				v = this._moveOre(v, storage, i);
			}
		} else { //move specified ore
			v = this._moveOre(v, storage, this.getId(ore));
		}
		return v;
	}
}