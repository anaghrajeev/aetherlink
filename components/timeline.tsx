import { cn } from "@/lib/utils"
import type { EventType } from "@/lib/types"

interface TimelineProps {
  events: EventType[]
}

export function Timeline({ events }: TimelineProps) {
  if (!events || events.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No events recorded for this product.</div>
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={cn("rounded-full w-3 h-3", index === 0 ? "bg-primary" : "bg-muted-foreground")} />
            {index < events.length - 1 && <div className="w-0.5 h-full bg-border" />}
          </div>
          <div className="space-y-1 pb-4">
            <p className="text-sm font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            <p className="text-xs text-muted-foreground">{event.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

