class Build {
	constructor(list, add){
		this.add = add;
		this.building = null;
		this.ghost = null;
		this.original_color = null;
		this.mouse = new MouseListener();
		this.mouse.addClick(this.place.bind(this));
		this.list = list;
		this._make_gui();
	}
	
	_make_gui(){
		this.gui = new GUIMenu("Build..");
		window.gui.add(this.gui, "Buildings");
	}
	
	addAvailableBuilding(b, c){
		var t = this;
		var button = GUI.makeButton(c.name, function(){
			b(new c());
		});
		this.gui.shift(button);
	}
	
	removeAvailableBuilding(c){
		var buttons = this.gui.display.children;
		for(var i=0; i<buttons.length; i++){
			var obj = buttons[i];
			if(obj.name = c.name){
				this.gui.remove(obj);
				break;
			}
		}
	}
	
	set(b){
		if ((!b instanceof Building)){
			console.log("Cannot build object "+b+".");
			return false;
		}
		this.building = b;
		this.original_color = this.building.color;
		this.building.color = "red";
		var t = this;
		
		var button = document.getElementById("cancle_build_button");
		if (button == null){
			var button = GUI.makeButton("Cancel", function(){
				t.exit();
			});
		}
		button.id = "cancle_build_button";
		button.style.display = "block";
		button.style.margin = "auto";
		button.style.marginTop = "10%";
		document.getElementById("canvas_div").appendChild(button);
	}
	
	makeCancleButton(){
		
	}
	
	upgrade(b){
		this.ghost = b.upgrade.makeGhost(b);
		b.upgrade.makeDisplay();
		this.ghost.setCapacity();
		this.ghost.centerCamera();
		b.upgrade.bindOverlap(this.overlap.bind(this));
		b.upgrade.bindBuilding(b);
		var t = this;
		b.upgrade.exit = function(){
			b.upgrade.display.style.display = "none";
			t.ghost = null;
		}
		//hide the info list
		InfoList.close();
	}
	
	overlap(b, c){ //c is a building that should be ignored in checking (can be null)
		for(var i=0; i<this.list.length; i++){
			var a = this.list[i];
			if (a != b && a != c && b.position.x < a.position.x + a.size.x && b.position.x + b.size.x > a.position.x){
				return true;
			}
		}
		return false;
	}
	
	place(e){
		if (this.building != null){
			if(!this.overlap(this.building)){
				this.building.color = this.original_color;
				this.add(this.building);
				this.exit();
				console.log("Building placed.");
			} else {
				console.log("Cannot place here.");
			}
		}
	}
	
	exit(){
		this.building = null;
		var c_button = document.getElementById("cancle_build_button");
		if (c_button != null){
			document.getElementById("canvas_div").removeChild(c_button);
		}
	}
	
	draw(c){
		if (this.building != null){
			if (this.overlap(this.building)){
				this.building.color = "red";
			} else {
				this.building.color = "green";
			}
			this.building.position.x = this.mouse.x - c.camera.x;
			this.building.draw(c);
		}
		if (this.ghost != null){
			this.ghost.draw(c);
		}
	}
}