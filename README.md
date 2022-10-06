# @evojs/callsite

Node.js callsite loader

## Why

Get information where your function was called

![@evojs/callsite npm version](https://img.shields.io/npm/v/@evojs/callsite.svg) ![supported node version for @evojs/callsite](https://img.shields.io/node/v/@evojs/callsite.svg) ![total npm downloads for @evojs/callsite](https://img.shields.io/npm/dt/@evojs/callsite.svg) ![monthly npm downloads for @evojs/callsite](https://img.shields.io/npm/dm/@evojs/callsite.svg) ![npm licence for @evojs/callsite](https://img.shields.io/npm/l/@evojs/callsite.svg)

## Usage example

```typescript
import { Callsite } from '@evojs/callsite';

const yourFn = () => {
  const depth = 1, count = 1;
  const callsite = Callsite.get(depth, count)[0];

  console.log(`Callsite was called here: ${callsite.fileName}:${callsite.line}:${callsite.column}`);
};

yourFn();
```

## License

Licensed under MIT license
