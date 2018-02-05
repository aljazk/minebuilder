class Pick extends Task{
	constructor(miner, ore){
		var progress = 0;
		var in_position = false;
		var last_gen = 0;
		var storage = null;
		var no_ore = false;
		var done = false;
		
		var funct = function(t){
			if (storage == null){
				if (!in_position){
					if (miner.sack.full()){ //if sack is full dont do anything
						return t;
					}
					if (miner.floor != 0){//first walk to floor 0
						miner.goTo("Elevator", 0, "Walk to surface", "force");
						return t;
					}
					//find the nearest storage with desired ore
					storage = miner.findBuilding("Storage with:"+ore);
					if (storage == null){
						console.log(miner.name+" "+miner.id+" cannot find storage containing "+ore+"!");
						no_ore = true;
						return t;
					}
					//walk to the storage that was found
					miner.goTo(storage, null, "Walk to storage with "+ore, "force");
					in_position = true;
					return t;
				}
			}
			
			var pick = t * storage.getDropSpeed();
			progress += pick;
			var p = 0;
			if (progress >= last_gen){
				var floor_p = Math.floor(progress);
				p = floor_p - last_gen;
				last_gen = floor_p;
				p = miner.sack.content.transfer(p, storage.content, ore);
				if (p != 0){ //sack was fulled or storage emptied
					done = true;
				}
			}
			
			var diff = pick - p;
			if (diff < 0){
				return 0;
			} else {
				return diff / storage.getDropSpeed();
			}
		}
		
		var cond = function(){
			if (done && !miner.sack.full()){
				console.log(miner.name+" "+miner.id+" still need to pick: "+miner.sack.spaceLeft() +", restarting pick task.");
				miner.pick(ore);
				return true;
			}
			return miner.sack.full() || no_ore;
		}
		super("Pick", "Pick "+ore+" from storage to sack", funct, cond);
	}
}