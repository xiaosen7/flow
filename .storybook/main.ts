import type { StorybookConfig } from "@storybook/nextjs";

console.log("storybook", process.env.NODE_ENV);

const config: StorybookConfig = {
  stories: [
    "../modules/*/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: process.env.NODE_ENV === "development" ? ["../public"] : [], // in build mode, it is built into public folder, so we didn't need to specify it.
};
export default config;
