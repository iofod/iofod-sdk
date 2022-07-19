import { GlobalObject, IStore, IConf } from './type'
import { call } from './bridge'

const store: IStore = {
  state: {},
}

function writeObj(obj: GlobalObject, paths: string, value: unknown) {
  return new Function(
    'obj',
    'obj.' + paths + '=' + JSON.stringify(value) + ';return obj'
  )(obj)
}

/**
*setState(patch: **Object**) : **Promise\<Function\<getState\>\>**

After successful initialization, the sub-properties of the application state object can be modified by the **setState** method.

Parameter:

| Parameters | Default | Description |
| ---------- | ------ | ---------------------------- |
| patch | { } | The key-value pair of the path and value of the sub-properties of the target application state object.     |

Example:

```js
await PLUS.init({
  state: {
    foo: {
      bar: 666
    },
    name: 'test'
  },
  persisted: false
})

await PLUS.setState({
  'name': 'test2',
  'foo.bar': 2333
})

```

Note that all state properties should be pre-configured, dynamic addition of properties is not supported, and it is recommended to keep the same data type before and after modifying the properties.
*/
export function setState(payload: GlobalObject, sync = true): boolean {
  try {
    for (const road in payload) {
      writeObj(store.state, road, payload[road])
    }

    if (sync) {
      call('STATE:SET', payload)
    }

    return true
  } catch (e) {
    console.warn(e)

    return false
  }
}
/**
*getState(key: **Object**) : **Promise\<any\>***

After successful initialization of the extended application state, the object of the application state should be taken over by PLUS with full authority, otherwise there may be problems with the state being unresponsive.

After successful initialization, the sub-properties of the application state object can be obtained by the **getState** method.

Parameter:

| parameter | default | description |
| ---------- | ------ | ---------------------------- |
| key | { } | The path to the subproperties of the application state object.     |

Example:

```js
let { Button } = PLUS.components

$ = await PLUS.init({
  state: {
    msg: 'Hello World',
  },
  persisted: false
})

// $ is a reference to the getState method
await PLUS.render([
  Button({
    value: $('msg')
  }, 'submit')
])

export function submit(e) {
  console.log($('msg'), PLUS.getState('msg'))
}
```
*/
export function getState(key: string | number) {
  return store.state[key]
}

let inited = false

/**

*init(config: **Object\<Options\>**) : **Promise<Function\<getState\>***

PLUS model initialization interface for setting the application state and cache of the expansion, which is required to be called for expansion initialization before using the SDK.

Parameter:

| Parameters | Default | Description |
| ---------- | ------ | ---------------------------- |
| config | { } | The base configuration of the extension.     |

Description of the **config** object parameters.

| parameters | default | description |
| ---------- | ------ | ---------------------------- |
| state | { } | The expanded application state object. | persisted
| persisted | false | Configures the extended application state persistence, if true, the version must be configured as well. |
| version | - | Configures the version of the extension, which is used to notify the system whether to refresh the application state of the extension when persisted is started. |
| size | 320 | Expanded display width, between 320 to 1280. |

Description of **getState** method.

Returns the **getState** method belonging to the SDK.

Example:

```js
$ = await PLUS.init({
  state: {
    isHold: false,
    name: '2333',
    foo: {
      bar: 666
    },
    tabType: 'tab1',
    useLoading: false
  },
  persisted: true,
  version: '1.0.0',
  size: 420
})
```
 */
export function init(config: IConf = {}) {
  const { state = {}, persisted } = config

  return new Promise((done) => {
    if (inited) {
      return done(getState)
    }
    call('STATE:INIT', config, (data: GlobalObject) => {
      if (persisted) {
        store.state = data
      } else {
        store.state = state
      }

      inited = true

      done(getState)
    })
  })
}

export function reinit() {
  inited = false

  return true
}

/**

*render(struct: **Array\<Component\>**) : **Promise\<Boolean\>***

This method is used to control the content rendered to the expansion interface.

Parameter:

| Parameters | Default | Description |
| ---------- | ------ | ---------------------------- |
| components | [ ] | The contents of the components to be rendered to the expanded interface.    | components

**components** is a PLUS.components object, usage can be found in: [Extension Components](https://doc.iofod.com/#/en/9/03.md).

Execution returns.

A flag for successful or failed rendering.

Example:

```js
let { Text } = PLUS.components

$ = await PLUS.init({
  state: {
    msg: 'World',
  },
  persisted: false
})

await PLUS.render([
  Text({
    value: 'Hello'
  }),
  Text({
    value: $('msg'),
    style: {
      fontSize: '18px'
    }
  })
])
```

*/
export function render(struct: []): Promise<boolean> {
  return new Promise((done) => {
    call('STRUCT:INIT', { struct }, (data: boolean) => {
      done(data)
    })
  })
}
