module game {
	export
		class ViewBase extends eui.Component {
		private _createdCallBack: Function;
		private _parmams: any;
		private _target: any;

		public constructor() {
			super();
			this.percentHeight = 100;
			this.percentWidth = 100;
		}

		protected createChildren(): void {
			super.createChildren();
			if (this._createdCallBack) {
				this._createdCallBack.apply(this._target, [this._parmams])
			}
		}

		public setCreateFun(callback: Function, params: any, target: any): void {
			this._createdCallBack = callback;
			this._parmams = params;
			this._target = target;
		}

		public onResize(): void {
		}
	}
}