class Drop extends Task{
	constructor(miner){
		var goal = 0;
		var progress =  0;
		var in_position = false;
		var last_gen = 0;
		var train_station = null;
		var display_error = true;
		var funct = function(t){
			if(train_station == null){
				if (!in_position){
					if (miner.sack.empty()){ //if sack is empty dont do anything
						return t;
					}
					if (miner.floor != 0){//first walk to floor 0
						miner.goTo("Elevator", 0, "Walk to surface", "force");
						return t;
					}
					//find the nearest empty train_station
					train_station = miner.findBuilding("TrainStation");
					if (train_station == null){
						if (display_error){
							console.log(miner.name+" "+miner.id+" cannot find empty train_station!");
							display_error = false;
						}
						return t;
					} else {
						display_error = true;
					}
					//walk to the train_station that was found
					miner.goTo(train_station, null, "Walk to empty train_station", "force");
					in_position = true;
					return t;
				}
			}
			
			var drop = t * train_station.getDropSpeed();
			progress += drop;
			var p = 0;
			if(progress >= last_gen){
				var floor_p = Math.floor(progress);
				p = floor_p - last_gen;
				last_gen = floor_p;
				p = train_station.content.transfer(p, miner.sack.content, ore);
			}
			
			var diff = drop - p;
			if (diff < 0){
				return 0;
			} else {
				return diff / train_station.getDropSpeed();
			}
		}
		
		var cond = function(){
			if (train_station != null && train_station.full() && !miner.sack.empty()){
				console.log("Still need to drop:  "+miner.sack.sum());
				miner.drop(ore);
				return true;
			}
			return miner.sack.empty();
		}
		super("Drop", "Drop things from sack to train_station", funct, cond);
	}
}