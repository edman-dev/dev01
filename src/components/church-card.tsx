import { Church } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone, Settings, Users } from "lucide-react"

interface ChurchCardProps {
  church: Church
  ministriesCount: number
  onEdit: () => void
  onManage: () => void
}

export function ChurchCard({ church, ministriesCount, onEdit, onManage }: ChurchCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{church.name}</CardTitle>
            <CardDescription className="mt-1">
              {church.address && (
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3" />
                  {church.address}
                </div>
              )}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Contact Info */}
          <div className="space-y-1">
            {church.contactEmail && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                {church.contactEmail}
              </div>
            )}
            {church.contactPhone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                {church.contactPhone}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {ministriesCount} {ministriesCount === 1 ? 'ministry' : 'ministries'}
              </span>
            </div>
            <Badge variant={church.isActive ? "default" : "secondary"}>
              {church.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Action Button */}
          <Button className="w-full" onClick={onManage}>
            Manage Church
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}