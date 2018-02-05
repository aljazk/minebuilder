class Miners{
	constructor(x, y, findBuilding, findOre){
		this.findBuilding = findBuilding; //function for finding closes building
		this.findOre = findOre; //function for finding closes stored ore
		this.miners = [];
		this.spawn_point = {x: x, y: y};
		this.miner_size = {x: 5, y: 8};
		this._make_gui();
	}
	
	_make_gui(){
		this.gui = new GUIMenu("Miners");
		window.gui.add(this.gui);
		var t = this;
		var button = GUI.makeButton("Hire", function(){
			console.log("Miner hired");
			t.add();
		});
		this.gui.shift(button);
		button = GUI.makeButton("Work", function(){
			InfoList.make("Work", t.miners);
		});
		this.gui.shift(button);
		button = GUI.makeButton("Sack", function(){
			InfoList.make("Sack", t.miners);
		});
		this.gui.shift(button);
	}
	
	_updateInfoList(){
		var div = document.getElementById("info_list");
		if (div != null){
			var name = div.name;
			if(name == "Work"){
				//InfoList.update(this.miners);
			} else if (name == "Sack"){
				InfoList.update(this.miners);
			}
		}
	}
	
	_findOpenId(){
		var id = 0;
		while (true){
			var found = true;
			for(var i=0; i<this.miners.length; i++){
				var e = this.miners[i];
				if (e.id == id){
					id ++;
					found = false;
					break;
				}	
			}
			if (found){
				return id;
			}
		}
	}
	
	getCount(){
		return this.miners.length;
	}
	
	add(){
		this.miners.push(new Miner(this.spawn_point.x, this.spawn_point.y - this.miner_size.y, this.miner_size.x, this.miner_size.y, this._findOpenId(), this.findBuilding));
		InfoList.update(this.miners);
	}
	
	get(id){
		for(var i=0; i<this.miners.length; i++){
			var e = this.miners[i];
			if (e.id == id){
				return e;
			}
		}
		return null;
	}
	
	move(c){
		this.miners.forEach(function (e){
			e.move(c);
		});
	}
	
	draw(c){
		this.miners.forEach(function (e){
			e.draw(c);
		});
	}
	
	setElevator(e){
		this.elevator = e;
	}
	
	setFloors(f){
		this.floors = f;
		this.spawn_point.y = this.floors.ground_pos;
	}
}
