---
title: Component Props
icon: config
---

## serverURL

- Type: `string`
- Required: Yes

Waline server address url

## path

- Type: `string`
- Default: `window.location.pathname`

Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.

::: warning

Please ensure the uniqueness of each _article page_ path, otherwise the same comment list may be loaded .

For example: If on your site `/example/path/` and `/example/path` is the same page, you should probably set `window.location.pathname.replace(/\/$/,'')`.

:::

## lang

- Type: `string`
- Default: `'zh-CN'`

Display language.

Optional value:

- `'zh'`
- `'zh-CN'`
- `'zh-TW'`
- `'en'`
- `'en-US'`
- `'jp'`
- `'jp-JP'`
- `'pt-BR'`
- `'ru'`
- `'ru-RU'`

If you need a custom language, please refer to [i18n](../guide/client/i18n.md).

## emoji

- Type: `(string | WalineEmojiInfo)[] | false`
- Default: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`

Emoji settings, for details see [Custom Emoji](../guide/client/emoji.md)

## dark

- Type: `string | boolean`
- Default: `false`

Darkmode support

- Setting a boolean will set the dark mode according to its value.
- Set it to `'auto'` will display darkmode due to device settings.
- Filling in a CSS selector will enable darkmode only when the selector match waline ancestor nodes.

::: tip Examples

- **Docusaurus**: It will enable darkmode by setting `data-theme="dark"` on the `<html>` tag itself. So you need to set `'html[data-theme="dark"]'` as `dark` option.

- **hexo-theme-fluid**: It will enable darkmode by setting `data-user-color-scheme="dark"` on the `<html>` tag itself. So you need to set `'html[data-user-color-scheme="dark"]'` as `dark` option.

- **vuepress-theme-hope**: It will enable darkmode by setting `theme-dark` class on the `<body>` tag itself. So you need to set `'body.theme-dark'` as `dark` option.

:::

For details of custom style and darkmode, please see [Custom Style](../guide/client/style.md).

## meta

- Type: `string[]`
- Default: `['nick','mail','link']`

Reviewer attributes. Optional values: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Type: `string[]`
- Default: `[]`

Set required fields, default anonymous, optional values:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Type: `string`
- Default value: `'enable'`

Login mode status, optional values:

- `'enable'`: enable login (default)
- `'disable'`: Login is disabled, users should fill in information to comment
- `'force'`: Forced login, users must login to comment

## wordLimit

- Type: `number | [number, number]`
- Default: `0`

Comment word s limit. When a single number is filled in, it 's the maximum number of comment words. No limit when set to `0`.

## pageSize

- Type: `number`
- Default: `10`

number of comments per page.

## imageUploader

- Type: `WalineImageUploader | false`
- Required: No
- Details:

  ```ts
  type WalineImageUploader = (image: File) => Promise<string>;
  ```

Custom image upload method. The default behavior is to embed images Base 64 encoded, you can set this to `false` to disable image uploading.

The function should receive an image object and return a Promise that provides the image address.

::: details Demo

A demo using api of `lsky - pro`.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline imageUploader demo</title>
    <script src="https://unpkg.com/@waline/client@v1/dist/waline.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v1/dist/waline.css"
    />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script>
      const waline = Waline.init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        imageUploader: function (file) {
          let formData = new FormData();
          let headers = new Headers();

          formData.append('file', file);
          headers.append('Authorization', '!{API TOKEN}');
          headers.append('Accept', 'application/json');

          return fetch('!{API URL}', {
            method: 'POST',
            headers: headers,
            body: formData,
          })
            .then((resp) => resp.json())
            .then((resp) => resp.data.links.url);
        },
      });
    </script>
  </body>
</html>
```

:::

## highlighter

- Type: `WalineHighlighter | false`
- Required: No
- Details:

  ```ts
  type WalineHighlighter = (code: string, lang: string) => string;
  ```

**Code highlighting**, use `hanabi` by default. The function passes in original content of code block and language of the code block. You should trigger the callback function or return a string directly.

You can pass in a code highlighter of your own, or set to `false` to disable code highlighting.

::: details Demo

A demo using prismjs to highlight code blocks.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter demo</title>
    <script src="https://unpkg.com/@waline/client@v1/dist/waline.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v1/dist/waline.css"
    />
    <script src="https://unpkg.com/prismjs@v1" data-manual></script>
    <script src="https://unpkg.com/prismjs@v1/plugins/autoloader/prism-autoloader.min.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/prismjs@v1/themes/prism-tomorrow.min.css"
    />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script>
      const waline = Waline.init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        highlighter: (code, lang) => {
          if (!window.Prism.languages[lang]) {
            window.Prism.plugins.autoloader.loadLanguages(lang);
          }

          return window.Prism.highlight(
            code,
            window.Prism.languages[lang] || window.Prism.languages.text,
            lang
          );
        },
      });
    </script>
  </body>
</html>
```

:::

## texRenderer

- Type: `WalineTexRenderer | false`
- Required: No
- Details:

  ```ts
  type WalineTexRenderer = (blockMode: boolean, tex: string) => string;
  ```

Customize $\TeX$ rendering, the default behavior is to prompt that the preview mode does not support $\TeX$. The function provides two parameters, the first parameter indicates whether it should be rendered in block level, and the second parameter is the string of the $\TeX$ content, and return a HTML string as render result.

You can import $\TeX$ renderer to provide preview feature. We recommend you to use Katex or MathJax, or you can set to `false` to disable parsing $\TeX$. For more information, please refer to [KaTeX API](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string) or [MathJax API](http://docs.mathjax.org/en/latest/web/typeset.html#converting-a-math-string-to-other-formats).

:::: details Demo

::: code-tabs

@tab KaTex

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter 案例</title>
    <script src="https://unpkg.com/@waline/client@v1/dist/waline.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v1/dist/waline.css"
    />
    <script src="https://unpkg.com/katex@v0.15"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/katex@v0.15/dist/katex.min.css"
    />
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script>
      const waline = Waline.init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        texRenderer: (blockmode, tex) =>
          window.katex.renderToString(tex, {
            displayMode: blockmode,
            throwOnError: false,
          }),
      });
    </script>
  </body>
</html>
```

@tab MathJax

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waline highlighter 案例</title>
    <script src="https://unpkg.com/@waline/client@v1/dist/waline.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@waline/client@v1/dist/waline.css"
    />
    <script src="https://unpkg.com/mathjax@v3/es5/tex-svg.js"></script>
  </head>
  <body>
    <div id="waline" style="max-width: 800px; margin: 0 auto"></div>
    <script>
      const waline = Waline.init({
        el: '#waline',
        serverURL: 'https://waline.vercel.app',
        path: '/',
        lang: 'en-US',
        texRenderer: (blockmode, tex) =>
          window.MathJax.startup.adaptor.outerHTML(
            window.MathJax.tex2svg(tex, {
              display: blockmode,
            })
          ),
      });
    </script>
  </body>
</html>
```

:::

::::

## search

- Type: `WalineSearchOptions | false`
- Required: No
- Details:

  ```ts
  interface WalineSearchImageData extends Record<string, unknown> {
    /**
     * Image link
     */
    src: string;

    /**
     * Image title
     *
     * @description Used for alt attribute of image
     */
    title?: string;

    /**
     * Image preview link
     *
     * @description For better loading performance, we will use this thumbnail first in the list
     *
     * @default src
     */
    preview?: string;
  }

  type WalineSearchResult = WalineSearchImageData[];

  interface WalineSearchOptions {
    /**
     * Search action
     */
    search: (word: string) => Promise<WalineSearchResult>;

    /**
     * Default result when opening list
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult>;

    /**
     * Fetch more action
     *
     * @description It will be triggered when the list scrolls to the bottom. If your search service supports paging, you should set this to achieve infinite scrolling
     *
     * @default (word) => search(word)
     */
    more?: (word: string, currectCount: number) => Promise<WalineSearchResult>;
  }
  ```

Customize search featreus, you can disable search function by setting it to `false`.

## copyright

- Type: `boolean`
- Default: `true`

Whether show copyright and version in footer.

::: tip

We hope you can keep it on to support Waline.

:::

## recaptchaV3Key

- Type: `string`
- Required: No

reCAPTCHA V3 is a captcha service provided by Google. You can add reCAPTCHA V3 site key with `recaptchaV3Key` to enable it. Notice you should also set environment variable `RECAPTCHA_V3_SECRET` for server.

## reaction

- Type: `boolean | string[]`
- Default: `false`

Add emoji interaction function to the article, set it to `true` to provide the default emoji, you can also customize the emoji image by setting the emoji url array, and supports a maximum of 8 emojis.
