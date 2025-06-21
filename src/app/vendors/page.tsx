'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Vendor {
  id: string
  name: string
  chineseName?: string
  description: string
  specialties: string[]
  latitude?: number
  longitude?: number
  images: string[]
  contactPhone?: string
  contactInstagram?: string
  contactFacebook?: string
  contactLine?: string
  operatingHours?: string
  researchNotes?: string
  culturalSignificance?: string
  isActive: boolean
  markets?: Array<{
    id: string
    name: string
    chineseName: string
    location: string
  }>
}

interface ApiResponse {
  success: boolean
  data: Vendor[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/vendors')

        if (!response.ok) {
          throw new Error('Failed to fetch vendors')
        }

        const data: ApiResponse = await response.json()

        if (data.success) {
          setVendors(data.data)
        } else {
          throw new Error('API returned error')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto text-center'>
            <div className='animate-pulse'>
              <div className='h-12 bg-neutral-800 rounded mb-4'></div>
              <div className='h-6 bg-neutral-800 rounded mb-8'></div>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className='h-96 bg-neutral-800 rounded-xl'></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl mx-auto text-center'>
            <h1 className='text-4xl font-bold text-white mb-6'>
              Something went wrong!
            </h1>
            <p className='text-neutral-300 mb-8'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h1 className='font-bold text-4xl md:text-5xl text-white mb-6'>
            Market <span className='text-primary'>Vendors</span>
          </h1>
          <p className='text-xl text-neutral-300 leading-relaxed mb-4'>
            The people behind Taiwan's night market culture
          </p>
          <p className='text-neutral-400'>
            Meet the vendors who create the authentic experiences that make
            Taiwan's night markets so special
          </p>
        </div>

        {/* Research Note */}
        <div className='bg-secondary-light rounded-xl p-8 mb-12 max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            <span className='text-accent'>About This Documentation</span>
          </h2>
          <p className='text-neutral-300 leading-relaxed mb-4'>
            These vendor profiles represent conversations and observations from
            my fieldwork in Taiwan's night markets. Each entry captures not just
            what vendors sell, but how they navigate cultural identity, tourism,
            and tradition in these dynamic spaces.
          </p>
          <p className='text-neutral-400 text-sm'>
            <strong>Note:</strong> All vendor information was collected with
            permission and represents my observations as a researcher. Names and
            identifying details may be anonymized to protect privacy.
          </p>
        </div>

        {/* Vendors Grid */}
        {vendors.length > 0 ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {vendors.map(vendor => (
              <div
                key={vendor.id}
                className='bg-secondary-light rounded-xl overflow-hidden hover:bg-neutral-700 transition-colors'
              >
                {/* Vendor Image */}
                <div className='relative h-48 bg-neutral-800'>
                  {vendor.images && vendor.images.length > 0 ? (
                    <Image
                      src={vendor.images[0]}
                      alt={`${vendor.name} vendor stall`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  ) : (
                    <div className='flex items-center justify-center h-full text-neutral-500'>
                      <div className='text-center'>
                        <div className='text-4xl mb-2'>🏪</div>
                        <p className='text-sm'>No image available</p>
                      </div>
                    </div>
                  )}
                  <div className='absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs'>
                    Vendor
                  </div>
                </div>

                {/* Vendor Info */}
                <div className='p-6'>
                  <div className='mb-4'>
                    <h3 className='text-xl font-bold text-white mb-1'>
                      {vendor.name}
                    </h3>
                    {vendor.chineseName && (
                      <p className='text-neutral-400 text-sm mb-2'>
                        {vendor.chineseName}
                      </p>
                    )}
                    {vendor.markets && vendor.markets.length > 0 && (
                      <p className='text-primary text-sm'>
                        📍 {vendor.markets[0].name}
                      </p>
                    )}
                  </div>

                  {/* Specialties */}
                  {vendor.specialties && vendor.specialties.length > 0 && (
                    <div className='mb-4'>
                      <div className='flex flex-wrap gap-2'>
                        {vendor.specialties.slice(0, 3).map((specialty, i) => (
                          <span
                            key={i}
                            className='bg-primary/20 text-primary px-2 py-1 rounded-full text-xs'
                          >
                            {specialty}
                          </span>
                        ))}
                        {vendor.specialties.length > 3 && (
                          <span className='text-neutral-500 text-xs'>
                            +{vendor.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className='text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3'>
                    {vendor.description}
                  </p>

                  {/* Operating Hours */}
                  {vendor.operatingHours && (
                    <div className='mb-4 text-xs text-neutral-400'>
                      🕒 {vendor.operatingHours}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className='flex space-x-3'>
                    <Link
                      href={`/vendors/${vendor.id}`}
                      className='flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-center text-sm'
                    >
                      View Details
                    </Link>
                    {vendor.markets && vendor.markets.length > 0 && (
                      <Link
                        href={`/markets/${vendor.markets[0].id}`}
                        className='bg-secondary hover:bg-neutral-600 text-white font-medium py-2 px-4 rounded-lg border border-neutral-600 transition-colors text-center text-sm'
                      >
                        Visit Market
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center text-neutral-400 py-16'>
            <div className='text-6xl mb-4'>🏪</div>
            <h3 className='text-xl font-semibold text-white mb-2'>
              No Vendors Found
            </h3>
            <p>
              No vendor profiles have been documented yet. Check back soon as we
              continue our fieldwork!
            </p>
          </div>
        )}

        {/* Research Context */}
        <div className='mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 max-w-4xl mx-auto'>
          <h3 className='text-2xl font-bold text-white mb-6 text-center'>
            Research Methodology
          </h3>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Documentation Process
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                Each vendor profile is created through respectful observation
                and conversation. I focus on understanding how vendors navigate
                cultural identity, economic pressures, and changing market
                dynamics.
              </p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-3'>
                Cultural Sensitivity
              </h4>
              <p className='text-neutral-300 text-sm mb-4'>
                All documentation follows ethical research practices, with
                vendor consent and anonymization when requested. This research
                aims to celebrate and preserve these important cultural
                practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
