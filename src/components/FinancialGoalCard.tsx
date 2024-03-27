import { FinancialGoal, Wallet } from "~/gql/graphql";
import { Box, Emoji } from ".";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// export type Transaction = {
//   __typename?: 'Transaction';
//   amount: Scalars['Int']['output'];
//   financial_goal: FinancialGoal;
//   financial_goal_id: Scalars['String']['output'];
//   id: Scalars['String']['output'];
//   wallet: Wallet;
//   wallet_id: Scalars['String']['output'];
// };

dayjs.extend(relativeTime);

export default function FinancialGoalCard({
  financialGoal,
  wallet,
  onClick,
}: {
  financialGoal: FinancialGoal;
  wallet: Wallet;
  onClick?: () => void;
}) {
  const totalSavedAmount = wallet.transactions.reduce(
    (acc, transaction) =>
      transaction.financial_goal_id === financialGoal.id
        ? acc + transaction.amount
        : acc,
    0,
  );
  const thisMonthSavedAmount = wallet.transactions.reduce(
    (acc, transaction) =>
      transaction.financial_goal_id === financialGoal.id &&
      new Date(transaction.createdAt as string).getMonth() ===
        new Date().getMonth()
        ? acc + transaction.amount
        : acc,
    0,
  );
  const oldSavedAmount = totalSavedAmount - thisMonthSavedAmount;
  const percentageGrowthFromLastMonth =
    totalSavedAmount === 0 && thisMonthSavedAmount === 0
      ? 0
      : totalSavedAmount === 0
        ? 100
        : Math.round(
            ((thisMonthSavedAmount - totalSavedAmount) / totalSavedAmount) *
              100,
          );
  const deadline = dayjs(financialGoal.createdAt as string).add(
    financialGoal.months_to_reach_goal,
    "month",
  );
  const idealMonthlyGoal =
    financialGoal.amount / financialGoal.months_to_reach_goal;
  const monthsLeft = // Calculate using supposed monthly goal, target achieve date and current saved amount
    financialGoal.amount - totalSavedAmount > 0
      ? (financialGoal.amount - totalSavedAmount) / idealMonthlyGoal
      : 0;
  const daysLeft = monthsLeft * 30;
  const thisMonthGoal =
    financialGoal.amount - totalSavedAmount < idealMonthlyGoal
      ? financialGoal.amount - totalSavedAmount
      : idealMonthlyGoal;
  const netThisMonth = -thisMonthGoal + thisMonthSavedAmount;

  return (
    <Box
      className="flex w-full cursor-pointer flex-col items-center justify-start transition-all hover:scale-95 active:scale-90"
      onClick={onClick}
    >
      <div className="flex w-full flex-col items-center justify-start p-2">
        <div className="flex h-12 w-full items-center">
          <Emoji name={financialGoal.emoji} className="h-full" />
          <div className="ml-3 mr-2 min-w-0 flex-grow">
            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
              {financialGoal.name}
            </h3>
            <h4 className="text-sm font-semibold text-secondary-text">
              {dayjs().to(dayjs().add(monthsLeft, "months"))}
            </h4>
          </div>
          <div className="w-fit">
            <h3
              className={
                "text-2xl font-bold" +
                " " +
                (percentageGrowthFromLastMonth === 0
                  ? "text-tertiary-text"
                  : percentageGrowthFromLastMonth > 0
                    ? "text-positive"
                    : "text-negative")
              }
            >
              {percentageGrowthFromLastMonth === 0
                ? ""
                : percentageGrowthFromLastMonth > 0
                  ? "+"
                  : "-"}
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
              RM {thisMonthSavedAmount}
              <span className="text-xs font-medium">
                /RM {thisMonthGoal.toFixed(2)}
              </span>
            </h3>
          </div>
          <div className="ml-4">
            <h4 className="font-semibold">
              {netThisMonth > 0 ? "Ahead by" : "Remaining"}
            </h4>
            <h3
              className={
                "text-3xl font-bold" +
                " " +
                (netThisMonth === 0
                  ? "text-tertiary-text"
                  : netThisMonth > 0
                    ? "text-positive"
                    : "text-negative")
              }
            >
              {(netThisMonth !== 0 ? "RM" : "-") +
                (netThisMonth !== 0 ? Math.abs(netThisMonth).toFixed(2) : "")}
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-3 flex w-full items-end justify-between px-2">
        <div className="font-medium text-tertiary-text">
          RM{" "}
          {totalSavedAmount > financialGoal.amount
            ? financialGoal.amount
            : totalSavedAmount}{" "}
          <span className="text-xs font-normal text-tertiary-text">
            / RM{" "}
            {financialGoal.amount > totalSavedAmount
              ? financialGoal.amount
              : totalSavedAmount}
          </span>
        </div>
        <div className="text-sm font-medium text-tertiary-text">
          {Math.round((totalSavedAmount / financialGoal.amount) * 100)}%
        </div>
      </div>
      <div className="relative mt-1 h-2 w-full overflow-hidden rounded-b-md bg-[#e1e0e9]">
        <div
          className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#ff1f3d]"
          style={{
            width: `${((oldSavedAmount + thisMonthGoal) / financialGoal.amount) * 100}%`,
          }}
        />
        <div
          className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#02de1b]"
          style={{
            width: `${(totalSavedAmount / financialGoal.amount) * 100}%`,
          }}
        />
        <div
          className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#4277ff]"
          style={{
            width: `${(oldSavedAmount / financialGoal.amount) * 100}%`,
          }}
        />
      </div>
    </Box>
  );
}
