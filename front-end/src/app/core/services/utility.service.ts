import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as equal from 'fast-deep-equal';
import { Logger } from '../singletons/logger';

@Injectable()
export class UtilityService {

	documentMouseDown: Subject<HTMLElement> = new Subject<HTMLElement>();
	//documentMouseMove: Subject<HTMLElement> = new Subject<HTMLElement>();

	constructor() { }

	public deepCopy<T>(target: T): T {
		if (target === null) {
			return target;
		}
		if (target instanceof Date) {
			return new Date(target.getTime()) as any;
		}
		if (target instanceof Array) {
			const cp = [] as any[];
			(target as any[]).forEach((v) => { cp.push(v); });
			return cp.map((n: any) => this.deepCopy<any>(n)) as any;
		}
		if (typeof target === 'object' && target !== {}) {
			const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
			Object.keys(cp).forEach(k => {
				cp[k] = this.deepCopy<any>(cp[k]);
			});
			return cp as T;
		}
		return target;
	}

	public stringify(object: any, beautify: boolean = false): string {
		const getCircularReplacer = () => {
			const seen = new WeakSet();
			return (key: any, value: any) => {
				if (typeof value === "object" && value !== null) {
					if (seen.has(value)) {
						return;
					}
					seen.add(value);
				}
				return value;
			};
		};

		if (beautify == false)
			return JSON.stringify(object, getCircularReplacer());
		else
			return JSON.stringify(object, getCircularReplacer(), "\t");

	}

	public zeroPad(num: number, length: number): string {
		return String(num).padStart(length, '0');
	}

	public groupBy<T, U>(array: Array<T>, predicate: (item: T) => U): Map<U, Array<T>> {
		const groupedMap: Map<U, Array<T>> = array.reduce(
			(entryMap, e) => entryMap.set(predicate(e), [...entryMap.get(predicate(e)) || [], e]),
			new Map()
		)
		return groupedMap;
	}

	public leastCommonMultiple(numbers: number[]): number {
		function gcd(a: number, b: number): number {
			return !b ? a : gcd(b, a % b);
		}

		function lcm(a: number, b: number): number {
			return (a * b) / gcd(a, b);
		}

		if (numbers.length == 0)
			return 0;

		var multiple = numbers[0];
		numbers.forEach(function (number) {
			multiple = lcm(multiple, number);
		});

		return multiple;
	}

	public flatten<T>(array: T[][]): T[] {
		return ([] as T[]).concat(...array);
	}

	public deepEqual(x: any, y: any): boolean {
		return equal(x, y);
	}

	public distinct<T>(array: T[]): T[] {
		let distinct: T[] = [];

		for (let item of array)
			if (distinct.some(distinctItem => this.deepEqual(distinctItem, item)) == false)
				distinct.push(item);

		return distinct;
	}

	public stringEqual(x: string, y: string): boolean {
		if ((!x && y) || (x && !y))
			return false;

		if (!x && !y)
			return true;

		return x.trim().toLocaleUpperCase() == y.trim().toLocaleUpperCase();
	}

	public newGuid(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}
