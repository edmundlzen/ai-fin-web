import { Box, Emoji } from ".";

export default function FinancialGoalCard({
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
