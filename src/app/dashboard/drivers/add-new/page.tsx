import { AgentForm } from '@/components/forms/agents-registration-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { agentsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { AGENT_TABLE } from '@/lib/consts';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

export default function AddNewDriver() {
	return (
		<div className='p-5 gap-5 w-full h-full flex flex-col'>
			{/* <div className='flex justify-between'>
				<div className='shrink-0 grow-0'>Agent Name</div>
				<div className='shrink-0 grow-0'>
					<Button
						className='justify-start rounded-xl'
						asChild
						variant={'default'}
					>
						<Link
							href={'/dashboard/agents/add-new'}
							className='shrink-0 whitespace-nowrap'
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							Make an Admin
						</Link>
					</Button>
				</div>
			</div>
			<div className='flex flex-col gap-5 overflow-y-scroll'>
				<div className='space-y-6'>
					<div>
						<h3 className='text-lg font-medium'>Profile</h3>
						<p className='text-sm text-muted-foreground'>
							This is how others will see you on the site.
						</p>
					</div>
					<Separator />
					<AgentForm />
				</div>
			</div> */}
		</div>
	);
}
