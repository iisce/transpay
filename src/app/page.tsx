import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import CarouselContainer from "@/components/pages/home/carousel";
import CarouselCard from "@/components/pages/home/carousel-card";
import { UserNav } from "@/components/shared/user-nav-bar";
import { Button } from "@/components/ui/button";
import Searchbar from "@/components/ui/searchbar";
import {
  BUS_IMAGE_SAMPLE,
  HOW_IT_WORKS,
  LANDING_CARD_CONTENTS,
} from "@/lib/consts";
import { getAgentMe } from "@/lib/controllers/agent-controller";
import { getUser } from "@/lib/controllers/users.controller";
import { getSSession } from "@/lib/get-data";
import { NigeriaIcon } from "@/lib/icons";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { options } from "./api/auth/options";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const session = await getServerSession(options);
  const user = await getUser(session?.user.id!);
  // if (!session?.user) return redirect('/sign-in');
  return (
    <main className="">
      <div className="h-20 w-full mx-auto  shrink-0 fixed bg-white/50 backdrop-blur z-50">
        <MaxWidthWrapper className="flex px-2 xl:px-0 items-center justify-between h-full w-full gap-1">
          <Link href={"/"} className="md:w-52 w-32 shrink-0 px-5">
            <Image
              src={"/logo.png"}
              height={30}
              width={150}
              className="shrink-0"
              alt="Transpay Logo"
            />
          </Link>
          <div className="flex xl:w-0 w-full items-center justify-end h-full gap-3">
            <Button
              asChild
              className="rounded-lg w-10 items-center md:w-32 bg-transparent"
              variant={"outline"}>
              <Link href={"/scan"}>Scan</Link>
            </Button>
            <div className="flex  gap-3 items-center justify-center text-primary-700">
              {session ? (
                <>
                  <Button asChild className="rounded-lg w-full lg:w-32">
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </Button>
                  {user && <UserNav user={user} />}
                </>
              ) : (
                <Button asChild className="rounded-lg w-full lg:w-32">
                  <Link href="/sign-in">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <div className="h-[100svh] flex flex-col items-start justify-between relative pt-24 gap-10">
        <NigeriaIcon className="absolute top-0 w-[50svw] h-full object-contain " />
        <div className="w-full max-w-lg lg:max-w-3xl mx-auto flex flex-col items-center px-5 lg:px-20 pt-5 gap-10 relative">
          <div className="shrink-0 flex flex-col items-center gap-2 lg:gap-5">
            <div className="flex flex-col items-center">
              <div className="text-2xl lg:text-5xl font-bold">
                Simplifying Levy Collection
              </div>
              <div className="text-2xl lg:text-5xl font-bold">
                for Commercial Vehicles
              </div>
            </div>
            <p className="text-center text-sm">
              {`Ensuring safe and easy collection of levies using simple and secure payment systems`}
            </p>
          </div>
          <Searchbar placeholder="Search Vehicle" variant="secondary" />
        </div>
        <div className="w-full h-[50svh] relative flex gap-3">
          <CarouselContainer />
        </div>
      </div>

      <div className="h-full px-4 md:px-4 md:h-[70svh] xl:h-[100svh] flex flex-col items-start justify-between mt-10  relative pt-24 gap-10">
        <NigeriaIcon className="absolute top-0 left-1/2 -translate-x-1/2 -z-30 w-[50svw] h-full object-contain " />
        <div className="mx-auto space-y-10">
          <h2 className="font-extrabold text-4xl ">{`Why Transpay?`}</h2>
          <div className="mx-auto md:max-w-7xl grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 ">
            {LANDING_CARD_CONTENTS.map((card, i) => (
              <Card className="bg-[#B9AB05] md:p-0 p-6 pt-10 rounded-xl" key={i}>
                <CardHeader>
                  <CardTitle className="text-background ">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-background">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full xl:h-[70svh] md:h-[50svh]  bg-primary flex flex-col items-start justify-between mt-10  relative pt-24 gap-10">
        <div className="px-4 md:px-4 mx-auto space-y-10 ">
          <h2 className="font-extrabold text-4xl text-background">{`How it works`}</h2>
          <div className="mx-auto  w-full md:max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((card, i) => (
              <div
                className=" py-6 pt-10  border-t-2 border-background text-start"
                key={i}>
                <div className="text-background flex flex-col space-y-1.5 py-6 text-2xl font-semibold leading-none tracking-tight ">
                  {card.title}
                </div>

                <div className="text-background text-sm  py-6 pt-0">
                  {card.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary h-full bottom-0 w-full shrink-0 relative  ">
        <div className="w-full h-10 bg-primary/20 flex justify-between items-center px-3 lg:px-9 ">
          <div className="font-bold">Contact Us</div>
          <div className="font-bold">Get Started Today!</div>
        </div>
        <div className="flex md:flex-row px-4 flex-col w-full  items-center md:justify-center xl:justify-between ">
          <div className="flex flex-col my-3 ">
            <p className="w-full text-md xl:w-96  md:w-full">
              {`For more information or to schedule a demo, please contact us at
			          support@transpaytms.com or call us at (+234) 816 345 3826.`}
            </p>
          </div>

          <div className="flex flex-col my-3 ">
            <p className="w-full  text-start  md:text-end font-bold xl:font-normal text-base md:w-96">{`Powered By ISCE Digital Concept`}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
