import * as React from 'react'
import Image from "next/image";
import logo from "../public/assets/icons/logo.svg"
import info from "../public/assets/icons/info.svg"
import pdfimg from '../public/assets/icons/pdf.svg'
import closeimg from '../public/assets/icons/close.svg'
import useHigherAIStore from "@/store"

export const Header = () => {
  // const session = await auth()
  const { PDFList, setPDFList } = useHigherAIStore()
  const shortenString = (inputString: string): string =>
    inputString.length > 9 ? `${inputString.substring(0, 6)}..` : inputString;
  const onDelete = (idx: any) => {
    const newlist: any = [...PDFList]
    newlist.pop(idx);
    setPDFList(newlist)
  }
  return (
    <header className="sticky top-0 z-50 flex flex-col lg:flex-row items-center justify-center lg:gap-4 gap-0 w-full  h-auto lg:px-4 lg:py-4 pb-[0px] border-b shrink-0 bg-white lg:bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-end bg-white p-2">
        <Image
          className="w-[50px] h-[50px] "
          src={logo}
          alt="Logo"
        />
      </div>
      <div className="flex items-center justify-start p-4 space-x-2 lg:w-[800px]  bg-[#EEEFEF] rounded-[8px] h-auto w-full overflow-x-auto">
        {
          PDFList.length == 0 ?
            <>
              <Image
                className="w-[24px] h-[24px] "
                src={info}
                alt="info"
              />
              <p className='text-[#5F6E78] '>No File Uploaded ...</p>
            </>
            :
            PDFList.map((item: any, idx: any,) => <div key={idx} className='flex items-center justify-start'>
              <Image

                className="w-[24px] h-[24px] "
                src={pdfimg}
                alt="info"
              />
              <p className='px-2'>{shortenString(item.metadata.source)}</p>
              <Image
                className="w-[24px] h-[24px] cursor-pointer"
                src={closeimg}
                alt="info"
                onClick={() => onDelete(idx)}
              />
            </div>)
        }
      </div>
      <div className=" w-[41px] h-[0px] flex items-center justify-end bg-red-500 invisible ">
      </div>
    </header>
  )
}
