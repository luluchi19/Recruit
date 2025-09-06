/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { positionList, workingFormList } from "@/config/variable";
import Link from "next/link"
import { FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6"

export const CardJobItem = (props: {
  item: any
}) => {
  const { item } = props;

  const position = positionList.find(pos => pos.value === item.position)?.label;
  const workingForm = workingFormList.find(work => work.value === item.workingForm)?.label;

  return (
    <>
      <Link 
        href={`/job/detail/${item.id}`}
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
          className="relative mt-[20px] w-[116px] h-[116px] bg-white mx-auto rounded-[8px] p-[10px]" 
          style={{
            boxShadow: "0px 4px 24px 0px #0000001F"
          }}
        >
          <img 
            src={item.companyLogo}
            alt={item.companyName}
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
        <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
          {item.title}
        </h3>
        <div className="mt-[6px] text-center font-[400] text-[14px] text-[#121212]">
          {item.companyName}
        </div>
        <div className="mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]">
          {item.salaryMin.toLocaleString("vi-VN")}$ - {item.salaryMax.toLocaleString("vi-VN")}$
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaUserTie className="text-[16px]" /> {position}
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaBriefcase className="text-[16px]" /> {workingForm}
        </div>
        <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
          <FaLocationDot className="text-[16px]" /> {item.companyCity}
        </div>
        <div className="mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]">
          {item.technologies.map((itemTech: string, indexTech: number) => (
            <div 
              className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]"
              key={indexTech}
            >
              {itemTech}
            </div>
          ))}
        </div>
      </Link>
    </>
  )
}