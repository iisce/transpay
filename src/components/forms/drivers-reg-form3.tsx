"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const driverFormSchema = z.object({
  licenceBearerName: z.string({
    description: "Enter your licence name",
  }),

  licenceNumber: z.string(),
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

export default function DriverForm3() {
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
            name="licenceBearerName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-title1Bold pl-4">
                  Licence Bearer Name
                </FormLabel>

                <FormControl>
                  <Input
                    className="relative text-body flex  items-center h-14 rounded-2xl"
                    {...field}
                    type="text"
                    placeholder="Licence Name"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="licenceNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-title1Bold pl-4">
                  Licence Number
                </FormLabel>

                <FormControl>
                  <Input
                    className="relative text-body flex  items-center h-14 rounded-2xl"
                    {...field}
                    type="text"
                    placeholder="Licence Number"
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
            className="p-4 py-2 rounded-normal "
          >
            <Link href={"/dashboard/drivers/add-new2"}>Back</Link>
          </Button>
          <Button
            variant={"outline"}
            size="lg"
            type="button"
            asChild
            className="p-4 py-2 rounded-normal"
          >
            <Link href={"/dashboard/drivers"}>Add Driver</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
