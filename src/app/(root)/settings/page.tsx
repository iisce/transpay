import { SettingsForm } from '@/components/forms/new-settings-form';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { settingsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import {
	getSettings,
	//  mainJobs
} from '@/lib/controllers/setting-controller';
import { PlusIcon } from 'lucide-react';
import React from 'react';

export default async function SuperAdminSettingsPage() {
	const settings = await getSettings();
	// const gary = await mainJobs();

	// console.log(settings);
	// console.log(gary);
	return (
		<div className='w-full flex flex-col px-3'>
			<div className='w-full flex gap-5 justify-between'>
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<PlusIcon className='h-5 w-5' />{' '}
							<span className='hidden md:block'>
								New Setting
							</span>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<SettingsForm />
						{/* <DialogFooter>
							<DialogCancel>Cancel</DialogCancel>
						</DialogFooter> */}
					</DialogContent>
				</Dialog>
				<div className='flex gap-2'>
					<Button className='gap-1'>
						<span className='hidden md:block'>Enable</span>{' '}
						All <span className='hidden md:block'>Jobs</span>
					</Button>
					<Button className='gap-1'>
						<span className='hidden md:block'>Enable</span>{' '}
						Main <span className='hidden md:block'>Jobs</span>
					</Button>
				</div>
			</div>
			<Separator className='my-4' />

			{!settings || settings?.length === 0 ? (
				<div className=''>No settings available</div>
			) : (
				<DataTable
					showSearch
					searchWith='name'
					searchWithPlaceholder='Search with name'
					showColumns
					showPagination
					columns={settingsColumns}
					data={settings || []}
				/>
			)}
		</div>
	);
}
