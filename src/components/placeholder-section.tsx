import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"

interface PlaceholderSectionProps {
  title: string
  description?: string
}

export function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <Construction className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description || "This section is currently under development and will be available soon."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              To be built
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}