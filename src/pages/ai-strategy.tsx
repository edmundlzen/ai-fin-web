import {
  CrudFinancialGoalModal,
  Box,
  Emoji,
  FinancialGoalCard,
} from "~/components";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import TopBar from "~/components/TopBar";

export default function AiStrategy() {
  const circleRadius = 50;
  const totalSpace = 0.2;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const maxCircleCircumference = circleCircumference * 0.75;
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <TopBar title="AI Strategy" />
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-start justify-center p-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Based on your financial status
        </h2>
        <div className="relative ml-auto mr-auto">
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
          <div className="text-md absolute -top-2 left-0 flex h-full w-full flex-col items-center justify-center px-16 text-center">
            We recommend a
            <span className="text-2xl font-semibold">
              Moderate Risk Strategy
            </span>
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold">Hi Jim!</div>
          <div className="text-sm font-medium">
            Based on your monthly income of{" "}
            <span
              className="underline underline-offset-0"
              style={{
                textDecorationThickness: "0.3em",
                textDecorationColor: "rgba(148, 178, 255, 0.6)",
                textDecorationSkipInk: "none",
              }}
            >
              RM5,000
            </span>
            , we recommend investing 10% of it to unit trust funds with the
            following criteria:
          </div>
          <div className="mt-5 text-lg font-semibold leading-6">
            Expenses ratio: &lt; 0.5%
            <br />
            Standard deviation: &lt; 1.0
          </div>
          <div className="mt-5 text-sm font-medium">
            We have suggested a few unit trust funds for you based on these
            criteria.
          </div>
        </div>
      </Box>
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-start justify-center p-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Recommended Unit Trust Funds
        </h2>
        <h3 className="-mt-1 text-sm font-medium text-secondary-text">
          based on your financial status
        </h3>
        <div className="mt-4 w-full">
          <Box className="flex w-full flex-col items-start justify-center p-1">
            <div className="flex items-center justify-center">
              <img
                className="w-16"
                src="https://upload.wikimedia.org/wikipedia/ms/9/9d/Public.gif"
              />
              <div className="ml-3 flex-1 text-lg font-semibold leading-snug">
                Public Advantage Growth Equity Fund
              </div>
            </div>
            <div className="mt-2 grid w-full grid-cols-[20%_80%] gap-x-3 gap-y-2">
              <Icon
                icon="streamline:calculator-2"
                className="flex items-center justify-center stroke-[0.7] text-4xl text-primary"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-xs uppercase text-secondary-text">
                  Expenses Ratio
                </div>
                <div className="text-3xl font-medium">0.4%</div>
              </div>
              <Icon
                icon="streamline:graph"
                className="flex items-center justify-center stroke-[0.7] text-4xl text-primary"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-xs uppercase text-secondary-text">
                  Standard Deviation
                </div>
                <div className="text-3xl font-medium">0.85</div>
              </div>
              <Icon
                icon="icon-park-outline:caution"
                className="flex items-center justify-center stroke-[0.7] text-4xl text-primary"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-xs uppercase text-secondary-text">
                  Risk Level
                </div>
                <div className="text-3xl font-medium">Moderate</div>
              </div>
            </div>
            <div className="mt-8 flex w-full flex-col gap-y-4">
              <button className="flex items-center justify-center rounded-xl border border-secondary bg-tertiary p-3 px-5 text-sm font-bold text-primary transition-all hover:scale-95 active:scale-90">
                PHS
                <Icon icon="ph:link-bold" className="ml-1 text-primary" />
              </button>
              <button className="flex items-center justify-center rounded-xl border border-secondary bg-tertiary p-3 px-5 text-sm font-bold text-primary transition-all hover:scale-95 active:scale-90">
                Prospectus
                <Icon icon="ph:link-bold" className="ml-1 text-primary" />
              </button>
            </div>
          </Box>
        </div>
      </Box>
    </main>
  );
}
