class Buildings{
	constructor(surface){
		this.surface = surface;
		this.list = [];
		this.types = {};
		this._make_gui();
		this.builder = new Build(this.list, this.add.bind(this));
		this.builder.addAvailableBuilding(this.build.bind(this), Storage);
		this.builder.addAvailableBuilding(this.build.bind(this), TrainStation);
	}
	
	_make_gui(){
		this.gui = new GUIMenu("Buildings");
		window.gui.add(this.gui);
	}
	
	_findOpenId(list){
		if(list == null){
			console.log("Error in Buildings.js:_findOpenId(): Give list is null.");
			return 0;
		}
		var id = 0;
		while (true){
			var found = true;
			for(var i=0; i<list.length; i++){
				var e = list[i];
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
	
	_updateInfoList(){
		var div = document.getElementById("info_list");
		if (div != null){
			var name = div.name;
			if(this.types[name] != null){
				var arr = this.types[name];
				InfoList.update(arr);
			}
		}
	}
	
	
	add(b){
		if ((!b instanceof Building)){
			console.log("Cannot add object "+b+" to building list.");
			return false;
		}
		this.list.push(b);
		var name = b.constructor.name;
		//if the building is train station
		if (name == "TrainStation"){
			this.builder.removeAvailableBuilding(TrainStation);
		}
		// if array of building type doest exist make a new one
		if (this.types[name] == null){
			this.types[name] = [];
			//add a button in gui to access the buildings
			var t = this;
			var button = GUI.makeButton(name+"s", function(){
				console.log(t.types[name]);
				InfoList.make(name, t.types[name]);
			});
			this.gui.shift(button);
		}
		//give id to the building
		b.setId(this._findOpenId(this.types[name]));
		//add building to the specify building type array
		this.types[name].push(b);
		console.log("Building added on "+name+" list. Id: "+b.id);
		//add upgrade button
		b.upgrade.makeButton(b, this.builder.upgrade.bind(this.builder)); //make upgrade button
		//call the build function for the building
		b.build();
		return true;
	}
	
	
	get(type_name){
		var b = this.types[type_name];
		if (b == null){
			console.log("Cannot find any buildings of type "+type_name+".");
		}
		return b;
	}
	
	findClosest(type, x, y){
		var unique_condition = null;
		var desired_ore = null; //needed for one unique condition
		if (type == "Empty Storage"){ //unique type searching for empty storage
			type = "Storage";
			unique_condition = "empty_storage";		
		} else if (type.indexOf("Storage with:") != -1){//searching for storage that includes specific ore
			var ind = type.indexOf(":");
			var unique_condition = "search_for_ore";
			desired_ore = type.substring(ind+1);
			type = "Storage";
		}
		var b = this.get(type);
		if (b == null) return null; //invalid type
		var min_dist = null;
		var closest = null;
		for(var i=0; i<b.length; i++){
			var skip = false;
			if (unique_condition == "empty_storage"){
				if (b[i].full()){ //skip if storage isnt empty
					skip = true;
				}
			} else if (unique_condition == "search_for_ore"){
				var ore_count = b[i].getOreCount(desired_ore);
				if (ore_count == null || ore_count <= 0){
					skip = true;
				}
			}
			//skip is unique condition isnt matched
			if (!skip){
				var c = b[i].getCenter();
				var dist = Math.abs( x - c.x ) + Math.abs( y - c.y );
				if (min_dist == null || dist < min_dist){
					min_dist = dist;
					closest = b[i];
				}
			}
		}
		return closest;
	}
	
	findOre(ore, x, y){ //find the closes storage with desired ore
		var b = this.get("Storage");
		if (b == null) return null; //invalid type
		var min_dist = null;
		var closest = null;
		for(var i=0; i<b.length; i++){
			var ore_count = b[i].getOreCount(ore);
			if (ore_count != null && ore_count > 0){
				var c = b[i].getCenter();
				var dist = Math.abs( x - c.x ) + Math.abs( y - c.y );
				if (min_dist == null || dist < min_dist){
					min_dist = dist;
					closest = b[i];
				}
			}
		}
		return closest;
	}
	
	move(timestamp){
		for(var i=0; i<this.list.length; i++){
			var b = this.list[i];
			b.move(timestamp);
		}
		this._updateInfoList();
	}
	
	draw(c){
		//first draw the train in the background
		if (this.types["TrainStation"] != null){
			var ts = this.types["TrainStation"][0];
			ts.train.draw(c);
		}
		//draw all the buildings
		for(var i=0; i<this.list.length; i++){
			var b = this.list[i];
			b.draw(c);
		}
		//draw the building being placed
		this.builder.draw(c);
	}
	
	build(b){
		b.position.y = this.surface - b.size.y;
		this.builder.set(b);
	}
	
	upgrade(b){
		this.builder.upgrade(b);
	}
}