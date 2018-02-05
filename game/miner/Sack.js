class Sack{
	constructor(storage){
		this.content = new StorageContent(storage);
	}
	
	sum(){
		return this.content.stored;
	}
	
	spaceLeft(){
		return this.content.spaceLeft();
	}
	
	full(){
		return this.content.isFull();
	}
	
	empty(){
		return this.content.stored == 0;
	}
	
	getOreCount(ore){
		return this.content.getOreCount(ore);
	}
}