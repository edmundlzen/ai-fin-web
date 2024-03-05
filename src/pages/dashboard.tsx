import { Box, Emoji } from "~/components";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";

const TEST_SAVINGS_DATA = [
  2000, 3000, 4000, 3000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000,
];

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
        <div className="mt-2">chart</div>
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

function FinancialGoalCard({
  title,
  emoji,
  estimatedDate,
  percentageGrowthFromLastMonth,
  currentMonthSavings,
  currentMonthGoal,
  targetAmount,
  oldSavedAmount,
}: {
  title: string;
  emoji: string;
  estimatedDate: string;
  percentageGrowthFromLastMonth: number;
  currentMonthSavings: number;
  currentMonthGoal: number;
  targetAmount: number;
  oldSavedAmount: number;
}) {
  return (
    <Box className="flex w-full flex-col items-center justify-start">
      <div className="flex w-full flex-col items-center justify-start p-2">
        <div className="flex h-12 w-full items-center">
          <Emoji name={emoji} className="h-full" />
          <div className="ml-3 mr-2 min-w-0 flex-grow">
            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
              {title}
            </h3>
            <h4 className="text-sm font-semibold text-secondary-text">
              {estimatedDate}
            </h4>
          </div>
          <div className="w-fit">
            <h3
              className={
                "text-2xl font-bold" +
                " " +
                (percentageGrowthFromLastMonth > 0
                  ? "text-positive"
                  : "text-negative")
              }
            >
              {percentageGrowthFromLastMonth > 0 ? "+" : "-"}
              {percentageGrowthFromLastMonth}%
            </h3>
            <h4 className="whitespace-nowrap text-xs text-tertiary-text">
              from last month
            </h4>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-between overflow-x-scroll whitespace-nowrap">
          <div>
            <h4 className="font-semibold">This month</h4>
            <h3 className="text-3xl font-bold">
              RM 2,000<span className="text-xs font-medium">/RM 2,500</span>
            </h3>
          </div>
          <div className="ml-4">
            <h4 className="font-semibold">
              {currentMonthSavings - currentMonthGoal > 0
                ? "Ahead by"
                : "Remaining"}
            </h4>
            <h3
              className={
                "text-3xl font-bold" +
                " " +
                (currentMonthSavings - currentMonthGoal === 0
                  ? "text-tertiary-text"
                  : currentMonthSavings - currentMonthGoal > 0
                    ? "text-positive"
                    : "text-negative")
              }
            >
              {(currentMonthSavings - currentMonthGoal !== 0 ? "RM" : "-") +
                (currentMonthSavings - currentMonthGoal
                  ? Math.abs(currentMonthSavings - currentMonthGoal)
                  : "")}
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-3 flex w-full items-end justify-between px-2">
        <div className="font-medium text-tertiary-text">
          RM 98,999{" "}
          <span className="text-xs font-normal text-tertiary-text">
            / RM 150,000
          </span>
        </div>
        <div className="text-sm font-medium text-tertiary-text">
          {Math.round(
            ((oldSavedAmount + currentMonthSavings) / targetAmount) * 100,
          )}
          %
        </div>
      </div>
      <div className="relative mt-1 h-2 w-full overflow-hidden rounded-b-md bg-[#e1e0e9]">
        <div
          className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#ff1f3d]"
          style={{
            width: `${((oldSavedAmount + currentMonthGoal) / targetAmount) * 100}%`,
          }}
        />
        <div
          className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#02de1b]"
          style={{
            width: `${((oldSavedAmount + currentMonthSavings) / targetAmount) * 100}%`,
          }}
        />
        <div
          className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#4277ff]"
          style={{
            width: `${(oldSavedAmount / targetAmount) * 100}%`,
          }}
        />
      </div>
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
