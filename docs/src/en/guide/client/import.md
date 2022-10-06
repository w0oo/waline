---
title: Importing Client
icon: import
---

Waline provides several versions of client files. You can introduce Waline in a number of ways.

## Via CDN

Recommend to use [unpkg](https://unpkg.com/@waline/client/).

::: code-tabs

@tab Default

```html
<!-- Scripts -->
<script src="https://unpkg.com/@waline/client@v2/dist/waline.js"></script>
<!-- Styles -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@waline/client@v2/dist/waline.css"
/>
```

@tab Pageview Only

```html
<!-- Pageview -->
<script src="https://unpkg.com/@waline/client/dist/pageview.js"></script>
```

:::

::: info Specifies version

For CDN links, if you don't specify a version number, it will be latest version, so if you need to specify a specific version, you need to specify a version number in the format `@version` after `@waline/client`.

```html
<!-- You need to modify and replace `v2` with the version number you want -->
<script src="https://unpkg.com/@waline/client@v2/dist/waline.js"></script>
```

:::

## Via NPM

### Install

Waline client has been released to [npm](https://www.npmjs.com/package/@waline/client) via `@waline/client`, you can install it with the following command:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @waline/client
```

@tab yarn

```bash
yarn add -D @waline/client
```

@tab npm

```bash
npm i -D @waline/client
```

:::

### Import

Waline provides several versions of the file:

- `dist/waline.js`: full version, UMD format

  This file is the default file for CDN import `@waline/client`, 53 KB Gzip size

- `dist/shim.mjs`: full version without dependencies, ES Module format

  This file is the default file when `import` `@waline/client`, 19.39 KB Gzip size

- `dist/shim.cjs`: full version without dependencies, in Common JS format

  This file is the default file when `require` `@waline/client`, 19.59 KB Gzip size

- `dist/waline.css`: Waline CSS styles

- `dist/waline-meta.css`: Waline Meta Icon CSS

- `dist/component.mjs`: Waline's Vue component, ES Module format, without dependency bundling

  This file is for using Waline comments in component mode in a Vue project, 18.28 KB Gzip size

- `dist/comment.js`: Waline's comment module, UMD format, < 1KB Gzip size

  This file is used for CDN, when only comment count are needed

- `dist/pageview.js`: Waline's pageview module, UMD format, < 1KB Gzip size

  This file is used for CDN, when only page views are needed

Other format files:

- `dist/waline.cjs`: Common JS format for `dist/waline.js` file

- `dist/waline.mjs`: ES Module format of `dist/waline.js` file

- `dist/comment.cjs`: Common JS format for `dist/comment.js` file

- `dist/comment.mjs`: ES Module format of `dist/comment.js` file

- `dist/pageview.cjs`: Common JS format for `dist/pageview.js` file

- `dist/pageview.mjs`: ES Module format of `dist/pageview.js` file

### Usage

You can import the required files in various forms and use them, the following is an example.

::: code-tabs#lang

@tab JS

```js
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

init({
  el: '#waline',
  // ...
});
```

@tab TS

```ts
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

init({
  el: '#waline',
  // ...
});
```

:::
