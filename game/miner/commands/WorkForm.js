class WorkForm extends Form{
	constructor(funct){
		super();
		var floors = getFloorList();
		var select_floor = document.createElement("select");
		select_floor.name = "floor";
		for(var i=1; i<floors.length; i++){
			select_floor.innerHTML += '<option value="'+i+'">Floor '+i+'</option>';
		}
		this.form.appendChild(select_floor);
		var select_side = document.createElement("select");
		select_side.name = "side";
		select_side.innerHTML += '<option value="left">Left</option>';
		select_side.innerHTML += '<option value="right">Right</option>';
		this.form.appendChild(select_side);
		this.submit = document.createElement("input");
		this.submit.value = "Work";
		this.submit.setAttribute("type", "submit");
		this.form.appendChild(this.submit);
		var t = this;
		this.addSubmitFunction(function(e){
			//InfoList.close();
			var data = t.getData();
			funct(floors[data["floor"]].tunnel[data["side"]]);
		});
	}
}