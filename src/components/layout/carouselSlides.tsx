import React from 'react'
import Image from "next/image";

interface SLIDESI{
    desc: string;
    images: any;
    author: string;
    title: string;
}

export default function CarouselSlides({ desc, images, author, title }: SLIDESI) {
  return (
    <>
      <p className="w-[77%] ">
        “{desc}”.
      </p>
      <div className="flex gap-4 mt-4">
        <Image src={images} height={40} width={50} alt="avater" />
        <div className="mt-2">
          <p className="text-body ">{author}</p>
          <p className="text-caption">{title}</p>
        </div>
      </div>
    </>
  );
}
