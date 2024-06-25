# all-of-just

A single library containing all of the [Just library's](https://github.com/angus-c/just) functions.

Features:

- 🤏 **Tiny** - Including everything from this library is just [7.4KB min+gzip](https://bundle.js.org/?share=PTAEGEBsEsGMGtQCUCuA7UAzA9gJ1AC4AWApqAELoAmkJVoA1KALLRrSbR2OgDiAXtAAOQ7kICGCcQHMyAZ2j8SAKBIAPIXgKgAVFlzYAtqABE4yJAC02TJYBWKOQRMBuIA)
- 🌳 **Tree Shakeable** - Library is fully tree-shakeable, meaning you may just never hit the 7.4KB mentioned above. If you're using only 3-4 functions from this library, chances are high you'll barely reach just **1KB**
- 🗃️ **Pre-bundled** - This package doesn't install any of the `just-` packages. Everything is pre-bundled in it, hence even downloading this package is fast and light on your storage.

# Motivation

The original library by Angus Croll is really amazing, being very small and modular. But the modular aspect is also its bane in today's world.

Why? The way we use the functions from the original library is by doing an `npm install just-[FUNCTION NAME]`. Which works just fine. But nowadays, we're more used to libraries like `date-fns`, which exposes all of it's functions in the root module only. The advantages of this pattern are:

1. **Install only once**: Only have to install once, means less trips to terminal, meaning less context switching, and small `package.json` and lock files.

2. **VSCode Auto import fully supported**: In today's world of VSCode auto import, opening terminal, typing `npm install just-[FUNCTION NAME]`, then coming back to code, and manually typing the imports is less than ideal. Auto import, on the other hand, has spoiled us really bad 😁. By having this monolithic pattern, you stay in code editor, you don't even have to go up to type imports, the function is available right there for you 🪄🪄

This library(`all-of-just`) strives to give a similar experience, at no added cost.

## Installation size?

When you install `all-of-just`, you're not downloading all the `just-*` packages, which along with their packaged `package.json` and `README.md` can be quite big when downloaded all at once. Rather, `all-of-just` bundles all of them together into a few JS files, along with proper TypeScript types. Your machine downloads no more than `62.5KB` while installing this library

## Assumptions

1. **You bring your own bundler and minifier** - This library is not optimized for direct use in browsers. it is spread over multiple files, and non-minified, and overall not ideal for direct usage in browser. It is recommended to have bundler/minifier toolchain set up to optimize and tree-shake this library.

2. **Using next gen bundler** - This one is not as critical for final performance, but it can greatly affect your developer experience

The original library was made in 2016. The scene at that time was very different from what is now. Then, with bundlers like webpack, you couldn't afford to use big libraries, hence why the original library is divided in so many small packages.

Now, we have tools like [Vite](https://vitejs.dev/), [Snowpack](https://www.snowpack.dev/), [WMR](https://wmr.dev/), which offer blazing fast compilation and Hot Module Reloading, and overall just super great dev experience. You could throw dependencies in the magnitudes of megabytes and your dev experience will still be blazing fast 🔥🔥.

Because of these modern tools, I can ship this larger library as one single package and your developer experience will still be really fast.

So the gist is: I assume you're using one of these next-gen bundlers, and not something traditional which rebundles every single thing on every reload, like Webpack/Grunt projects without HMR.

# Install

```sh
pnpm add all-of-just

# npm
npm install all-of-just

# yarn
bun add all-of-just
```

# Usage

`just` library is divided in many separate modules. There are 7 modules at the moment:

1. Collection
2. Objects
3. Arrays
4. Statistics
5. Strings
6. Numbers
7. Functions

So, to you use a function in one of these modules, all you got to do is import the function prefixed by the module name. Example

```ts
// just-clone
// A part of `Collection` module
import { collectionClone } from 'all-of-just';
```

Again, we want the equivalent of `just-clone` here. `clone` method is part of `Collection` module, so we import `collectionClone`.

Here's all the functions below 👇

```js
import {
  // `Collection` module
  collectionClone,
  collectionCompare,
  collectionDiff,
  collectionDiffApply,
  collectionFlush,
  collectionPluck,
  // `Objects` module
  objectsEntries,
  objectsExtend,
  objectsFilterObject,
  objectsFlipObject,
  objectsIsCircular,
  objectsIsEmpty,
  objectsIsPrimitive,
  objectsMapKeys,
  objectsMapObject,
  objectsMapValues,
  objectsMerge,
  objectsOmit,
  objectsPick,
  objectsReduceObject,
  objectsSafeGet,
  objectsSafeSet,
  objectsTypeof,
  objectsValues,
  objectsDeepMapValues
  // Arrays Module
  arraysCartesianProduct,
  arraysCompact,
  arraysFlattenIt,
  arraysGroupBy,
  arraysIndex,
  arraysInsert,
  arraysIntersect,
  arraysLast,
  arraysPartition,
  arraysPermutations,
  arraysRandom,
  arraysRange,
  arraysRemove,
  arraysShuffle,
  arraysSortBy,
  arraysSplit,
  arraysSplitAt,
  arraysTail,
  arraysUnion,
  arraysUnique,
  arraysZip,
  // Statistics module
  statisticsMean,
  statisticsMedian,
  statisticsMode,
  statisticsPercentile,
  statisticsSkewness,
  statisticsStandardDeviation,
  statisticsVariance,
  // Strings module
  stringsCamelCase,
  stringsCapitalize,
  stringsLeftPad,
  stringsPrune,
  stringsPascalCase,
  stringsKebabCase,
  stringsReplaceAll,
  stringsRightPad,
  stringsSnakeCase,
  stringsSquash,
  stringsTemplate,
  stringsTruncate,
  // Numbers module
  numbersClamp,
  numbersModulo,
  numbersIsPrime,
  // Functions modules
  functionsCompose,
  functionsCurry,
  functionsDebounce,
  functionsDemethodize,
  functionsFlip,
  functionsMemoize,
  functionsMemoizeLast,
  functionsOnce,
  functionsPartial,
  functionsRandom,
  functionsThrottle,
} from 'all-of-just';
```

If you find these confusing, head over to the official [Docs](https://github.com/angus-c/just) and understand the hierarchy. You'll get the flow soon enough 😁

## Using submodules

The convention of `[module][Function]` may not be preferable. In that case, you can use the function directly from the submodules.

```js
import { clone } from 'all-of-just/collection';
```

This is equivalent to

```js
import { collectionClone } from 'all-of-just';
```

You don't have to type the module name before the actual function.

Available modules:

```ts
import { clone, compare, diff, diffApply, flush, pluck } from 'all-of-just/collection';

import {
	isCircular,
	isEmpty,
	entries,
	extend,
	filterObject,
	flipObject,
	mapKeys,
	mapObject,
	mapValues,
	merge,
	/** EXCEPTION: in the docs it is `just-typeof`, but we can't export it as `typeof`, due to keyword conflict. So this one is named `objectsTypeof` */
	objectsTypeof,
	omit,
	pick,
	isPrimitive,
	reduceObject,
	safeGet,
	safeSet,
	values,
	deepMapValues,
} from 'all-of-just/objects';

import {
	cartesianProduct,
	compact,
	flattenIt,
	groupBy,
	index,
	insert,
	intersect,
	last,
	partition,
	permutations,
	random,
	range,
	remove,
	shuffle,
	sortBy,
	split,
	splitAt,
	tail,
	union,
	unique,
	zip,
} from 'all-of-just/arrays';

import {
	mean,
	median,
	mode,
	percentile,
	skewness,
	standardDeviation,
	variance,
} from 'all-of-just/statistics';

import {
	camelCase,
	capitalize,
	kebabCase,
	leftPad,
	pascalCase,
	prune,
	replaceAll,
	rightPad,
	snakeCase,
	squash,
	template,
	truncate,
} from 'all-of-just/strings';

import { clamp, modulo, isPrime, randomInteger } from 'all-of-just/numbers';

import {
	compose,
	curry,
	debounce,
	demethodize,
	flip,
	memoize,
	memoizeLast,
	once,
	partial,
	random,
	throttle,
} from 'all-of-just/functions';
```

# Source of truth

`all-of-just` doesn't have any original code of its own. It export the different `just-*` packages as it is without adding any logic in between. And I intend to keep it that way. That way, this library is just a proxy to the original just library, which makes sure that `just` is improved regularly, and by extension, `all-of-just` too.

# TypeScript Support

1. This package has TypeScript definition for some packages.

2. Some of the packages that do have TypeScript support export more than the function, they export some additional types/functions too. However, to keep `all-of-just` simple, it don't export those types/functions. You'll need to install that package separately and import from it.

[MORE INFO](https://github.com/angus-c/just#typescript-)

# Contributing

Because this project depends on `Just` directly, and doesn't add anything of it's own, the only contribution we need is to fix this README file in case of typos/incorrect code example.

However, the best contribution would be to improve the `Just` library. That will automatically improve `all-of-just` too 😊

# LICENSE

[MIT Licensed](./LICENSE.txt)

&copy; [Puru Vijay](https://twitter.com/puruvjdev)
