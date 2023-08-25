import Image from "next/image";
import React from "react";

export default function AuthComp() {
  return (
    <div className="hidden lg:inline w-[40%] h-full p-8 bg-gradient-to-b from-primary-900 to-[#978800] text-white rounded-[20px]">
      <p className="font-semibold text-[24px]">TRANSPAY</p>
      <div className="pt-[50px]">
        <h5 className="font-bold text-[40px]">
          Ensure Drivers are Checked with Maximum Road Safety!!!.
        </h5>
        <h2 className="my-[18px] text-base w-[70%]">
          Where drivers payment are checked and road safety is ensured and money
          can be tracked
        </h2>
        <div className="w-full bg-primary-900 h-[170px] p-4 rounded-[20px]">
          <p className="w-[77%]">
            “Accountability in a civilized society is the stepping stone to
            development and progressive Environment”.
          </p>
          <div className="flex gap-4 mt-4">
            <Image src="/avater.png" height={40} width={50} alt="avater" />
            <div className="mt-2">
              <p className="text-body">ISCE Digital Concepts</p>
              <p className="text-caption">Governor Anambra state</p>
            </div>
          </div>
        </div>
        <div className="flex gap-1 justify-center mt-8">
          <div className="bg-white w-10 h-2 rounded-sm"></div>
          <div className="bg-white w-2 h-2 rounded-sm"></div>
          <div className="bg-white w-2 h-2 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
