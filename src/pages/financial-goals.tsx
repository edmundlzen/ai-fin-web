import {
  CrudFinancialGoalModal,
  Box,
  Emoji,
  FinancialGoalCard,
} from "~/components";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FinancialGoal, User } from "~/gql/graphql";
import { graphql } from "~/gql";
import useAuth from "~/hooks/useAuth";
import FinancialGoalModal from "~/components/FinancialGoalModal";
import { toast } from "react-toastify";

const GET_FINANCIAL_GOALS_DATA = graphql(`
  query FinancialGoalsData($userId: String!) {
    user(id: $userId) {
      id
      email
      username
      phone
      birth_year
      experience
      createdAt
      updatedAt
      wallet {
        id
        createdAt
        updatedAt
        transactions {
          id
          amount
          wallet_id
          financial_goal_id
          createdAt
          updatedAt
        }
      }
      wallet_id
      financial_goal {
        id
        userId
        emoji
        name
        amount
        months_to_reach_goal
        createdAt
        updatedAt
        transactions {
          id
          amount
          wallet_id
          financial_goal_id
          createdAt
          updatedAt
        }
      }
    }
  }
`);

const REMOVE_FINANCIAL_GOAL = graphql(`
  mutation RemoveFinancialGoal($removeFinancialGoalId: String!) {
    removeFinancialGoal(id: $removeFinancialGoalId) {
      id
      name
    }
  }
`);

export default function FinancialGoals() {
  const { userId } = useAuth();
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [activeFinancialGoal, setActiveFinancialGoal] =
    useState<FinancialGoal | null>(null);
  const { data, loading, error, refetch } = useQuery<
    { user: User },
    { userId: string }
  >(GET_FINANCIAL_GOALS_DATA, {
    variables: {
      userId: userId ?? "",
    },
  });
  const [removeFinancialGoal] = useMutation<
    { removeFinancialGoal: { id: string; name: string } },
    { removeFinancialGoalId: string }
  >(REMOVE_FINANCIAL_GOAL);

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <CrudFinancialGoalModal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        oldFinancialGoal={activeFinancialGoal}
        onSuccess={async () => {
          await refetch();
        }}
      />
      <FinancialGoalModal
        isOpen={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        financialGoal={activeFinancialGoal}
        walletId={data?.user.wallet.id ?? ""}
        onTransactionAddSuccess={async () => {
          await refetch();
        }}
        onEdit={async () => {
          setTransactionModalOpen(false);
          setGoalModalOpen(true);
        }}
        onDelete={async () => {
          if (activeFinancialGoal) {
            console.log(activeFinancialGoal.id);
            await removeFinancialGoal({
              variables: {
                removeFinancialGoalId: activeFinancialGoal.id,
              },
            });
            toast.success("Financial goal deleted successfully");
            setTransactionModalOpen(false);
            await refetch();
          }
        }}
      />
      <div className="w-full">
        <h1 className="font-serif text-5xl">Goals</h1>
      </div>
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-start justify-center gap-y-4 p-3">
        {data?.user.financial_goal && data.user.financial_goal.length > 0 ? (
          data.user.financial_goal.map((goal) => (
            <FinancialGoalCard
              key={goal.id}
              financialGoal={goal}
              wallet={data.user.wallet}
              onClick={() => {
                setActiveFinancialGoal(goal);
                setTransactionModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            <Emoji name="direct-hit" className="ml-8" />
            <p className="mt-8 text-pretty">No financial goals set yet</p>
          </div>
        )}
        <button
          className="flex w-full items-center justify-center rounded-lg border border-slate-200 p-3 text-sm font-bold transition-all hover:bg-slate-100 active:scale-95"
          onClick={() => {
            setActiveFinancialGoal(null);
            setGoalModalOpen(true);
          }}
        >
          <Icon icon="bi:plus" className="text-2xl" />
          Add a new goal
        </button>
      </Box>
    </main>
  );
}
