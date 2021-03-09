namespace game {
	export class TimerHandler {
		/**执行间隔*/
		public delay: number = 0;
		/**是否重复执行*/
		public forever: boolean = false;
		/**重复执行次数*/
		public repeatCount: number = 0;
		/**执行时间*/
		public exeTime: number = 0;
		/**处理函数*/
		public method: Function;
		/**处理函数所属对象*/
		public methodObj: any;
		/**完成处理函数*/
		public onFinish: Function;
		/**完成处理函数所属对象*/
		public finishObj: any;

		/**清理*/
		public clear(): void {
			this.method = null;
			this.methodObj = null;
			this.onFinish = null;
			this.finishObj = null;
			this.forever = false;
		}
	}
}