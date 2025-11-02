import { Hono } from 'hono'
import { Layout } from '../../components/Layout'
import { Panel } from '../../components/Panel'
import { mockIntegrations, mockProject } from '../../data/mock'
import type { Env } from '../../types/bindings'

const statusBadge: Record<'connected' | 'coming-soon', { label: string; className: string }> = {
  connected: {
    label: '已连接',
    className: 'bg-emerald-500/20 text-emerald-200'
  },
  'coming-soon': {
    label: '即将上线',
    className: 'bg-slate-500/20 text-slate-200'
  }
}

export const integrationRoutes = new Hono<Env>()

integrationRoutes.get('/', (c) => {
  c.set('title', `${mockProject.codeName} · 集成中心`)
  c.set('subtitle', '集中管理 Gmail、OpenAI 等关键集成，并预留 Xero 财务数据接入。')

  const actions = (
    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-100 transition hover:border-sky-500/60 hover:text-sky-300">
      <i className="ri-shield-keyhole-line text-base" aria-hidden="true"></i>
      管理密钥
    </button>
  )

  return c.render(
    <Layout title={c.get('title')} subtitle={c.get('subtitle')} activePath={c.req.path} actions={actions}>
      <Panel
        title="系统集成状态"
        description="所有集成均通过 Cloudflare Secrets 管理凭据，可一键刷新授权。"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {mockIntegrations.map((integration) => (
            <article key={integration.name} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-xl text-sky-400">
                    <i className={integration.icon} aria-hidden="true"></i>
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{integration.name}</h3>
                    <p className="text-xs text-slate-400">{integration.description}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[integration.status].className}`}>
                  {statusBadge[integration.status].label}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-300">
                <span>最后更新 · 2025-11-02 07:30</span>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-slate-200 transition hover:border-sky-400/60 hover:text-sky-200">
                  <i className="ri-arrow-go-forward-line text-sm" aria-hidden="true"></i>
                  {integration.actionLabel}
                </button>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel
        title="授权指引"
        description="OAuth 回调 URI 与 Cloudflare Secret 管理说明"
      >
        <div className="space-y-4 text-sm text-slate-200">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">Gmail OAuth</h4>
            <p className="mt-2 text-slate-300">
              请在 Google Cloud Console 中添加以下授权回调（开发 / 生产环境）：
            </p>
            <ul className="mt-2 space-y-2 text-xs text-slate-400">
              <li>https://sulv-construction.pages.dev/api/gmail/callback</li>
              <li>https://main.sulv-construction.pages.dev/api/gmail/callback</li>
              <li>https://3000-i92dnt0feomwv06peai2m-18e660f9.sandbox.novita.ai/api/gmail/callback</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">OpenAI</h4>
            <p className="mt-2 text-slate-300">
              通过 Cloudflare Pages Secret 管理 <code className="rounded bg-slate-900 px-1 py-0.5">OPENAI_API_KEY</code>，保障密钥安全。
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">Xero（占位）</h4>
            <p className="mt-2 text-slate-300">
              Xero API 集成将在下一阶段启用，页面已预留同步模块与卡片展示位。
            </p>
          </div>
        </div>
      </Panel>
    </Layout>
  )
})
