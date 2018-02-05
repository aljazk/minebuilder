class GUI{
	constructor(){
		this._makeDisplay();
		this.menus = [];
		this.main_menu = new GUIMenu("Main");
		this.gui_div.appendChild(this.main_menu.display);
		this.main_menu.show();
	}
	
	_makeDisplay(){
		this.gui_div = document.getElementById("gui");
		if (this.gui_div == null){
			this.gui_div = document.createElement("div");
			document.body.appendChild(this.gui_div);
			this.gui_div.id = "gui";
			/*
			this._makeMain();
			this._makeBuildings();
			*/
		} else {
			this.gui_div.innerHTML = "";
		}
	}
	
	reset(){
		this.menus = [];
	}
	
	get(name){
		for(var i=0; i<this.menus.length; i++){
			var m = this.menus[i];
			if(name == m.name){
				return m;
			}
		}
		return false;
	}
	
	add(menu, parent){
		if (this.get(menu.name) != false){
			console.log("Menu \""+menu.name+"\" already exists.");
			return false;
		}
		if (menu instanceof GUIMenu){
			//append the menu
			this.menus.push(menu);
			this.gui_div.appendChild(menu.display);
			//set the parent menu
			var m = this.main_menu;
			if(parent != null){
				var parent_menu = this.get(parent);
				if(parent_menu != false){
					m = parent_menu;
				} else {
					console.log("Cannot assign menu \""+parent+"\" as parent.");
				}
			}
			//add back button to the menu
			var button = GUI.makeButton("...", function(){
				menu.hide();
				m.show();
			});
			menu.append(button);
			//add button to the parent menu
			var button = GUI.makeButton(menu.name, function(){
				menu.show();
				m.hide();
			});
			m.shift(button);
			console.log("Menu \""+menu.name+"\" was added to the gui.");
			return true;
		} else{ 
			console.log("Cannot add object \""+menu.constructor.name+"\" to gui menu list.");
			return false;
		}
	}
	
	static makeButton(name, funct){
		var b = document.createElement("button");
		if (funct != null){
			b.addEventListener("click", funct);
		}
		b.innerHTML = name;
		b.name = name;
		b.id = "button_"+name;
		return b;
	}
	
	
}