"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const driverFormSchema = z.object({
   
  colour: z.string({
    description: "Enter your vehicle colour.",
  }),
  heavyVehicle: z
    .string()
    .refine(
      (value) =>
        ["bus", "car", "keke", "heavyVehicle"].includes(value),
      {
        message: "Invalid means of identification.",
      }
    ),
  vehiclePlateNumber: z.string(),
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

export default function DriverForm2() {
  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: DriverFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="heavyVehicle"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-title1Bold pl-4"> Vehicle Category</FormLabel>
                
                <Select 
               defaultValue={field.value}>
                <FormControl>
                    
                    <SelectTrigger  className="relative text-body flex  items-center h-14 rounded-2xl">
                        <SelectValue placeholder='Select a means of identification'/>
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="keke">Keke</SelectItem>
                    <SelectItem value="heavyVehicle">Heavy Vehicles</SelectItem>
                </SelectContent>
               </Select>
               </FormItem>
            )}
          />

          <FormField
            name="colour"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-title1Bold pl-4">
                 Colour
                </FormLabel>

                <FormControl>
                  <Input
                    className="relative text-body flex  items-center h-14 rounded-2xl"
                    {...field}
                    type="text"
                    placeholder="colour"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="vehiclePlateNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-title1Bold pl-4">
                 Vehicle Plate Number
                </FormLabel>

                <FormControl>
                  <Input
                    className="relative text-body flex  items-center h-14 rounded-2xl"
                    {...field}
                    type="text"
                    placeholder="Plate Number"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center gap-6 text-title1Bold">
          <Button
            variant={"outline"}
            size="lg"
            type="button"
            asChild
            className="p-4 w-28 rounded-normal text-body "
          >
            <Link href={'/dashboard/drivers/add-new'}>
            Back
            </Link>
          </Button>
          <Button
            variant={"outline"}
            size="lg"
            type="button"
            asChild
            className="p-4 w-28 rounded-normal text-body bg-primary-800 text-white"
          >
            <Link href={'/dashboard/drivers/add-new3'}>
            Next
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

