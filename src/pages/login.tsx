import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Box } from "~/components";
import { graphql } from "~/gql";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const SIGN_IN = graphql(`
  mutation SigninUser($signinUserInput: SigninUserInput!) {
    signinUser(signinUserInput: $signinUserInput) {
      access_token
    }
  }
`);

export default function Login() {
  const [mutateFunction, { data, loading, error }] = useMutation(SIGN_IN);
  return (
    <main className="flex h-screen items-center justify-center overflow-y-scroll bg-[length:100px_100px] heropattern-wiggle-slate-50">
      <Box className="min-h-4/5 h-fit w-5/6">
        <h1 className="mt-4 text-center font-serif text-2xl font-normal">
          Login
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={async (values) => {
            try {
              const { data } = await mutateFunction({
                variables: {
                  signinUserInput: {
                    email: values.email,
                    password: values.password,
                  },
                },
              });
              if (data?.signinUser?.access_token) {
                window.localStorage.setItem(
                  "access_token",
                  data?.signinUser?.access_token,
                );
              }
              toast.success("Logged in successfully, redirecting...");
              setTimeout(() => {
                window.location.href = "/dashboard";
              }, 1000);
            } catch (error) {
              const errorMessage = (error as { message: string }).message ?? "";
              if (errorMessage.includes("Invalid password")) {
                toast.error("Invalid password");
              } else if (errorMessage.includes("User not found")) {
                toast.error("User not found");
              } else {
                toast.error("An error occurred, please try again later");
              }
            }
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
              <div>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-500">
                  Sign up
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-primary !mt-12"
                disabled={isSubmitting}
              >
                {isSubmitting && <span className="loading loading-spinner" />}
                Login
              </button>
            </Form>
          )}
        </Formik>
      </Box>
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
