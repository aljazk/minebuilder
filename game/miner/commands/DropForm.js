class DropForm extends Form{
	constructor(funct){
		super();
		var ore = new OreList().get();
		
		var select_ore = document.createElement("select");
		select_ore.name = "ore";
		select_ore.innerHTML += '<option value="null">Everything</option>';
		for(var i=0; i<ore.length; i++){
			select_ore.innerHTML += '<option value="'+ore[i].name+'">'+ore[i].name+'</option>';
		}
		this.form.appendChild(select_ore);
		this.submit = document.createElement("input");
		this.submit.value = "Drop";
		this.submit.setAttribute("type", "submit");
		this.form.appendChild(this.submit);
		var t = this;
		this.addSubmitFunction(function(e){
			//InfoList.close();
			var data = t.getData();
			if (data["ore"] == "null") data["ore"] = null;
			funct(data["ore"]);
		});
	}
}