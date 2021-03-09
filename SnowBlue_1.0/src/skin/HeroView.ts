module game {
	export class HeroView extends game.ViewBase{
		public bg:eui.Image;
		public hero:eui.Image;
		public constructor() { 
			super(); 
			this.skinName="Hero";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this); 
		}
		private onRemove():void{
			if(this.parent){
				this.parent.removeChild(this);
			}
		}
    }
}