"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "./nav-item"
import { BiMenu } from "react-icons/bi"
import Image from "next/image";
import Link from "next/link";

type PropsNavbar = {
 items: {
    link: string
    title: string
 }[]
}

export const Navbar = ({items}: PropsNavbar) => {
    const pathname = usePathname();
    const isHomePath = pathname !== '/ai'
    return ( 
        <nav className="z-10">
            {/* md menu */}
            <div className={`w-full flex justify-end ${isHomePath ? 'md:justify-center' : "justify-between"} items-center mt-5`}>
                {!isHomePath && (
                    <Link href={'/'}>
                        <div className="flex gap-1 items-center">
                            <Image 
                                src={'/assets/babydoge-icon.png'}
                                alt=""
                                height={500}
                                width={500}
                                className="w-10 object-contain"/>
                            <h4 className="font-bold dot-blue text-xl tracking-wider">Baby<span className="text-yellow-500">Doge</span><span className="text-2xl">X</span></h4>
                        </div>
                    </Link>
                )}
                <div className="space-x-4 hidden md:block">
                    {items.map((v, i) => (
                        <NavItem 
                        key={`nav_item_${i}`}
                        link={v.link}
                        title={v.title}/>
                    ))}
                </div>
                <div className="block md:hidden">
                    <label htmlFor="nav-checkbox" className="flex items-center p-2 border rounded text-white cursor-pointer transition duration-300 ease-in-out hover:border-white">
                        <BiMenu size={26} color="white"/>
                    </label>
                </div>
            </div>
            {/* sm menu */}
            <div className="block md:hidden">
                <input type="checkbox" id="nav-checkbox" hidden/>
                <div id="nav-menu" className="max-h-0 overflow-hidden transition-[max-height] ease-in-out duration-300">
                    <div className="bg-[#2A272A] z-50 p-4 rounded-md flex flex-col gap-2 mt-3">
                        {items.map((item, index) => (
                            <NavItem 
                                link={item.link} 
                                title={item.title} 
                                key={`nav_item_${index}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}