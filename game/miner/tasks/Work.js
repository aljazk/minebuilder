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
				return t;
			} else {
				var dig = t * miner.power / tunnel.toughness;
				//generate random ore
				progress += dig;
				var p = 0;
				if(progress >= last_gen){
					var floor_p = Math.floor(progress);
					p = floor_p - last_gen;
					last_gen = floor_p;
					var ore = tunnel.content.makeOre(p);
					var ret = miner.sack.content.transfer(p, ore);
					tunnel.dig(p - ret);
					p -= ret;
				}
			}
			var diff = dig - p;
			if (diff < 0){
				return 0
			} else {
				return diff / miner.power * tunnel.toughness;
			}
		}
		
		var cond = function(){
			return miner.sack.full();
		}
		
		super("Work", "Digging a tunnel", funct, cond);
	}
}