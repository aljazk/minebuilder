class Wallet {
	constructor(){
		this.value = 0;
	}
	
	add(v){
		this.value += v;
	}
	
	take(v){
		this.value -= v;
	}
}