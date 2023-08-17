import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { clearChats } from '@/app/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar'
import { SidebarList } from '@/components/sidebar-list'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ClearHistory } from '@/components/clear-history'
import { UserMenu } from '@/components/user-menu'
import { LoginButton } from '@/components/login-button'
import Image from "next/image";
import logo from "../public/assets/icons/logo.png"
import info from "../public/assets/icons/info.svg"



export async function Header() {
  const session = await auth()
  return (
    <header className="sticky top-0 z-50 flex flex-col md:flex-row items-center justify-center md:gap-4 gap-0 w-full  h-auto md:px-4 md:py-4 pb-[0px] border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-end bg-white p-2">
        <Image
          className="w-[170px] h-[41px] "
          src={logo}
          alt="Logo"
        />
      </div>
      <div className="flex items-center justify-start p-4 space-x-2 md:w-[800px]  bg-[#EEEFEF] rounded-[8px] h-auto w-full ">
        <Image
          className="w-[24px] h-[24px] "
          src={info}
          alt="info"
        />
        <p className='text-[#5F6E78] '>No File Uploaded ...</p>
      </div>
      <div className=" w-[170px] h-[0px] flex items-center justify-end bg-red-500 invisible ">

      </div>
    </header>
  )
}
