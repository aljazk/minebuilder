class StorageContent{
	constructor(v, prob){
		this.content = new OreList().get();
		for(var i=this.content.length-1; i>0; i--){
			if (v != null && prob != null){
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
					this.content[i].quantity = ore;
				}
			}
			delete this.content[i].max_prob;
			delete this.content[i].min_prob;
		}
		this.content[0].quantity = v; // what is left is dirt
	}
	
	getSum(){ //returns sum of all the ore
		var sum = 0;
		for(var i=0; i<this.content.length; i++){
			if (this.content[i].quantity != null){
				sum += this.content[i].quantity;
			}
		}
		return sum;
	}
	
	getString(){
		var str = "";
		for(var i=0; i<this.content.length; i++){
			if(this.content[i].quantity > 0){
				str += this.content[i].name + ": " + this.content[i].quantity + "<br>";
			}
		}
		str += "Sum: " + this.getSum();
		return str;
	}
	
	transfer(v, storage){
		for(var i=this.content.length-1; i>=0; i--){
			var move = storage[i].quantity;
			if(move > v){
				move = v;
			}
			if (this.content[i].quantity == null){
				this.content[i].quantity = move;
			} else {
				this.content[i].quantity += move;
			}
			storage[i].quantity -= move;
			v -= move;
			if (v == 0){
				return true;
			}
		}
		console.log("Error in StorageContent.transfer(): Something went wrong transferring ore. "+v);
		return false;
	}
}