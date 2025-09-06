/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { cvStatusList, positionList, workingFormList } from "@/config/variable";
import Link from "next/link"
import { useEffect, useState } from "react";
import { FaBriefcase, FaCircleCheck, FaUserTie } from "react-icons/fa6"

export const CVList = () => {
  const [listCV, setListCV] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cv/list`, {
      method: "GET",
      credentials: "include", // Gửi kèm cookie
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "success") {
          setListCV(data.listCV);
        }
      })
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {listCV.map(item => {
          item.jobPosition = positionList.find(itemPos => itemPos.value == item.jobPosition)?.label;
          item.jobWorkingForm = workingFormList.find(itemWork => itemWork.value == item.jobWorkingForm)?.label;
          const status = cvStatusList.find(itemStatus => itemStatus.value == item.status);

          return (
            <div 
              key={item.id}
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
              <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
                {item.jobTitle}
              </h3>
              <div className="mt-[12px] text-center font-[400] text-[14px] text-black">
                Công ty: <span className="font-[700]">{item.companyName}</span>
              </div>
              <div className="mt-[6px] text-center font-[600] text-[16px] text-[#0088FF]">
                {item.jobSalaryMin.toLocaleString("vi-VN")}$ - {item.jobSalaryMax.toLocaleString("vi-VN")}$
              </div>
              <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                <FaUserTie className="text-[16px]" /> {item.jobPosition}
              </div>
              <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                <FaBriefcase className="text-[16px]" /> {item.jobWorkingForm}
              </div>
              <div 
                className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px]"
                style={{
                  color: status?.color
                }}
              >
                <FaCircleCheck className="text-[16px]" /> {status?.label}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-[8px] mt-[12px] mb-[20px] mx-[10px]">
                <Link href={`/user-manage/cv/detail/${item.id}`} className="bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]">
                  Xem
                </Link>
                <Link href="#" className="bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]">
                  Xóa
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-[30px]">
        <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
          <option value="">Trang 1</option>
          <option value="">Trang 2</option>
          <option value="">Trang 3</option>
        </select>
      </div>
    </>
  )
}
