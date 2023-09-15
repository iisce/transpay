import {
  ManageDetails,
  ManageDetails2,
} from "@/components/layout/manageDetails";
import Image from "next/image";
import React from "react";

export default function ManageAccount() {
  return (
    <div className="w-full h-full flex items-center flex-col gap-4 overflow-y-scroll">
      <Image
        className="mt-4"
        src="/avater2.png"
        alt="avater"
        width="150"
        height="150"
      />
      <p className="text-h4Bold">Welcome, Agent ISCE</p>
      <p className="text-title1 text-center">
        Manage your account, view and edit personal information, change
        password.
      </p>
      <div className="flex w-full p-6 justify-center lg:flex-row flex-col gap-8 flex-wrap pb-10">
        <ManageDetails
          link=""
          title="Personal 
Information"
          description="View and edit your personal Information,
request for a change in location "
        />
        <ManageDetails
          link=""
          title="Security &
Password Change"
          description="Security Information and Request for a
change in password."
        />
        <ManageDetails2
          link=""
          title="About Us"
          description="Transpay is a government approved software developed to ensure safery and accountability
on the road..... Learn More"
        />
      </div>
    </div>
  );
}
