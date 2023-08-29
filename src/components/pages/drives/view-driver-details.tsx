import DashboardCard from "@/components/layout/dashboard-card";
import { viewDriversColumns } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import {  DRIVERS_CARD, VIEWDRIVER_TABLE } from "@/lib/consts";
import Link from "next/link";
import React from "react";

export default function ViewDriverDetails() {
  return (
    <div className="h-full p-6 flex flex-col gap-6 ">
      <div className="text-title1Bold">
        <h2>Mr, Owadie Omorogbe</h2>
      </div>
      <div className="flex flex-row flex-wrap gap-6 rounded-3xl shadow-xl">
        {DRIVERS_CARD.map((card: DashboardCardI, i) => (
          <DashboardCard
            key={i}
            name={card.name}
            href={card.href}
            image={card.image}
            description={card.description}
          />
        ))}
      </div>
      <div className="flex flex-col gap-5 overflow-y-scroll">
      <div className='flex flex-col gap-2 mb-20'>
					<div className='flex justify-between py-2'>
						<div className='shrink-0 grow-0 text-title1Bold'>
          History
						</div>
						<div className='shrink-0 grow-0 text-title1Bold'>
              <Link href={'/'} className="text-primary-800 underline">
                See all
              </Link>
            </div>
					</div>
					<div className=''>
						<DataTable
							columns={viewDriversColumns}
							data={VIEWDRIVER_TABLE}
						/>
					</div>
				</div>
      </div>
    </div>
  );
}
