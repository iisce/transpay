"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addDriversColumns } from "@/components/ui/table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { ADDDRIVER_TABLE, DRIVER_TABLE } from "@/lib/consts";
import { addIcon, successIcon } from "@/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addDriverSchema = z.object({
  name: z.string({
    required_error: "Please enter name.",
  }),

  phone: z.string({
    required_error: "Please enter name.",
  }),
});
type AddDriverValues = z.infer<typeof addDriverSchema>;

const defaultValues: Partial<AddDriverValues> = {
  name: "",
  phone: "",
};

export default function AddDriver({ params }: { params: { plate: string } }) {
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const form = useForm<AddDriverValues>({
    resolver: zodResolver(addDriverSchema),
    defaultValues,
    mode: "onChange",
  });
  function onSubmit(data: AddDriverValues) {
    setOpen(false);
    setOpenSuccess(true);
  }
  const vehicle = DRIVER_TABLE.find((driver) => driver.plate === params.plate);

  return (
    <div className="w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 overflow-y-scroll">
      <div className="flex items-center justify-between">
        <div className="text-title1Bold py-6">
          ALL Drivers for verhicle owned by{vehicle?.name}
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              className="justify-start  text-white rounded-xl bg-primary-800"
              variant={"default"}
            >
              <div className="mr-2 h-4 w-4 shrink-0">{addIcon}</div>
              Add Driver
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add A New Driver</AlertDialogTitle>
              <AlertDialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mb-8 flex flex-col gap-5"
                  >
                    <div className="grid gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Driver Name"
                                {...field}
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter Driver Phone Number"
                                {...field}
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="my-4">
                        Cancel
                      </AlertDialogCancel>
                      <Button type="submit">Add Driver</Button>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <AlertDialogContent className="bg-secondary">
            <div className="w-60 mx-auto flex-col">
              <div className="flex flex-col items-center gap-5 mb-5">
                <div className="h-20 w-20 text-awesome-foreground">
                  {successIcon}
                </div>
                <div className="text-xl">Driver Successfully Added</div>
              </div>
              <div className="flex flex-col text-left whitespace-nowrap  mb-5">
                <div className="">Name: {form.getValues().name}</div>
                <div className="">Password: {form.getValues().phone}</div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setOpenSuccess(false);
                  }}
                  asChild
                  className="rounded-xl"
                >
                  <Link
                    href={`/dashboard/drivers/${vehicle?.plate}/add-driver`}
                  >
                    View Account
                  </Link>
                </Button>
                <Button asChild className="rounded-xl">
                  <Link href={`/dashboard/drivers/${vehicle?.plate}`}>
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex flex-col gap-2 mb-20">
        <div className="">
          <DataTable columns={addDriversColumns} data={ADDDRIVER_TABLE} />
        </div>
      </div>
    </div>
  );
}
