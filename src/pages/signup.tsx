import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Box } from "~/components";
import { graphql } from "~/gql";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Your username is too short")
    .required("Required"),
  phone: Yup.string().matches(
    /^01[0-9]{8,9}$/,
    "Phone number must be in the format 01XXXXXXXX",
  ),
  email: Yup.string().email("Invalid email").required("Required"),
  birthYear: Yup.number()
    .required("Required")
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});

const SIGN_UP = graphql(`
  mutation SignupUser($signupUserInput: SignupUserInput!) {
    signupUser(signupUserInput: $signupUserInput) {
      access_token
    }
  }
`);

export default function SignUp() {
  const [mutateFunction, { data, loading, error }] = useMutation<{
    signupUser: { access_token: string };
  }>(SIGN_UP);
  return (
    <main className="flex h-screen items-center justify-center overflow-y-scroll bg-[length:100px_100px] heropattern-wiggle-slate-50">
      <Box className="min-h-4/5 h-fit w-5/6">
        <h1 className="mt-4 text-center font-serif text-2xl font-normal">
          Sign Up
        </h1>
        <Formik
          initialValues={{
            username: "",
            phone: "",
            email: "",
            birthYear: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { data } = await mutateFunction({
                variables: {
                  signupUserInput: {
                    username: values.username,
                    phone: values.phone,
                    email: values.email,
                    birth_year: parseInt(values.birthYear),
                    password: values.password,
                  },
                },
              });
              if (data?.signupUser?.access_token) {
                window.localStorage.setItem(
                  "access_token",
                  data?.signupUser?.access_token,
                );
              }
              toast.success("Signed up successfully, redirecting...");
              setTimeout(() => {
                window.location.href = "/dashboard";
              }, 1000);
            } catch (e) {
              toast.error(
                (e as { message: string }).message || "An error occurred",
              );
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col justify-center space-y-2 p-4">
              <div>
                <Field
                  label="Username"
                  name="username"
                  type="text"
                  component={CustomInput}
                />
                <CustomError name="username" />
              </div>
              <div>
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  component={CustomInput}
                />
                <CustomError name="phone" />
              </div>
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
                  label="Birth Year"
                  name="birthYear"
                  type="number"
                  component={CustomInput}
                />
                <CustomError name="birthYear" />
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
                <Field
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  component={CustomInput}
                />
                <CustomError name="confirmPassword" />
              </div>
              <button
                type="submit"
                className="!mt-12 rounded-md border border-secondary bg-tertiary p-3 text-sm font-bold text-primary"
              >
                Sign Up
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
        onKeyDown={(e) => {
          if (type !== "number" && type !== "tel") return;
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
