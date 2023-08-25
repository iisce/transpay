import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FinesCardP from "@/components/ui/fines-card";
import Searchbar from "@/components/ui/searchbar";
import { agentsColumns } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AGENT_TABLE, FINE_CARDS } from "@/lib/consts";
import { addIcon, dotsIcon } from "@/lib/icons";
import { ButtonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function Fines() {
  return (
    <div className="p-12 w-full flex flex-col gap-6 overflow-y-scroll">
      <div className="flex justify-between">
        <div className=" shrink-0 grow-0">Fines & Penalties</div>
        <div className=" shrink-0 grow-0">
          <Button
            className="justify-start rounded-xl"
            asChild
            variant={"default"}
          >
            <Link
              href={"/dashboard/fines/add-new"}
              className="shrink-0 whitespace-nowrap"
            >
              <div className="mr-2 h-4 w-4 shrink-0">{addIcon}</div>
              Add New Fines
            </Link>
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
	  <Tabs
					defaultValue='all'
					className='w-full'
				>
					
					<div className='flex flex-col gap-5'>
					<TabsList>
						<TabsTrigger
							className=''
							value='all'
						>
							All Penalties
						</TabsTrigger>
						<TabsTrigger value='categories'>Categories</TabsTrigger>
						<TabsTrigger value='inactive'>
	
						</TabsTrigger>
					</TabsList>
					<Searchbar 
					variant='secondary'
					placeholder='Search Penalties'
					/>
					</div>
					{/* <TabsContent value='all'>
						<DataTable
							showSearch
							columns={agentsColumns}
							data={AGENT_TABLE}
						/>
					</TabsContent>
					<TabsContent value='active'>
						<DataTable
							columns={agentsColumns}
							data={AGENT_TABLE.filter(
								(agent) => agent.status === 'active'
							)}
						/>
					</TabsContent>
					<TabsContent value='inactive'>
						<DataTable
							columns={agentsColumns}
							data={AGENT_TABLE.filter(
								(agent) => agent.status === 'inactive'
							)}
						/>
					</TabsContent> */}
				</Tabs>
	  </div>
	  <div className=" flex flex-wrap gap-4 w-full">
		{
			FINE_CARDS.map((fine, k)=>(
				<FinesCardP key={k} href={fine.href} amount={fine.amount} type={fine.type} title={fine.title} description={fine.description} />
			))
		}
	  </div>
    </div>
  );
}
