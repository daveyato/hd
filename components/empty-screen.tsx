import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import processimg from "../public/assets/icons/our-process.png"
import owlimg from "../public/assets/icons/owl.png"
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

export function EmptyScreen({ append }: any) {
  return (
    <div className="mx-auto sm:max-w-[800px] px-4">
      <div className="">
        <div className="flex text-center items-center justify-center">
          <h1 className="mb-2 text-3xl font-semibold">
            Welcome to Lynx AI for Human Design
          </h1>
          {/* <Image
            className="w-[50px] h-[50px] ml-2 "
            src={owlimg}
            alt="info"
          /> */}
        </div>

        <p className="mb-2 leading-normal text-muted-foreground text-lg">
          Introducing Lynx AI—your digital guide for unlocking the secrets of your Human Design. Delve into individualized insights, assess your compatibility with others, or demystify the unique blueprint of your life. With Lynx AI, self-understanding and cultivating meaningful relationships have never been more intuitive. Begin your voyage of self-discovery with just a few easy steps.
        </p>
        <div className='lg:grid gap-[40px] items-start lg:grid-cols-2  mb-2'>
          <div className='rounded-[8px] bg-[#F5F5F7] py-[14px] px-[24px] h-full mb-2'>
            <div className='flex items-center justify-start text-lg font-bold mb-2'>
              <Image
                className="w-[24px] h-[24px] mr-2 "
                src={processimg}
                alt="info"
              />
              Our Approach
            </div>
            <div className='flex items-start justify-start text-muted-foreground text-sm mb-2'>
              <div className='mr-2'>
                —
              </div>
              <div>
                <span className='text-black'>Upload 1 or 6 Human Design Charts : </span>Kickstart your exploration by uploading your chart, or additional charts if you&apos;re interested in delving into relationships, business collaborations, or team dynamics.
              </div>
            </div>
            <div className='flex items-start justify-start text-muted-foreground text-sm mb-2'>
              <div className='mr-2'>
                —
              </div>
              <div>
                <span className='text-black'>Pose Your Questions:</span> Don&apos;t hesitate to inquire about any aspect of the uploaded charts.
              </div>
            </div>
            <div className='flex items-start justify-start text-muted-foreground text-sm mb-2'>
              <div className='mr-2'>
                —
              </div>
              <div>
                <span className='text-black'>User-Centric Prompts:</span> Unsure where to begin? Our guided prompts will steer you toward the areas that resonate most with you.
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
              Sample Prompts
            </div>
            <div className='rounded-[4px] border-solid border-[1px] border-[#D4DADE] p-[8px] font-sm text-sm mb-2'>
              <div className='flex items-center justify-between w-full '>
                <div className='mr-2'> What Do My Design Traits Reveal About My Authentic Self?</div>
                <Image
                  className="w-[28px] h-[28px] mr-2 cursor-pointer "
                  src={gotoimg}
                  alt="info"
                  onClick={() => append({
                    content: "What Do My Design Traits Reveal About My Authentic Self?",
                    role: "user"
                  })}
                />
              </div>
              <div className='text-muted-foreground '>
                Explore your inherent strengths, challenges, and guidance for personal evolution based on your Human Design.
              </div>
            </div>
            <div className='rounded-[4px] border-solid border-[1px] border-[#D4DADE] p-[8px] font-sm text-sm mb-2'>
              <div className='flex items-center justify-between w-full '>
                <div className='mr-2'> How Can I Align My Life for Greater Clarity and Purpose?</div>
                <Image
                  className="w-[28px] h-[28px] mr-2 cursor-pointer"
                  src={gotoimg}
                  alt="info"
                  onClick={() => append({
                    content: "How Can I Align My Life for Greater Clarity and Purpose?",
                    role: "user"
                  })}
                />
              </div>
              <div className='text-muted-foreground '>
                Uncover actionable steps to align with your core principles, unearth your ultimate mission, strengthen your inner bond, and lead a life filled with purpose.

              </div>
            </div><div className='rounded-[4px] border-solid border-[1px] border-[#D4DADE] p-[8px] font-sm text-sm mb-2'>
              <div className='flex items-center justify-between w-full '>
                <div className='mr-2'> What Can Our Charts Tell Us About Improving Our Relationship or Business Alliance?
                </div>
                <Image
                  className="w-[28px] h-[28px] mr-2 cursor-pointer"
                  src={gotoimg}
                  alt="info"
                  onClick={() => append({
                    content: "What Can Our Charts Tell Us About Improving Our Relationship or Business Alliance?",
                    role: "user"
                  })}
                />
              </div>
              <div className='text-muted-foreground '>
                Gain insights into compatible traits, possible hurdles, mutual goal alignment, and strategies for nurturing trust and understanding.
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 leading-normal text-muted-foreground text-lg">
          Whether you&apos;re embarking on a personal quest for self-knowledge or aiming to deepen your rapport with others, Lynx AI is your illuminating companion. Upload your Human Design charts and commence your transformative journey now!


        </div>
      </div >
    </div >
  )
}
