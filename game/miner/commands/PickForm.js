class PickForm extends Form{
	constructor(funct){
		super();
		var ore = new OreList().get();
		
		var select_ore = document.createElement("select");
		select_ore.name = "ore";
		for(var i=0; i<ore.length; i++){
			select_ore.innerHTML += '<option value="'+ore[i].name+'">'+ore[i].name+'</option>';
		}
		this.form.appendChild(select_ore);
		this.submit = document.createElement("input");
		this.submit.value = "Pick";
		this.submit.setAttribute("type", "submit");
		this.form.appendChild(this.submit);
		var t = this;
		this.addSubmitFunction(function(e){
			//InfoList.close();
			var data = t.getData();
			funct(data["ore"]);
		});
	}
}