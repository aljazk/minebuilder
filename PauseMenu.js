class PauseMenu{
	constructor(game){
		this.div = document.getElementById("snake_pause_menu");
		if(this.div == null){
			this._make(game);
		}
		this.hide();
	}
	
	_make(game){
			var txt_data = textData.pause_menu;
			this.div = DomMaker.makeElement("div", null, "pause_menu");
			document.getElementById("canvas_div").appendChild(this.div);
			this.div.appendChild(DomMaker.makeElement("h1", txt_data.title));
			var table = document.createElement("table");
			var table = DomMaker.makeElement("table", null, "pause_menu_table");
			this.div.appendChild(table);
			var tr = null;
			var td = null;
			var p = null;
			
			//first row of buttons
			tr = document.createElement("tr");
			td = document.createElement("td");
			
			var button = DomMaker.makeButton(txt_data.resume, "pause_button_resume");
			button.addEventListener("click", function(){
				game.unpause();
			}, false);
			td.appendChild(button);
			tr.appendChild(td);
			
			button = DomMaker.makeButton(txt_data.restart, "pause_button_restart");
			button.addEventListener("click", function(){
				game.restart();
			}, false);
			td = document.createElement("td");
			td.appendChild(button);
			tr.appendChild(td);
			
			button = DomMaker.makeButton(txt_data.return_to_menu, "pause_button_tomenu");
			button.addEventListener("click", function(){
				game.tomenu();
			}, false);
			td = document.createElement("td");
			td.appendChild(button);
			tr.appendChild(td);
			table.appendChild(tr);
			
			td.appendChild(button);
			tr.appendChild(td);
	}
	
	display(){
		this.div.style.display = "block";
	}
	
	hide(){
		this.div.style.display = "none";
	}
}