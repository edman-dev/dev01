import Link from "next/link"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"
import { Church, Ministry, ServiceType } from "@/lib/types"

interface OrganizationalBreadcrumbProps {
  church?: Church
  ministry?: Ministry
  serviceType?: ServiceType
  currentPage?: string
}

export function OrganizationalBreadcrumb({ 
  church, 
  ministry, 
  serviceType, 
  currentPage 
}: OrganizationalBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard/organization">Organization</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {church && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {ministry || serviceType || currentPage ? (
                <BreadcrumbLink asChild>
                  <Link href={`/dashboard/organization/church/${church.id}` as any}>
                    {church.name}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{church.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {ministry && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {serviceType || currentPage ? (
                <BreadcrumbLink asChild>
                  <Link href={`/dashboard/organization/ministry/${ministry.id}` as any}>
                    {ministry.name}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{ministry.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {serviceType && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {currentPage ? (
                <BreadcrumbLink asChild>
                  <Link href={`/dashboard/organization/service/${serviceType.id}` as any}>
                    {serviceType.name}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{serviceType.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {currentPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}