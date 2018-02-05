class Train extends Building{
	constructor(x, y, station){
		super(x, y-20, 60,  20);
		this.color = "gray";
		this.train_station = station;
		this.wagons = new Wagons(x, y);
		this.addWagon(new Wagon(30,15));
		this.addWagon(new Wagon(30,15));
		this.addWagon(new Wagon(30,15));
		this.addWagon(new Wagon(30,15));
		this.speed = 0;
		this.stopping_speed = 0;
		this.max_speed = settings.train.max_speed;
		this.power = settings.train.power;
		this.weight = this.size.x*this.size.y*2;
		window.train = this;
		this.drive = true;
		this._stopAtStation();
		var t = this;
		window.go = function(){t.drive = true; t._stopAtStation();};
		window.stop = function(){t.drive = false;};
		window.stopAt = this.positionAtWagon.bind(this);
	}
	
	static getInfoAtributes(){
		var info = super.getInfoAtributes();
		return info;
	}
	
	getInfo(){
		var info = super.getInfo();
		info.push(this.wagons.getStoredSum());
		info.push(this.wagons.getCapacitySum());
		return info;
	}
	
	getDetails(){
		var details = {};
		var t = this;
		details.getInfo = function(){
			return ["Power:", t.power, "Weight: ", t.weight, "Max speed:", t.max_speed, "Current speed: ", Math.round(t.speed*100)/100];
		};
		return details;
	}
	
	setId(id){
		super.setId(id);
		this._makeDisplay();
	}
	
	addWagon(w){
		this.wagons.add(w);
	}
	
	_makeDisplay(){
		super._makeDisplay();
		this.display.id = "train_display_"+this.id;
		this.display.classList.add("train_display");
		var name_p = document.createElement("p");
		name_p.innerHTML = this.name + " " + this.id;
		this.display.appendChild(name_p);
	}
	
	upgrade(){
	}
	
	positionAtWagon(n){ //n is a wagon from 1 to n, 1 being the closest to train
		var station_center = this.train_station.position.x + this.train_station.size.x/2;
		var pos = station_center - this.size.x/2;
		if (n != undefined && n > 0){
			n--;
			var wagon = this.wagons.list[n];
			if (wagon != undefined){
				var diff = this.position.x - wagon.position.x;
				var pos = station_center - wagon.size.x/2 + diff;
			} else {
				console.log("Error in Train.js:stopAtWagon(): Wagon "+n+" doesn\'t exist.");
				return false;
			}
		}
		this.stopAt = pos;
		this.stopping_message = "Wagon "+ (n+1) +" in position for loading.";
		this.drive = true;
		return true;
	}
	
	teleport(pos){
		this.wagons.move(pos - this.position.x);
		this.position.x = pos;
	}
	
	_stopAt(pos){
		if (pos != null){
			var train_pos = this.position.x;
			var full_weight = this.wagons.getWeight() + this.weight;
			var stopping_dist = this.stopping_speed / (this.power / full_weight);
			var dist = pos - train_pos;
			if ((dist > 0 && dist < stopping_dist && this.speed != 0) || !this.drive){
				if (this.drive){
					console.log("Train breaking!");
					this.drive = false;
				}
				var stop_percentage = dist / stopping_dist;
				this.speed = this.stopping_speed * Math.pow(stop_percentage, settings.train.breaking);
				if (this.speed < settings.train.min_speed) this.stopping_speed += settings.train.min_speed;
				if(dist < 0.1){
					this.speed = 0;
					this.stopping_speed = this.speed;
					this.position.x = pos;
					this.stopAt = null;
					if (this.stopping_message != null){
						console.log(this.stopping_message);
					}
					return true;
				}
			} else {
				this.stopping_speed = this.speed;
			}
		}
		return false;
	}
	
	_stopAtStation(){
		this.stopAt = this.train_station.position.x + this.train_station.size.x/2 - this.size.x/2;
		this.stopping_message = "Train stopped at station.";
	}
	
	move(timestamp){
		var full_weight = this.wagons.getWeight() + this.weight;
		if (this.drive){
			this.speed += (this.power/ full_weight) * timestamp;
		}
		if (this.speed > this.max_speed) this.speed = this.max_speed;
		var pos = timestamp * this.speed;
		this.position.x += pos;
		this.wagons.move(pos);
		if (this.wagons.getEndPosition() > settings.right_limit){
			this.teleport(settings.left_limit);
		}
		this._stopAt(this.stopAt);
	}
	
	draw(c){
		super.draw(c);
		this.wagons.draw(c);
	}
	
}