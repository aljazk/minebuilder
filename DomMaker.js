class DomMaker{
	constructor(){
		
	}
	
	static makeButton(title, id, cls){
		return this.makeElement("button", title, id, cls);
	}
	
	static makeElement(type, title, id, cls){
		var elm = document.createElement(type);
		if (title != null){
			elm.innerHTML = title;
		}
		if (id != null){
			elm.id = id;
		}
		if (cls != null){
			elm.setAttribute("class", cls);
		}
		return elm;
	}
}