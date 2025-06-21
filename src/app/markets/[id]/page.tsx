import { notFound } from 'next/navigation'

interface MarketDetailPageProps {
  params: {
    id: string
  }
}

export default function MarketDetailPage({ params }: MarketDetailPageProps) {
  // Temporary: Return not found until implement API calls
  notFound()
}
