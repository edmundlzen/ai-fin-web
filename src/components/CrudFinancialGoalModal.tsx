import { Formik, Form, ErrorMessage } from "formik";
import Modal from "react-responsive-modal";
import { Emoji } from ".";
import * as Yup from "yup";
import { useState } from "react";
import emojis from "~/emojis.json";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { graphql } from "~/gql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { FinancialGoal } from "~/gql/graphql";

const AddFinancialGoalSchema = Yup.object().shape({
  emoji: Yup.string().required("Required"),
  name: Yup.string().required("Required").min(3, "Too short"),
  totalAmount: Yup.number().required("Required").min(50, "Too low"),
  monthsToReachGoal: Yup.number().required("Required").min(1, "Too low"),
});

const MAX_EMOJIS_PER_PAGE = 20;

const CREATE_FINANCIAL_GOAL = graphql(`
  mutation CreateFinancialGoal(
    $createFinancialGoalInput: CreateFinancialGoalInput!
  ) {
    createFinancialGoal(createFinancialGoalInput: $createFinancialGoalInput) {
      id
      name
      emoji
      amount
      months_to_reach_goal
      createdAt
      updatedAt
    }
  }
`);

const CrudFinancialGoalModal = ({
  isOpen,
  onClose,
  onSuccess,
  oldFinancialGoal,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  oldFinancialGoal?: FinancialGoal;
}) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emojiSearchQuery, setEmojiSearchQuery] = useState("");
  const [emojiPage, setEmojiPage] = useState(0);
  const [mutateFunction, { data, loading, error }] = useMutation(
    CREATE_FINANCIAL_GOAL,
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
            emoji: "question-mark",
            name: "",
            totalAmount: 0,
            monthsToReachGoal: 0,
          }}
          validationSchema={AddFinancialGoalSchema}
          onSubmit={async (values) => {
            console.log(values);
            try {
              await mutateFunction({
                variables: {
                  createFinancialGoalInput: {
                    emoji: values.emoji,
                    name: values.name,
                    amount: +values.totalAmount,
                    months_to_reach_goal: +values.monthsToReachGoal,
                  },
                },
              });
              toast.success("Financial goal added successfully");
              onSuccess?.();
              onClose();
            } catch (error) {
              toast.error("An error occurred");
            }
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
                        onChange={(e) => {
                          setEmojiSearchQuery(e.target.value);
                          setEmojiPage(0);
                        }}
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
                        .slice(
                          emojiPage * MAX_EMOJIS_PER_PAGE,
                          (emojiPage + 1) * MAX_EMOJIS_PER_PAGE,
                        )
                        .map((emoji) => (
                          <div
                            key={emoji}
                            onClick={() => {
                              void setFieldValue("emoji", emoji);
                              setEmojiPickerOpen(false);
                            }}
                            className="flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white p-1 transition-all hover:scale-90 hover:bg-slate-100"
                          >
                            <Emoji name={emoji} className="h-7" />
                          </div>
                        ))}
                      <div className="col-span-5 flex h-8 items-center justify-center gap-x-4">
                        <button
                          type="button"
                          onClick={() => setEmojiPage(emojiPage - 1)}
                          disabled={emojiPage === 0}
                          className="btn btn-ghost aspect-square !h-full min-h-0 rounded-full !p-1 disabled:bg-slate-100"
                        >
                          <Icon icon="bi:chevron-left" className="text-sm" />
                        </button>
                        {emojiPage + 1}
                        <button
                          type="button"
                          onClick={() => setEmojiPage(emojiPage + 1)}
                          disabled={
                            (emojiPage + 1) * MAX_EMOJIS_PER_PAGE >
                            (emojiSearchQuery === ""
                              ? Object.keys(emojis).length
                              : Object.keys(emojis).filter((emoji) =>
                                  emoji.includes(
                                    emojiSearchQuery.split(" ").join("-"),
                                  ),
                                ).length)
                          }
                          className="btn btn-ghost aspect-square !h-full min-h-0 rounded-full !p-1 disabled:bg-slate-100"
                        >
                          <Icon icon="bi:chevron-right" className="text-sm" />
                        </button>
                      </div>
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
                  inputMode="numeric"
                  onKeyDown={(e) => {
                    // Only allow numbers
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Delete" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight" ||
                        e.key === "ArrowUp" ||
                        e.key === "ArrowDown" ||
                        e.key === "Tab"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
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
                <label htmlFor="monthlySavings" className="w-full font-medium">
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
                  onClick={() => onClose()}
                  className="btn btn-ghost w-24"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-4 w-24 rounded-lg border border-secondary bg-tertiary p-3 text-sm font-bold text-primary transition-all hover:bg-secondary active:scale-95"
                  disabled={isSubmitting}
                >
                  Add
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CrudFinancialGoalModal;
