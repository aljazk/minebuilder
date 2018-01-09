class OreList{
	constructor(){
		this.list = [];
		this.list.push(new Ore(1, "Dirt", 1, 1, "brown"));
		this.list.push(new Ore(2, "Stone", 0.7, 0.5, "gray"));
		this.list.push(new Ore(3, "Iron", 0.1, 0, "red"));
		this.list.push(new Ore(4, "Gold", 0.05, 0, "yellow"));
		this.list.push(new Ore(5, "Diamond", 0.01, 0, "blue"));
	}
	
	get(){
		return this.list;
	}
}

class Ore{
	constructor(id, name, max_prob, min_prob, color){
		this.id = id;
		if (id == null){
			this.id = 0;
		}
		this.name = name;
		if (name == null){
			this.name = "Ore";
		}
		this.max_prob = max_prob;
		if (max_prob == null){
			this.max_prob = 0;
		}
		this.min_prob = min_prob;
		if (min_prob == null){
			this.min_prob = 0;
		}
		this.color = color;
		if (color == null){
			this.color = "blue";
		}
		this.weight = 1;
	}
}