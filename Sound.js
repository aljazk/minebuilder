class Sound{
	constructor(){
		this.ismute = false;
		this.mute_music = false;
		this.background_music = new Audio('background_music.mp3');
		
		//loop background music
 		this.background_music.addEventListener('ended', function() {
			this.play();
		});
		if (!this.ismute && !this.mute_music){
			this.background_music.play();
		}
		this._makeButtons();
		this._loadSettings();
	}
	
	_makeButtons(){
		var div = document.getElementById("canvas_div");
		var button = document.createElement("Button");
		button.id = "mutemusic_button";
		button.setAttribute("class", "sound");
		button.innerHTML = "&#9835;";
		var p = document.createElement("p");
		p.id = "mutemusic_cross";
		p.innerHTML = "&#10007;";
		p.style.display = "none";
		button.append(p);
		var snd = this;
		button.onclick = function(){
			snd.toggleMuteMusic();
		}
		div.appendChild(button);
		button = document.createElement("Button");
		button.id = "mute_button";
		button.setAttribute("class", "sound");
		button.innerHTML = "&#x1f50a;";
		button.onclick = function(){
			snd.toggleMute();
		}
		div.appendChild(button);
	}
	
	_saveSettings(){
		localStorage.setItem("sound", JSON.stringify({"ismute": this.ismute, "mute_music": this.mute_music}));
	}
	
	_loadSettings(){
		var s = localStorage.getItem("sound");
		var s = JSON.parse(s);
		if(s != null){
			if (s.ismute != null){
				if(s.ismute){
					this.mute();
				} else {
					this.unmute();
				}
			}
			if (s.mute_music != null){
				if(s.mute_music){
					this.muteMusic();
				} else {
					this.unmuteMusic();
				}
			}
		}
	}
	
	
	toggleMute(){
		if(this.ismute){
			this.unmute();
		} else {
			this.mute();
		}
		this._saveSettings();
	}
	
	toggleMuteMusic(){
		if (this.mute_music){
			this.unmuteMusic();
		} else {
			this.muteMusic();
		}
		this._saveSettings();
	}
	
	muteMusic(){
		var p = document.getElementById("mutemusic_cross");
		p.style.display = "block";
		this.background_music.pause();
		this.mute_music = true;
	}
	
	unmuteMusic(){
		var p = document.getElementById("mutemusic_cross");
		p.style.display = "none";
		if (!this.ismute){
			this.background_music.play();
		}
		this.mute_music = false;
	}
	
	mute(){
		var button = document.getElementById("mute_button");
		button.innerHTML = "&#x1F508;";
		this.background_music.pause();
		this.ismute = true;
	}
	
	unmute(){
		var button = document.getElementById("mute_button");
		button.innerHTML = "&#x1f50a;";
		if(!this.mute_music){
			this.background_music.play();
		}
		this.ismute = false;
	}
}