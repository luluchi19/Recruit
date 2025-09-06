/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { positionList, workingFormList } from "@/config/variable";
import { useEffect, useState } from "react";
import { CVItem } from "./CVItem";

export const CVList = () => {
  const [listCV, setListCV] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [totalRecord, setTotalRecord] = useState();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/cv/list?page=${page}`, {
      method: "GET",
      credentials: "include", // Gửi kèm cookie
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "success") {
          setListCV(data.listCV);
          setTotalPage(data.totalPage);
          setTotalRecord(data.totalRecord);
        }
      })
  }, [page]);

  const handleDeleteSuccess = (id: string) => {
    setListCV(prev => prev.filter(cv => cv.id !== id));
  }

  const handlePagination = (event: any) => {
    const value = event.target.value;
    setPage(parseInt(value));
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {listCV.map((item) => {
          item.jobPosition = positionList.find(itemPos => itemPos.value == item.jobPosition)?.label;
          item.jobWorkingForm = workingFormList.find(itemWork => itemWork.value == item.jobWorkingForm)?.label;

          return (
            <CVItem key={item.id} item={item} onDeleteSuccess={handleDeleteSuccess} />
          )
        })}
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
