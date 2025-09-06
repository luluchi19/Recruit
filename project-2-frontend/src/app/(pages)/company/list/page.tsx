import { Metadata } from "next"
import { CompanyList } from "./CompanyList"

export const metadata: Metadata = {
  title: "Danh sách công ty",
  description: "Mô tả trang danh sách công ty...",
}

export default function CompanyListPage() {
  return (
    <>
      {/* Section 2 */}
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]">
            Danh sách công ty IT
          </h2>
          {/* Wrap */}
          <CompanyList />

        </div>
      </div>
      {/* End Section 2 */}
    </>
  )
}