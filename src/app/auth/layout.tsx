import AuthComp from '@/components/layout/authComp';
import Image from "next/image";
import React from 'react'

export default function AuthLayout({
    children,
}:{
    children: React.ReactNode;
}) {
  return (
    <div className="flex p-5 h-full">
      <AuthComp />
      <div className="lg:w-[26%] md:w-[80%] md:m-auto  w-full">
        <Image src="/authpageLogo.png" width={250} height={250} alt="logo" className='md:w-[70%]'  />
        {children}
      </div>
    </div>
  );
}
