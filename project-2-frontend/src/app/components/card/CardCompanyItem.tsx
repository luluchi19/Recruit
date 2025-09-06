/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { FaUserTie } from "react-icons/fa6"

export const CardCompanyItem = (props: {
  item: any
}) => {
  const { item } = props;

  return (
    <>
      <Link 
        href={`/company/detail/${item.id}`} 
        className="border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate"
        style={{
          background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
        }}
      >
        <img 
          src="/assets/images/card-bg.svg" 
          alt="" 
          className="absolute top-[0px] left-[0px] w-[100%] h-auto"
        />
        <div 
          className="relative sm:mt-[32px] mt-[20px] sm:w-[160px] w-[125px] sm:h-[160px] h-[125px] bg-white mx-auto rounded-[8px] p-[10px]"
          style={{
            boxShadow: "0px 4px 24px 0px #0000001F"
          }}
        >
          <img 
            src={item.logo}
            alt={item.companyName}
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
        <h3 className="sm:my-[24px] my-[16px] sm:mx-[16px] mx-[8px] font-[700] sm:text-[18px] text-[14px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
          {item.companyName}
        </h3>
        <div className="bg-[#F7F7F7] flex items-center sm:justify-between justify-center gap-[12px] py-[12px] px-[16px]">
          <div className="font-[400] sm:text-[14px] text-[12px] text-[#414042]">
            {item.cityName}
          </div>
          <div className="inline-flex items-center gap-x-[6px] font-[400] sm:text-[14px] text-[12px] text-[#121212]">
            <FaUserTie className="text-[16px] text-[#000096]" /> {item.totalJob} Việc làm
          </div>
        </div>
      </Link>
    </>
  )
}