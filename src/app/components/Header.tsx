// "use client";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { nextAuthOptions } from "../lib/next-auth/options";
import { User } from "../types/types";

const Header = async () => {
  // const { data: session } = useSession();
  // const user = session?.user; クライアントサイドでの記述。

  const session = await getServerSession(nextAuthOptions);
  const user: User = session?.user as User; //サーバーサイド出の記述この場合OnClickが使用不可

  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          Book Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            ホーム
          </Link>
          <Link
            // href={user ? "/profile" : "/login"}
            href={user ? "/profile" : "api/auth/signin"} //ログインページを実装する方法
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {user ? "プロフィール" : "ログイン"}
          </Link>

          {user ? (
            // <button //クライアントコンポーネントを利用する場合にはこちらを記述 
            // // onClick={() => signOut({ callbackUrl: "/login"})}
            // className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            //   ログアウト
            // </button>
            <Link //NextOAuthで提供されているログアウト
            href={"api/auth/signout"}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              ログアウト
            </Link>
            ) : (
            ""
            )}
          <Link href={`/profile`}>
            <Image
              width={50}
              height={50}
              alt="profile_icon"
              src={user?.image || "/default_icon.png"}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;