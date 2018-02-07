class InfoList{
	constructor(){
		
	}
	
	
	static makeTr(arr, id){ //converts array to tr of a table
		var tr = document.createElement("tr");
		for(var i=0; i<arr.length; i++){
			var td = document.createElement("td");
			td.append(arr[i]);
			tr.appendChild(td);
		}
		tr.id = "info_tr_"+id;
		return tr;
	}
	
	static updateTr(tr, arr){
		var td = tr.getElementsByTagName("td");
		for(var i=0; i<arr.length; i++){
			if (td[i] == undefined){
				var n = document.createElement("td");
				n.append(arr[i]);
				tr.appendChild(n);
			} else {
				if(td[i].innerHTML != arr[i] && td[i].innerHTML != arr[i].outerHTML ){
					td[i].innerHTML = "";
					td[i].append(arr[i]);
				}
			}
		}
		return tr;
	}
	
	static updateAtributes(list){
		var tr = document.getElementById("info_tr_undefined");
		if(tr == null){
			tr = InfoList.makeTr(list, undefined);
			tr.classList.add("info_list_tr");
			table.appendChild(tr);
		} else {
			tr = InfoList.updateTr(tr, list);
		}
	}
	
	static update(list){
		
		var table = document.getElementById("info_list_table");
		var div = document.getElementById("info_list");
		if (table != null){
			//append new info
			for(var i=0; i<list.length; i++){
				var o_info = list[i].getInfo(div.name);
				var tr = document.getElementById("info_tr_"+i);
				if(tr == null){
					tr = InfoList.makeTr(o_info, i);
					tr.classList.add("info_list_tr");
					table.appendChild(tr);
				} else {
					tr = InfoList.updateTr(tr, o_info);
				}
			}
		}
		
		
	}
	
	static make(name, list){
		var id = "info_list";
		var div = document.getElementById(id);
		if (div == null){
			div = document.createElement("div");
			div.id = id;
			document.getElementById("canvas_div").appendChild(div);
		} else {
			div.innerHTML = "";
		}
		//set heading
		div.name = name;
		var h = document.createElement("h2");
		h.innerHTML = name+"s";
		div.appendChild(h);
		
		//make content table
		var table = document.createElement("table");
		table.id = "info_list_table";
		div.appendChild(table);
		//fill with content
		for(var i=0; i<list.length; i++){
			var o = list[i];
			if(i == 0){
				table.appendChild(InfoList.makeTr(o.getInfoAtributes(div.name)));
			}
			//get the info of the object
			var tr = InfoList.makeTr(o.getInfo(div.name), i);
			table.appendChild(tr);
		}
		
		//close the info list if click past it
		div.addEventListener("click", function(e){
			event.stopPropagation();
		});
		document.getElementById("canvas_div").addEventListener("click", function(){
			InfoList.close();
		});
		
	}
	
	static setContent(content){
		var id = "info_list";
		var div = document.getElementById(id);
		if (div == null){
			div = document.createElement("div");
			div.id = id;
			document.getElementById("canvas_div").appendChild(div);
		} else {
			div.innerHTML = "";
		}
		div.appendChild(content);
	}
	
	static getName(){
		var div = document.getElementById("info_list");
		if (div != null){
			return div.name;
		}
		return null;
	}
	
	static close(){
		var id = "info_list";
		var div = document.getElementById(id);
		if (div != null){
			document.getElementById("canvas_div").removeChild(div);
			div = null;
		}
	}
}