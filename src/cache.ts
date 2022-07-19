import { GlobalObject } from './type'
import { call } from './bridge'

function pullCache(method: string, key: string): Promise<GlobalObject> {
  return new Promise((done) => {
    call(
      'CACHE:' + method,
      {
        key,
      },
      (e: GlobalObject) => {
        done(e)
      }
    )
  })
}

function callCache(
  method: string,
  key: string,
  value?: unknown
): Promise<boolean> {
  return new Promise((done) => {
    call(
      'CACHE:' + method,
      {
        key,
        value,
      },
      (e: boolean) => {
        done(e)
      }
    )
  })
}

/**
The cache object mounts common methods for expanding persistent data storage, divided into two parts: local storage and session storage.

1. expand local storage

You can use **getLocal/saveLocal/removeLocal** to store data locally for expansions.

* getLocal
* saveLocal
* removeLocal

2. Extending session storage

You can use **getSession/saveSession/removeSession** to store data sessions for extensions, and the storage expires when the browser session ends.

* getSession
* removeSession
* saveSession

*/
export const cache = {
  /**
  *getLocal(id: **String**) : **Promise\<Object\>***

  Gets the local storage object based on the ID.

  Parameter:

  | Parameters | Default | Description |
  | ---------- | ------ | ---------------------------- |
  | id | - | The unique ID of the local storage object. |

  Example:

  ```js
  let store = await PLUS.cache.getLocal('foo')

  console.log(store)
  ```
  */
  getLocal(key: string): Promise<GlobalObject> {
    return pullCache('getLocal', key)
  },
  /**
  *saveLocal(id: **String**, data: **Object**) : **Promise\<Boolean\>***

  Save an object to local storage.

  Parameter:

  | Parameter | Default | Description |
  | ---------- | ------ | ---------------------------- |
  | id | - | The unique ID of the local storage object. |
  | data | { } | The target storage object.     |

  Example:

  ```js
  await PLUS.cache.saveLocal('foo', { bar: 2333 })
  ```
  */
  saveLocal(key: string, value: unknown): Promise<boolean> {
    return callCache('saveLocal', key, value)
  },
  /**
  *removeLocal(id: **String**) : **Promise\<Boolean\>***

  Removes a local storage object.

  Parameter:

  | Parameters | Default | Description |
  | ---------- | ------ | ---------------------------- |
  | id | - | The unique ID of the local storage object. |

  Example:

  ```js
  await PLUS.cache.removeLocal('foo')
  ```
  */
  removeLocal(key: string): Promise<boolean> {
    return callCache('removeLocal', key)
  },
  /**
  *getSession(id: **String**) : **Promise\<Object\>***

  Gets the session storage object based on the ID.

  Parameter:

  | Parameters | Default | Description |
  | ---------- | ------ | ---------------------------- |
  | id | - | The unique ID of the session storage object. |

  Example:

  ```js
  let store = await PLUS.cache.getSession('foo')

  console.log(store)
  ```
  */
  getSession(key: string): Promise<GlobalObject> {
    return pullCache('getSession', key)
  },
  /**
  *saveSession(id: **String**, data: **Object**) : **Promise\<Boolean\>***

  Saves the object to the session store.

  Parameter:

  | Parameter | Default | Description |
  | ---------- | ------ | ---------------------------- |
  | id | - | The unique ID of the session store object. |
  | data | { } | The target storage object.     |

  Example:

  ```js
  await PLUS.cache.saveSession('foo', { bar: 2333 })
  ```
  */
  saveSession(key: string, value: unknown): Promise<boolean> {
    return callCache('saveSession', key, value)
  },
  /**
  *removeSession(id: **String**) : **Promise\<Boolean\>***

  Removes the session storage object.

  Parameter:

  | Parameters | Default | Description |
  | ---------- | ------ | ---------------------------- |
  | id | - | The unique ID of the session storage object. |

  Example:

  ```js
  await PLUS.cache.removeSession('foo')
  ```
  */
  removeSession(key: string): Promise<boolean> {
    return callCache('removeSession', key)
  },
}
