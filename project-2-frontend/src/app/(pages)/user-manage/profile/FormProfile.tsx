/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react";
import JustValidate from "just-validate";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Toaster, toast } from 'sonner';

// Đăng ký plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export const FormProfile = () => {
  const { infoUser } = useAuth();
  const [avatars, setAvatars] = useState<any[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if(infoUser) {
      if(infoUser.avatar) {
        setAvatars([
          {
            source: infoUser.avatar
          }
        ]);
      }

      const validator = new JustValidate("#profileForm");

      validator
        .addField('#fullName', [
          {
            rule: 'required',
            errorMessage: 'Vui lòng nhập họ tên!'
          },
          {
            rule: 'minLength',
            value: 5,
            errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
          },
          {
            rule: 'maxLength',
            value: 50,
            errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
          },
        ])
        .addField('#email', [
          {
            rule: 'required',
            errorMessage: 'Vui lòng nhập email của bạn!',
          },
          {
            rule: 'email',
            errorMessage: 'Email không đúng định dạng!',
          },
        ])
        .onFail(() => {
          setIsValid(false);
        })
        .onSuccess(() => {
          setIsValid(true);
        });
    }
  }, [infoUser]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    let avatar = null;
    if(avatars.length > 0) {
      avatar = avatars[0].file;
    }

    if(isValid) {
      // Tạo FormData
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("avatar", avatar);

      const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "PATCH",
        body: formData,
        credentials: "include", // Gửi kèm cookie
      })
        .then(async (res) => {
          const data = await res.json();
          if (data.code === "error") {
            throw new Error(data.message);
          }
          return data;
        });

      toast.promise(promise, {
        loading: 'Đang cập nhật...',
        success: (data) => `${data.message}`, // data ở đây là kết quả trả về khi `resolve`
        error: (err) => err.message || 'Đã xảy ra lỗi!',
      });
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      {infoUser && (
        <form onSubmit={handleSubmit} id="profileForm" action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
              Họ tên *
            </label>
            <input 
              type="text" 
              name="fullName" 
              defaultValue={infoUser.fullName}
              id="fullName" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="avatar" className="block font-[500] text-[14px] text-black mb-[5px]">
              Avatar
            </label>
            <FilePond
              name="avatar"
              allowMultiple={false} // Chỉ chọn 1 ảnh 
              allowRemove={true} // Cho phép xóa ảnh
              labelIdle='+'
              acceptedFileTypes={["image/*"]} // Chỉ cho phép ảnh
              files={avatars}
              onupdatefiles={setAvatars}
            />
          </div>
          <div className="">
            <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
              Email *
            </label>
            <input 
              type="email" 
              name="email" 
              defaultValue={infoUser.email}
              id="email" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
              Số điện thoại
            </label>
            <input 
              type="text" 
              name="phone" 
              defaultValue={infoUser.phone}
              id="phone" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white">
              Cập nhật
            </button>
          </div>
        </form>
      )}
    </>
  )
}
