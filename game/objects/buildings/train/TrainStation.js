class TrainStation extends Building{
	constructor(x, y){
		super(x, y-50, 100,  50);
		this.color = "transparent";
	}
	
	static getInfoAtributes(){
		var info = super.getInfoAtributes();
		info.push("Stored");
		info.push("Capacity");
		return info;
	}
	
	build(){
		this.train = new Train(this.position.x, this.position.y+this.size.y, this);
		//replace the gui button with his own button
		var guib = gui.get("Buildings");
		var button = document.getElementById("button_TrainStations");
		guib.remove(button);
		var t = this;
		button = GUI.makeButton("Train station", function(){
			InfoList.make("Train station", t._getInfoListArray());
		});
		guib.shift(button);
	}
	
	_getInfoListArray(){
		var array = [];
		array.push(this);
		array.push(this.train);
		array.push(this.train.getDetails());
		array = array.concat(this.train.wagons.list);
		return array;
	}
	
	setId(id){
		super.setId(id);
		this._makeDisplay();
	}
	
	upgrade(){
	}
	
	move(timestamp){
		this.train.move(timestamp)
		if (InfoList.name == "Train station"){
			InfoList.update(this._getInfoListArray());
		}
	}
	
	draw(c){
		c.ctx.strokeStyle="#FF0000";
		c.strokeRect(this);
	}
	
}