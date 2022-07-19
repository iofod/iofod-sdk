# iofod-sdk

English | [简体中文](./README_CN.md)

The iofod SDK provides developers with the ability to interact with the main iofod interface within the Web worker, enabling rapid development of iofod extensions through the SDK. For detailed documentation please refer to: [Extension SDK](https://doc.iofod.com/#/en/9/02).

## Development Preparation

We recommend using Node.js v16.15.0 for iofod extension development, which is the version we currently use for almost all of our extensions.

### Installation

yarn installation.

```bash
yarn add iofod-sdk -D
```

npm install.

```bash
npm install iofod-sdk -D
```

### Use

In a formal environment, the developer does not need to introduce additional SDK files, the expansion is automatically executed during initialization in iofod by loading the SDK and mounting it on the global variable PLUS.

Local development and debugging is recommended to use the SDK in this way:

```js
import * as PLUS from 'iofod-sdk'
```

## Sample extensions

All extensions should have an initialisation entry **main** function, where the SDK initialisation and extension interface rendering is performed in the **main** function body.

For Example:

```js
export async function main() {
  await PLUS.init({
    state: { ... },
    version: '1.0.0'
  });

  await PLUS.render([...]);
}
```

## Extension built-in components

The interface of the iofod extension is drawn and the extension interacts with the user via extension components. This can be found in the [Instructions for use](https://doc.iofod.com/#/en/9/03)

By combining the extension SDK and the built-in components, it is easy to develop an extension that takes advantage of the extension capabilities within iofod to provide more customisation and explore more possibilities for the project.

For Example:

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

## more

For more content, please read the [official documentation](https://doc.iofod.com/#/en/9/01) for more information. Templates and examples can be found in the official [Fang Open Source Library](https://github.com/iofod/iofod-extensions).
