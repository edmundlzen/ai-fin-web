import { Box, Emoji } from "~/components";
import { Icon } from "@iconify-icon/react";
import FinancialGoalCard from "~/components/FinancialGoalCard";
import Modal from "react-responsive-modal";
import { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import emojis from "~/emojis.json";

const AddFinancialGoalSchema = Yup.object().shape({
  emoji: Yup.string().required("Required"),
  name: Yup.string().required("Required").min(3, "Too short"),
  totalAmount: Yup.number().required("Required").min(50, "Too low"),
  monthsToReachGoal: Yup.number().required("Required").min(1, "Too low"),
});

export default function FinancialGoals() {
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emojiSearchQuery, setEmojiSearchQuery] = useState("");

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <Modal
        open={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        center
        showCloseIcon={false}
        classNames={{
          modal: "rounded-lg w-10/12",
        }}
      >
        <h2 className="text-xl font-semibold">Add a new financial goal</h2>
        <div className="mt-3">
          <Formik
            initialValues={{
              emoji: "white-question-mark",
              name: "",
              totalAmount: 0,
              monthsToReachGoal: 0,
            }}
            validationSchema={AddFinancialGoalSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
            validateOnMount
            validateOnBlur
            validateOnChange
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="flex flex-col gap-y-4">
                <div className="flex flex-col items-start gap-x-4">
                  <label htmlFor="emoji" className="w-full font-medium">
                    Emoji
                  </label>
                  <div
                    onMouseEnter={() => {
                      setEmojiPickerOpen(true);
                    }}
                    className="group relative mt-1 flex w-full cursor-pointer items-center justify-center rounded-lg border border-slate-200 p-2"
                  >
                    <Emoji
                      name={values.emoji || "white-question-mark"}
                      className="h-20 transition-all group-hover:scale-90"
                    />
                    {emojiPickerOpen && (
                      <div
                        className="absolute left-0 right-0 top-28 z-10 grid h-48 grid-cols-5 gap-4 overflow-y-scroll rounded-lg border-slate-200 bg-white p-4 shadow-lg"
                        onMouseLeave={() => setEmojiPickerOpen(false)}
                      >
                        <input
                          type="text"
                          placeholder="Search emoji"
                          value={emojiSearchQuery}
                          onChange={(e) => setEmojiSearchQuery(e.target.value)}
                          className="col-span-5 h-12 w-full rounded-lg border border-slate-200 p-1"
                        />
                        {Object.keys(emojis)
                          .filter((emoji) =>
                            emojiSearchQuery === ""
                              ? true
                              : emoji.includes(
                                  emojiSearchQuery.split(" ").join("-"),
                                ),
                          )
                          .map((emoji) => (
                            <div
                              key={emoji}
                              onClick={() => {
                                void setFieldValue("emoji", emoji);
                                setEmojiPickerOpen(false);
                              }}
                              className="flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-white p-1 transition-all hover:scale-90 hover:bg-slate-100"
                            >
                              <Emoji name={emoji} className="h-8" />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-x-4">
                  <label htmlFor="name" className="w-full font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                    onChange={(e) => {
                      void setFieldValue("name", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col items-start gap-x-4">
                  <label htmlFor="totalAmount" className="w-full font-medium">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    name="totalAmount"
                    id="totalAmount"
                    className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                    onChange={(e) => {
                      void setFieldValue("totalAmount", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="totalAmount"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col items-start gap-x-4">
                  <label
                    htmlFor="monthsToReachGoal"
                    className="w-full font-medium"
                  >
                    Months to reach goal
                  </label>
                  <input
                    type="number"
                    name="monthsToReachGoal"
                    id="monthsToReachGoal"
                    className="mt-1 w-full rounded-lg border border-slate-200 p-3"
                    onChange={(e) => {
                      void setFieldValue("monthsToReachGoal", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="monthsToReachGoal"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col items-start gap-x-4">
                  <label
                    htmlFor="monthlySavings"
                    className="w-full font-medium"
                  >
                    Monthly Savings
                  </label>
                  <input
                    type="number"
                    name="monthlySavings"
                    id="monthlySavings"
                    className="mt-1 w-full rounded-lg border border-slate-200 p-3 text-slate-400"
                    value={(
                      values.totalAmount / values.monthsToReachGoal
                    ).toFixed(2)}
                    disabled
                  />
                  <ErrorMessage
                    name="monthlySavings"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setGoalModalOpen(false)}
                    className="w-24 rounded-lg p-3 text-sm font-bold text-primary transition-all hover:bg-slate-100 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-4 w-24 rounded-lg border border-secondary bg-tertiary p-3 text-sm font-bold text-primary transition-all hover:bg-secondary active:scale-95"
                  >
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
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
