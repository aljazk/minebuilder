class Sack{
	constructor(storage){
		this.storage = storage;
		this.stored = 0;
		this.ore = new StorageContent();
	}
	
	fill(v){ 
		this.stored += v;
		if (this.stored > this.storage){
			var diff = this.stored - this.storage;
			this.stored = this.storage;
			return diff;
		}
		return 0;
	}
	
	take(v){
		var left = this.stored - v;
		if (left < 0){
			this.stored = 0;
			return left*-1; //leftover
		} else {
			this.stored -= v;
			return 0;
		}
	}

	full(){
		return this.stored >= this.storage;
	}
}