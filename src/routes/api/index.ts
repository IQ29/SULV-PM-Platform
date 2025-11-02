import { Hono } from 'hono'
import type { Env } from '../../types/bindings'

export const apiRoutes = new Hono<Env>()

apiRoutes.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    project: 'SULV Project Platform'
  })
})

apiRoutes.get('/gmail/sync', (c) => {
  return c.json(
    {
      message: 'Gmail 同步功能将在下一步实现。请先完成 OAuth 授权与 Secret 配置。'
    },
    202
  )
})

apiRoutes.get('/reports/weekly', (c) => {
  return c.json(
    {
      message: 'AI 周报生成接口占位，待 OpenAI 集成后上线。'
    },
    202
  )
})

export default apiRoutes
