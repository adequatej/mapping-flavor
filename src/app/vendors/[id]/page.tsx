'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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
    market: {
      id: string
      name: string
      chineseName: string
      location: string
      latitude: number
      longitude: number
    }
  }>
}

interface ApiResponse {
  success: boolean
  data: Vendor
}

export default function VendorDetail() {
  const params = useParams()
  const vendorId = params.id as string

  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!vendorId) return

    const fetchVendor = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/vendors/${vendorId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Vendor not found')
          }
          throw new Error('Failed to fetch vendor')
        }

        const data: ApiResponse = await response.json()

        if (data.success) {
          setVendor(data.data)
        } else {
          throw new Error('API returned error')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchVendor()
  }, [vendorId])

  if (loading) {
    return (
      <div className='min-h-screen py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='animate-pulse'>
              <div className='h-8 bg-neutral-800 rounded mb-4'></div>
              <div className='h-12 bg-neutral-800 rounded mb-6'></div>
              <div className='h-80 bg-neutral-800 rounded-xl mb-8'></div>
              <div className='space-y-4'>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className='h-6 bg-neutral-800 rounded'></div>
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
              {error === 'Vendor not found'
                ? 'Vendor Not Found'
                : 'Something went wrong!'}
            </h1>
            <p className='text-neutral-300 mb-8'>{error}</p>
            <div className='space-x-4'>
              <Link
                href='/vendors'
                className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors'
              >
                Back to Vendors
              </Link>
              {error !== 'Vendor not found' && (
                <button
                  onClick={() => window.location.reload()}
                  className='bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg border border-neutral-600 transition-colors'
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return null
  }

  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Breadcrumb */}
          <nav className='mb-8'>
            <div className='flex items-center space-x-2 text-sm'>
              <Link
                href='/vendors'
                className='text-primary hover:text-primary-light transition-colors'
              >
                Vendors
              </Link>
              <span className='text-neutral-500'>→</span>
              <span className='text-neutral-300'>{vendor.name}</span>
            </div>
          </nav>

          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
              {vendor.name}
            </h1>
            {vendor.chineseName && (
              <p className='text-xl text-neutral-300 mb-4'>
                {vendor.chineseName}
              </p>
            )}
            {vendor.markets && vendor.markets.length > 0 && (
              <div className='mb-4'>
                <Link
                  href={`/markets/${vendor.markets[0].market.id}`}
                  className='inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full font-medium hover:bg-primary/30 transition-colors'
                >
                  📍 {vendor.markets[0].market.name}
                </Link>
              </div>
            )}
            {vendor.specialties && vendor.specialties.length > 0 && (
              <div className='flex flex-wrap justify-center gap-2'>
                {vendor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className='bg-accent/20 text-accent px-3 py-1 rounded-full text-sm'
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          {vendor.images && vendor.images.length > 0 && (
            <div className='mb-12'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {vendor.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden ${
                      index === 0 && vendor.images.length > 1
                        ? 'md:row-span-2 h-96'
                        : 'h-48'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${vendor.name} - Image ${index + 1}`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 50vw'
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className='grid md:grid-cols-3 gap-12'>
            {/* Primary Content */}
            <div className='md:col-span-2 space-y-8'>
              {/* Description */}
              <section>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  About This Vendor
                </h2>
                <p className='text-neutral-300 leading-relaxed text-lg'>
                  {vendor.description}
                </p>
              </section>

              {/* Cultural Significance */}
              {vendor.culturalSignificance && (
                <section className='bg-secondary-light rounded-xl p-8'>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    <span className='text-accent'>Cultural Significance</span>
                  </h2>
                  <p className='text-neutral-300 leading-relaxed'>
                    {vendor.culturalSignificance}
                  </p>
                </section>
              )}

              {/* Research Notes */}
              {vendor.researchNotes && (
                <section>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    Research Observations
                  </h2>
                  <div className='bg-neutral-900 rounded-lg p-6 border-l-4 border-primary'>
                    <p className='text-neutral-300 leading-relaxed'>
                      {vendor.researchNotes}
                    </p>
                  </div>
                </section>
              )}

              {/* Methodological Note */}
              <section className='bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8'>
                <h3 className='text-xl font-bold text-white mb-4'>
                  <span className='text-accent'>Research Ethics</span>
                </h3>
                <p className='text-neutral-300 text-sm leading-relaxed mb-4'>
                  This vendor profile was created with full consent and
                  represents observations from my fieldwork in Taiwan's night
                  markets. The vendor was informed about the research purpose
                  and agreed to participate.
                </p>
                <p className='text-neutral-400 text-xs'>
                  <strong>Privacy:</strong> Personal identifying information may
                  be anonymized to protect vendor privacy while preserving the
                  cultural and academic value of the documentation.
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <div className='space-y-8'>
              {/* Quick Info */}
              <div className='bg-neutral-900 rounded-xl p-6'>
                <h3 className='text-xl font-bold text-white mb-4'>
                  Vendor Information
                </h3>
                <div className='space-y-3'>
                  {vendor.operatingHours && (
                    <div>
                      <p className='text-neutral-400 text-sm'>
                        Operating Hours
                      </p>
                      <p className='text-white'>{vendor.operatingHours}</p>
                    </div>
                  )}
                  {vendor.latitude && vendor.longitude && (
                    <div>
                      <p className='text-neutral-400 text-sm'>Location</p>
                      <p className='text-white text-xs'>
                        {vendor.latitude.toFixed(6)},{' '}
                        {vendor.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                  {vendor.markets && vendor.markets.length > 0 && (
                    <div>
                      <p className='text-neutral-400 text-sm'>Market</p>
                      <p className='text-white'>
                        {vendor.markets[0].market.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              {(vendor.contactPhone ||
                vendor.contactInstagram ||
                vendor.contactFacebook ||
                vendor.contactLine) && (
                <div className='bg-neutral-900 rounded-xl p-6'>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Contact Information
                  </h3>
                  <div className='space-y-3'>
                    {vendor.contactPhone && (
                      <div className='flex items-center space-x-3'>
                        <span className='text-neutral-400'>📞</span>
                        <span className='text-white text-sm'>
                          {vendor.contactPhone}
                        </span>
                      </div>
                    )}
                    {vendor.contactInstagram && (
                      <div className='flex items-center space-x-3'>
                        <span className='text-neutral-400'>📷</span>
                        <span className='text-white text-sm'>
                          @{vendor.contactInstagram}
                        </span>
                      </div>
                    )}
                    {vendor.contactFacebook && (
                      <div className='flex items-center space-x-3'>
                        <span className='text-neutral-400'>📘</span>
                        <span className='text-white text-sm'>
                          {vendor.contactFacebook}
                        </span>
                      </div>
                    )}
                    {vendor.contactLine && (
                      <div className='flex items-center space-x-3'>
                        <span className='text-neutral-400'>💬</span>
                        <span className='text-white text-sm'>
                          {vendor.contactLine}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className='space-y-4'>
                {vendor.markets && vendor.markets.length > 0 && (
                  <Link
                    href={`/markets/${vendor.markets[0].market.id}`}
                    className='block w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors text-center'
                  >
                    Visit {vendor.markets[0].market.name}
                  </Link>
                )}
                <Link
                  href='/vendors'
                  className='block w-full bg-secondary-light hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-lg border border-neutral-600 transition-colors text-center'
                >
                  View All Vendors
                </Link>
              </div>

              {/* Research Context */}
              <div className='bg-neutral-900 rounded-xl p-6'>
                <h3 className='text-lg font-bold text-white mb-3'>
                  Research Context
                </h3>
                <p className='text-neutral-400 text-sm leading-relaxed mb-4'>
                  This vendor documentation is part of a broader ethnographic
                  study of Taiwan's night market culture and food heritage.
                </p>
                <Link
                  href='/about'
                  className='text-primary hover:text-primary-light text-sm transition-colors'
                >
                  Learn more about this research →
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className='mt-16 pt-8 border-t border-neutral-800'>
            <div className='flex justify-between items-center'>
              <Link
                href='/vendors'
                className='text-primary hover:text-primary-light transition-colors'
              >
                ← Back to All Vendors
              </Link>
              {vendor.markets && vendor.markets.length > 0 && (
                <Link
                  href={`/explorer?market=${vendor.markets[0].market.id}`}
                  className='bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors'
                >
                  Explore in Map
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
