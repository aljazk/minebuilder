class Menu{
	
	constructor(game){
		this.div = document.getElementById("main_menu");
		if(this.div == null){
			this._make(game);
		}
		this.hide(game);
	}
	
	_make(game){
			var txt_data = textData.main_menu;
			this.div = DomMaker.makeElement("div", null, "main_menu");
			document.getElementById("canvas_div").appendChild(this.div);
			var h1 = DomMaker.makeElement("h1", txt_data.game_title);
			this.div.appendChild(h1);
			
			var button = DomMaker.makeButton(txt_data.start_button, "menu_start_button");
			button.addEventListener("click", function(){
				game.start();
			}, false);
			this.div.appendChild(button);
	}
	
	hide(){
		this.div.style.display = "none";
	}
	
	display(){
		this.div.style.display = "block";
	}
}