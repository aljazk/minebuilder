class Drop extends Task{
	constructor(miner, storage){
		var goal = 0;
		var progress =  0;
		var last_gen = 0;
		var funct = function(t){
			if(progress == 0){
				goal =  miner.sack.stored; //goal is to empty all the stored things
			}
			var drop = t * storage.drop_speed;
			var leftover = miner.sack.take(drop);
			if (leftover > 0){
				drop = drop - leftover;
			}
			var over_top = storage.store(drop);
			//drop the ore
			progress += drop - over_top;
			if(progress > goal-0.0001) progress = goal; //fix rounding error
			if(progress >= last_gen + 1){
				var p = Math.floor(progress) - last_gen;
				last_gen = Math.floor(progress);
				storage.ore.transfer(p, miner.sack.ore.content);
			}
			
			if (over_top > 0){ //if storage was filled
				miner.sack.fill(over_top); //return what you cannot store to sack
				return over_top / storage.drop_speed + leftover / storage.drop_speed;
			} else {
				return leftover / storage.drop_speed;
			}
			
		}
		
		var cond = function(){
			if(storage.full() || miner.sack.stored == 0){
				if (progress != goal){
					console.log("Error in Drop.js, sack was not emptied: ", progress, last_gen, miner.sack.ore.getSum());
				}
			}
			return storage.full() || miner.sack.stored == 0;
		}
		super("Drop", "Drop things from sack to storage", funct, cond);
	}
}