

class Game{
	constructor(){
		this.canvas = new Canvas();
		
		//this.sound = new Sound(); -- not well made
		window.textData = new TextData();
		
		this.pause_bind = this.pause.bind(this);
		this.settings = new Settings(this);
		this.menu = new Menu(this);
		this.pause_menu = new PauseMenu(this);
		this.game_over = new GameOver(this);
		this.menu.display();
		//this.restart();
	}
	
	start(){
		console.log("Game started");
		window.statistic = new Statistic();
		this.canvas.camera.reset();
		this.menu.hide();
		this.world = new World();
		this.maxFPS = 60;
		this.lastRender = -(1000 / this.maxFPS);
		this.game_start = 0;
		this.paused = false;
		this.unpaused = false;
		this.pauseTime = 0;
		document.addEventListener("keyup", this.pause_bind, false);
		window.requestAnimationFrame(this.game_loop.bind(this));
	}
	
	restart(){
		this.pause_menu.hide();
		this.game_over.reset();
		
		this.start();
	}
	
	pause(e){
		if (e == undefined || e.keyCode == 27){
			if(this.paused){
				this.unpause();
			} else {
				this.pause_menu.display();
				this.paused = true;	
			}
		} else if (e.keyCode == 82){
			this.restart();
		}
	}
	
	unpause(){
		this.pause_menu.hide();
		this.paused = false;
		this.unpaused = true;
		window.requestAnimationFrame(this.game_loop.bind(this));
	}
	
	tomenu(){
		var c = this.canvas;
		c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);
		document.removeEventListener("keyup", this.pause_bind, false);
		this.pause_menu.hide();
		this.game_over.hide();
		
		game.menu.display();
	}
	
	game_loop(timestamp){
		if (!this.paused){
			if (this.game_start == 0) this.game_start = timestamp;
			if (this.unpaused) {
				this.pauseTime = timestamp - this.lastRender;
				this.unpaused = false;
			}
			timestamp -= this.pauseTime;
			if (timestamp < this.lastRender + (1000 / this.maxFPS)) {
				requestAnimationFrame(this.game_loop.bind(this));
				return;
			}
			var gameTime = timestamp-this.game_start;
			Statistic.time = gameTime;
			if(gameTime > 0){
				this.canvas.camera.move(timestamp - this.lastRender);
				if (this.world.move(gameTime) == "gameover") {
					Statistic.time = gameTime;
					this.game_over.dead = true;
				}
			}
			
			this.world.draw(this.canvas);
			statistic.display();
			//this.pause();
			
			var progress = timestamp - this.lastRender;
			statistic.fps = Math.round(1000/progress);
			this.lastRender = timestamp;
			if (!this.game_over.checkEnd(this.canvas)){
				window.requestAnimationFrame(this.game_loop.bind(this));
			} else {
				document.removeEventListener("keyup", this.pause_bind, false);
			}
		}
	}
}