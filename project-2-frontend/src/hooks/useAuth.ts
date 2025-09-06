/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [infoUser, setInfoUser] = useState<any>();
  const [infoCompany, setInfoCompany] = useState<any>();
  const pathname = usePathname(); // Lấy URL hiện tại

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
      credentials: "include", // Gửi kèm cookie
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error") {
          setIsLogin(false);
        }

        if(data.code == "success") {
          setIsLogin(true);

          if(data.infoUser) {
            setInfoUser(data.infoUser);
            setInfoCompany(null);
          }

          if(data.infoCompany) {
            setInfoCompany(data.infoCompany);
            setInfoUser(null);
          }
        }
      });
  }, [pathname]);

  return { isLogin, infoUser, infoCompany };
}
