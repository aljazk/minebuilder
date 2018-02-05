class Drop extends Task{
	constructor(miner, ore){
		var goal = 0;
		var progress =  0;
		var in_position = false;
		var last_gen = 0;
		var storage = null;
		var display_error = true;
		var funct = function(t){
			if(storage == null){
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
					//find the nearest empty storage
					storage = miner.findBuilding("Empty Storage");
					if (storage == null){
						if (display_error){
							console.log(miner.name+" "+miner.id+" cannot find empty storage!");
							display_error = false;
						}
						return t;
					} else {
						display_error = true;
					}
					//walk to the storage that was found
					miner.goTo(storage, null, "Walk to empty storage", "force");
					in_position = true;
					return t;
				}
			}
			
			var drop = t * storage.getDropSpeed();
			progress += drop;
			var p = 0;
			if(progress >= last_gen){
				var floor_p = Math.floor(progress);
				p = floor_p - last_gen;
				last_gen = floor_p;
				p = storage.content.transfer(p, miner.sack.content, ore);
			}
			
			var diff = drop - p;
			if (diff < 0){
				return 0;
			} else {
				return diff / storage.getDropSpeed();
			}
		}
		
		var cond = function(){
			if (ore != null){ //if only dropping one ore type also return true if there is no ore of that type in sack
				var oc = miner.sack.getOreCount(ore);
				if (storage != null && storage.full() && oc > 0){
					console.log("Still need to drop "+oc+" of "+ore);
					miner.drop(ore);
					return true;
				}
				if (oc == 0 || oc == null){
					return true;
				} else {
					return false;
				}
			}
			if (storage != null && storage.full() && !miner.sack.empty()){
				console.log("Still need to drop:  "+miner.sack.sum());
				miner.drop();
				return true;
			}
			return miner.sack.empty();
		}
		var msg = "Drop "+ore+" from sack to storage";
		if (ore == null) msg = "Drop everything from sack to storage";
		super("Drop", msg, funct, cond);
	}
}