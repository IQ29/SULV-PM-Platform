import type { FC } from 'hono/jsx'

export type StatCardProps = {
  label: string
  value: string
  icon?: string
  trend?: {
    value: string
    direction: 'up' | 'down' | 'flat'
  }
  helper?: string
}

export const StatCard: FC<StatCardProps> = ({ label, value, trend, icon, helper }) => {
  const trendClasses =
    trend?.direction === 'up'
      ? 'text-emerald-400'
      : trend?.direction === 'down'
      ? 'text-rose-400'
      : 'text-slate-400'

  const trendIcon =
    trend?.direction === 'up'
      ? 'ri-arrow-up-line'
      : trend?.direction === 'down'
      ? 'ri-arrow-down-line'
      : 'ri-subtract-line'

  return (
    <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-300">{label}</p>
        {icon ? <i className={`${icon} text-lg text-slate-400`} aria-hidden="true"></i> : null}
      </div>
      <p className="text-3xl font-semibold text-white">{value}</p>
      {trend ? (
        <p className={`flex items-center gap-2 text-xs font-medium ${trendClasses}`}>
          <i className={`${trendIcon} text-base`} aria-hidden="true"></i>
          <span>{trend.value}</span>
        </p>
      ) : null}
      {helper ? <p className="text-xs text-slate-400">{helper}</p> : null}
    </div>
  )
}
