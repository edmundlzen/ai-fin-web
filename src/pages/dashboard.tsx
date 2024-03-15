import { Box, Emoji } from "~/components";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import Chart from "~/components/Chart";
import FinancialGoalCard from "~/components/FinancialGoalCard";

type SavingsData = {
  month: string;
  amount: number;
};

const TEST_SAVINGS_DATA = [
  {
    month: "Jan",
    amount: 1000,
  },
  {
    month: "Feb",
    amount: 2000,
  },
  {
    month: "Mar",
    amount: 7000,
  },
  {
    month: "Apr",
    amount: 2000,
  },
  {
    month: "May",
    amount: 9000,
  },
  {
    month: "Jun",
    amount: 2000,
  },
  {
    month: "Jul",
    amount: 3000,
  },
  {
    month: "Aug",
    amount: 1000,
  },
  {
    month: "Sep",
    amount: 9000,
  },
  {
    month: "Oct",
    amount: 2000,
  },
  {
    month: "Nov",
    amount: 11000,
  },
  {
    month: "Dec",
    amount: 12000,
  },
] as SavingsData[];

export default function Dashboard() {
  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <div className="w-full">
        <h1 className="font-serif text-5xl">Dashboard</h1>
      </div>
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-center p-3">
        <h2 className="w-full text-2xl font-bold tracking-tight">Hi Jim!</h2>
        <Message
          title="Monthly financial survey"
          message="Do you have time to help us answer these 5 questions?"
          link="/survey"
        />
      </Box>
      <Box className="min-h-1/5 flex h-fit w-full flex-col items-center p-3">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Financial Goals</h2>
          <button className="flex w-fit items-center rounded-lg p-1 pr-2 text-sm font-bold transition-all hover:bg-slate-100 active:scale-95">
            <Icon icon="bi:plus" className="text-2xl" />
            Add a new goal
          </button>
        </div>
        <div className="mt-2 flex w-full flex-col items-start justify-center gap-y-4">
          <FinancialGoalCard
            title="Dream House Fund"
            emoji="house"
            estimatedDate="5 months"
            percentageGrowthFromLastMonth={8}
            currentMonthSavings={2000}
            currentMonthGoal={5000}
            targetAmount={100000}
            oldSavedAmount={50000}
          />
          <FinancialGoalCard
            title="New PC"
            emoji="laptop"
            estimatedDate="3 months"
            percentageGrowthFromLastMonth={20}
            currentMonthSavings={1000}
            currentMonthGoal={800}
            targetAmount={8000}
            oldSavedAmount={2000}
          />
          <FinancialGoalCard
            title="University fund"
            emoji="graduation-cap"
            estimatedDate="1 year 2 months"
            percentageGrowthFromLastMonth={1}
            currentMonthSavings={500}
            currentMonthGoal={500}
            targetAmount={100000}
            oldSavedAmount={100000 - 500}
          />
        </div>
      </Box>
      <Box className="flex h-fit w-full flex-col items-center p-3">
        <h2 className="w-full text-xl font-bold tracking-tight">
          Total saved this month
        </h2>
        <div className="flex w-full items-baseline">
          <h3 className="mt-1 text-4xl font-bold">RM 2,405</h3>
          <div className="ml-4 flex items-center justify-center gap-x-1 rounded-xl border border-positive-border bg-positive-background p-[0.1rem] px-1 text-xs font-bold text-positive">
            <Icon icon="ant-design:rise-outlined" className="text-positive" />
            25%
          </div>
          <div className="ml-2 text-xs text-tertiary-text">from last month</div>
        </div>
        <div className="mt-2">
          <CircleProgressBar percentage={90} amount="RM 2,500" />
        </div>
        <div className="mt-4 flex items-center gap-x-4">
          <div className="flex items-center text-sm text-tertiary-text">
            <div className="mr-1 h-4 w-4 rounded-md bg-[#3e48d0]" />
            Current saved
            <span className="ml-2 font-bold text-tertiary-text">67%</span>
          </div>
          <div className="flex items-center text-sm text-tertiary-text">
            <div className="mr-1 h-4 w-4 rounded-md bg-[#d9d9d9]" />
            Remaining
            <span className="ml-2 font-bold text-tertiary-text">33%</span>
          </div>
        </div>
      </Box>
      <Box className="min-h-1/5 flex h-fit w-full flex-col items-center p-3">
        <h2 className="w-full text-2xl font-bold tracking-tight">
          Recommended for you
        </h2>
        <Box className="mt-2 grid h-24 w-full grid-cols-3 gap-2 overflow-hidden">
          <img
            src="https://picsum.photos/500/300"
            alt="Random image"
            className="col-span-1 h-full w-full object-cover"
          />
          <div className="col-span-2 flex items-center justify-start">
            <p className="line-clamp-3 w-full text-pretty">
              Lorem ipsum dolor sit consectetur adipiscing elit. Nulla nec
              fringilla odio. Nulla facilisi. Nulla facilisi. Nulla facilisi.
            </p>
          </div>
        </Box>
      </Box>
      <Box className="min-h-1/5 flex h-fit w-full flex-col items-center p-3">
        <h2 className="w-full text-2xl font-bold tracking-tight">
          Total savings
        </h2>
        <div className="flex w-full items-baseline">
          <h3 className="mt-1 text-4xl font-bold">RM 58,999</h3>
          <div className="ml-4 flex items-center justify-center gap-x-1 rounded-xl border border-positive-border bg-positive-background p-[0.1rem] px-1 text-xs font-bold text-positive">
            <Icon icon="ant-design:rise-outlined" className="text-positive" />
            25%
          </div>
          <div className="ml-2 text-xs text-tertiary-text">from last month</div>
        </div>
        <div className="mt-2 h-48 w-full">
          <Chart
            className="flex items-center justify-center"
            options={{
              data: [
                {
                  label: "Savings",
                  data: TEST_SAVINGS_DATA,
                },
              ],
              primaryAxis: {
                getValue: (datum) => (datum as SavingsData).month,
                scaleType: "band",
              },
              secondaryAxes: [
                {
                  getValue: (datum) => (datum as SavingsData).amount,
                  scaleType: "linear",
                  elementType: "line",
                },
              ],
            }}
          />
        </div>
      </Box>
    </main>
  );
}

function Message({
  title,
  message,
  link,
}: {
  title: string;
  message: string;
  // TODO: Implement link
  link: string;
}) {
  return (
    <Box className="mt-2 flex w-full items-center justify-center p-3">
      <div className="mr-2 flex flex-1 flex-col">
        <h3 className="text-base font-semibold leading-tight">{title}</h3>
        <p className="mt-1 text-sm leading-tight">{message}</p>
      </div>
      <button className="flex w-fit items-center rounded-xl border border-secondary bg-tertiary p-3 px-5 text-sm font-bold text-primary">
        Open
        <Icon icon="ph:link-bold" className="ml-1 text-primary" />
      </button>
    </Box>
  );
}

function CircleProgressBar({
  percentage,
  amount,
}: {
  percentage: number;
  amount: string;
}) {
  const circleRadius = 50;
  const totalSpace = 0.2;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const maxCircleCircumference = circleCircumference * 0.75;
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  const delay = 0.5;

  useEffect(() => {
    setTimeout(() => {
      setDisplayedPercentage(percentage);
    }, delay * 1000);
  }, [percentage]);

  return (
    <div className="relative">
      <svg
        className="loader-svg"
        width="280"
        height="280"
        viewBox="0 0 130 130"
      >
        {displayedPercentage < 50 && (
          <>
            <circle
              className="loader primary"
              cx="65"
              cy="65"
              r={circleRadius}
              style={{
                strokeDasharray:
                  (displayedPercentage * maxCircleCircumference) / 100 -
                  ((totalSpace / 2) *
                    maxCircleCircumference *
                    (100 - displayedPercentage)) /
                    100 +
                  ", " +
                  circleCircumference,
                transform: "rotate(135deg)",
              }}
            />
            <circle
              className="loader grey"
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
          </>
        )}
        {displayedPercentage > 50 && (
          <>
            <circle
              className="loader grey"
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
            <circle
              className="loader primary"
              cx="65"
              cy="65"
              r={circleRadius}
              style={{
                strokeDasharray:
                  (displayedPercentage * maxCircleCircumference) / 100 -
                  ((totalSpace / 2) *
                    maxCircleCircumference *
                    (100 - displayedPercentage)) /
                    100 +
                  ", " +
                  circleCircumference,
                transform: "rotate(135deg)",
              }}
            />
          </>
        )}
      </svg>
      <div className="absolute -top-2 left-0 flex h-full w-full flex-col items-center justify-center text-lg font-bold">
        Monthly goal
        <span className="text-3xl">{amount}</span>
      </div>
    </div>
  );
}
