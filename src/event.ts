import { IFnListObject, IBcObject } from './type'

let appid: string

const handles: IFnListObject = {}
const channels: IBcObject = {}
const GlobalMethods = [
  'EditorUndo',
  'EditorRedo',
  'EditorPreview',
  'EditorExitPreview',
]

/**
*on(event: **String**, callback: **Function**) : **void***

After successful initialization, you can listen to the event data sent to the expansion by iofod through the **on** method.

Parameter:

| parameter | default | description |
| ---------- | ------ | ---------------------------- |
| event | - | The name of the event.     | callback
| callback | - | The function to receive the event callback.  |

Example:

```js
PLUS.on('UpdateTree', res => {
  console.log(res)
})
```

For supported events, please see: [Extension Available Events](https://doc.iofod.com/#/en//9/04.md)
*/
// eslint-disable-next-line @typescript-eslint/ban-types
export function on(event: string, fn?: Function) {
  if (typeof fn != 'function') return

  if (handles[event]) {
    handles[event].push(fn)
  } else {
    handles[event] = [fn]
  }

  if (!channels[event]) {
    const eventName = GlobalMethods.includes(event)
      ? event
      : appid + ':' + event
    // postMessage to others
    channels[event] = new BroadcastChannel(eventName)
    channels[event].onmessage = (e) => {
      handles[event].forEach((fn) => {
        fn(e.data)
      })
    }
  }
}

/**
*off(event: **String**) : **void***

The **off** method is used to cancel the iofod event being listened to.

Parameter:

| Parameters | Default | Description |
| ---------- | ------ | ---------------------------- |
| event | - | The name of the event.     |

Example:

```js
PLUS.off('UpdateTree')
```
*/
// eslint-disable-next-line @typescript-eslint/ban-types
export function off(event: string, fn?: Function) {
  if (!handles[event]) return

  if (typeof fn == 'function' && handles[event].includes(fn)) {
    handles[event].splice(handles[event].indexOf(fn), 1)

    if (!handles[event].length) {
      channels[event].close()
    }
  } else {
    delete handles[event]

    channels[event].close()

    delete channels[event]
  }
}

/**
*once(event: **String**, callback: **Function**) : **void***

After successful initialization, you can listen to the event data sent to the expansion by iofod only once through the **once** method, which is equivalent to canceling the listened event immediately after the callback is triggered through the **on** method.

Parameter:

| Parameters | Default | Description |
| ---------- | ------ | ---------------------------- |
| event | - | The name of the event.     |
| callback | - | The function to receive the event callback.  |

Example:

```js
PLUS.once('UpdateTree', res => {
  console.log(res)
})
```
*/
// eslint-disable-next-line @typescript-eslint/ban-types
export function once(event: string, fn: Function) {
  const callback = (e: unknown) => {
    fn(e)

    setTimeout(() => {
      off(event, callback)
    }, 0)
  }

  on(event, callback)
}

/**

*/
// set namespace
export function setContext(param: string) {
  if (!appid) {
    appid = param
  }
}
