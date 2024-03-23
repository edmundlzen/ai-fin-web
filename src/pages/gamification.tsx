import { Box, Emoji } from "~/components";
import { useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

export default function Gamification() {
  const circleRadius = 50;
  const totalSpace = 0.2;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const maxCircleCircumference = circleCircumference * 0.75;
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  return (
    <main className="flex min-h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <div className="w-full">
        <h1 className="font-serif text-5xl">Rewards</h1>
      </div>
      <Box className="flex w-full flex-col items-start justify-start">
        <div className="mx-4 mt-3 flex items-center justify-center">
          <div>
            <Emoji name="glowing-star" className="h-14" />
          </div>
          <div className="ml-4 flex flex-col items-start justify-start">
            <h3 className="">Level</h3>
            <h4 className="text-3xl font-semibold">3</h4>
          </div>
        </div>
        <div className="flex w-full items-end justify-end px-2">
          <div className="">
            700/1000 <span className="text-xs font-normal">EXP</span>
          </div>
        </div>
        <div className="relative mt-1 h-2 w-full overflow-hidden rounded-b-md bg-[#e1e0e9]">
          <div
            className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#4277ff]"
            style={{
              width: `${0.7 * 100}%`,
            }}
          />
        </div>
      </Box>
      <Box className="flex w-full flex-col items-start justify-start p-3">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <div className="mt-2 flex w-full flex-col items-start justify-start gap-y-4">
          <TaskMessage
            title="Read 5 articles"
            message="Read 5 articles to earn 500 EXP."
            link="/survey"
          />
        </div>
      </Box>
      <Box className="flex h-fit w-full flex-col items-start justify-start overflow-hidden">
        <div className="flex h-12 w-full shrink-0">
          <button className="flex-1 border">New</button>
          <button className="flex-1 border">Claimed</button>
          <button className="flex-1 border">Used</button>
        </div>
        <div className="h-fit w-full shrink-0 px-3 pt-2">
          <p>
            <span
              className="underline underline-offset-0"
              style={{
                textDecorationThickness: "0.3em",
                textDecorationColor: "rgba(148, 178, 255, 0.6)",
                textDecorationSkipInk: "none",
              }}
            >
              7
            </span>{" "}
            new eligible rewards
          </p>
          <div className="my-2 flex w-full flex-col items-start justify-start gap-y-4">
            <Reward
              imageUrl="https://picsum.photos/150"
              name="10% off on all items"
              description="10% off on all items in the store."
            />
            <Reward
              imageUrl="https://picsum.photos/150"
              name="Free shipping"
              description="Free shipping on all items in the store."
            />
            <Reward
              imageUrl="https://picsum.photos/150"
              name="RM10 off on all items"
              description="RM10 off on all items in the store."
            />
          </div>
        </div>
      </Box>
    </main>
  );
}

function TaskMessage({
  title,
  message,
  link,
}: {
  title: string;
  message: string;
  // TODO: Implement link
  link: string;
}) {
  return (
    <Box className="flex w-full flex-col items-start justify-start">
      <div className="flex w-full items-center justify-center p-3">
        <div className="mr-2 flex flex-1 flex-col">
          <h3 className="text-base font-semibold leading-tight">{title}</h3>
          <p className="mt-1 text-xs leading-tight">{message}</p>
          <p className="text-xs leading-tight">
            (Current progress: <span className="font-semibold">3/5</span>)
          </p>
        </div>
        <button className="flex w-fit items-center rounded-xl border border-secondary bg-tertiary p-3 px-5 text-sm font-bold text-primary">
          Open
          <Icon icon="ph:link-bold" className="ml-1 text-primary" />
        </button>
      </div>
      <div className="relative mt-1 h-2 w-full overflow-hidden rounded-b-md bg-[#e1e0e9]">
        <div
          className="absolute left-0 top-0 h-2 rounded-r-sm bg-[#4277ff]"
          style={{
            width: `${0.7 * 100}%`,
          }}
        />
      </div>
    </Box>
  );
}

function Reward({
  imageUrl,
  name,
  description,
}: {
  imageUrl: string;
  name: string;
  description: string;
}) {
  return (
    <Box className="flex w-full flex-col items-start justify-start p-3">
      <div className="flex flex-1 items-center">
        <img className="h-8 rounded-md" src={imageUrl} alt="Reward image" />
        <h3 className="ml-3 text-base font-semibold leading-tight">{name}</h3>
      </div>
      <p className="mt-2">{description}</p>
      <button className="mt-4 flex w-full items-center justify-center rounded-xl border border-secondary bg-tertiary p-3 px-5 text-sm font-bold text-primary">
        Claim
      </button>
    </Box>
  );
}
