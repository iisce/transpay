import { QuestionMarkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

interface MANAGE_DETAILSI {
  title: string;
  link: string;
  description: string;
}

export function ManageDetails({ title, link, description }: MANAGE_DETAILSI) {
  return (
    <>
      <Link
        className="w-full h-[254px] lg:w-[439px] shadow-xl p-[30px] bg-primary-50 hover:bg-primary-900 hover:text-white
         rounded-[20px]"
        href={link}
      >
        {" "}
        <h3 className="text-h4">{title}</h3>{" "}
        <p className="text-title1 mt-5"> {description} </p>{" "}
      </Link>
    </>
  );
}
export function ManageDetails2({ title, link, description }: MANAGE_DETAILSI) {
  return (
    <>
      <Link
        className="w-full p-[30px] shadow-xl h-[254px] mb-[40px] lg:w-[945px] lg:h-[181px] bg-primary-50 rounded-[20px] hover:bg-primary-900 hover:text-white"
        href={link}
      >
        {" "}
        <h3 className="text-h4">{title}</h3>{" "}
        <p className="text-title1 mt-5"> {description}</p>{" "}
      </Link>
    </>
  );
}
