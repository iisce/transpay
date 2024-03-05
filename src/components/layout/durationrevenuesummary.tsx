import React from "react";

export default function DurationRevenueSummary({
  duration,
  totalDurationKekeRev,
  totalDurationSmallShuttleRev,
  totalDurationBigShuttleRev,
  totalDurationTrackerRev,
  lgaRevenueSummary,
}: IDurationSummary) {
  return (
    <div className="px-[20px]">
      <h2 className="text-title1Bold">{`${duration} REVENUE`}</h2>
      <div className="grid grid-cols-4 pt-3 gap-[30px]">
        <div className="bg-secondary shadow-md rounded-lg p-[15px]">
          <p className=" text-primary text-body ">Keke Revenue Value</p>
          <p className="text-title1 pt-[6px] ">{totalDurationKekeRev}</p>
        </div>
        <div className="bg-secondary shadow-md rounded-lg p-[15px]">
          <p className=" text-primary text-body ">
            Small Shuttle Revenue Value
          </p>
          <p className="text-title1 pt-[6px] ">
            {totalDurationSmallShuttleRev}
          </p>
        </div>
        <div className="bg-secondary shadow-md rounded-lg p-[15px]">
          <p className=" text-primary text-body ">Big Shuttle Revenue Value</p>
          <p className="text-title1 pt-[6px] ">{totalDurationBigShuttleRev}</p>
        </div>
        <div className="bg-secondary shadow-md rounded-lg p-[15px]">
          <p className=" text-primary text-body ">Tracker Revenue Value</p>
          <p className="text-title1 pt-[6px] ">{totalDurationTrackerRev}</p>
        </div>
      </div>
      <div className="rounded mt-[20px] bg-secondary">
        <table className="table-fixed w-full">
          <thead className="border-b text-[14px] text-left text-[#78716C]">
            <tr>
              <td className="px-[20px] py-[15px]">L.G.A.</td>
              <td className="px-[20px] py-[15px]">Total Revenue</td>
              <td className="px-[20px] py-[15px]">Keke Revenue</td>
              <td className="px-[20px] py-[15px]">Small Shuttle Revenue</td>
              <td className="px-[20px] py-[15px]">Big Shuttle Revenue</td>
              <td className="px-[20px] py-[15px]">Tracker Revenue</td>
            </tr>
          </thead>
          <tbody>
            {lgaRevenueSummary.map((lga, k) => (
              <tr key={k}>
                <td className="px-[20px] py-[15px]">{lga.lga}</td>
                <td className="px-[20px] py-[15px]">{lga.totalRev}</td>
                <td className="px-[20px] py-[15px]">{lga.kekeRev}</td>
                <td className="px-[20px] py-[15px]"> {lga.smallshuttleRev} </td>
                <td className="px-[20px] py-[15px]"> {lga.bigshuttleRev} </td>
                <td className="px-[20px] py-[15px]">{lga.trackerRev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
