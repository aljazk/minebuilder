class Mine extends Object{
	
	constructor(){
		var c_size = document.getElementById("game_canvas");
		super(0,100, c_size.width, c_size.height);
		this.color = "brown";
		//create elevator
		var elevator_size = {x: 20, y:80};
		this.elevator = new Elevator(500,this.position.y-elevator_size.y, elevator_size.x, elevator_size.y);
		
		//create floors
		this.floors = new Floors(this.elevator.position.x+elevator_size.x/2, this.position.y);
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
		this.storage = new Storage(100, this.position.y);
		
		//add miners
		this.miners = new Miners(450, this.position.y);
		this.miners.setElevator(this.elevator);
		this.miners.setFloors(this.floors);
		
		/*
			this.miners.add();
			var miner = this.miners.get(0);
			miner.sack = new Sack(500);
			miner.power = 0.1;
			this.miners.work(0, 1, "right", this.storage, 30);
			this.miners.add();
			var miner1 = this.miners.get(1);
			miner1.sack = new Sack(500);
			miner1.sack.stored = 100;
			miner1.power = 0.1;
			this.miners.work(1, 1, "right", this.storage, 30);
			*/
		
		for(var i = 0; i<100; i++){
			this.miners.add();
			var rand_side = this.rand(0,2);
			if (rand_side == 1){
				rand_side = "right";
			} if (rand_side == 0){
				rand_side = "left";
			}
			this.miners.work(i, this.rand(1,5), rand_side, this.storage, 200);
		}
		
		
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
		this.floors.add();
		this.elevator.extend();
	}
	
	move(timestamp){
		this.elevator.move(timestamp);
		this.miners.move(timestamp);
	}
	
	draw(c){
		c.ctx.fillStyle = "brown";
		var y =  this.position.y+c.camera.y;
		if (y < 0) y = 0;
		c.ctx.fillRect(0, y, c.canvas.width, c.canvas.height);
		this.floors.draw(c);
		this.elevator.draw(c);
		this.storage.draw(c);
		this.miners.draw(c);
	}
}