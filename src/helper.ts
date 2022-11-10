import { IRes, GlobalObject, IMatchCof, IStruct, IModelTooltip, IModelHelper } from './type'
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
\*registerModelHelper(payload: **IModelHelper**) : **Promise\<Res\>\***

The **registerModelHelper** method sets the controls for editing model variables, providing a better user experience for the editing of custom model variables.

Parameter:

| Parameters | Default | Description                           |
| ---------- | ------- | ------------------------------------- |
| payload    | { }     | Configuration content `IModelHelper`. |

**IModelHelper** Parameter:

| Parameter | Default | Description                                                      |
| --------- | ------- | ---------------------------------------------------------------- |
| config    | -       | Control configuration `IHelperSelectConf` or `IHelperSliderConf` |
| force     | false   | Force the override configuration                                 |

**IHelperSliderConf** Parameter:

| Parameter | Default | Description                                                                                           |
| --------- | ------- | ----------------------------------------------------------------------------------------------------- |
| type      | -       | The namespace to configure the control.                                                               |
| use       | -       | The type of the control.                                                                              |
| default   | -       | The default value to use when creating a new model variable of this type.                             |
| range     | -       | The range of the slider control, `range[0]` is the minimum value and `range[1]` is the maximum value. |
| step      | -       | The step length of the slider control.                                                                |

Example:

```js
await PLUS.registerModelHelper({
  config: {
    type: "iofod/slider",
    use: "Slider",
    range: [0, 100],
    step: 2,
    default: 0,
  },
  force: false,
});
```

**IHelperSelectConf** Parameter:

| Parameters | Default | Description                                                               |
| ---------- | ------- | ------------------------------------------------------------------------- |
| type       | -       | The namespace to configure the control.                                   |
| use        | -       | The type of the control.                                                  |
| default    | -       | The default value to use when creating a new model variable of this type. |
| options    | -       | The options value configuration for the drop-down selection control.      |
| labels     | -       | The option text configuration for the drop-down selection control.        |
| filterable | -       | Controls the filtering of the options.                                    |

Example:

```js
await PLUS.registerModelHelper({
  config: {
    type: "iofod/select",
    use: "Select",
    options: ["1", "2", "3"],
    labels: ["P1", "P2", "P3"],
    filterable: true,
    default: 0,
  },
  force: false,
});
```

Once successfully invoked, simply add the **helper** field to the model variable configuration and reference the new namespace to display the corresponding control when editing the model variable.

```json
"yourModel": {
  "value": 0,
  "subscribe": "",
  "ZI": 0,
  "helper": "iofod/slider",
}
```
*/
export function registerModelHelper(payload: IModelHelper): Promise<IRes> {
  return new Promise((done) => {
    call('UI:REGISTER_MODEL_HELPER', { payload }, (data: IRes) => {
      done(data)
    })
  })
}

/**
\*registerModelTooltip(payload: **IModelTooltip**) : **Promise\<Res\>\***

After successful initialisation, comment references to template variables are set via the **registerModelTooltip** method to improve the readability of the template variable configuration.

Parameter:

| Parameters | Default | Description                            |
| ---------- | ------- | -------------------------------------- |
| payload    | { }     | Configuration content `IModelTooltip`. |

**IModelTooltip** Parameter:

| 参数   | 默认值 | 说明                                      |
| ------ | ------ | ----------------------------------------- |
| config | -      | Comment configuration `IModelTooltipConf` |
| force  | false  | Force the override configuration          |

**IModelTooltipConf** Parameter:

| Parameters | Default | Description                                |
| ---------- | ------- | ------------------------------------------ |
| type       | -       | The namespace to configure the annotation. |
| i18n       | -       | The annotated i18n configuration.          |

Example:

```js
await PLUS.registerModelTooltip({
  config: {
    type: "iofod/tip1",
    i18n: {
      en: "This is a test tip",
    },
  },
  force: false,
});
```

Once successfully invoked, simply add the **tip** field to the model variable configuration and the corresponding comment will be displayed when the mouse pointer is moved over the model variable.

```json
"yourModel": {
  "value": 0,
  "subscribe": "",
  "ZI": 0,
  "tip": "iofod/tip1"
}
```
*/
export function registerModelTooltip(payload: IModelTooltip): Promise<IRes> {
  return new Promise((done) => {
    call('UI:REGISTER_MODEL_TOOLTIP', { payload }, (data: IRes) => {
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
