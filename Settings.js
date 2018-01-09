class Settings{
	constructor(game){
		this.value = {};
		window.settings = this.value;
		settings.floor_size = 40;
		settings.floor_gap = 10;
		settings.tunnel_chunk_size = 5;
		
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
		settings.tasks.print = false;
		
		//temporary settings
		
		settings.elevator.speed = 0.1;
		settings.miner.speed = 0.1;
		//settings.miner.power = 0.1;
	}
}