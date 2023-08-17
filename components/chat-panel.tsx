import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { useState, Dispatch, SetStateAction } from 'react'
import { type Message } from '@/components/utils'

export interface ChatPanelProps {
  append: any
  isLoading: boolean
  reload: any
  messages: Message[]
  stop: any
  input: string
  setInput: any
  id?: string
  setLoading: Dispatch<SetStateAction<any>>
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  setLoading
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <div className="mx-auto sm:max-w-[800px] sm:px-4">
        <div className="flex h-10 items-center justify-center mb-4">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background rounded-[40px] text-white"
              style={{ backgroundColor: "#885EA3" }}
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background rounded-[40px] text-white"
                style={{ backgroundColor: "#885EA3" }}
              >
                <IconRefresh className="mr-2" />
                Regenerate
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-6 py-2 shadow-lg rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            setLoading={setLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
