import { CrudFinancialGoalModal, Box, Emoji } from "~/components";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import Chart from "~/components/Chart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import useAuth from "~/hooks/useAuth";
import { graphql } from "~/gql";
import { useMutation, useQuery } from "@apollo/client";
import {
  AdminData,
  AnnualIncome,
  DateData,
  NameData,
  User,
} from "~/gql/graphql";
import dayjs from "dayjs";
import TopBar from "~/components/TopBar";
import { styled } from "@mui/material";

const AnnualIncomeToAverage: Record<AnnualIncome, number> = {
  LessThan10K: 5000,
  From10KTo25K: 17500,
  From25KTo50K: 37500,
  From50KTo100K: 75000,
  From100KTo200K: 150000,
  MoreThan200K: 250000,
};

type SavingsData = {
  month: string;
  amount: number;
};

const GET_ADMIN_DATA = graphql(`
  query AdminData {
    adminData {
      totalUsersSavings {
        month
        year
        value
      }
      totalActiveUsers {
        month
        year
        value
      }
      totalUsers {
        month
        year
        value
      }
      newUsers {
        month
        year
        value
      }
      userAnnualIncomeStats {
        name
        value
      }
      userLiabilitiesStats {
        name
        value
      }
      userMonthlyExpenseStats {
        name
        value
      }
    }
  }
`);

export default function Admin() {
  const { userId } = useAuth();
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const { data, loading, error, refetch } = useQuery<{ adminData: AdminData }>(
    GET_ADMIN_DATA,
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <CrudFinancialGoalModal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        onSuccess={() => {
          void refetch();
        }}
      />
      <TopBar title="Admin" />
      <DateDataChartView
        name="Total savings by users"
        prefix="RM"
        data={(
          JSON.parse(
            JSON.stringify(data.adminData.totalUsersSavings),
          ) as DateData[]
        ).reverse()}
      />
      <DateDataChartView
        name="Total active users"
        data={(
          JSON.parse(
            JSON.stringify(data.adminData.totalActiveUsers),
          ) as DateData[]
        ).reverse()}
      />
      <DateDataChartView
        name="Total new users"
        data={(
          JSON.parse(JSON.stringify(data.adminData.totalUsers)) as DateData[]
        ).reverse()}
      />
      <NameDataPieChartView
        name="User Annual Income Stats"
        data={data.adminData.userAnnualIncomeStats}
        average={
          +(
            data.adminData.userAnnualIncomeStats.reduce(
              (acc, cur) =>
                acc +
                AnnualIncomeToAverage[
                  cur.name as keyof typeof AnnualIncomeToAverage
                ] *
                  cur.value,
              0,
            ) /
            data.adminData.userAnnualIncomeStats.reduce(
              (acc, cur) => acc + cur.value,
              0,
            ) /
            1000
          ).toFixed(1)
        }
      />
    </main>
  );
}

function DateDataChartView({
  name,
  data,
  prefix,
}: {
  name: string;
  data: DateData[];
  prefix?: string;
}) {
  return (
    <Box className="min-h-1/5 flex h-fit w-full flex-col items-center p-3">
      <h2 className="w-full text-2xl font-bold tracking-tight">{name}</h2>
      <div className="flex w-full items-baseline">
        <h3 className="mt-1 text-4xl font-bold">
          {prefix} {data[data.length - 1]!.value.toLocaleString("en-MY")}
        </h3>
        <div className="ml-4 flex items-center justify-center gap-x-1 rounded-xl border border-positive-border bg-positive-background p-[0.1rem] px-1 text-xs font-bold text-positive">
          <Icon icon="ant-design:rise-outlined" className="text-positive" />
          {data[data.length - 2]!.value === 0
            ? "100"
            : (
                (data[data.length - 1]!.value / data[data.length - 2]!.value) *
                100
              ).toFixed(2)}
          %
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
                data: data.map((savings) => ({
                  month: dayjs()
                    .set("month", savings.month - 1)
                    .format("MMM"),
                  amount: savings.value,
                })),
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
  );
}

function NameDataPieChartView({
  name,
  data,
  average,
}: {
  name: string;
  data: NameData[];
  average: number;
}) {
  return (
    <Box className="min-h-1/5 flex h-fit w-full flex-col items-center p-3">
      <h2 className="w-full text-2xl font-bold tracking-tight">{name}</h2>
      <div className="h-96 w-full">
        <PieChart
          series={[
            {
              data: data.map((d, i) => ({
                id: i,
                value: d.value,
                label:
                  d.name +
                  " " +
                  ((
                    (d.value / data.reduce((acc, cur) => acc + cur.value, 0)) *
                    100
                  ).toFixed(0) +
                    "%"),
              })),
              innerRadius: 90,
              outerRadius: 120,
              paddingAngle:
                data
                  .filter((d) => d.value > 0)
                  .reduce((acc: string[], cur: NameData) => {
                    if (acc.includes(cur.name)) {
                      return acc;
                    }
                    return [...acc, cur.name];
                  }, []).length > 1
                  ? 5
                  : 0,
              cornerRadius: 6,
            },
          ]}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: -5,
            },
          }}
          options={{
            tooltip: {
              enabled: true,
            },
          }}
          margin={{
            top: -120,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <PieCenterLabel average={average} />
        </PieChart>
      </div>
    </Box>
  );
}

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ average }: { average: number }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      <tspan x={left + width / 2} y={top + height / 2} dy={-20}>
        Average
      </tspan>
      <tspan
        x={left + width / 2}
        y={top + height / 2}
        dy={10}
        className="text-3xl"
      >
        RM {average}k
      </tspan>
    </StyledText>
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
  amount: number;
}) {
  const circleRadius = 50;
  const totalSpace = 0.2;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const maxCircleCircumference = circleCircumference * 0.75;
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  useEffect(() => {
    console.log(
      (
        (displayedPercentage * maxCircleCircumference) / 100 -
        ((totalSpace / 2) *
          maxCircleCircumference *
          (100 - displayedPercentage)) /
          100
      )
        .toFixed(2)
        .toString() +
        ", " +
        circleCircumference.toFixed(2).toString(),
    );
    setDisplayedPercentage(Math.min(Math.max(percentage, 0), 100));
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
                  (
                    (displayedPercentage * maxCircleCircumference) / 100 -
                    ((totalSpace / 2) *
                      maxCircleCircumference *
                      (100 - displayedPercentage)) /
                      100
                  )
                    .toFixed(2)
                    .toString() +
                  ", " +
                  circleCircumference.toFixed(2).toString(),
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
                  (
                    (displayedPercentage * maxCircleCircumference) / 100 -
                    ((totalSpace / 2) *
                      maxCircleCircumference *
                      (100 - displayedPercentage)) /
                      100
                  ).toFixed(2) +
                  ", " +
                  circleCircumference.toFixed(2),
                transform: "rotate(135deg)",
              }}
            />
          </>
        )}
      </svg>
      <div className="absolute -top-2 left-0 flex h-full w-full flex-col items-center justify-center text-lg font-bold">
        Monthly goal
        <span className="text-3xl">RM {amount.toLocaleString("en-MY")}</span>
      </div>
    </div>
  );
}
