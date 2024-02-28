import { Box } from "~/components";
import { Icon } from "@iconify-icon/react";

export default function Dashboard() {
  return (
    <main className="flex h-screen flex-col items-center justify-start gap-y-4 overflow-y-scroll p-4">
      <div className="w-full">
        <h1 className="font-serif text-5xl">Dashboard</h1>
      </div>
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-center p-3">
        <h2 className="w-full text-2xl font-bold tracking-tight">Hi Jim!</h2>
        <Box className="mt-2 w-full p-3">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Monthly financial survey</h3>
            <p className="text-sm leading-tight">
              Do you have time to help us answer these 5 questions?
            </p>
          </div>
          <button className="flex w-fit items-center rounded-md border border-secondary bg-tertiary p-2 px-4 font-bold text-primary">
            Open
            <Icon icon="ph:link-bold" className="ml-1 text-primary" />
          </button>
        </Box>
      </Box>
    </main>
  );
}
