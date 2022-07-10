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

	import * as Asserts from 'uvu/assert';
	export { Asserts };

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
		assert?(response: Response, assert: gd.Asserts): Promise<void> | void; // boolean?
	}

	export type Message =
		| { type: 'req:load' }
		| { type: 'res:load'; value: Suite[] }
		| { type: 'req:save'; value: Suite }
}
