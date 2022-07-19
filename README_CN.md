# iofod-sdk

[![Version](https://img.shields.io/github/package-json/v/iofod/iofod-sdk)](https://github.com/iofod/iofod-sdk/)
[![NPM](https://img.shields.io/npm/v/iofod-sdk)](https://www.npmjs.com/package/iofod-sdk)
[![Build Status](https://img.shields.io/github/workflow/status/iofod/iofod-sdk/build)](https://github.com/iofod/iofod-sdk/actions)
[![License](https://img.shields.io/github/license/iofod/iofod-sdk)](https://github.com/iofod/iofod-sdk/blob/main/LICENSE.md)

iofod SDK 提供开发者在 Web worker 里与 iofod 主界面交互的能力，通过 SDK 来快速开发 iofod 拓展。详细文档请参考：[拓展 SDK](https://doc.iofod.cn/#/zh-cn/9/02)

## 开发准备

我们推荐使用 Node.js v16.15.0 版本进行 iofod 拓展开发，我们目前所有的拓展几乎都使用该版本。

### 安装

yarn 安装：

```bash
yarn add iofod-sdk -D
```

npm 安装：

```bash
npm install iofod-sdk -D
```

### 使用

正式环境下，开发者无需额外引入 SDK 文件，拓展在 iofod 里初始化过程中自动执行加载 SDK 并挂载到全局变量 PLUS 上。

本地开发调试建议通过这种方式使用 SDK：

```js
import * as PLUS from 'iofod-sdk'
```

## 拓展的样板

所有拓展都应该具备初始化入口 **main** 函数，在 **main** 函数体里执行 SDK 初始化和拓展界面渲染。

示例：

```js
export async function main() {
  await PLUS.init({
    state: { ... },
    version: '1.0.0'
  });

  await PLUS.render([...]);
}
```

## 拓展内置组件

iofod 拓展的界面通过拓展组件来绘制并实现拓展与用户交互。可以参考[使用说明](https://doc.iofod.cn/#/zh-cn/9/03)

结合拓展 SDK 和内置组件，我们很容易就能开发一个拓展，利用 iofod 里的拓展能力，为项目提供更多的定制性，发掘更多可能。

示例：

```js
const { Button } = PLUS.components

export async function main() {
  await PLUS.init({
    state: {
      msg: 'click me!',
      showMsg: false,
    },
    version: '1.0.0',
  })

  await PLUS.render([
    Button('$msg', 'clickBinding'),
    Text({
      render: '$showMsg',
      value: 'QAQ',
    }),
  ])
}

export async function clickBinding(e) {
  console.log(e)

  PLUS.setState({
    showMsg: true,
  })
}
```

## 更多

更多内容请阅读[官方文档](https://doc.iofod.cn/#/zh-cn/9/01)获取，模板和案例可以参考[官方开源库](https://github.com/iofod/iofod-extensions)。

## 许可证

[BSD 3-Clause](https://github.com/iofod/iofod-sdk/blob/main/LICENSE.md)

Copyright (c) 2021-present, iofod.
