export function trackEvent(eventName: string, payload: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    const dataLayer = (window as any).dataLayer = (window as any).dataLayer || []
    dataLayer.push({ event: eventName, ...payload })
  }
}

export function trackLinkedInConversion(conversionId?: string | number) {
  const targetId = conversionId || process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID
  if (typeof window !== 'undefined' && typeof (window as any).lintrk === 'function' && targetId) {
    (window as any).lintrk('track', { conversion_id: targetId })
  }
}
