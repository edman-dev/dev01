'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChurchCard } from "@/components/church-card"
import { MinistryCard } from "@/components/ministry-card"
import { OrganizationalBreadcrumb } from "@/components/organizational-breadcrumb"
import { mockChurches, mockMinistries, mockServiceTypes } from "@/lib/mock-data"
import { Plus, Building2, Users } from "lucide-react"

export default function OrganizationPage() {
  const [selectedChurchId, setSelectedChurchId] = useState<string | null>(mockChurches[0]?.id || null)

  const churches = mockChurches
  const selectedChurch = churches.find(c => c.id === selectedChurchId)
  const ministries = mockMinistries.filter(m => m.churchId === selectedChurchId)

  const getMinistriesCount = (churchId: string) => {
    return mockMinistries.filter(m => m.churchId === churchId).length
  }

  const getServicesCount = (ministryId: string) => {
    return mockServiceTypes.filter(s => s.ministryId === ministryId).length
  }

  return (
    <div className="flex-1 space-y-6">
      <OrganizationalBreadcrumb />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
          <p className="text-muted-foreground">
            Manage your church structure and ministries
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="churches">Churches</TabsTrigger>
          <TabsTrigger value="ministries">Ministries</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Churches</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{churches.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active in your organization
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Ministries</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMinistries.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across all churches
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Types</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockServiceTypes.length}</div>
                <p className="text-xs text-muted-foreground">
                  Configured services
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  This week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Churches</CardTitle>
                <CardDescription>Your most recently accessed churches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {churches.slice(0, 3).map((church) => (
                    <div key={church.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{church.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {getMinistriesCount(church.id)} ministries
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Ministries</CardTitle>
                <CardDescription>Recently modified ministries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMinistries.slice(0, 3).map((ministry) => (
                    <div key={ministry.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="rounded p-1"
                          style={{ backgroundColor: `${ministry.color}20`, color: ministry.color }}
                        >
                          <div className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="font-medium">{ministry.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getServicesCount(ministry.id)} services
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="churches" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Churches</h2>
              <p className="text-muted-foreground">
                Manage churches in your organization
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Church
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {churches.map((church) => (
              <ChurchCard
                key={church.id}
                church={church}
                ministriesCount={getMinistriesCount(church.id)}
                onEdit={() => console.log('Edit church:', church.id)}
                onManage={() => setSelectedChurchId(church.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ministries" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Ministries</h2>
              <p className="text-muted-foreground">
                {selectedChurch ? `Ministries at ${selectedChurch.name}` : 'Select a church to view ministries'}
              </p>
            </div>
            {selectedChurch && (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Ministry
              </Button>
            )}
          </div>

          {selectedChurch ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ministries.map((ministry) => (
                <MinistryCard
                  key={ministry.id}
                  ministry={ministry}
                  servicesCount={getServicesCount(ministry.id)}
                  onEdit={() => console.log('Edit ministry:', ministry.id)}
                  onManage={() => console.log('Manage ministry:', ministry.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Select a church to view its ministries</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}