/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toaster, toast } from 'sonner';

export const ButtonDelete = (props: {
  api: string,
  item: any,
  onDeleteSuccess: (id: string) => void
}) => {
  const { api, item, onDeleteSuccess } = props;

  const handleDelete = () => {
    const confirm = window.confirm("Bạn có chắc muốn xóa bản ghi: " + (item.title || item.jobTitle));
    if(confirm) {
      fetch(api, {
        method: "DELETE",
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            toast.error(data.message);
          }

          if(data.code == "success") {
            toast.success(data.message);
            onDeleteSuccess(item.id);
          }
        })
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <button 
        className="bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]"
        onClick={handleDelete}
      >
        Xóa
      </button>
    </>
  )
}
