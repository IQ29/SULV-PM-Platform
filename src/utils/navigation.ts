export type NavigationItem = {
  title: string
  description: string
  href: string
  icon: string
}

export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    description: '项目概览、AI 汇总与关键指标',
    href: '/',
    icon: 'ri-dashboard-line'
  },
  {
    title: 'Daily Logs',
    description: '现场日志、天气情况与进度记录',
    href: '/daily-logs',
    icon: 'ri-calendar-check-line'
  },
  {
    title: 'Tasks',
    description: '任务状态、负责人与优先级',
    href: '/tasks',
    icon: 'ri-task-line'
  },
  {
    title: 'Integrations',
    description: 'Gmail、Xero 等外部系统接入状态',
    href: '/integrations',
    icon: 'ri-plug-line'
  }
]
