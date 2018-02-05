class Mine extends Object{
	
	constructor(){
		var c_size = document.getElementById("game_canvas");
		var surface = 100;
		super(0,surface, c_size.width, c_size.height);
		//add: left and right mountain that limits the surface
		this.color = "brown";
		this.buildings = new Buildings(surface);
		//create elevator
		this.elevator = new Elevator(500,this.position.y-80);
		this.buildings.add(this.elevator);
		this._addExtendButton();
		
		//create floors
		this.floors = new Floors(this.elevator.position.x+this.elevator.size.x/2, this.position.y);
		for(var i=0; i<5; i++){
			this.addFloor();
		}
		
		this.floors.getFloor(1).tunnel.right.dig(1000);
		this.floors.getFloor(1).tunnel.left.dig(10000);
			
		/*
		this.elevator.goTo(5);
		this.elevator.goTo(4);
		this.elevator.goTo(3);
		this.elevator.goTo(2);
		this.elevator.goTo(1);
		*/
		
		//create storage
		this.storage = new Storage(480, this.position.y);
		this.buildings.add(this.storage);
		for(var i = 0; i<10; i++){
			this.buildings.add(new Storage(600+i*20, this.position.y));
		}
		
		//create train station
		this.train_station = new TrainStation(300, this.position.y);
		this.buildings.add(this.train_station);
		
		//add miners
		this.miners = new Miners(450, this.position.y, this.buildings.findClosest.bind(this.buildings), this.buildings.findOre.bind(this.buildings));
		this.miners.setElevator(this.elevator);
		this.miners.setFloors(this.floors);
		
		
		/*
		this.miners.add();
		var miner = this.miners.get(0);
		miner.sack = new Sack(500);
		miner.power = 0.1;
		miner.work(this.floors.getFloor(1).tunnel.right, 1);
		*/
		
		for(var i = 0; i<10; i++){
			this.miners.add();
			var rand_side = this.rand(0,2);
			if (rand_side == 1){
				rand_side = "right";
			} if (rand_side == 0){
				rand_side = "right";
			}
		}
		
		var t = this;
		window.allPick = function(ore){
			if (ore == undefined){
				ore = "Dirt";
			}
			for(var i = 0; i<t.miners.getCount(); i++){
				t.miners.miners[i].pick(ore);
			}
		}
		window.allDrop = function(ore){
			for(var i = 0; i<t.miners.getCount(); i++){
				t.miners.miners[i].drop(ore);
			}
		}
		
		window.allWork = function(){
			for(var i = 0; i<t.miners.getCount(); i++){
				t.miners.miners[i].work(t.floors.getFloor(t.rand(1,t.floors.getCount())).tunnel[rand_side], 1);
			}
		}
		
		//allWork();
		
		//this.buildings.upgrade(this.storage);
		
		
		/*
			this.floors.getFloor(i+1).tunnel.left.dig(timestamp);
			*/
	}
	
	rand(i, j){
		if (i == null){
			i = 1;
		}
		if (j == null){
			j = i;
			i = 0;
		}
		if (j < i){
			var b = i;
			i = j;
			j = i;
		}
		return Math.floor((Math.random() * j) + i);
	}
	
	addFloor(){
		var e = this.elevator.shaft;
		var old_r  = this.extend_button.style.top;
		old_r = old_r.substring(0, old_r.length - 2);
		old_r = Number(old_r);
		old_r -= e.size.y;
		this.floors.add();
		this.elevator.extend();
		this.extend_button.style.top = old_r + e.size.y;
	}
	
	_addExtendButton(){
		var e = this.elevator.shaft;
		var t = this;
		this.extend_button = GUI.makeButton("Extend", function(){t.addFloor()});
		this.extend_button.id = "floor_extend_button";
		this.extend_button.classList.add("movable_button");
		this.extend_button.classList.add("movable");
		this.extend_button.style.left = e.position.x - e.size.x/2;
		this.extend_button.style.top = e.position.y + e.size.y + 10;
		var canvas_div = document.getElementById("canvas_div");
		canvas_div.appendChild(this.extend_button);
	}
	
	move(timestamp){
		this.buildings.move(timestamp);
		this.miners.move(timestamp);
	}
	
	draw(c){
		c.ctx.fillStyle = "rgb(135,206,250)";
		c.ctx.fillRect(0, 0, c.canvas.width, c.canvas.height);
		c.ctx.fillStyle = "brown";
		var y =  this.position.y+c.camera.y;
		if (y < 0) y = 0;
		c.ctx.fillRect(0, y, c.canvas.width, c.canvas.height);
		this.floors.draw(c);
		this.buildings.draw(c);
		this.miners.draw(c);
	}
}