class GameOver{
	constructor(game){
		this.div = document.getElementById("gameover_menu");
		if(this.div == null){
			this._make(game);
		}
		this.hide();
	}
	
	_make(game){
			var txt_data = textData.game_over;
			this.div = DomMaker.makeElement("div", null, "game_over_menu");
			document.getElementById("canvas_div").appendChild(this.div);
			var h1 = DomMaker.makeElement("h1", txt_data.title);
			this.div.appendChild(h1);
			var  table = DomMaker.makeElement("table", null, "game_over_menu_table");
			this.div.appendChild(table);
			var tr = null;
			var td = null;
			var p = null;
			
			//first row of text
			tr = document.createElement("tr");
			td = document.createElement("td");
			td.align = "center";
			td.setAttribute("colspan", 2);
			this.score_p = document.createElement("p");
			var p = document.createElement("p");
			p.innerHTML = txt_data.score+": ";
			td.appendChild(p);
			td.appendChild(this.score_p);
			td.style.paddingBottom = "20";
			tr.appendChild(td);
			table.appendChild(tr);
			
			//first second of buttons
			tr = document.createElement("tr");
			td = document.createElement("td");
			
			var button = DomMaker.makeButton(txt_data.restart, "game_over_button_restart");
			button.addEventListener("click", function(){
				game.restart();
			}, false);
			td = document.createElement("td");
			td.appendChild(button);
			tr.appendChild(td);
			
			button = DomMaker.makeButton(txt_data.return_to_menu, "game_over_button_tomenu");
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
	
	reset(){
		this.dead = false;
		this.hide();
	}
	
	display(){
		this.score_p.innerHTML = statistic.score;
		this.div.style.display = "block";
	}
	
	hide(){
		this.div.style.display = "none";
	}
	
	checkEnd(c){
		if (this.dead == true){
			this.display();
			return true;
		}
		return false;
	}
}