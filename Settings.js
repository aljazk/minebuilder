class Settings{
	constructor(game){
		this.value = {};
		window.settings = this.value;
		settings.floor_size = 40;
		settings.floor_gap = 10;
		settings.tunnel_chunk_size = 5;
		settings.left_limit = -1000;
		settings.right_limit = 1000;
		
		settings.elevator = {};
		settings.elevator.room = 3;
		settings.elevator.size = {x:8*settings.elevator.room, y: 10};
		settings.elevator.speed = 0.015; //0.015
		settings.elevator.print = false;
		
		settings.miner = {};
		settings.miner.speed = 0.01; //0.01
		settings.miner.max_carry = 1000;
		settings.miner.power = 0.001; //0.001
		
		settings.tasks = {};
		settings.tasks.print = true;
		
		settings.train = {};
		settings.train.wagon_gap = 5;
		settings.train.max_speed = 0.5;
		settings.train.min_speed = 0.01;
		settings.train.power = 1;
		settings.train.breaking = 0.7;
		
		//temporary settings
		
		settings.elevator.speed = 0.1;
		settings.miner.speed = 0.1;
		settings.miner.power = 0.1;
	}
}