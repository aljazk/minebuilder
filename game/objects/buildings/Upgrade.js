class Upgrade{
	constructor(){
		
	}
	
	makeGhost(b){
		this.ghost = new b.constructor();
		this.ghost.size.x = b.size.x;
		this.ghost.size.y = b.size.y;
		this.ghost.position.x = b.position.x;
		this.ghost.position.y = b.position.y;
		this.ghost.color = "rgba(255,255,255,0.5)";
		return this.ghost;
	}
	
	makeButton(){
		
	}
	
	makeDisplay(){
	}
	
	confirm(){
	}
	
	cancel(){
		
	}
	
	exit(){
		
	}
	
	expand(){
		
	}
	
}