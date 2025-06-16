'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  Music, 
  CreditCard, 
  Settings 
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard" as const,
    icon: LayoutDashboard,
  },
  {
    name: "Organization",
    href: "/dashboard/organization" as const,
    icon: Building2,
  },
  {
    name: "Programs", 
    href: "/dashboard/programs" as const,
    icon: Calendar,
  },
  {
    name: "Hymns",
    href: "/dashboard/hymns" as const, 
    icon: Music,
  },
  {
    name: "Subscription",
    href: "/dashboard/subscription" as const,
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/dashboard/settings" as const,
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-muted text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}