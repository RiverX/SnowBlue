module game {
	export class TestViewView extends game.ViewBase{
		public constructor() { 
			super(); 
			this.skinName="TestView";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this); 
		}
		private onRemove():void{
			if(this.parent){
				this.parent.removeChild(this);
			}
		}
    }
}