import {
  CrudFinancialGoalModal,
  Box,
  Emoji,
  FinancialGoalCard,
} from "~/components";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import TopBar from "~/components/TopBar";
import { useQuery } from "@apollo/client";
import { RiskTolerance, UserInfo } from "~/gql/graphql";
import { GET_EXISTING_USER_INFO } from "./quiz";
import useAuth from "~/hooks/useAuth";
import { AnnualIncomeToAverage } from "./admin";
import { graphql } from "~/gql";

const GET_AI_RECOMMENDATION = graphql(`
  query AiStrategy {
    aiStrategy {
      expensesRatio
      turnoverRatio
      unitTrustFundRecommendations {
        fundName
        imageUrl
        expenseRatio
        turnoverRatio
        riskLevel
        phsUrl
      }
    }
  }
`);

export default function AiStrategy() {
  const circleRadius = 50;
  const totalSpace = 0.2;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const maxCircleCircumference = circleCircumference * 0.75;
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  const { data, loading } = useQuery<
    {
      user: {
        username: string;
        user_info: UserInfo;
      };
    },
    { userId: string }
  >(GET_EXISTING_USER_INFO, {
    variables: { userId: useAuth().userId ?? "" },
  });
  const {
    data: aiRecommendationData,
    loading: aiRecommendationLoading,
    error: aiRecommendationError,
    refetch: refetchAiRecommendation,
  } = useQuery<{
    aiStrategy: {
      expensesRatio: number;
      turnoverRatio: number;
      unitTrustFundRecommendations: {
        fundName: string;
        imageUrl: string;
        expenseRatio: number;
        turnoverRatio: number;
        riskLevel: string;
        phsUrl: string;
      }[];
    };
  }>(GET_AI_RECOMMENDATION);

  if (!data || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

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
                <rect
                  width="16"
                  height="16"
                  fill={
                    data.user.user_info.risk_tolerance === RiskTolerance.Low
                      ? "#00bfa6"
                      : data.user.user_info.risk_tolerance ===
                          RiskTolerance.Medium
                        ? "#fff973"
                        : "#ff5f5f"
                  }
                />
                <image
                  xlinkHref={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='${
                    data.user.user_info.risk_tolerance === RiskTolerance.Low
                      ? "%2300DEC0"
                      : data.user.user_info.risk_tolerance ===
                          RiskTolerance.Medium
                        ? "%23E3E300"
                        : "%23FF0000"
                  }' fill-opacity='1.0'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E`}
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
              {data.user.user_info.risk_tolerance === RiskTolerance.Low
                ? "Low"
                : data.user.user_info.risk_tolerance === RiskTolerance.Medium
                  ? "Moderate"
                  : "High"}{" "}
              Risk Strategy
            </span>
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold capitalize">
            Hi {data.user.username}!
          </div>
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
              RM
              {(
                AnnualIncomeToAverage[
                  data.user.user_info
                    .annual_income as keyof typeof AnnualIncomeToAverage
                ] / 12
              ).toFixed(0)}
            </span>
            , we recommend investing{" "}
            {data.user.user_info.risk_tolerance === RiskTolerance.Low
              ? "10"
              : data.user.user_info.risk_tolerance === RiskTolerance.Medium
                ? "20"
                : "30"}
            % of it to unit trust funds with the following criteria:
          </div>
          {aiRecommendationLoading ? (
            <div className="mt-4 text-2xl font-bold">Loading...</div>
          ) : (
            <>
              <div className="mt-5 text-lg font-semibold leading-6">
                Expenses ratio: &lt;{" "}
                {aiRecommendationData?.aiStrategy?.expensesRatio}%
                <br />
                Turnover ratio: &lt;{" "}
                {aiRecommendationData?.aiStrategy?.turnoverRatio}%
              </div>
              <div className="mt-5 text-sm font-medium">
                We have suggested a few unit trust funds for you based on these
                criteria.
              </div>
            </>
          )}
        </div>
      </Box>
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-start justify-center p-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Recommended Unit Trust Funds
        </h2>
        <h3 className="-mt-1 text-sm font-medium text-secondary-text">
          based on your financial status
        </h3>
        <div className="mt-4 flex w-full flex-col gap-y-4">
          {aiRecommendationData?.aiStrategy?.unitTrustFundRecommendations.map(
            (fund, index) => (
              <RecommendedFundCard
                key={index}
                fundName={fund.fundName}
                imageUrl={fund.imageUrl}
                expenseRatio={fund.expenseRatio}
                turnoverRatio={fund.turnoverRatio}
                riskLevel={fund.riskLevel}
                phsUrl={fund.phsUrl}
              />
            ),
          )}
        </div>
      </Box>
    </main>
  );
}

const RecommendedFundCard = ({
  fundName,
  imageUrl,
  expenseRatio,
  turnoverRatio,
  riskLevel,
  phsUrl,
}: {
  fundName: string;
  imageUrl: string;
  expenseRatio: number;
  turnoverRatio: number;
  riskLevel: string;
  phsUrl: string;
}) => {
  return (
    <Box className="flex w-full flex-col items-start justify-center p-1">
      <div className="flex items-center justify-center">
        <img
          className="w-16"
          src={imageUrl || "https://via.placeholder.com/150"}
        />
        <div className="ml-3 flex-1 text-lg font-semibold capitalize leading-snug">
          {fundName.toLowerCase()}
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
          <div className="text-3xl font-medium">{expenseRatio.toFixed(2)}%</div>
        </div>
        <Icon
          icon="streamline:graph"
          className="flex items-center justify-center stroke-[0.7] text-4xl text-primary"
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-xs uppercase text-secondary-text">
            Standard Deviation
          </div>
          <div className="text-3xl font-medium">{turnoverRatio.toFixed(2)}</div>
        </div>
        <Icon
          icon="icon-park-outline:caution"
          className="flex items-center justify-center stroke-[0.7] text-4xl text-primary"
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-xs uppercase text-secondary-text">
            Risk Level
          </div>
          <div className="text-3xl font-medium">{riskLevel}</div>
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col gap-y-4">
        <a
          href={"/phs/" + `phs_${fundName}.pdf`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary m-3 rounded-xl p-3 px-5"
        >
          PHS
          <Icon icon="ph:link-bold" className="ml-1 text-primary" />
        </a>
        {/* <button className="flex items-center justify-center rounded-xl border border-secondary bg-tertiary p-3 px-5 text-sm font-bold text-primary transition-all hover:scale-95 active:scale-90">
          Prospectus
          <Icon icon="ph:link-bold" className="ml-1 text-primary" />
        </button> */}
      </div>
    </Box>
  );
};
