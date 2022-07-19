/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const { BroadcastChannel } = require('node:worker_threads')

import * as PLUS from '../src/index'

// The BroadcastChannel API for Nodejs is essentially the same as the Web and works perfectly within the SDK
// See: https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
global.BroadcastChannel = BroadcastChannel

const appid = 'jest'
const BcList: IBc = {}
const Res = { code: 0, data: {}, msg: '' }

PLUS.setContext(appid)

interface IBc {
  [key: string]: BroadcastChannel
}

function triggerCustomEvent(
  eventName: string,
  payload: unknown,
  useGlobal = false
) {
  const bid = useGlobal ? eventName : appid + ':' + eventName

  let bc: BroadcastChannel

  if (BcList[bid]) {
    bc = BcList[bid]
  } else {
    bc = new BroadcastChannel(bid)

    BcList[bid] = bc
  }

  bc.postMessage(payload)

  return bc
}

// Simulates web worker communication
global.postMessage = function (conf: {
  type: string
  payload: any
  id: string
}) {
  const { type, payload, id } = conf
  const key = type.substring(5)

  setTimeout(() => {
    switch (key) {
      case 'test':
        triggerCustomEvent(id, 'test')

        break

      case 'ACCESS:CHECK':
        if (payload.ql == 'true') {
          triggerCustomEvent(id, true)
        }
        if (payload.ql == 'ALL') {
          triggerCustomEvent(id, ['CTTReadAccess'])
        }

        break

      case 'ACCESS:REQUEST':
        if (payload.list.includes('root')) {
          triggerCustomEvent(id, { code: 4, data: {}, msg: 'error' })
        } else {
          triggerCustomEvent(id, Res)
        }

        break

      case 'DATA:SET':
      case 'DATA:SET_CURRENT_STYLE':
        triggerCustomEvent(id, Res)

        break

      case 'CACHE:getLocal':
      case 'CACHE:getSession':
      case 'DATA:GET':
        triggerCustomEvent(id, { flag: true })

        break
      case 'CACHE:saveLocal':
      case 'CACHE:removeLocal':
      case 'CACHE:saveSession':
      case 'CACHE:removeSession':
      case 'DEBUG:LOG':
      case 'STRUCT:INIT':
        triggerCustomEvent(id, true)

        break

      case 'DATA:GET_CURRENT_STYLE':
        triggerCustomEvent(id, { overflow: 'auto' })

        break

      case 'STATE:INIT':
        triggerCustomEvent(id, {})

        break

      case 'STATE:SET':
        PLUS.off(id)

        break

      default:
        break
    }
  }, 17)
}

describe('event', () => {
  it('event', (done) => {
    let hanndle: BroadcastChannel

    hanndle = triggerCustomEvent('main', 'hello')

    PLUS.on('testEvent', (res: any) => {
      expect(res).toEqual('foo')

      hanndle.close()

      setTimeout(() => {
        PLUS.off('testEvent')

        done()
      }, 100)
    })

    const callback = (res: any) => {
      expect(res).toEqual('foo')

      PLUS.off('testEvent', callback)
    }

    PLUS.on('testEvent', callback)
    PLUS.on('testEvent')

    hanndle = triggerCustomEvent('testEvent', 'foo')

    PLUS.on('EditorRedo', (res: any) => {
      expect(res).toEqual('bar')

      PLUS.off('EditorRedo')
    })

    hanndle = triggerCustomEvent('EditorRedo', 'bar', true)
  })
})

describe('bridge', () => {
  it('bridge.call', (done) => {
    PLUS.call('test', {}, function (res: any) {
      expect(res).toEqual('test')

      done()
    })
  })
})

describe('access', () => {
  it('access.checkAccess', (done) => {
    PLUS.checkAccess('true').then((res) => {
      expect(res).toEqual(true)

      done()
    })

    PLUS.checkAccess('').then((res) => {
      expect(res).toEqual(false)

      done()
    })
  })

  it('access.checkAccessList', (done) => {
    PLUS.checkAccessList().then((res) => {
      expect(res[0]).toEqual('CTTReadAccess')

      done()
    })
  })

  it('access.requestAccess', (done) => {
    PLUS.requestAccess(['CTTReadAccess']).then((res) => {
      expect(res.code).toEqual(0)

      PLUS.requestAccess().then((res) => {
        expect(res.code).toEqual(0)

        done()
      })
    })
  })

  it('access.withAccess', (done) => {
    PLUS.withAccess(['CTTReadAccess']).then((res) => {
      expect(res).toEqual(true)

      PLUS.withAccess().then((res) => {
        expect(res).toEqual(true)

        PLUS.withAccess(['root']).then((ban) => {
          expect(ban).toEqual(false)

          PLUS.withAccess(['ModelsReadAccess']).then((ban) => {
            expect(ban).toEqual(true)

            done()
          })
        })
      })
    })
  })
})

describe('cache', () => {
  it('cache.getLocal', (done) => {
    PLUS.cache.getLocal('foo').then((res) => {
      expect(res.flag).toEqual(true)

      done()
    })
  })
  it('cache.saveLocal', (done) => {
    PLUS.cache.saveLocal('foo', 'bar').then((res) => {
      expect(res).toEqual(true)

      done()
    })
  })
  it('cache.removeLocal', (done) => {
    PLUS.cache.removeLocal('foo').then((res) => {
      expect(res).toEqual(true)

      done()
    })
  })
  it('cache.getSession', (done) => {
    PLUS.cache.getSession('foo').then((res) => {
      expect(res.flag).toEqual(true)

      done()
    })
  })
  it('cache.saveSession', (done) => {
    PLUS.cache.saveSession('foo', 'bar').then((res) => {
      expect(res).toEqual(true)

      done()
    })
  })
  it('cache.removeSession', (done) => {
    PLUS.cache.removeSession('foo').then((res) => {
      expect(res).toEqual(true)

      done()
    })
  })
})

describe('helper', () => {
  it('helper.suid', () => {
    expect(typeof PLUS.suid()).toEqual('string')
  })

  it('helper.pullStruct', (done) => {
    PLUS.pullStruct('CTT.T.HSS.Global').then((res) => {
      expect((res as any).flag).toEqual(true)

      PLUS.pullStruct().then((res) => {
        expect((res as any).flag).toEqual(true)

        done()
      })
    })
  })

  it('helper.setStruct', (done) => {
    PLUS.setStruct('CTT.T.HSS.Global', {
      lock: false,
      content: 'base/photo',
    }).then((res) => {
      expect(res.code).toEqual(0)

      done()
    })

    PLUS.setStruct().then((res) => {
      expect(res.code).toEqual(0)

      done()
    })
  })

  it('helper.getCurrentStyle', (done) => {
    PLUS.getCurrentStyle().then((res) => {
      expect(res.overflow).toEqual('auto')

      done()
    })
  })

  it('helper.setCurrentStyle', (done) => {
    PLUS.setCurrentStyle({
      color: '#2c2c2c',
      width: '150px',
    }).then((res) => {
      expect(res.code).toEqual(0)

      done()
    })
  })

  it('helper.log', (done) => {
    PLUS.log({
      params1: 'params1',
      params2: 'params2',
    }).then((res) => {
      expect(res).toEqual(true)

      done()
    })
  })

  it('helper.genStruct', () => {
    expect(
      PLUS.genStruct('Text', {
        value: 'Text',
      }).tag
    ).toEqual('Text')
  })
})

describe('state', () => {
  it('state.getState', () => {
    expect(PLUS.getState('test')).toEqual(undefined)
  })

  it('state.setState', () => {
    expect(
      PLUS.setState(
        {
          name: 'bar',
        },
        false
      )
    ).toEqual(true)

    expect(
      PLUS.setState({
        bar: 2333,
      })
    ).toEqual(true)

    expect(
      PLUS.setState(
        {
          'foo.cg': false,
        },
        false
      )
    ).toEqual(false)

    expect(PLUS.getState('name')).toEqual('bar')
    expect(PLUS.getState('bar')).toEqual(2333)
  })

  it('state.init', async () => {
    const res = await PLUS.init({
      state: {
        foo: 'bar',
      },
      persisted: false,
    })

    expect(res).toEqual(PLUS.getState)
    expect(PLUS.getState('foo')).toEqual('bar')

    const res2 = await PLUS.init({
      state: {
        foo: 'done',
      },
      persisted: false,
    })

    expect(res2).toEqual(PLUS.getState)
    expect(PLUS.getState('foo')).toEqual('bar')
    expect(PLUS.reinit()).toEqual(true)

    await PLUS.init({
      persisted: true,
    })

    const res3 = await PLUS.init()

    expect(res3).toEqual(PLUS.getState)

    await PLUS.init({
      state: {
        foo: 'error',
      },
      persisted: true,
    })

    expect(PLUS.getState('foo')).toEqual(undefined)
  })

  it('state.render', async () => {
    const res = await PLUS.render([])

    expect(res).toEqual(true)
  })
})

describe('toast', () => {
  it('toast.success', () => {
    expect(PLUS.toast.success('success')).toEqual(undefined)
  })
  it('toast.error', () => {
    expect(PLUS.toast.error('error')).toEqual(undefined)
  })
  it('toast.info', () => {
    expect(PLUS.toast.info('info')).toEqual(undefined)
  })
  it('toast.warning', () => {
    expect(PLUS.toast.warning('warning')).toEqual(undefined)
  })
  it('toast.log', () => {
    expect(PLUS.toast.log('log')).toEqual(undefined)
  })
})

afterAll((done) => {
  Promise.all(
    Object.keys(BcList).map((bid) => {
      return BcList[bid].close()
    })
  ).then(() => done())
})
