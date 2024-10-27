import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to E-Commerce</h1>
        <p className="text-xl text-gray-600 mb-8">The next gen business marketplace</p>
        <div className="flex justify-center space-x-4">
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          title="Wide Selection"
          description="Explore our vast catalog of products from various categories."
        />
        <FeatureCard
          title="Business Focused"
          description="Tailored solutions for businesses of all sizes."
        />
        <FeatureCard
          title="Personalized Recommendations"
          description="Get product suggestions based on your interests."
        />
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-8">Join thousands of businesses already using our platform.</p>
        <Button asChild size="lg">
          <Link href="/signup">Create Your Account</Link>
        </Button>
      </section>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}