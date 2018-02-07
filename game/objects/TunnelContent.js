class TunnelContent{
	constructor(){
		this.ore = new OreList().get();
		for(var i=1; i<this.ore.length; i++){
			var o = this.ore[i];
			o.max_prob = o.max_prob + (Math.random() - 0.5) * o.max_prob;//add random bonus
			o.min_prob = o.min_prob + (Math.random() - 0.5) * o.min_prob;
			//fix values
			if(o.max_prob > 1){
				o.max_prob = 1;
			}
			//add: special tunnels with lots of goodies
		}
	}
	
	getString(){
		var str = "Contains:<br>";
		for(var i=0; i<this.ore.length; i++){
			var o = this.ore[i];
			var minr = Math.round(o.min_prob*10000)/100;
			var maxr = Math.round(o.max_prob*10000)/100;
			//str += o.name +": "+ minr +"|"+ maxr +"%<br>";
			if(maxr > 0){
				str += o.name +": "+ maxr +"%<br>";
			}
		}
		return str;
	}
	
	makeOre(v){
		var prob = this.ore;
		var ret = new StorageContent(v);
		ret.content = new OreList().get();
		for(var i=ret.content.length-1; i>0; i--){
			if (v > 0){
				var max_prob = prob[i].max_prob;
				var min_prob = prob[i].min_prob;
				//console.log(this.content[i].name +": "+this.content[i].quantity);
				var ore = 0;
				var magic = 1.2 // fixes randomness to be more balanced
				ore = Math.round( ((Math.random() *  (max_prob-min_prob))+min_prob) * (v+0.1) ); //+0.1 makes it more random
				if(v * (max_prob-min_prob) <= 0.5){
					if (Math.random() < Math.pow(max_prob,magic)){
						ore = 1;
					} else {
						ore = 0;
					}
				}
				
				v -= ore;
				ret.set(i, ore);
			}
			//probability info is only needed for generation and it can be deleted at this point
			delete ret.content[i].max_prob;
			delete ret.content[i].min_prob;
		}
		ret.set(0, v);// what is left is dirt
		delete ret.content[0].max_prob;
		delete ret.content[0].min_prob;
		return ret;
	}
	
}