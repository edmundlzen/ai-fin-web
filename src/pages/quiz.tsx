import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  AnnualIncome,
  EstimatedLiabilities,
  EstimatedMonthlyExpenses,
  ExpectedAnnualReturn,
  InvestmentHorizon,
  RiskTolerance,
} from "~/gql/graphql";

const SignUpSchema = Yup.object().shape({
  annualIncome: Yup.mixed().oneOf(
    Object.values(AnnualIncome),
    "Invalid annual income",
  ),
  estimatedLiabilities: Yup.mixed().oneOf(
    Object.values(EstimatedLiabilities),
    "Invalid estimated liabilities",
  ),
  estimatedMonthlyExpenses: Yup.mixed().oneOf(
    Object.values(EstimatedMonthlyExpenses),
    "Invalid estimated monthly expenses",
  ),
  investedBefore: Yup.boolean().required("Required"),
  riskTolerance: Yup.mixed().oneOf(
    Object.values(RiskTolerance),
    "Invalid risk tolerance",
  ),
  expectedAnnualReturn: Yup.mixed().oneOf(
    Object.values(ExpectedAnnualReturn),
    "Invalid expected annual return",
  ),
  investmentHorizon: Yup.mixed().oneOf(
    Object.values(InvestmentHorizon),
    "Invalid investment horizon",
  ),
});

export default function Quiz() {
  return (
    <main className="flex h-screen items-center justify-center overflow-y-scroll bg-[length:100px_100px] heropattern-wiggle-slate-50">
      <div className="min-h-4/5 flex h-fit w-5/6 flex-col items-center justify-center rounded-md border border-slate-200 bg-white px-4">
        <h1 className="mt-4 text-center font-serif text-lg font-normal">
          Welcome to X Finance App!
        </h1>
        <p className="mt-3 text-center text-sm font-medium">
          Before we get started, please help us answer these questions for the
          basic functionality of the app!
        </p>
        <button
          type="submit"
          className="my-4 w-full rounded-md border border-secondary bg-tertiary p-3 text-sm font-bold text-primary"
        >
          Continue
        </button>
      </div>
      {/* <div className="min-h-4/5 h-fit w-5/6 rounded-md border border-slate-200 bg-white">
        <h1 className="mt-4 text-center font-serif text-2xl font-normal">
          Login
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex h-fit flex-col justify-center space-y-2 p-4">
              <div>
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  component={CustomInput}
                />
                <CustomError name="email" />
              </div>
              <div>
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  component={CustomInput}
                />
                <CustomError name="password" />
              </div>
              <button
                type="submit"
                className="!mt-12 rounded-md border border-secondary bg-tertiary p-3 text-sm font-bold text-primary"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div> */}
    </main>
  );
}

function CustomInput({
  field,
  form,
  type,
  label,
  ...props
}: {
  field: {
    name: string;
  } & React.InputHTMLAttributes<HTMLInputElement>;
  form: never;
  label: string;
  type: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={field.name} className="font-medium text-slate-900">
        {label}
      </label>
      <input
        {...field}
        {...props}
        type={type}
        className="h-10 rounded-md border border-slate-200 p-2"
        inputMode={
          type === "number" ? "numeric" : type === "tel" ? "tel" : "text"
        }
        onInput={
          type === "number"
            ? (e) => {
                e.currentTarget.value = e.currentTarget.value.slice(0, 4);
              }
            : undefined
        }
      />
    </div>
  );
}

function CustomError({ name }: { name: string }) {
  return (
    <ErrorMessage name={name}>
      {(msg) => <div className="text-sm text-red-500">{msg}</div>}
    </ErrorMessage>
  );
}
