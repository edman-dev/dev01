import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="container max-w-4xl">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Next.js Production Starter
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            A production-ready Next.js application with TypeScript, Tailwind CSS, and shadcn/ui components.
            Built with best practices and ready for deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              View Documentation
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Fast Development</CardTitle>
              <CardDescription>
                Hot reload, TypeScript support, and modern development tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with Next.js 14, React 18, and TypeScript for the best developer experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Beautiful UI</CardTitle>
              <CardDescription>
                Tailwind CSS and shadcn/ui components for stunning interfaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pre-configured with Tailwind CSS and a complete set of accessible UI components.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🚀 Production Ready</CardTitle>
              <CardDescription>
                Optimized build, SEO-friendly, and deployment ready
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configured for optimal performance with proper SEO metadata and build optimization.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}