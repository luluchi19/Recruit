import { Metadata } from "next"
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { SearchContainer } from "./SearchContainer"

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description: "Kết quả tìm kiếm công việc...",
}

export default function SearchPage() {
  return (
    <>
      {/* Kết quả tìm kiếm */}
      <div className="py-[60px]">
        <SearchContainer />
      </div>
      {/* Hết Kết quả tìm kiếm */}
    </>
  )
}