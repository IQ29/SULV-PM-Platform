import { Hono } from 'hono'
import type { Env } from '../../types/bindings'
import { dashboardRoutes } from './dashboard'
import { dailyLogRoutes } from './daily-logs'
import { integrationRoutes } from './integrations'
import { taskRoutes } from './tasks'

export const uiRoutes = new Hono<Env>()

uiRoutes.route('/', dashboardRoutes)
uiRoutes.route('/daily-logs', dailyLogRoutes)
uiRoutes.route('/tasks', taskRoutes)
uiRoutes.route('/integrations', integrationRoutes)

export default uiRoutes
