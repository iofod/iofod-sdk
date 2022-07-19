import { call } from './bridge'

/**
The toast object mounts common methods for extending message notifications to users.
*/
export const toast = {
  /**
  *success(message: **String**) : **Promise***

  Parameter:

  | parameter | default | description |
  | ---------- | ------ | ---------------------------- |
  | message | - | The content of the message notification.     |

  Example:

  ```js
  PLUS.toast.success('Done!')
  ```
  */
  success(message: string): void {
    call('UI:TOAST', { type: 'success', message })
  },
  /**
  *error(message: **String**) : **Promise***

  Parameter:

  | parameter | default | description |
  | ---------- | ------ | ---------------------------- |
  | message | - | The content of the message notification.     |

  Example:

  ```js
  PLUS.toast.error('Something wrong!')
  ```
  */
  error(message: string): void {
    call('UI:TOAST', { type: 'error', message })
  },
  /**
  *info(message: **String**) : **Promise***

  Parameter:

  | parameter | default | description |
  | ---------- | ------ | ---------------------------- |
  | message | - | The content of the message notification.     |

  Example:

  ```js
  PLUS.toast.info('Your new message...')
  ```
  */
  info(message: string): void {
    call('UI:TOAST', { type: 'info', message })
  },
  /**
  *warning(message: **String**) : **Promise***

  Parameter:

  | parameters | default | description |
  | ---------- | ------ | ---------------------------- |
  | message | - | The content of the message notification.     |

  Example:

  ```js
  PLUS.toast.warning('Warning')
  ```
  */
  warning(message: string): void {
    call('UI:TOAST', { type: 'warning', message })
  },
  /**
  *log(message: **String**) : **Promise***

  Parameter:

  | parameters | default | description |
  | ---------- | ------ | ---------------------------- |
  | message | - | The content of the message notification.     |

  Example:

  ```js
  PLUS.toast.log('print messages')
  ```
  */
  log(message: string): void {
    call('UI:TOAST', { type: 'log', message })
  },
}
