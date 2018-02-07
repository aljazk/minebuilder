class DropOnTrain extends Task{
	constructor(miner, ore){
		var goal = 0;
		var progress =  0;
		var in_position = false;
		var last_gen = 0;
		var train_station = null;
		var loading_wagon = null;
		var display_error = true;
		var funct = function(t){
			var drop_speed = 1;
			if(train_station == null){
				if (!in_position){
					if (ore != null){ //if only dropping one ore also dont do anything if there is no ore of that type in sack
						var oc = miner.sack.getOreCount(ore);
						if (oc == 0 || oc == null){
							return t;
						}
					}
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
							console.log(miner.name+" "+miner.id+" cannot find train station!");
							display_error = false;
						}
						return t;
					} else {
						display_error = true;
					}
					//walk to the train_station that was found
					miner.goTo(train_station, null, "Walk to train station", "force");
					in_position = true;
					return t;
				}
			}
			
			loading_wagon = train_station.getLoadingWagon();
			console.log("Loading wagon:", loading_wagon);
			if (loading_wagon == null || typeof(loading_wagon) == "string") return t;
			drop_speed = loading_wagon.content.drop_speed;
			var drop = t * drop_speed;
			progress += drop;
			var p = 0;
			if(progress >= last_gen){
				var floor_p = Math.floor(progress);
				p = floor_p - last_gen;
				last_gen = floor_p;
				p = loading_wagon.content.transfer(p, miner.sack.content, ore);
			}
			
			var diff = drop - p;
			if (diff < 0){
				return 0;
			} else {
				return diff / drop_speed;
			}
		}
		
		var cond = function(){
			if (ore != null){ //if only dropping one ore type also return true if there is no ore of that type in sack
				var oc = miner.sack.getOreCount(ore);
				if (oc == 0 || oc == null){
					return true;
				} else {
					return false;
				}
			}
			return miner.sack.empty();
		}
		super("Drop on train", "Drop things from sack to train", funct, cond);
	}
}