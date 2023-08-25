import DriverForm from '@/components/forms/drivers-registration-form';
import ButtonDrivers from '@/components/ui/buttondriver';
import { addIcon, driversProgressIcon1 } from '@/lib/icons';
import React from 'react';

export default function AddNewDriver() {
	return (
		<div className="w-full overflow-y-scroll mb-8 p-12">
		  <div className="">
			<h1 className=" text-title1Bold py-2 ">Add New Driver</h1>
			<p className=" text-title2Bold pb-4">Fill in drivers details</p>
		  </div>
		  <div className=" text-primary-900">{driversProgressIcon1}</div>
		  <div className="py-6 text-h4">
			<ButtonDrivers
			  text="Driver's Information"
			  hasIcon
			  icon={addIcon}
			  variant="primary"
			/>
		  </div>
		  <div>
			<DriverForm />
		  </div>
		</div>
	  );	
}
