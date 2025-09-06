/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CardCompanyItem } from "@/app/components/card/CardCompanyItem"
import { useEffect, useState } from "react";

export const CompanyList = () => {
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/list?limitItems=2&page=${page}`)
      .then(res => res.json())
      .then(data => {
        if(data.code == "success") {
          setCompanyList(data.companyList);
          setTotalPage(data.totalPage);
        }
      })
    }, [page]);

  const handlePagination = (event: any) => {
    const value = event.target.value;
    setPage(parseInt(value));
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
        {companyList.map(item => (
          <CardCompanyItem key={item.id} item={item} />
        ))}
      </div>
      {totalPage && (
        <div className="mt-[30px]">
          <select 
            name="" 
            className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]"
            onChange={handlePagination}
          >
            {Array(totalPage).fill("").map((item, index) => (
              <option key={index} value={index+1}>Trang {index+1}</option>
            ))}
          </select>
        </div>
      )}
    </>
  )
}
