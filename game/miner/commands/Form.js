class Form{
	constructor(){
		this.form = document.createElement("form");
		this.form.addEventListener("submit", function(e){
			e.preventDefault();
		});
	}
	
	addSubmitFunction(funct){
		if (typeof(funct) == "function"){
			this.form.addEventListener("submit", funct);
		}
	}
	
	getData(){
		//console.log("getting data:");
		var data = [];
		var children = this.form.elements;
		for(var i=0; i<children.length; i++){
			var c = children[i];
			data[c.name] = c.value;
		}
		return data;
	}
	
	get(){
		return this.form;
	}
}

