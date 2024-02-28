import { Box, Emoji } from "~/components";
import { Icon } from "@iconify-icon/react";

export default function Dashboard() {
  return (
    <main className="bg-background flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll p-4 first-letter:items-center">
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
        <FinancialGoalCard
          title="Dream House Fund"
          emoji="house"
          estimatedDate="5 months"
          percentageGrowthFromLastMonth={8}
          currentMonthSavings={2000}
          currentMonthGoal={2500}
          targetAmount={150000}
          oldSavedAmount={90000}
        />
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
    <Box className="flex w-full flex-col items-center justify-start p-2">
      <div className="flex h-12 w-full items-center">
        <Emoji name={emoji} className="h-full" />
        <div className="ml-3 mr-2 min-w-0 flex-grow">
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
            {title}
          </h3>
          <h4 className="text-secondary-text text-sm font-semibold">
            {estimatedDate}
          </h4>
        </div>
        <div className="w-fit flex-1">
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
          <h4 className="whitespace-nowrap text-xs font-semibold">
            from last m.
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
          <h4 className="font-semibold">Remaining</h4>
          <h3 className="text-3xl font-bold">RM 500</h3>
        </div>
      </div>
    </Box>
  );
}
