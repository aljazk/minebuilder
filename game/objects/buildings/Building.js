class Building extends Object{
	constructor(x, y, sx, sy){
		if(x == null) x = 0;
		super(x, y, sx, sy);
		this.id = 0;
		this.upgrade = new Upgrade();
	}
	
	
	build(){
		
	}
	
	upgrade(c){
		
	}
	
	addUpgradeButton(checkOverlap){
		
	}
	
	draw(c){
		//console.log("building");
		super.draw(c);
	}
}