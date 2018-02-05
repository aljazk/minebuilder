class WaitingLines{
	constructor(){
		this.list = [];
		this.extend(); //add floor 0 (surface)
	}
	
	extend(){
		this.list.push(new WaitingLine());
	}
	
	getCount(floor){
		return this.list[floor].getCount();
	}
	
	add(floor, o){
		this.list[floor].add(o);
	}
	
	remove(floor){
		return this.list[floor].line.shift();
	}
	
	peek(floor){
		return this.list[floor].line[0];
	}
}

class WaitingLine{
	constructor(){
		this.line = [];
	}
	
	getCount(){
		return this.line.length;
	}
	
	add(o){
		this.line.push(o);
	}
	
	remove(o){
		this.line.indexOf(o);
		return this.line.splice(o, 1);
	}
}