import { once } from './event'

const PLUS_TYPE = 'PLUS:'
const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
const uuid = () => {
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function call(type: string, payload: object, fn?: Function) {
  const id = uuid()

  postMessage({ type: PLUS_TYPE + type, payload, id })

  if (typeof fn == 'function') {
    once(id, fn)
  }

  return id //if use callback, just listen it
}
