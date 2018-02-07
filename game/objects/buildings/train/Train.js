class Train extends Building{
	constructor(x, y, station){
		super(x, y-20, 60,  20);
		this.color = "gray";
		this.train_station = station;
		this.wagons = new Wagons(x, y);
		this.loading_wagon = null;
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
	
	getInfoAtributes(){
		var info = super.getInfoAtributes();
		info.push("Stored");
		var sum = this.wagons.getSum();
		info = info.concat(sum.getOreArray());
		info.push("Capacity");
		return info;
	}
	
	getInfo(){
		var info = super.getInfo();
		var sum = this.wagons.getSum();
		info.push(sum.stored);
		info = info.concat(sum.getQuantityArray());
		info.push(sum.max_storage);
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
	
	positionAtWagon(n){ //n is a wagon or number from 1 to n, 1 being the closest to train
		if (n == null){
			return false;
		}
		var station_center = this.train_station.position.x + this.train_station.size.x/2;
		var pos = station_center - this.size.x/2;
		if (n != undefined){
			var wagon = n;
			if (typeof(n) == "number"){
				var wagon = this.wagons.list[n-1];
			} else {
				n = this.wagons.list.indexOf(wagon);
			}
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
	
	_positionWagon(){
		if (this.loading_wagon == null || this.loading_wagon.content.isFull()){
			this.loading_wagon = this.wagons.getFirstEmpty();
			this.positionAtWagon(this.loading_wagon);
		}
	}
	
	getLoadingWagon(){
		if (this.speed == 0){
			return this.loading_wagon;
		}
		return "driving";
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
		this.loading_wagon = null;
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
		this._positionWagon();
	}
	
	draw(c){
		super.draw(c);
		this.wagons.draw(c);
	}
	
}