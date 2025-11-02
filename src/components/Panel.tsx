import type { FC, PropsWithChildren } from 'hono/jsx'

export type PanelProps = PropsWithChildren<{
  title: string
  description?: string
  action?: JSX.Element | null
  padded?: boolean
}>

export const Panel: FC<PanelProps> = ({ title, description, action = null, padded = true, children }) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.8)]">
      <header className="flex flex-col gap-3 border-b border-white/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description ? <p className="text-sm text-slate-300">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className={padded ? 'px-6 py-5' : ''}>{children}</div>
    </section>
  )
}
