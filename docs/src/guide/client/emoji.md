---
title: 自定义表情
icon: emoji
---

你可以通过设置 `emoji` 选项自定义评论输入框的表情，你应该将它设置为包含*预设地址*或*预设配置对象*的**数组**。如果你不需要它，只需将它设置为 `false`。

<!-- more -->

## 预设

Waline 提供了一系列开箱即用的表情预设。你可以直接将它们添加到 `emoji` 选项中:

- Alus

  ```http
  https://unpkg.com/@waline/emojis@1.1.0/alus
  ```

- 哔哩哔哩

  ```http
  https://unpkg.com/@waline/emojis@1.1.0/bilibili
  ```

- Bmoji

  ```http
  https://unpkg.com/@waline/emojis@1.1.0/bmoji
  ```

- QQ

  ```http
  https://unpkg.com/@waline/emojis@1.1.0/qq
  ```

- 贴吧

  ```http
  https://unpkg.com/@waline/emojis@1.1.0/tieba
  ```

- Twitter Emoji

  - 表情:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-emoji
    ```

  ::: details 其他可用预设

  - 完整: (不推荐使用)

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw
    ```

  - 身体:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-body
    ```

  - 食物:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-food
    ```

  - 自然:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-natural
    ```

  - 对象:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-object
    ```

  - 符号:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-symbol
    ```

  - 人物:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-people
    ```

  - 运动:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-sport
    ```

  - 时间:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-time
    ```

  - 旅行:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-travel
    ```

  - 天气:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-weather
    ```

  - 旗帜:

    ```http
    https://unpkg.com/@waline/emojis@1.1.0/tw-flag
    ```

  :::

- 微博

  ```http
  https://unpkg.com/@waline/emojis@1.1.0/weibo
  ```

::: warning

Waline 不含有上述 Emoji 表情的任何版权，你需要自行承担使用风险。

:::

### 例子

```js
Waline.init({
  el: '#waline',
  serverURL: '<YOUR SERVER URL>',

  // 设置 emoji 为微博与哔哩哔哩
  emoji: [
    '//unpkg.com/@waline/emojis@1.1.0/weibo',
    '//unpkg.com/@waline/emojis@1.1.0/bilibili',
  ],
});
```

## 创建自己的预设

除了 Waline 提供的预设外，你可以创建自己的预设。

你需要将所有表情图片放置在一个可以访问的服务器文件夹上，之后在根目录创建 `info.json`，并设置如下选项:

- `name`: Emoji 名称

- `prefix` (可选的): Emoji 图片名称的通用前缀

  ::: tip 推荐

  当你设置了多个 Emoji 选项卡时，我们推荐你为同一个选项卡内的所有表情图片添加一个共用前缀，以防与其他 Emoji 缩写相冲突。

  :::

- `type` (可选的): 图片的类型，会用作图片的后缀名

  ::: tip

  表情包应该是一套相同大小相同文件格式的图片。如果你的确需要使用不同类型的图片，请将此项留空并在之后的两个选项中手动指定后缀名。

  :::

- `icon`: 选项卡包含的图标的图片名 (要求同 `items`)

- `items`: 数组，每项是图片不包含通用前缀的文件名 (不含扩展名)

  ::: tip

  数组的顺序既是表情排列的顺序。

  :::

### 例子

我们假设你有如下文件:

```
https://example.com/myemoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

你的 info.json 可设置为:

```json
{
  "name": "我的 Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

这样你就可以在 `emoji` 选项中添加 `'https://example.com/myemoji'` 作为一个预设。(是否带 `/` 后缀随意)

### 进阶

我们更推荐你将图片上传到一个 GitHub 仓库，这样你可以使用 [GithubRaw](https://githubraw.com/)，它可以把Raw链接转换为cdn，其格式为 `https://cdn.githubraw.com/user/repo/path/file`。    
当然，你也可以使用[cdn.jsdelivr.net](https://jsdelivr.com)，其格式为 `https://cdn.jsdelivr.net/gh/user/repo@version/file` 但当你发布版本后，将不会因图片调整而改变。    


::: warring

由于 cdn.jsdelivr.net 在国内受到污染，你可以将 `cdn.jsdelivr.net` 换成 `gcore.jsdelivr.net`

:::


::: tip

官方预设就使用了 [walinejs/emojis](https://github.com/walinejs/emojis) 的 `v1.1.0` 版本。

:::


## 使用配置对象

除了在图片文件夹下创建 `info.json` 来创建预设，你可以直接在 `emoji` 选项中直接添加配置对象。

配置对象的格式和 `info.json` 只有一点不同: 你应当额外添加 `folder` 选项为图片文件夹 (不应包含尾随 `/`)，以便 Waline 可以找到你的表情包。

### 例子

假设你有下列文件结构:

```
https://example.com/myemoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

你可以直接添加

```js
{
  name: "我的 Emoji",
  folder: "https://example.com/myemoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

至 `emoji` 选项作为一个配置项。

## 历史问题

### Valine 兼容

::: warning

Waline 提供了一个 legacy 版本，对 Valine 的 emoji 选项进行了兼容。

在 legacy 版本中，你可以使用 `emojiCDN` 设置 emoji 图片地址前缀，并使用 `emojiMaps` 设置表情 title 与图片的映射。

此兼容在 V2 正式版中已经移除，请尽快迁移到 `emoji` 选项。

:::

```js
Waline.init({
  el: '#waline',
  serverURL: '<YOUR SERVER URL>',

  // 设置 CDN, 如微博表情 CDN
  emojiCDN: 'https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/',
  // 表情 title 和图片映射
  emojiMaps: {
    smile: 'e3/2018new_weixioa02_org.png',
    lovely: '09/2018new_keai_org.png',
    // ... 更多表情
  },
});
```

### 样式问题

在历史版本中，由于 HTML 标签会被转义，Emoji 图片完全使用 Markdown 的图片语法，这导致历史版本的 Emoji 是由存粹的 `<img>` 标签进行渲染的。如果你使用了高清表情包，可能会产生显示大小问题。在 `@waline/client@0.16.0` 以后，表情 emoji 的大小被成功修复。

如果你需要对历史版本的 Emoji 表情大小进行适配，你可以使用 CSS 选择器做到这一点:

```css
/* 你需要把 `https://img.t.sinajs.cn` 换成自己的 CDN */
.wl-content img[src^="https://img.t.sinajs.cn"]
{
  width: 1.25em;
  margin: 0.25em;
  vertical-align: middle;
}
```
