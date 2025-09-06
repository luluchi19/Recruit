import { Metadata } from "next"
import { FormProfile } from "./FormProfile"

export const metadata: Metadata = {
  title: "Thông tin công ty",
  description: "Mô tả trang thông tin công ty...",
}

export default function CompanyManageProfilePage() {
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <h1 className="font-[700] text-[20px] text-black mb-[20px]">
              Thông tin công ty
            </h1>
            <FormProfile />
          </div>
        </div>
      </div>
    </>
  )
}