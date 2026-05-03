export default function TaskCardSkeleton() {
  return (
    <div className="flex items-start gap-3 px-3 py-3 rounded-xl border border-ocean-border bg-ocean-surface animate-pulse">
      <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-ocean-elevated shrink-0" />
      <div className="mt-0.5 w-4 h-4 rounded border-2 border-ocean-elevated shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-ocean-elevated rounded w-3/4" />
        <div className="flex gap-1.5">
          <div className="h-3 bg-ocean-elevated rounded w-6" />
          <div className="h-3 bg-ocean-elevated rounded w-12" />
        </div>
      </div>
    </div>
  )
}
