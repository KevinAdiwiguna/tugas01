'use client'
import Image from "next/image";
import { useSidebar } from '@/hooks/useSidebar'
import { MdDashboard } from "react-icons/md";
import { useSession } from 'next-auth/react'


const Sidebar = () => {
  const session: any = useSession()
  const { bookSettings, open, setOpen, userSettings, openSection, setOpenSection } = useSidebar()


  console.log(openSection)

  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-20"} bg-neutral-100 h-screen p-5  pt-8 relative duration-300`}>
        <Image
          src="/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
          width={20} height={20} alt=""
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <div className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}>
            <MdDashboard />
          </div>
          <h1 className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>{session.data && session?.data.Username} {!session.data && "Loading"}</h1>
        </div>


        <ul className="pt-6">
          {userSettings.map((data, index) => {
            return (
              <li key={index}
                onClick={() => {
                  const result = data.title.toLowerCase().replace(/ /g, '-');
                  setOpenSection(result)
                }}
                className={`flex rounded-md  p-2 cursor-pointer text-black text-sm items-center gap-x-4 mt-2 ${data?.header === true ? "font-bold mb-4 text-lg hover:bg-transparent cursor-none" : "ml-4 hover:bg-slate-300"} ${!open ? '!ml-0 w-fit p-4' : 'w-[85%]'}`}>
                {data?.icons}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {data.title}
                </span>
              </li>
            )
          })}
        </ul>

        <ul className="pt-6">
          {bookSettings.map((data, index) => {
            return (
              <li key={index}
                onClick={() => {
                  const result = data.title.toLowerCase().replace(/ /g, '-');
                  setOpenSection(result)
                }}
                className={`flex rounded-md  p-2 cursor-pointer text-black text-sm items-center gap-x-4 mt-2 ${data?.header === true ? "font-bold mb-4 text-lg hover:bg-transparent cursor-none" : "ml-4 hover:bg-slate-300"} ${!open ? '!ml-0 w-fit p-4' : 'w-[85%]'}`}>
                {data?.icons}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {data.title}
                </span>
              </li>
            )
          })}
        </ul>

      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
};
export default Sidebar;
