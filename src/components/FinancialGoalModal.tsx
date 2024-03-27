import { Formik, Form, ErrorMessage } from "formik";
import Modal from "react-responsive-modal";
import * as Yup from "yup";
import { graphql } from "~/gql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { Transaction, type FinancialGoal } from "~/gql/graphql";
import dayjs from "dayjs";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useState } from "react";

const AddTransactionSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
});

const CREATE_TRANSACTION = graphql(`
  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {
    createTransaction(createTransactionInput: $createTransactionInput) {
      id
      amount
      wallet_id
      financial_goal_id
      createdAt
      updatedAt
    }
  }
`);

const REMOVE_TRANSACTION = graphql(`
  mutation RemoveTransaction($removeTransactionId: String!) {
    removeTransaction(id: $removeTransactionId) {
      id
    }
  }
`);

const FinancialGoalModal = ({
  isOpen,
  onClose,
  financialGoal,
  walletId,
  onEdit,
  onDelete,
  onTransactionAddSuccess,
  onTransactionDeleteSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  financialGoal?: FinancialGoal | null;
  walletId: string;
  onEdit: () => Promise<void>;
  onDelete: () => Promise<void>;
  onTransactionAddSuccess: () => void;
  onTransactionDeleteSuccess: () => void;
}) => {
  const [mutateFunction, { data, loading, error }] = useMutation<
    { createTransaction: { id: string } },
    {
      createTransactionInput: {
        amount: number;
        financial_goal_id: string;
        wallet_id: string;
      };
    }
  >(CREATE_TRANSACTION);
  const [removeTransaction] = useMutation<
    { removeTransaction: { id: string } },
    { removeTransactionId: string }
  >(REMOVE_TRANSACTION);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [
    isConfirmDeleteTransactionModalOpen,
    setIsConfirmDeleteTransactionModalOpen,
  ] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null,
  );

  if (!financialGoal) return null;
  return (
    <>
      <Modal
        open={isConfirmDeleteTransactionModalOpen}
        onClose={() => setIsConfirmDeleteTransactionModalOpen(false)}
        center
        showCloseIcon={false}
        classNames={{
          modal: "rounded-lg w-10/12",
        }}
      >
        <h2 className="text-xl font-semibold">Delete transaction</h2>
        <div className="mt-3">
          <p className="text-lg">
            Are you sure you want to delete this transaction?
          </p>
          <div className="mt-6 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsConfirmDeleteTransactionModalOpen(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={async () => {
                try {
                  await removeTransaction({
                    variables: {
                      removeTransactionId: transactionToDelete!,
                    },
                  });
                  toast.success("Transaction deleted successfully");
                  onTransactionDeleteSuccess();
                  setIsConfirmDeleteTransactionModalOpen(false);
                } catch (error) {
                  toast.error("Failed to delete transaction");
                }
              }}
              className="btn btn-outline btn-error ml-4"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        center
        showCloseIcon={false}
        classNames={{
          modal: "rounded-lg w-10/12",
        }}
      >
        <h2 className="text-xl font-semibold">Delete financial goal</h2>
        <div className="mt-3">
          <p className="text-lg">
            Are you sure you want to delete this financial goal?
          </p>
          <div className="mt-6 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsConfirmDeleteModalOpen(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setIsConfirmDeleteModalOpen(false);
                void onDelete();
              }}
              className="btn btn-outline btn-error ml-4"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={isOpen}
        onClose={onClose}
        center
        showCloseIcon={false}
        classNames={{
          modal: "rounded-lg w-10/12",
        }}
      >
        <div className="flex items-center justify-start">
          <h2 className="mr-auto text-xl font-semibold">
            {financialGoal.name}
          </h2>
          <button
            type="button"
            onClick={() => {
              void onEdit();
            }}
            className="btn btn-ghost mr-4"
          >
            <Icon
              icon="akar-icons:edit"
              className="flex items-center justify-center"
              width="18"
              height="18"
            />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsConfirmDeleteModalOpen(true);
            }}
            className="btn btn-ghost"
          >
            <Icon
              icon="ph:trash"
              className="flex items-center justify-center"
              width="18"
              height="18"
            />
          </button>
        </div>
        <div className="mt-3">
          <Formik
            initialValues={{
              amount: 0,
            }}
            validationSchema={AddTransactionSchema}
            onSubmit={async (values) => {
              console.log(values);
              try {
                await mutateFunction({
                  variables: {
                    createTransactionInput: {
                      amount: +values.amount,
                      financial_goal_id: financialGoal.id,
                      wallet_id: walletId,
                    },
                  },
                });
                toast.success("Transaction added successfully");
                onTransactionAddSuccess();
                onClose();
              } catch (error) {
                toast.error("Failed to add transaction");
              }
            }}
            validateOnMount
            validateOnBlur
            validateOnChange
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="flex flex-col gap-y-4">
                <div className="flex flex-col items-start gap-x-4">
                  <label htmlFor="amount" className="w-full font-medium">
                    Transaction History
                  </label>
                  <div className="mt-1 h-48 w-full overflow-y-scroll rounded-lg border border-slate-200 p-3">
                    {(
                      JSON.parse(
                        JSON.stringify(financialGoal.transactions),
                      ) as Transaction[]
                    )
                      .sort(
                        (a, b) =>
                          dayjs(b.createdAt as string).unix() -
                          dayjs(a.createdAt as string).unix(),
                      )
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex flex-col items-start">
                            <div className="text-xs text-secondary-text">
                              {dayjs(transaction.createdAt as string).format(
                                "DD MMM YYYY",
                              )}
                            </div>
                            <div className="text-lg font-medium">
                              RM {transaction.amount.toFixed(2)}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => {
                              setTransactionToDelete(transaction.id);
                              setIsConfirmDeleteTransactionModalOpen(true);
                            }}
                          >
                            <Icon
                              icon="ph:trash"
                              className="flex items-center justify-center"
                              width="18"
                              height="18"
                            />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-x-4">
                  <label htmlFor="amount" className="w-full font-medium">
                    New Transaction
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
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
                          e.key === "Tab" ||
                          e.key === "." ||
                          e.key === "-"
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      void setFieldValue("amount", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="amount"
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
    </>
  );
};

export default FinancialGoalModal;
