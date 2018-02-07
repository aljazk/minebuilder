class TrainStation extends Building{
	constructor(x, y){
		super(x, y-50, 100,  50);
		this.color = "transparent";
	}
	
	getInfoAtributes(){
		var info = super.getInfoAtributes();
		return info;
	}
	
	getInfo(){
		var info = super.getInfo();
		info.push("Sell crap");
		info.push("Dump crap");
		return info;
	}
	
	_getInfoListArray(name){
		var array = [];
		if (name == "train"){
			array.push(this.train);
			//array.push(this.train.getDetails());
			array = array.concat(this.train.wagons.list);
		} else if (name == "train_station"){
			array.push(this);
		}
		return array;
	}
	
	build(){
		this.train = new Train(this.position.x, this.position.y+this.size.y, this);
		//replace the gui button with his own button
		var guib = gui.get("Buildings");
		var button = document.getElementById("button_TrainStations");
		guib.remove(button);
		var t = this;
		button = GUI.makeButton("Train", function(){
			InfoList.make("Train", t._getInfoListArray("train"));
		});
		guib.shift(button);
		button = GUI.makeButton("Train station", function(){
			InfoList.make("Train station", t._getInfoListArray("train_station"));
		});
		guib.shift(button);
	}
	
	getLoadingWagon(){
		if (this.train != null){
			return this.train.getLoadingWagon();
		} else {
			return "no train";
		}
		return null;
	}
	
	getClosestEdge(){
		return this.getCenter().x;
	}
	
	setId(id){
		super.setId(id);
		this._makeDisplay();
	}
	
	upgrade(){
	}
	
	move(timestamp){
		this.train.move(timestamp)
		var div = document.getElementById("info_list");
		if (div != null){
			if (div.name == "Train"){
				InfoList.updateAtributes(this.train.getInfoAtributes());
				this.train.wagons.updateOreArray();
				InfoList.update(this._getInfoListArray("train"));
			} else if (div.name == "Train station"){
				InfoList.update(this._getInfoListArray("train_sation"));
			}
		}
	}
	
	draw(c){
		c.ctx.strokeStyle="#FF0000";
		c.strokeRect(this);
	}
	
}