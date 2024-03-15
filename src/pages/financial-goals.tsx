import {
  AddFinancialGoalModal,
  Box,
  Emoji,
  FinancialGoalCard,
} from "~/components";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

export default function FinancialGoals() {
  const [goalModalOpen, setGoalModalOpen] = useState(false);

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <AddFinancialGoalModal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
      />
      <div className="w-full">
        <h1 className="font-serif text-5xl">Goals</h1>
      </div>
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-start justify-center gap-y-4 p-3">
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
        <button
          className="flex w-full items-center justify-center rounded-lg border border-slate-200 p-3 text-sm font-bold transition-all hover:bg-slate-100 active:scale-95"
          onClick={() => setGoalModalOpen(true)}
        >
          <Icon icon="bi:plus" className="text-2xl" />
          Add a new goal
        </button>
      </Box>
    </main>
  );
}
