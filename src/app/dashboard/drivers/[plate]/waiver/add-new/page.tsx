import { DRIVER_TABLE } from '@/lib/consts';
import React from 'react'

export default function AddNewWaiver({ params }: { params: { plate: string } }) {
  const vehicle = DRIVER_TABLE.find((driver) => driver.plate === params.plate);
  console.log(vehicle);
  return (
    <div>Add New Waiver for {vehicle?.plate} driven by {vehicle?.name}</div>
  )
}
