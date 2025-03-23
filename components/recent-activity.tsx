import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Package, Truck, RefreshCw } from "lucide-react"

const activities = [
  {
    icon: Package,
    name: "New Product",
    description: "Organic Coffee Beans registered",
    timestamp: "2 minutes ago",
    color: "bg-green-500",
  },
  {
    icon: Truck,
    name: "Bid Accepted",
    description: "FastShip won Electronics bid",
    timestamp: "1 hour ago",
    color: "bg-blue-500",
  },
  {
    icon: RefreshCw,
    name: "Custody Transfer",
    description: "Furniture transferred to Carrier",
    timestamp: "3 hours ago",
    color: "bg-purple-500",
  },
  {
    icon: Package,
    name: "New Product",
    description: "Luxury Watch Collection registered",
    timestamp: "5 hours ago",
    color: "bg-green-500",
  },
  {
    icon: RefreshCw,
    name: "Custody Transfer",
    description: "Electronics delivered to Retailer",
    timestamp: "1 day ago",
    color: "bg-purple-500",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className={`${activity.color} h-9 w-9 text-white`}>
            <AvatarFallback className={activity.color}>
              <activity.icon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{activity.timestamp}</div>
        </div>
      ))}
    </div>
  )
}

