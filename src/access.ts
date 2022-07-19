import { IRes } from './type'
import { call } from './bridge'

/**
*checkAccess(access: **String**) : **Promise\<Boolean\>***

After successful initialization, the **checkAccess** method can be used to check if a permission is included in the user's authorized permission list.

Parameter:

| Parameters | Default | Description |
| ---------- | ------ | ---------------------------- |
| access | - | Permission name.     |

Example:

```js
let flag = await PLUS.checkAccess('CTTWriteAccess')

if (!flag) return PLUS.toast.warning('insufficient permission')
```
*/
export function checkAccess(ql: string): Promise<string[] | boolean> {
  return new Promise((done) => {
    if (!ql) return done(false)

    call('ACCESS:CHECK', { ql }, (data: string[] | boolean) => {
      done(data)
    })
  })
}

/**
*checkAccessList() : **Promise\<Array\>**

After successful initialization, the **checkAccessList** method can be used to get the currently authorized user permissions.

Parameter description: None

Example:

```js
let list = await PLUS.checkAccessList()

console.log(list)
```
*/
export function checkAccessList(): Promise<string[]> {
  return new Promise((done) => {
    call('ACCESS:CHECK', { ql: 'ALL' }, (data: string[]) => {
      done(data)
    })
  })
}

/**
*requestAccess(accessList: **Array\<String\>**) : **Promise\<Res\>***

After successful initialization, user authorization permission can be requested via the **requestAccess** method.

Parameter:

| Parameter | Default | Description |
| ---------- | ------ | ---------------------------- |
| accessList | [ ] | The permission list.     |

Example:

```js
await PLUS.requestAccess([
  'CTTReadAccess',
  'CTTWriteAccess',
  'ModelsReadAccess',
  'ModelsWriteAccess'
])
```
*/
export function requestAccess(list: string[] = []): Promise<IRes> {
  return new Promise((done) => {
    call('ACCESS:REQUEST', { list }, (data: IRes) => {
      done(data)
    })
  })
}

/**
*withAccess(accessList: **Array\<String\>**) : **Promise\<Boolean\>***

After successful initialization, the **withAccess** method can be used to request the user to authorize permissions, returning the result of whether the user authorizes all the permissions contained in the list.

Parameter:

| Parameter | Default | Description |
| ---------- | ------ | ---------------------------- |
| accessList | [ ] | The list of permissions.     |

Example:

```js
let flag = await PLUS.withAccess([
  'CTTReadAccess',
  'CTTWriteAccess',
  'ModelsReadAccess',
  'ModelsWriteAccess'
])

if (!flag) return PLUS.toast.warning('Insufficient permissions')
```
*/
export async function withAccess(list: string[] = []): Promise<boolean> {
  const accessList: string[] = await checkAccessList()

  if (list.every((access) => accessList.includes(access))) {
    return true
  }

  const res = await requestAccess(list)

  if (res.code == 0) {
    return true
  }

  return false
}
