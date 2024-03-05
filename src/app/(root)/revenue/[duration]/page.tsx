import DurationRevenueSummary from "@/components/layout/durationrevenuesummary";
import { DURATIONREVENUESUMMARY } from "@/lib/consts";
import React from "react";

export default function Duration({ params }: { params: { duration: string } }) {
  return (
    <div className="">
      {/* {params.duration} */}
      {DURATIONREVENUESUMMARY.map((value, k) => (
        <DurationRevenueSummary
          key={k}
          duration={value.duration}
          totalDurationKekeRev={value.totalDurationKekeRev}
          totalDurationSmallShuttleRev={value.totalDurationSmallShuttleRev}
          totalDurationBigShuttleRev={value.totalDurationBigShuttleRev}
          totalDurationTrackerRev={value.totalDurationTrackerRev}
          lgaRevenueSummary={value.lgaRevenueSummary}
        />
      ))}
    </div>
  );
}
