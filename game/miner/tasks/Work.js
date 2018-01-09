class Work extends Task{
	constructor(miner, tunnel){
		var goal = 0;
		var progress = 0;
		var last_gen = 0;
		var funct = function(t){
			if(progress == 0){
				goal =  miner.sack.storage - miner.sack.stored; //goal is to fill the sack
			}
			//check if miner is at the end of the tunnel
			var pos = tunnel.getEnd();
			if (tunnel.direction == "right"){
				pos -= miner.size.x;
			}
			//walk to the end of the tunnel if work just started or if tunnel expended
			if (miner.position.x != pos && !miner.sack.full()){
				miner.tasks.force(new Walk(miner, pos, "Walk to the end of tunnel"));
			} else {
				var dig = t * miner.power / tunnel.toughness;
				//fills the sack and return the value that couldnt fit in (0 if not filled)
				var left = miner.sack.fill(dig);
				var extentions = tunnel.dig(dig-left);
				//generate random ore
				progress += dig-left;
				if(progress > goal-0.0001) progress = goal; //fix rounding error
				if(progress >= last_gen + 1){
					var p = Math.floor(progress) - last_gen;
					last_gen = Math.floor(progress);
					var ore = tunnel.content.makeOre(p);
					miner.sack.ore.transfer(p, ore);
				}
			}
			return left / miner.power * tunnel.toughness;
		}
		
		var cond = function(){
			if(miner.sack.full()){
				if(progress !=  goal){
					console.log("Error in Work.js, Sack was not filled: ", progress, last_gen, miner.sack.ore.getSum());
				}
			}
			return miner.sack.full();
		}
		
		super("Work", "Digging a tunnel", funct, cond);
	}
}