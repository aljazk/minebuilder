class Floors {
	constructor(x, y){
		this.floors = [];
		this.ground_pos = y;
		this.center = x;
		this.add(); //add floor 0 (surface)
	}
	
	add(){
		var diff = settings.floor_size + settings.floor_gap;
		var y = this.ground_pos - settings.floor_size + diff * this.floors.length;
		this.floors.push(new Floor(this.center, y, this.getCount()+1));
		console.log("Floor added. Number of floors: "+this.getCount());
	}
	
	getCount(){
		return this.floors.length-1;
	}
	
	getFloor(i){
		var f = this.floors[i];
		if (f == undefined){
			console.log("Error in Floor.js:getFloor(): Floor "+i+" doesn\'t exist");
		}
		return this.floors[i];
	}
	
	
	draw(c){
		this.floors.forEach(function (e){
			e.draw(c);
		});
	}
}

class Floor extends Object{
	constructor(x, y, n){
		super(x, y, 0.5, settings.floor_size);
		this.number = n;
		this.tunnel = {};
		this.tunnel.left = new Tunnel(x, y, "left", this.number);
		this.tunnel.right = new Tunnel(x, y, "right", this.number);
	}
	
	draw(c){
		super.draw(c);
		this.tunnel.left.draw(c);
		this.tunnel.right.draw(c);
	}
}