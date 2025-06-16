import { Ministry } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MinistryIconComponent } from "@/lib/ministry-icons"
import { Settings, Calendar } from "lucide-react"

interface MinistryCardProps {
  ministry: Ministry
  servicesCount: number
  onEdit: () => void
  onManage: () => void
}

export function MinistryCard({ ministry, servicesCount, onEdit, onManage }: MinistryCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div 
              className="rounded-lg p-2 flex items-center justify-center"
              style={{ backgroundColor: `${ministry.color}20`, color: ministry.color }}
            >
              <MinistryIconComponent icon={ministry.icon as any} className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{ministry.name}</CardTitle>
              {ministry.description && (
                <CardDescription className="mt-1">
                  {ministry.description}
                </CardDescription>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {servicesCount} {servicesCount === 1 ? 'service type' : 'service types'}
              </span>
            </div>
            <Badge variant={ministry.isActive ? "default" : "secondary"}>
              {ministry.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Action Button */}
          <Button className="w-full" onClick={onManage}>
            Manage Ministry
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}