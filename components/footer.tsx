import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">Discover More with Gene Keys</h3>
      <p className='text-left text-xs leading-normal text-muted-foreground'>Interested in exploring your unique genetic code? The Gene Keys & their courses offer an in-depth look into your personal traits, potentials, and life&#39s purpose.<span style={{ color: "#885EA3" }}>Create a free profile and start your journey of self-discovery.</span></p>
    </div>
  )
}
