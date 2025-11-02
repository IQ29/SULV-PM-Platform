import { Hono } from 'hono'
import { Layout } from '../../components/Layout'
import { Panel } from '../../components/Panel'
import { mockProject, mockTasks } from '../../data/mock'
import type { Env } from '../../types/bindings'

const statusOrder = ['Not Started', 'In Progress', 'Review', 'Complete'] as const
const statusLabel: Record<(typeof statusOrder)[number], string> = {
  'Not Started': '未开始',
  'In Progress': '执行中',
  Review: '待复核',
  Complete: '已完成'
}

export const taskRoutes = new Hono<Env>()

taskRoutes.get('/', (c) => {
  c.set('title', `${mockProject.codeName} · 任务中心`)
  c.set('subtitle', '跨部门任务统一管理，追踪优先级、责任人与计划节点，支撑 AI 自动提醒。')

  const grouped = statusOrder.map((status) => ({
    status,
    tasks: mockTasks.filter((task) => task.status === status)
  }))

  const actions = (
    <>
      <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-100 transition hover:border-sky-500/60 hover:text-sky-300">
        <i className="ri-sliders-2-line text-base" aria-hidden="true"></i>
        筛选
      </button>
      <button className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-950 transition hover:bg-sky-400">
        <i className="ri-add-line text-base" aria-hidden="true"></i>
        新建任务
      </button>
    </>
  )

  return c.render(
    <Layout title={c.get('title')} subtitle={c.get('subtitle')} activePath={c.req.path} actions={actions}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {grouped.map(({ status, tasks }) => (
          <section key={status} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_40px_80px_-60px_rgba(14,23,42,0.8)]">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{statusLabel[status]}</p>
                <h2 className="text-lg font-semibold text-white">{tasks.length} 项</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {status}
              </span>
            </header>
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/20 bg-transparent p-4 text-xs text-slate-500">
                  无任务
                </div>
              ) : (
                tasks.map((task) => (
                  <article key={task.id} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-white">{task.title}</h3>
                        <p className="mt-1 text-xs text-slate-300">负责人：{task.owner}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          task.priority === '高'
                            ? 'bg-rose-500/20 text-rose-200'
                            : task.priority === '中'
                            ? 'bg-amber-500/20 text-amber-200'
                            : 'bg-emerald-500/20 text-emerald-200'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-slate-300">{task.notes}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <i className="ri-calendar-line text-sm" aria-hidden="true"></i>
                        截止：{task.due}
                      </span>
                      {task.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          <i className="ri-bookmark-line text-sm" aria-hidden="true"></i>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        ))}
      </div>

      <Panel title="近期关键节点" description="自动从任务与每日记录生成项目时间轴。">
        <ul className="space-y-4 text-sm text-slate-200">
          {mockTasks.slice(0, 3).map((task) => (
            <li key={task.id} className="flex items-start gap-4">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400"></div>
              <div>
                <p className="font-semibold text-white">{task.title}</p>
                <p className="text-xs text-slate-400">负责人：{task.owner}</p>
                <p className="mt-1 text-xs text-amber-300">截止日期：{task.due}</p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </Layout>
  )
})
