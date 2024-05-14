"use client";

import { FC } from "react"
import Link from "next/link"
import { cn } from "../../lib/utils"
import { usePathname } from "next/navigation"

interface NavItemProps {
    title: string
    link: string
    className?: string
}
export const NavItem: FC<NavItemProps> = (props) => {
    const pathname = usePathname();
    return (
        <Link 
            href={props.link} 
            className={
                cn("font-bold text-lg hover:bg-yellow-600 px-3 py-1 hover:text-black hover:rounded-md", 
                props.className, 
                pathname === props.link ? 'bg-yellow-600 text-black rounded' : 'border-b border-solid border-b-yellow-500')
            }>
            {props.title}
        </Link>
    )
}