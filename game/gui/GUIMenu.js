class GUIMenu{
	constructor(name){
		var id = "gui_"+name.toLowerCase();
		this.name = name;
		this.display = document.getElementById(id);
		if (this.display == null){
			this.display = document.createElement("div");
			this.display.id = id;
		}
		this.hide();
	}
	
	append(obj){
		this.display.appendChild(obj);
	}
	
	shift(obj){
		this.display.insertBefore(obj, this.display.firstChild);
	}
	
	remove(obj){
		this.display.removeChild(obj);
	}
	
	show(){
		this.display.style.display = "block";
	}
	
	hide(){
		this.display.style.display = "none";
	}
	
}