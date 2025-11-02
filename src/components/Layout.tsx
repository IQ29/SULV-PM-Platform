import type { FC, PropsWithChildren } from 'hono/jsx'
import { navigationItems } from '../utils/navigation'

export type LayoutProps = {
  title?: string
  subtitle?: string
  activePath: string
  actions?: JSX.Element | JSX.Element[] | null
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title = 'SULV Project Platform',
  subtitle,
  activePath,
  actions = null,
  children
}) => {
  const isActive = (href: string) =>
    href === '/' ? activePath === '/' : activePath.startsWith(href)

  return (
    <div className="min-h-screen bg-slate-950 font-[Inter] text-slate-100">
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-2xl text-sky-400">
              <i className="ri-community-line" aria-hidden="true"></i>
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-sky-400/80">
                SULV Group · Pioneering Project Excellence
              </p>
              <p className="text-lg font-semibold">Construction Intelligence Platform</p>
            </div>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm transition hover:text-sky-300 ${
                  isActive(item.href)
                    ? 'text-sky-300'
                    : 'text-slate-300'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <i className={`${item.icon} text-base`} aria-hidden="true"></i>
                <span>{item.title}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-100">Ian · Director</span>
            <span className="text-xs text-slate-400">SULV Group</span>
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">
              项目情报中心
            </p>
            <h1 className="mt-2 text-3xl font-semibold md:text-4xl">{title}</h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm text-slate-300">{subtitle}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
        </div>

        <div className="flex flex-col gap-8">{children}</div>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} SULV Group · All rights reserved.</span>
          <span>Solutions · Excellence · Pioneering</span>
        </div>
      </footer>
    </div>
  )
}
