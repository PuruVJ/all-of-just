import { compare } from 'all-of-just/collections';
import { has } from 'all-of-just/objects';

console.log(
	compare(
		new Map([
			[1, 5],
			[1, 0],
		]),
		new Map([
			[1, 5],
			[1, 0],
		]),
	),
);

console.log(has({ a: 1 }, 'x'));
