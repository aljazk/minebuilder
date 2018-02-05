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
		return new StorageContent(v, this.ore);
	}
	
}