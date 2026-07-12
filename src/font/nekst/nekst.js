import localFont from "next/font/local";

export const nekst = localFont({
  src: [
    {
      path: "./Fontspring-DEMO-nekst-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-nekst-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-nekst-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-nekst-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-nekst-semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-nekst-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Fontspring-DEMO-nekst-black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nekst", // 👈 CSS variable
  display: "swap",
});
