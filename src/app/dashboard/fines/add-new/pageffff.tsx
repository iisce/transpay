import { Button } from "@/components/ui/button";
import ButtonFines from "@/components/ui/buttonf";
import { addIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function NewFines() {
  return (
    <div className=" p-6 w-full h-full">
      <div className="p-8">
        <h1 className=" text-h2Bold ">Add New Fines</h1>
        <p className=" text-title2Bold">Fill in Offence Information</p>
      </div>
      <div>
        <Button
          className="justify-start rounded-xl w-full"
          asChild
          variant={"default"}
        >
          <Link
            href={"/dashboard/fines/edit-fines"}
            className="shrink-0 whitespace-nowrap h-16"
          >
            <div className="mr-2 h-4 w-4 shrink-0 bg-black">{addIcon}</div>
            OFFENCE & PENALTY DETAILS
          </Link>
        </Button>
      </div>
      <div className="grid">
        <label className=" text-title2Bold">Offence Title</label>
        <input className=" rounded-xl h-16 items-center shrink-0 bg-[#F6F5EA] " 
        type="text" placeholder="Title" />
      </div>
      <div className="grid">
        <label className=" text-title2Bold">Offence Category</label>
        <select className=" bg-[#F6F5EA] h-16 rounded-xl shrink-0">
          <option>Select Category</option>
          <option>Select 2</option>
          <option>Select 4</option>
          <option>Select 5</option>
        </select>
      </div>
      <div className="grid">
        <label className=" text-title2Bold">Offence Definition</label>
        <input className=" rounded-xl h-20 shrink-0 bg-[#F6F5EA] " 
        type="text" placeholder="Definition" />
      </div>
      <div className="grid">
        <label className=" text-title2Bold">Fine / Penalties</label>
        <input className=" rounded-xl h-16 items-center shrink-0 bg-[#F6F5EA] " 
        type="text" placeholder="Penalties" />
      </div>
      <div className=" ">
        <Button
          className="justify-start rounded-xl"
          asChild
          variant={"default"}
          // onClick={}
        >
            <div className="mr-2 h-4 w-4 shrink-0">{addIcon}</div> 
            Add New Fines
        </Button>
      </div>
    </div>
  );
}
