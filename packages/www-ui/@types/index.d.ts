declare namespace gd {
	interface Input {
		key: string;
		value: string;
		enable: boolean;
	}

	export interface Suite {
		file: string;
		tests: {
			[name: string]: Request;
		}
	}

	export interface Request {
		/**
		 * custom name
		 * @default "(METHOD) PATHNAME"
		 */
		name?: string;
		// TODO: group / colletion
		/** HTTP METHOD */
		method: string;
		url: string;
		parameters?: Input[];
		headers?: Input[];
		body?: string | null; // TODO
		/** custom assertion(s) */
		assert?(response: Response): Promise<void> | void; // boolean?
	}

	type Message =
		| { type: 'req:load' }
		| { type: 'res:load'; value: Suite[] }
		| { type: 'req:save'; value: Suite }
}
