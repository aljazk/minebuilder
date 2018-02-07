class Wagons {
	constructor(x, y){
		this.list = [];
		this.track_position = y;
		this.end_of_line = x;
	}
	
	add(w){
		if (w instanceof Wagon){
			w.position.x = this.end_of_line - settings.train.wagon_gap - w.size.x;
			w.position.y = this.track_position - w.size.y;
			this.list.push(w);
			w.setId(this.list.length-1); //problem with ids might occur when deleting wagons
			this.end_of_line = w.position.x;
		}
	}
	
	getWeight(){
		var weight = 0
		for(var i=0; i<this.list.length; i++){
			weight += this.list[i].weight;
		}
		return weight;
	}
	
	getStoredSum(){
		var stored = 0
		for(var i=0; i<this.list.length; i++){
			stored += this.list[i].content.stored;
		}
		return stored;
	}
	
	getCapacitySum(){
		var storage = 0
		for(var i=0; i<this.list.length; i++){
			storage += this.list[i].content.max_storage;
		}
		return storage;
	}
	
	getSum(){
		var sum = new StorageContent(this.getCapacitySum());
		for(var i=0; i<this.list.length; i++){
			var w = this.list[i].content;
			for(var j=0; j<w.content.length; j++){
				var o = w.content[j].quantity;
				sum.add(j, o);
			}
		}
		return sum;
	}
	
	getFirstEmpty(){ //return first wagon with some space left
		for(var i=0; i<this.list.length; i++){
			var w = this.list[i];
			if (w.content.spaceLeft() > 0){
				return w;
			}
		}
		return null;
	}
	
	getWagonPosition(n){
		return this.list[n].position.x;
	}
	
	getEndPosition(){
		return this.getWagonPosition(this.list.length-1);
	}
	
	getWagon(n){
		return this.list[n];
	}
	
	updateOreArray(){
		var sum = this.getSum();
		var ore_array = sum.getOreArray();
		for(var i=0; i<this.list.length; i++){
			this.list[i].updateOreArray(ore_array);
		}
	}
	
	move(pos){
		for(var i=0; i<this.list.length; i++){
			this.list[i].position.x += pos;
		}
	}
	
	draw(c){
		for(var i=0; i<this.list.length; i++){
			this.list[i].draw(c);
		}
	}
}