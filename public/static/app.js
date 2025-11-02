document.addEventListener('DOMContentLoaded', () => {
  const log = (...args) => {
    if (typeof console !== 'undefined') {
      console.log('[SULV Platform]', ...args)
    }
  }

  log('界面已加载，准备就绪。')

  const syncButtons = document.querySelectorAll('[data-sync="gmail"]')
  syncButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.add('animate-pulse')
      log('触发 Gmail 同步（占位实现）。')
      setTimeout(() => button.classList.remove('animate-pulse'), 1800)
    })
  })
})
