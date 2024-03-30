import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { graphql } from "~/gql";
import {
  AnnualIncome,
  EstimatedLiabilities,
  EstimatedMonthlyExpenses,
  ExpectedAnnualReturn,
  InvestmentHorizon,
  RiskTolerance,
} from "~/gql/graphql";
import useAuth from "~/hooks/useAuth";

const SignUpSchema = Yup.object().shape({
  annualIncome: Yup.string().required("Required"),
  estimatedLiabilities: Yup.string().required("Required"),
  estimatedMonthlyExpenses: Yup.string().required("Required"),
  investedBefore: Yup.boolean().required("Required"),
  riskTolerance: Yup.string().required("Required"),
  expectedAnnualReturn: Yup.string().required("Required"),
  investmentHorizon: Yup.string().required("Required"),
});

const SUBMIT_QUIZ = graphql(`
  mutation CreateOrUpdateUserInfo(
    $createOrUpdateUserInfoInput: CreateOrUpdateUserInfoInput!
  ) {
    createOrUpdateUserInfo(
      createOrUpdateUserInfoInput: $createOrUpdateUserInfoInput
    ) {
      userId
      updatedAt
    }
  }
`);

export default function Quiz() {
  const [activeSection, setActiveSection] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [mutateFunction, { data, loading, error }] = useMutation(SUBMIT_QUIZ);
  const { userId } = useAuth();

  return (
    <main className="flex h-screen items-center justify-center overflow-y-scroll bg-[length:100px_100px] heropattern-wiggle-slate-50">
      <Formik
        initialValues={{
          annualIncome: "",
          estimatedLiabilities: "",
          estimatedMonthlyExpenses: "",
          investedBefore: "",
          riskTolerance: "",
          expectedAnnualReturn: "",
          investmentHorizon: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={async (values) => {
          try {
            await mutateFunction({
              variables: {
                createOrUpdateUserInfoInput: {
                  annual_income: values.annualIncome as AnnualIncome,
                  estimated_liabilities:
                    values.estimatedLiabilities as EstimatedLiabilities,
                  estimated_monthly_expenses:
                    values.estimatedMonthlyExpenses as EstimatedMonthlyExpenses,
                  invested_before: values.investedBefore === "true",
                  risk_tolerance: values.riskTolerance as RiskTolerance,
                  expected_annual_return:
                    values.expectedAnnualReturn as ExpectedAnnualReturn,
                  investment_horizon:
                    values.investmentHorizon as InvestmentHorizon,
                  user_id: userId ?? "",
                },
              },
            });
            toast.success("Quiz submitted successfully, redirecting...");
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } catch (e) {
            toast.error(
              (e as { message: string }).message || "An error occurred",
            );
          }
        }}
        validateOnMount
        validateOnBlur
        validateOnChange
      >
        {({ errors, setTouched }) => (
          <AnimatePresence>
            {activeSection === 0 ? (
              <IntroCard onContinue={() => setActiveSection(1)} />
            ) : activeSection === 1 ? (
              <QuestionPage
                title="Basic Info"
                reverse={reverse}
                questions={[
                  {
                    label: "What is your annual income?",
                    name: "annualIncome",
                    type: "select",
                    options: Object.values(AnnualIncome).map((value) => ({
                      label: {
                        [AnnualIncome.LessThan10K]: "Less than RM10,000",
                        [AnnualIncome.From10KTo25K]: "RM10,000 - RM25,000",
                        [AnnualIncome.From25KTo50K]: "RM25,000 - RM50,000",
                        [AnnualIncome.From50KTo100K]: "RM50,000 - RM100,000",
                        [AnnualIncome.From100KTo200K]: "RM100,000 - RM200,000",
                        [AnnualIncome.MoreThan200K]: "More than RM200,000",
                      }[value],
                      value,
                    })),
                  },
                  {
                    label: "What are your estimated liabilities?",
                    name: "estimatedLiabilities",
                    type: "select",
                    options: Object.values(EstimatedLiabilities).map(
                      (value) => ({
                        label: {
                          [EstimatedLiabilities.LessThan10K]:
                            "Less than RM50,000",
                          [EstimatedLiabilities.From10KTo25K]:
                            "RM50,000 - RM100,000",
                          [EstimatedLiabilities.From25KTo50K]:
                            "RM100,000 - RM200,000",
                          [EstimatedLiabilities.From50KTo100K]:
                            "RM200,000 - RM500,000",
                          [EstimatedLiabilities.From100KTo200K]:
                            "More than RM500,000",
                          [EstimatedLiabilities.MoreThan200K]:
                            "More than RM500,000",
                        }[value],
                        value,
                      }),
                    ),
                  },
                  {
                    label: "What are your estimated monthly expenses?",
                    name: "estimatedMonthlyExpenses",
                    type: "select",
                    options: Object.values(EstimatedMonthlyExpenses).map(
                      (value) => ({
                        label: {
                          [EstimatedMonthlyExpenses.LessThan1K]:
                            "Less than RM1,000",
                          [EstimatedMonthlyExpenses.From1KTo2K]:
                            "RM1,000 - RM2,000",
                          [EstimatedMonthlyExpenses.From2KTo3K]:
                            "RM2,000 - RM3,000",
                          [EstimatedMonthlyExpenses.From3KTo4K]:
                            "RM3,000 - RM4,000",
                          [EstimatedMonthlyExpenses.From4KTo5K]:
                            "RM4,000 - RM5,000",
                          [EstimatedMonthlyExpenses.MoreThan5K]:
                            "More than RM5,000",
                        }[value],
                        value,
                      }),
                    ),
                  },
                ]}
                onSubmit={() => {
                  void (async () => {
                    await setTouched({
                      annualIncome: true,
                      estimatedLiabilities: true,
                      estimatedMonthlyExpenses: true,
                    });
                    if (
                      !errors.annualIncome &&
                      !errors.estimatedLiabilities &&
                      !errors.estimatedMonthlyExpenses
                    ) {
                      setReverse(false);
                      setActiveSection(2);
                    }
                  })();
                }}
              />
            ) : activeSection === 2 ? (
              <QuestionPage
                title="Investment"
                reverse={reverse}
                withBack
                submitButton
                questions={[
                  {
                    label: "Have you invested before?",
                    name: "investedBefore",
                    type: "select",
                    options: [
                      { label: "Yes", value: "true" },
                      { label: "No", value: "false" },
                    ],
                  },
                  {
                    label: "What is your risk tolerance?",
                    name: "riskTolerance",
                    type: "select",
                    options: Object.values(RiskTolerance).map((value) => ({
                      label: {
                        [RiskTolerance.Low]: "Low",
                        [RiskTolerance.Medium]: "Medium",
                        [RiskTolerance.High]: "High",
                      }[value],
                      value,
                    })),
                  },
                  {
                    label: "What is your expected annual return?",
                    name: "expectedAnnualReturn",
                    type: "select",
                    options: Object.values(ExpectedAnnualReturn).map(
                      (value) => ({
                        label: {
                          [ExpectedAnnualReturn.LessThan5Percent]:
                            "Less than 5%",
                          [ExpectedAnnualReturn.From5To10Percent]: "5 - 10%",
                          [ExpectedAnnualReturn.From10To15Percent]: "10 - 15%",
                          [ExpectedAnnualReturn.MoreThan15Percent]:
                            "More than 15%",
                        }[value],
                        value,
                      }),
                    ),
                  },
                  {
                    label: "How long will you keep your investment?",
                    name: "investmentHorizon",
                    type: "select",
                    options: Object.values(InvestmentHorizon).map((value) => ({
                      label: {
                        [InvestmentHorizon.LessThan1Year]: "Less than 1 year",
                        [InvestmentHorizon.From1To3Years]: "1 - 3 years",
                        [InvestmentHorizon.From3To5Years]: "3 - 5 years",
                        [InvestmentHorizon.MoreThan5Years]: "More than 5 years",
                      }[value],
                      value,
                    })),
                  },
                ]}
                onBack={() => {
                  setReverse(true);
                  setActiveSection(1);
                }}
              />
            ) : null}
          </AnimatePresence>
        )}
      </Formik>
    </main>
  );
}

function IntroCard({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="min-h-4/5 flex h-fit w-5/6 flex-col items-center justify-center rounded-md border border-slate-200 bg-white px-4"
    >
      <h1 className="mt-4 text-center font-serif text-lg font-normal">
        Welcome to X Finance App!
      </h1>
      <p className="mt-3 text-center text-sm font-medium">
        Before we get started, please help us answer these questions for the
        basic functionality of the app!
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="my-4 w-full rounded-md border border-secondary bg-tertiary p-3 text-sm font-bold text-primary"
      >
        Continue
      </button>
    </motion.div>
  );
}

function QuestionPage({
  title,
  questions,
  onSubmit,
  withBack,
  onBack,
  reverse,
  submitButton,
}: {
  title: string;
  questions: {
    label: string;
    name: string;
    type: string;
    options: Array<{
      label: string;
      value: string;
    }>;
  }[];
  onSubmit?: () => void;
  withBack?: boolean;
  onBack?: () => void;
  reverse?: boolean;
  submitButton?: boolean;
}) {
  return (
    <motion.div
      key={title}
      initial={{ x: reverse ? -300 : 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: reverse ? 300 : -300, opacity: 0 }}
      className="min-h-4/5 h-fit w-5/6 rounded-md border border-slate-200 bg-white"
    >
      <h1 className="mt-4 text-center font-serif text-2xl font-normal">
        {title}
      </h1>
      <Form className="flex h-fit flex-col justify-center space-y-2 p-4">
        {questions.map((question) => (
          <div key={question.name}>
            <label className="font-medium text-slate-900">
              {question.label}
            </label>
            <Field
              name={question.name}
              as={question.type === "select" ? "select" : "input"}
              className="!h-12 w-full rounded-md border border-slate-200 bg-transparent p-2 text-sm font-medium"
            >
              {question.type === "select" ? (
                <option value="">Select</option>
              ) : null}
              {question.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name={question.name}>
              {(msg) => <div className="text-sm text-red-500">{msg}</div>}
            </ErrorMessage>
          </div>
        ))}
        <div className="flex items-center justify-between">
          {withBack && (
            <button
              type="button"
              className="!mt-12 w-full rounded-md p-3 text-sm font-bold text-primary"
              onClick={() => {
                onBack?.();
              }}
            >
              Back
            </button>
          )}
          <button
            type={submitButton ? "submit" : "button"}
            className="!mt-12 w-full rounded-md border border-secondary bg-tertiary p-3 text-sm font-bold text-primary"
            onClick={() => {
              onSubmit?.();
            }}
          >
            {submitButton ? "Save" : "Continue"}
          </button>
        </div>
      </Form>
    </motion.div>
  );
}
