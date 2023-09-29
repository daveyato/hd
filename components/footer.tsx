import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  const content = `&nbsp;`
  return (
    <div>
      <h3 className="mb-2 font-semibold">Discover More with Gene Keys</h3>
      <p className='text-left text-xs leading-normal text-muted-foreground'>Curious to delve into your distinctive genetic blueprint? The Human Design System and its comprehensive courses provide a gateway to uncovering your individual traits, latent capacities, and life&apos;s mission. Establish a complimentary profile and embark on your voyage of self-realization. </p>
    </div>
  )
}
