class UpgradeStorage extends Upgrade{
	constructor(){
		super();
		//make a ghost copy of the building
		
		//add ghost building draw to the drawing
		
	}
	
	makeButton(b, upgrade){
		//make upgrade function
		b.upgrade_funct = function(){
			upgrade(b);
		};
		var upgrade_button = GUI.makeButton("Upgrade", b.upgrade_funct);
		b.display.appendChild(upgrade_button);
	}
	
	makeDisplay(){
		this.display = document.getElementById("storage_upgrade_"+this.ghost.id);
		//make the upgrade display
		if(this.display == null){
			this.display = document.createElement("div");
			this.display.id = "storage_upgrade_"+this.ghost.id;
			this.display.classList.add("storage_upgrade");
			this.display.classList.add("movable");
		}
		this.display.style.position = "relative";//to trigger camera binding
		this.display.innerHTML = "";
		this.ghost.capacity_p = document.createElement("p");
		this.ghost.capacity_p.innerHTML = "Capacity: "+this.ghost.storage;
		this.display.appendChild(this.ghost.capacity_p);
		this.display.style.width = this.ghost.size.x+40;
		this.display.style.height = this.ghost.size.y;
		this.display.style.left = this.ghost.position.x-20;
		this.display.style.top = this.ghost.position.y;
		this.display.style.opacity = 1;
		this.display.style.backgroundColor = "rgba(255,0,0,0.1)";
		var canvas_div = document.getElementById("canvas_div");
		canvas_div.append(this.display);
		
		var t = this;
		//make buttons
		var left_button = GUI.makeButton("<", function(){
			t.expand(-10);
		});
		left_button.id = "upgrade_display_left_button";
		left_button.classList.add("upgrade_display_direction_button");
		this.display.append(left_button);
		var confirm_button = GUI.makeButton("Upgrade", function(){
			t.confirm();
		});
		left_button.classList.add("upgrade_display_upgrade_button");
		this.display.append(confirm_button);
		var cancel_button = GUI.makeButton("Cancel", function(){
			t.cancel();
		});
		cancel_button.classList.add("upgrade_display_upgrade_button");
		this.display.append(cancel_button);
		var right_button = GUI.makeButton(">", function(){
			t.expand(10);
		});
		right_button.id = "upgrade_display_right_button";
		right_button.classList.add("upgrade_display_direction_button");
		this.display.append(right_button);
		this.display.style.display = "block";
		
		this.display.append(this.ghost.capacity_p);
	}
	
	bindOverlap(o){
		this.overlap = o;
	}
	
	bindBuilding(b){
		this.building = b;
	}
	
	_getFromStyle(st){
		var r = st;
		r = r.substring(0, r.length - 2);
		r = Number(r);
		return r;
	}
	
	confirm(){
		if (!this.overlap(this.ghost, this.building)){ //check if there is no overlap
			//position the display
			var d = this.building.display.style;
			var old_w = this._getFromStyle(d.width);
			var old_h = this._getFromStyle(d.height);
			var old_x = this._getFromStyle(d.left);
			var old_y = this._getFromStyle(d.top);
			d.width = old_w + this.ghost.size.x - this.building.size.x;
			d.height = old_h + this.ghost.size.y - this.building.size.y;
			d.left = old_x + this.ghost.position.x - this.building.position.x;
			d.top = old_y + this.ghost.position.y - this.building.position.y;
			this.building.size.x = this.ghost.size.x;
			this.building.size.y = this.ghost.size.y;
			this.building.position.x = this.ghost.position.x;
			this.building.position.y = this.ghost.position.y;
			this.building.setCapacity();
		}
		this.exit();
		
	}
	
	cancel(){
		this.exit();
	}
	
	exit(){
		
	}
	
	expand(n){
		if (n > 0){
			this.ghost.size.x += n;
		} else {
			this.ghost.position.x += n;
			this.ghost.size.x -= n;
		}
		var vs = Math.abs(n/2);
		this.ghost.size.y += vs;
		this.ghost.position.y -= vs;
		//if it overlaps undo
		if (this.overlap(this.ghost, this.building)){
			if (n > 0){
				this.ghost.size.x -= n;
			} else {
				this.ghost.position.x -= n;
				this.ghost.size.x += n;
			}
			this.ghost.size.y -= vs;
			this.ghost.position.y += vs;
		} else {
			//reposition the display
			var ud = this.display.style;
			var old_w = ud.width;
			old_w = old_w.substring(0, old_w.length - 2);
			old_w = Number(old_w);
			var old_x = ud.left;
			old_x = old_x.substring(0, old_x.length - 2);
			old_x = Number(old_x);
			if (n > 0){
				ud.width = old_w + n;
			} else {
				ud.left = old_x + n;
				ud.width = old_w - n;
			}
			var old_h = ud.height;
			old_h = old_h.substring(0, old_h.length - 2);
			old_h = Number(old_h);
			var old_y = ud.top;
			old_y = old_y.substring(0, old_y.length - 2);
			old_y = Number(old_y);
			ud.height = old_h + vs;
			ud.top = old_y - vs;
		}
		this.ghost.setCapacity();
	}
	
}