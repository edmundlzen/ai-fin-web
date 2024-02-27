import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center overflow-y-scroll bg-[length:100px_100px] heropattern-wiggle-slate-50">
      <div className="min-h-4/5 h-fit w-4/5 rounded-md border border-slate-200 bg-white">
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
