// see https://quasar.dev/quasar-plugins/notify#example--custom-type
// where it says that overwriting styes is best done in the boot file

import { Notify } from 'quasar'

const $error = (message, caption) => {
  Notify.create({
    color: 'negative',
    position: 'bottom',
    message: message,
    caption: caption,
    icon: 'error'
  })
}

const $warn = (message, caption) => {
  Notify.create({
    color: 'warning',
    position: 'bottom',
    message: message,
    caption: caption,
    icon: 'report_problem'
  })
}

const $info = (message, caption) => {
  Notify.create({
    color: 'info',
    position: 'bottom',
    message: message,
    caption: caption,
    icon: 'info'
  })
}

const $success = (message, caption) => {
  Notify.create({
    color: '',
    position: 'bottom',
    message: message,
    caption: caption,
    icon: 'check_circle'
  })
}

const $ongoing = (message, caption) => {
  Notify.create({
    spinner: true,
    color: 'ongoing',
    position: 'bottom',
    message: message,
    caption: caption,
    icon: 'change_circle'
  })
}

export { $error, $warn, $info, $success, $ongoing }