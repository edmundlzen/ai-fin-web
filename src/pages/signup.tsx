import { Formik, Form, Field, ErrorMessage } from "formik";
import { ChangeEvent, useEffect } from "react";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Your username is too short")
    .required("Required"),
  phone: Yup.string().matches(
    /^01[0-9]-[0-9]+$/,
    "Phone number must be in the format 01X-XXXXXXX",
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

export default function SignUp() {
  return (
    <main className="flex h-screen items-center justify-center overflow-y-scroll bg-[length:100px_100px] heropattern-wiggle-slate-50">
      <div className="min-h-4/5 h-fit w-4/5 rounded-md border border-slate-200 bg-white">
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
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
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
                className="bg-tertiary text-primary border-secondary !mt-12 rounded-md border p-3 text-sm font-bold"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
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
