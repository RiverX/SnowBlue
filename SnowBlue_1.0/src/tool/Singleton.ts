namespace game {
	export abstract class Singleton {
		public constructor() {}

		protected static getInstance<T>(...args: any[]): T {
			let cls: any = this;

			if (!cls._instance) {
				let len: number = args.length;
				if (len == 0) {
					cls._instance = new cls();
				} else if (len == 1) {
					cls._instance = new cls(args[0]);
				} else if (len == 2) {
					cls._instance = new cls(args[0], args[1]);
				} else if (len == 3) {
					cls._instance = new cls(args[0], args[1], args[2]);
				}

				cls._instance.init();
			}

			return cls._instance as T;
		}

		protected abstract init();
	}
}
