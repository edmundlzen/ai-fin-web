import {
  AddFinancialGoalModal,
  Box,
  Emoji,
  FinancialGoalCard,
} from "~/components";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

export default function AiStrategy() {
  const circleRadius = 50;
  const totalSpace = 0.2;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const maxCircleCircumference = circleCircumference * 0.75;
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <div className="w-full">
        <h1 className="font-serif text-5xl">AI Strategy</h1>
      </div>
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-start justify-center gap-y-4 p-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Based on your financial status
        </h2>
        <div className="relative">
          <svg
            className="loader-svg"
            width="280"
            height="280"
            viewBox="0 0 130 130"
          >
            <defs>
              <pattern
                id="p1"
                patternUnits="userSpaceOnUse"
                width="16"
                height="16"
              >
                <rect width="16" height="16" fill="#fff973" />
                <image
                  xlinkHref="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23efef4c' fill-opacity='1.0'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E"
                  width="16"
                  height="16"
                />
              </pattern>
            </defs>
            <circle
              className="loader"
              stroke="url(#p1)"
              cx="65"
              cy="65"
              r={circleRadius}
              style={{
                strokeDasharray:
                  maxCircleCircumference -
                  (displayedPercentage * maxCircleCircumference) / 100 -
                  ((totalSpace / 2) *
                    maxCircleCircumference *
                    displayedPercentage) /
                    100 +
                  ", " +
                  circleCircumference,
                transform: `scaleX(-1) rotate(135deg)`,
              }}
            />
          </svg>
        </div>
      </Box>
    </main>
  );
}
