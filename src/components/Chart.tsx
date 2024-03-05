import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

export default Chart;
