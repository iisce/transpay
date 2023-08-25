"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { addIcon, successIcon } from "@/lib/icons";
import Link from "next/link";
import React from "react";

export default function AddNewFines() {
  return (
    <>
      <div className=" p-10 w-full h-full overflow-y-scroll">
        <div className=" py-4">
          <h1 className=" text-h2Bold ">Add New Fines</h1>
          <p className=" text-title2Bold">Fill in Offence Information</p>
        </div>
        <div className=" flex w-full h-14 items-center text-lg py-2 text-white bg-[#4D4100] rounded-3xl">
          <div className=" h-14 w-16 shrink-0 p-4 bg-black rounded-l-3xl">{addIcon}</div>
          <div className=" pl-4">OFFENCE & PENALTY DETAILS</div>
        </div>
        <div className="grid py-2">
          <label className=" text-title2Bold">Offence Title</label>
          <input
            className=" rounded-xl h-16 items-center shrink-0 bg-[#F6F5EA] "
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="grid py-2">
          <label className=" text-title2Bold">Offence Category</label>
          <select className=" bg-[#F6F5EA] h-16 rounded-xl shrink-0">
            <option>Select Category</option>
            <option>Select 2</option>
            <option>Select 4</option>
            <option>Select 5</option>
          </select>
        </div>
        <div className="grid py-2">
          <label className=" text-title2Bold">Offence Definition</label>
          <input
            className=" rounded-xl h-20 shrink-0 bg-[#F6F5EA] "
            type="text"
            placeholder="Definition"
          />
        </div>
        <div className="grid">
          <label className=" text-title2Bold">Fine / Penalties</label>
          <input
            className=" rounded-xl h-16 items-center shrink-0 bg-[#F6F5EA] "
            type="text"
            placeholder="Penalties"
          />
        </div>
        <div className=" flex gap-7 justify-center">
        <Button
						variant={'outline'}
						size='lg'
						type='button'
						asChild
						className=' rounded-xl w-24 '
					>
						<Link href={'/dashboard/fines/'}>
							Back
						</Link>
					</Button>
          <AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									 className="justify-start rounded-xl"
                   variant={"default"}
                   onClick={() => console.log("clicked")}
								>
									Add Fines
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader className='items-center'>
									<div className='text-center'>
										<div className='grid gap-2'>
											<div className=" text-green-600">
												{successIcon}
											</div>
											<div>
											FINE CREATED
											</div>
										</div>
									</div>
								</AlertDialogHeader>
								<AlertDialogFooter className='grid gap-3 '>
									<AlertDialogCancel
										asChild
										className='w-64 rounded-2xl'
									>
										<Link
											href={`/dashboard/fines/edit-fines`}
										>
											View Fine
										</Link>
									</AlertDialogCancel>
									<AlertDialogAction
										asChild
										className='w-64 rounded-2xl'
									>
										<Link
											href={`/dashboard`}
										>
											Dashboard
										</Link>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>

        </div>
        
        <Button
            className="justify-start rounded-xl w-full"
            asChild
            variant={"default"}
          >
            <Link
              href={"/dashboard/fines/edit-fines"}
              className="shrink-0 whitespace-nowrap h-16"
            ></Link>
          </Button>
          
      </div>
    </>
  );
}
