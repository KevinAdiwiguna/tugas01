'use client'
import Image from "next/image";
import { useSidebar } from '@/hooks/useSidebar'
import { MdDashboard } from "react-icons/md";
import { useSession } from 'next-auth/react'
import { SidebarList } from "@/components/organisms/sidebar/SidebarList";
import { ReactNode } from "react";

interface sideBarProps {
  children: ReactNode
}

const Sidebar = ({ children }: sideBarProps) => {
  const session: any = useSession()
  const { bookSettings, open, setOpen, userSettings, signOut } = useSidebar()


  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-20"} bg-neutral-100 h-screen p-5  pt-8 relative duration-300`}>
        <Image
          src="/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
          width={20} height={20} alt=""
          onClick={() => setOpen(!open)}
          priority
        />

        <div className="flex gap-x-4 items-center">
          <div className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}>
            <MdDashboard />
          </div>
          <h1 className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>{session.data && session?.data.Username} {!session.data && "Loading"}</h1>
        </div>

        <SidebarList datas={userSettings} open={open} isSignOut={false} />
        <SidebarList datas={bookSettings} open={open} isSignOut={false} />


        <SidebarList datas={signOut} open={open} isSignOut={true} />

      </div>
      <div className="h-screen flex-1 p-7">
        {children}
      </div>


    </div>
  );
};
export default Sidebar;
