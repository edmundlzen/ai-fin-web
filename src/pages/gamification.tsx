import { Box, Emoji } from "~/components";
import { useMemo, useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { graphql } from "~/gql";
import useAuth from "~/hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client";
import level_exp_scaling from "~/constants/level_exp_scaling";
import { Task, TaskTiming, TaskType } from "~/gql/graphql";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Modal from "react-responsive-modal";
import TopBar from "~/components/TopBar";

const GET_USER_GAMIFICATION_INFO = graphql(`
  query UserGamificationInfo($userId: String!) {
    user(id: $userId) {
      level
      experience
      user_completed_task {
        taskId
        achieved
        lastClaimed
      }

      claimedVoucher {
        userId
        voucherId
        createdAt
        updatedAt
        code
      }
    }

    Task {
      id
      title
      description
      points
      requiredAmount
      createdAt
      updatedAt
      type
      timing
    }
  }
`);

const CLAIM_REWARD = graphql(`
  mutation ClaimReward($taskId: String!) {
    claimReward(taskId: $taskId) {
      success
    }
  }
`);

const GET_VOUCHERS = graphql(`
  query Voucher {
    Voucher {
      id
      imageUrl
      name
      levelRequired
      terms
      createdAt
      updatedAt
    }
  }
`);

const CLAIM_VOUCHER = graphql(`
  mutation ClaimVoucher($voucherId: String!) {
    claimVoucher(voucherId: $voucherId) {
      success
    }
  }
`);

export default function Gamification() {
  const activeTab = useState<"new" | "claimed">("new");

  const { userId } = useAuth();
  const [isShowVoucherCodeModalVisible, setIsShowVoucherCodeModalVisible] =
    useState(false);
  const [visibleVoucherCode, setVisibleVoucherCode] = useState("");
  const { data, loading, error, refetch } = useQuery<
    {
      user: {
        level: number;
        experience: number;
        user_completed_task: {
          taskId: string;
          achieved: number;
          lastClaimed: string;
        }[];
        claimedVoucher: {
          userId: string;
          voucherId: string;
          createdAt: string;
          updatedAt: string;
          code: string;
        }[];
      };
      Task: Task[];
    },
    { userId: string }
  >(GET_USER_GAMIFICATION_INFO, {
    variables: { userId: userId ?? "" },
  });
  const {
    data: vouchersData,
    loading: vouchersLoading,
    error: vouchersError,
    refetch: refetchVouchers,
  } = useQuery<
    {
      Voucher: {
        id: string;
        imageUrl: string;
        name: string;
        levelRequired: number;
        terms: string;
      }[];
    },
    Record<string, never>
  >(GET_VOUCHERS);
  const [claimReward] = useMutation<
    { claimReward: { success: boolean } },
    { taskId: string }
  >(CLAIM_REWARD);
  const [claimVoucher] = useMutation<
    { claimVoucher: { success: boolean } },
    { voucherId: string }
  >(CLAIM_VOUCHER);
  const eligibleVouchers = useMemo(() => {
    return data && vouchersData
      ? vouchersData?.Voucher.filter(
          (voucher) =>
            voucher.levelRequired <= data.user.level &&
            !data.user.claimedVoucher.find(
              (claimedVoucher) =>
                claimedVoucher.userId === userId &&
                claimedVoucher.voucherId === voucher.id,
            ),
        )
      : [];
  }, [vouchersData, data, userId]);

  return (
    <main className="flex min-h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <Modal
        open={isShowVoucherCodeModalVisible}
        onClose={() => setIsShowVoucherCodeModalVisible(false)}
        center
        showCloseIcon={false}
        classNames={{
          modal: "rounded-lg w-10/12",
        }}
      >
        <h2 className="text-xl font-semibold">Voucher Code</h2>
        <div className="mt-3">
          <p className="text-lg">Your voucher code is:</p>
          <div className="mt-4 h-fit rounded-md border border-black">
            <button
              className="btn btn-ghost w-full font-semibold hover:bg-transparent"
              onClick={() => {
                void navigator.clipboard.writeText(visibleVoucherCode);
                toast.success("Copied to clipboard!");
              }}
            >
              <span className="mr-2 font-mono">{visibleVoucherCode}</span>
              <Icon icon="akar-icons:copy" />
            </button>
          </div>
          <div className="mt-6 flex items-center justify-end">
            <button
              className="btn btn-primary w-full font-semibold"
              onClick={() => setIsShowVoucherCodeModalVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <TopBar title="Rewards" />
      <Box className="flex w-full flex-col items-start justify-start">
        <div className="mx-4 mt-3 flex items-center justify-center">
          <div>
            <Emoji name="glowing-star" className="h-14" />
          </div>
          <div className="ml-4 flex flex-col items-start justify-start">
            <h3 className="">Level</h3>
            <h4 className="text-3xl font-semibold">{data?.user.level}</h4>
          </div>
        </div>
        <div className="flex w-full items-end justify-end px-2">
          <div className="">
            {data?.user.experience}/
            {level_exp_scaling[data?.user.level ?? 1] ?? 0}{" "}
            <span className="text-xs font-normal">EXP</span>
          </div>
        </div>
        <div className="relative mt-1 h-2 w-full overflow-hidden rounded-b-md bg-[#e1e0e9]">
          <div
            className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#4277ff]"
            style={{
              width: `${((data?.user.experience ?? 0) / 1000) * 100}%`,
            }}
          />
        </div>
      </Box>
      <Box className="flex w-full flex-col items-start justify-start p-3">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <div className="mt-2 flex w-full flex-col items-start justify-start gap-y-4">
          {data?.Task.map((task) => (
            <TaskMessage
              key={task.id}
              title={task.title}
              message={task.description}
              currentProgress={
                data?.user.user_completed_task.find(
                  (userTask) => userTask.taskId === task.id,
                )?.achieved
              }
              requiredAmount={task.requiredAmount}
              link={
                task.type === TaskType.AchievingFinancialGoals
                  ? "/financial-goals"
                  : task.type === TaskType.ReadingArticles
                    ? "/market"
                    : task.type === TaskType.SavingMoney
                      ? "/financial-goals"
                      : ""
              }
              onClaimReward={async () => {
                await claimReward({ variables: { taskId: task.id } });
                await refetch();
                toast.success("Reward claimed successfully!");
              }}
              canClaim={(() => {
                const completedTask = data?.user.user_completed_task.find(
                  (userTask) => userTask.taskId === task.id,
                );
                if (!completedTask) {
                  return true;
                }
                switch (task.timing) {
                  case TaskTiming.Once:
                    return !completedTask.lastClaimed;
                  case TaskTiming.Daily:
                    return (
                      dayjs(completedTask.lastClaimed).isBefore(
                        dayjs().subtract(1, "day"),
                      ) || !completedTask.lastClaimed
                    );
                  case TaskTiming.Weekly:
                    return (
                      dayjs(completedTask.lastClaimed).isBefore(
                        dayjs().subtract(1, "week"),
                      ) || !completedTask.lastClaimed
                    );
                  case TaskTiming.Monthly:
                    return (
                      dayjs(completedTask.lastClaimed).isBefore(
                        dayjs().subtract(1, "month"),
                      ) || !completedTask.lastClaimed
                    );
                  default:
                    return false;
                }
              })()}
            />
          ))}
        </div>
      </Box>
      <Box className="flex h-fit w-full flex-col items-start justify-start overflow-hidden">
        <div className="flex h-12 w-full shrink-0">
          <button
            className={
              "flex-1 border transition-all hover:bg-tertiary hover:font-bold " +
              (activeTab[0] === "new" ? "bg-tertiary font-bold" : "")
            }
            onClick={() => activeTab[1]("new")}
          >
            New
          </button>
          <button
            className={
              "flex-1 border transition-all hover:bg-tertiary hover:font-bold " +
              (activeTab[0] === "claimed" ? "bg-tertiary font-bold" : "")
            }
            onClick={() => activeTab[1]("claimed")}
          >
            Claimed
          </button>
        </div>
        <div className="h-fit w-full shrink-0 px-3 pt-2">
          {activeTab[0] === "new" ? (
            <p>
              <span
                className="underline underline-offset-0"
                style={{
                  textDecorationThickness: "0.3em",
                  textDecorationColor: "rgba(148, 178, 255, 0.6)",
                  textDecorationSkipInk: "none",
                }}
              >
                {eligibleVouchers.length}
              </span>{" "}
              new eligible rewards
            </p>
          ) : (
            <p>
              <span
                className="underline underline-offset-0"
                style={{
                  textDecorationThickness: "0.3em",
                  textDecorationColor: "rgba(148, 178, 255, 0.6)",
                  textDecorationSkipInk: "none",
                }}
              >
                {
                  data?.user.claimedVoucher.filter(
                    (claimedVoucher) => claimedVoucher.userId === userId,
                  ).length
                }
              </span>{" "}
              claimed rewards
            </p>
          )}
          <div className="my-2 flex w-full flex-col items-start justify-start gap-y-4">
            {activeTab[0] === "new"
              ? eligibleVouchers.map((voucher) => (
                  <Reward
                    key={voucher.id}
                    imageUrl={voucher.imageUrl}
                    name={voucher.name}
                    description={voucher.terms}
                    onClaim={async () => {
                      await claimVoucher({
                        variables: { voucherId: voucher.id },
                      });
                      await refetch();
                      await refetchVouchers();
                      toast.success("Reward claimed successfully!");
                    }}
                  />
                ))
              : data?.user.claimedVoucher
                  .filter((claimedVoucher) => claimedVoucher.userId === userId)
                  .map((claimedVoucher) => {
                    const voucher = vouchersData?.Voucher.find(
                      (voucher) => voucher.id === claimedVoucher.voucherId,
                    );
                    return (
                      <Reward
                        key={claimedVoucher.voucherId}
                        imageUrl={voucher?.imageUrl ?? ""}
                        name={voucher?.name ?? ""}
                        description={voucher?.terms ?? ""}
                        code={claimedVoucher.code}
                        onCheck={() => {
                          setVisibleVoucherCode(claimedVoucher.code);
                          setIsShowVoucherCodeModalVisible(true);
                        }}
                      />
                    );
                  })}
          </div>
        </div>
      </Box>
    </main>
  );
}

function TaskMessage({
  title,
  message,
  link,
  currentProgress,
  requiredAmount,
  onClaimReward,
  canClaim,
}: {
  title: string;
  message: string;
  // TODO: Implement link
  link: string;
  currentProgress?: number;
  requiredAmount: number;
  onClaimReward: () => void;
  canClaim: boolean;
}) {
  return (
    <Box className="flex w-full flex-col items-start justify-start">
      <div className="flex w-full items-center justify-center p-3">
        <div className="mr-2 flex flex-1 flex-col">
          <h3 className="text-base font-semibold leading-tight">{title}</h3>
          <p className="mt-1 text-xs leading-tight">{message}</p>
          <p className="text-xs leading-tight">
            (Current progress:{" "}
            <span className="font-semibold">
              {canClaim ? currentProgress ?? 0 : requiredAmount}/
              {requiredAmount}
            </span>
            )
          </p>
        </div>
        {currentProgress !== requiredAmount ? (
          <a
            className={
              "btn w-24 font-semibold" +
              " " +
              (canClaim ? "btn-primary" : "btn-disabled")
            }
            href={link}
            target="_blank"
          >
            {canClaim ? (
              <>
                Open <Icon icon="ph:link-bold" className="ml-1 text-primary" />
              </>
            ) : (
              "Claimed"
            )}
          </a>
        ) : (
          <button
            className={
              "btn w-24 font-semibold " +
              (canClaim ? "btn-success" : "btn-disabled")
            }
            onClick={() => onClaimReward()}
            disabled={!canClaim}
          >
            {canClaim ? "Claim" : "Claimed"}
          </button>
        )}
      </div>
      <div className="relative mt-1 h-2 w-full overflow-hidden rounded-b-md bg-[#e1e0e9]">
        <div
          className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#4277ff]"
          style={{
            width: `${((canClaim ? currentProgress ?? 0 : requiredAmount) / requiredAmount) * 100}%`,
          }}
        />
      </div>
    </Box>
  );
}

function Reward({
  imageUrl,
  name,
  description,
  code,
  onClaim,
  onCheck,
}: {
  imageUrl: string;
  name: string;
  description: string;
  code?: string;
  onClaim?: () => void;
  onCheck?: () => void;
}) {
  return (
    <Box className="flex w-full flex-col items-start justify-start p-3">
      <div className="flex flex-1 items-center">
        <img className="h-8 rounded-md" src={imageUrl} alt="Reward image" />
        <h3 className="ml-3 text-base font-semibold leading-tight">{name}</h3>
      </div>
      <p className="mt-2">{description}</p>
      <button
        className="btn btn-primary mt-4 w-24 w-full font-semibold"
        onClick={code ? onCheck : onClaim}
      >
        {code ? "Check" : "Claim"}
      </button>
    </Box>
  );
}
