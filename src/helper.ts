import { IRes, GlobalObject, IMatchCof, IStruct } from './type'
import { call } from './bridge'

const randomStr = () => Math.random().toString(36).substring(2)

/**
*suid(prefix: **String**) : **String***

Tool method for generating IFstruct-style unique IDs for components.

Parameter:

| parameters | default | description |
| ---------- | ------ | ---------------------------- |
| prefix | 'W' | The prefix of the ID.     |

Example:

```js
let id = PLUS.suid()

console.log(id)
```
*/
export function suid(prefix = 'W') {
  return (
    prefix +
    Math.round((Date.now() - new Date('2020/02/02').getTime()) / 1e3) +
    randomStr().substring(0, 3)
  )
}

/**
*pullStruct(path: **String**) : **Promise\<Object | Res\>***

After successful initialization, the **pullStruct** method can be used to get the IFstruct object of the current project after obtaining user authorization **CTTReadAccess** and **ModelsReadAccess** permissions.

Parameter:

| Parameters | Default | Description |
| ---------- | ------ | ---------------------------- |
| path | - | The path to the subproperties of the IFstruct object.     |

Example:

```js
let flag = await PLUS.withAccess([
  'CTTReadAccess',
  'ModelsReadAccess'
])

if (!flag) return PLUS.toast.warning('Insufficient permissions')

let id = 'Global'
let struct = await PLUS.pullStruct('CTT.T.HSS.' + id)
```

Returns the entire project tree structure when the path argument is **ALL**.
*/
export function pullStruct(path = 'CTT'): Promise<IRes | unknown> {
  return new Promise((done) => {
    call('DATA:GET', { path }, (data: IRes | unknown) => {
      done(data)
    })
  })
}

/**
*setStruct(path: **String**, value: **any**) : **Promise\<Res\>***

After successful initialization, the IFstruct object of the current project can be modified by the **setStruct** method with the user authorization **CTTWriteAccess** and **ModelsWriteAccess** permissions.

Parameter:

| Parameter | Default | Description |
| ---------- | ------ | ---------------------------- |
| path | - | The path to the subproperties of the IFstruct object.     |
| value | - | The value to assign to the target object's properties.     |

Example:

```js
let flag = await PLUS.withAccess([
  'CTTWriteAccess',
  'ModelsWriteAccess'
])

if (!flag) return PLUS.toast.warning('Insufficient permissions')

let id = 'Global'

await PLUS.setStruct(`CTT.T.HSS.${id}.lock`, true)
await PLUS.setStruct(`CTT.T.HSS.${id}`, {
  lock: false,
  content: 'base/photo'
})
```
*/
export function setStruct(path = 'CTT', value = {}): Promise<IRes> {
  return new Promise((done) => {
    call('DATA:SET', { path, payload: value }, (data: IRes) => {
      done(data)
    })
  })
}

/**
*getCurrentStyle() : **Promise\<Object | Res\>***

After successful initialisation, the **getCurrentStyle** method can be used to obtain the style object for the currently selected component state, provided that the user's authorisation **CTTReadAccess** permission has been obtained.

Parameter:

None.

Example:

```js
let flag = await PLUS.withAccess([
  'CTTReadAccess'
])

if (!flag) return PLUS.toast.warning('Insufficient permissions')

await PLUS.getCurrentStyle()
```
*/
export function getCurrentStyle(): Promise<GlobalObject> {
  return new Promise((done) => {
    call('DATA:GET_CURRENT_STYLE', { payload: {} }, (data: GlobalObject) => {
      done(data)
    })
  })
}

/**
*setCurrentStyle(payload: **Object**) : **Promise\<Res\>***

After successful initialisation, the style properties of the currently selected component state can be modified via the **setCurrentStyle** method, provided that the user's authorisation **CTTWriteAccess** permission has been obtained.

Parameter:

| Parameter | Default | Description |
| ---------- | ------ | ---------------------------- |
| payload  | { }  | The content of the assignment to the target object property.     |

Example:

```js
let flag = await PLUS.withAccess([
  'CTTWriteAccess'
])

if (!flag) return PLUS.toast.warning('Insufficient permissions')

await PLUS.setCurrentStyle({
  color: '#2c2c2c',
  width: '150px'
})
```
*/
export function setCurrentStyle(payload: GlobalObject): Promise<IRes> {
  return new Promise((done) => {
    call('DATA:SET_CURRENT_STYLE', { payload }, (data: IRes) => {
      done(data)
    })
  })
}

/**
*log(.. .arg: any[]) : **Promise\<Boolean\>***

This method is used to output extended debugging information in the iofod console.

Parameter:

| Arguments | Default | Description |
| ---------- | ------ | ---------------------------- |
| arg | - | Any parameter value.     |

Example:

```js
PLUS.log('foo', 'bar', 2333)
```
*/
export function log(...arg: unknown[]): Promise<boolean> {
  return new Promise((done) => {
    call('DEBUG:LOG', { value: [...arg] }, (data: boolean) => {
      done(data)
    })
  })
}

export function genStruct(tag: string, config: IMatchCof, hook = '') {
  let struct: IStruct = {
    tag,
  }

  if (config instanceof Object) {
    struct = {
      tag,
      value: '',
      ...config,
    }
  } else {
    struct.value = config
  }

  struct.hook = hook

  return struct
}
