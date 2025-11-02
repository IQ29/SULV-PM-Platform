import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { logger } from 'hono/logger'
import { Layout } from './components/Layout'
import { renderer } from './renderer'
import { apiRoutes } from './routes/api'
import { uiRoutes } from './routes/ui'
import type { Env } from './types/bindings'

const app = new Hono<Env>()

app.use('*', logger())
app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

app.route('/', uiRoutes)
app.route('/api', apiRoutes)

app.notFound((c) => {
  c.set('title', '页面不存在')
  c.set('subtitle', '我们没有找到对应的视图，请返回仪表盘继续工作。')
  return c.render(
    <Layout activePath={c.req.path} title={c.get('title')} subtitle={c.get('subtitle')}>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-200">
        <p className="text-sm">该页面暂不可用。</p>
        <a className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950" href="/">
          <i className="ri-arrow-left-line text-base" aria-hidden="true"></i>
          返回仪表盘
        </a>
      </div>
    </Layout>
  )
})

app.onError((err, c) => {
  console.error('Unhandled error', err)
  return c.json(
    {
      message: '服务器内部错误，请稍后重试。',
      error: err instanceof Error ? err.message : String(err)
    },
    500
  )
})

export default app
