import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import processimg from "../public/assets/icons/our-process.png"
import promptimg from "../public/assets/icons/prompt.png"
import gotoimg from "../public/assets/icons/goto.svg"
import Image from "next/image";


const exampleMessages = [
  {
    heading: 'About my IQ and EQ',
    message: `Explain about my IQ and EQ`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following content for a 2nd grader: \n'
  },
  {
    heading: 'About my profile',
    message: `Explain about my IQ and EQ: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto sm:max-w-[800px] px-4">
      <div className="">
        <h1 className="mb-2 text-3xl font-semibold">
          Welcome to The Gene Keys AI Owl
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground text-lg">
          Introducing the Gene Keys AI Owl—your intuitive guide to self-exploration, relationships, and life&apos;s purpose. Dive into personal insights, discover compatibility with others, or simply unlock the mysteries of your unique genetic code. With the Gene Keys AI Owl, understanding yourself and forging meaningful connections has never been more enlightening. Embark on a journey of discovery in just a few simple steps.
        </p>
        <div className='md:grid gap-[40px] items-start md:grid-cols-2  mb-2'>
          <div className='rounded-[8px] bg-[#F5F5F7] py-[14px] px-[24px] h-full mb-2'>
            <div className='flex items-center justify-start text-lg font-bold mb-2'>
              <Image
                className="w-[24px] h-[24px] mr-2 "
                src={processimg}
                alt="info"
              />
              Our Process
            </div>
            <div className='flex items-start justify-start text-muted-foreground text-sm mb-2'>
              <div className='mr-2'>
                —
              </div>
              <div>
                <span className='text-black'>Upload 1 or 4 Gene Keys Profiles:</span>  Start by uploading your profile, or more profiles if you want to explore a relationships, business partnership or team dynamics.
              </div>
            </div>
            <div className='flex items-start justify-start text-muted-foreground text-sm mb-2'>
              <div className='mr-2'>
                —
              </div>
              <div>
                <span className='text-black'>Ask a Question:</span> Feel free to ask anything about the profiles you&apos;ve uploaded.
              </div>
            </div>
            <div className='flex items-start justify-start text-muted-foreground text-sm mb-2'>
              <div className='mr-2'>
                —
              </div>
              <div>
                <span className='text-black'>User Guided Prompts:</span> Not sure where to start? We have guided prompts to help you dive into what matters most to you.
              </div>
            </div>
          </div>
          <div className='rounded-[8px] bg-[#F5F5F7] py-[14px] px-[24px] h-full'>
            <div className='flex items-center justify-start text-lg font-bold mb-2'>
              <Image
                className="w-[24px] h-[24px] mr-2 "
                src={promptimg}
                alt="info"
              />
              Prompt Example
            </div>
            <div className='rounded-[4px] border-solid border-[1px] border-[#D4DADE] p-[8px] font-sm text-sm mb-2'>
              <div className='flex items-center justify-between w-full '>
                <div className='mr-2'> What Insights Do My Traits Unlock About My True Self?</div>

                <Image
                  className="w-[28px] h-[28px] mr-2 "
                  src={gotoimg}
                  alt="info"
                />
              </div>
              <div className='text-muted-foreground '>
                Explore your innate strengths, alignment with life&apos;s path, challenges, and personal growth guidance
              </div>
            </div>
            <div className='rounded-[4px] border-solid border-[1px] border-[#D4DADE] p-[8px] font-sm text-sm mb-2'>
              <div className='flex items-center justify-between w-full '>
                <div className='mr-2'> How Can I Navigate Towards Greater Clarity and Purpose in My Life?</div>
                <Image
                  className="w-[28px] h-[28px] mr-2 "
                  src={gotoimg}
                  alt="info"
                />
              </div>
              <div className='text-muted-foreground '>
                Discover steps to align with your core values, identify your true calling, deepen your inner connection, and cultivate a purposeful life
              </div>
            </div><div className='rounded-[4px] border-solid border-[1px] border-[#D4DADE] p-[8px] font-sm text-sm mb-2'>
              <div className='flex items-center justify-between w-full '>
                <div className='mr-2'> What Insights Can Our Profiles Offer to Enhance Our Relationship or Business
                  Partnership?</div>
                <Image
                  className="w-[28px] h-[28px] mr-2 "
                  src={gotoimg}
                  alt="info"
                />
              </div>
              <div className='text-muted-foreground '>
                Learn about complementary traits, potential challenges, shared goals alignment, and fostering understanding and trust
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 leading-normal text-muted-foreground text-lg">
          Whether you&apos;re on a quest for self-discovery or seeking to understand your connections with others, the Gene Keys AI Owl is here to illuminate your path. Upload your profiles and embark on your journey today!
        </div>
      </div >
    </div >
  )
}
