module game {
	export class MainScenceView extends game.ViewBase{
		public ground:eui.Image;
		public cricle:eui.Image;
		public hero_1:game.HeroView;
		public hero_2:game.HeroView;
		public hero_3:game.HeroView;
		public monster_1:game.HeroView;
		public monster_2:game.HeroView;
		public monster_3:game.HeroView;

		public constructor() { 
			super(); 
			this.skinName="MainScence";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this); 
		}
		private onRemove():void{
			if(this.parent){
				this.parent.removeChild(this);
			}
		}
    }
}