class Market {
	constructor(name){
		this.name = name;
		this.content = new OreList().get();
		this.setValues();
		this.print();
	}
	
	setValues(){ //sets values based on rarity 
		for(var i=0; i<this.content.length; i++){
			var o = this.content[i];
			var v = 1 / (o.max_prob + 2*o.min_prob);
			o.value = Math.round(v*100)/100;
		}
	}
	
	print(){
		for(var i=0; i<this.content.length; i++){
			
			var o = this.content[i];
			console.log(o.name, ": ", o.value);
		}
	}
	
	setValue(name, v){
		for(var i=0; i<this.content.length; i++){
			var o = this.content[i];
			if (o.name == name){
				o.value = v;
			}
		}
	}
	
	getValue(name){
		for(var i=0; i<this.content.length; i++){
			var o = this.content[i];
			if (o.name == name){
				return o.value;
			}
		}
	}
	
	sell(ore, type){
		var sell_sum = 0;
		if (type == undefined){ // sell all the ore
			if (ore.content.length != this.content.length){
				console.log ("Error in Market.js:sell(): Given ore list doesnt have the same length as markets ore list.");
				return null;
			}
			for(var i=0; i<this.content.length; i++){
				var sell_value = this.content[i].value * ore.content.quantity;
				ore.set(i, 0);
				sell_sum += sell_value;
			}
		} else {
			sell_sum = this.getValue(type) * ore.getOreCount(type);
			ore.set(ore.getId(type), 0);
		}
		return sell_sum;
	}
}