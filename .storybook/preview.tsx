import "@/app/globals.css";
import { ThemeSwitcher } from "@/modules/theme";
import ThemeProvider from "@/modules/theme/context";
import { ClerkProvider } from "@clerk/nextjs";
import type { Preview } from "@storybook/react";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: "primary-gradient",
            footerActionLink: "primary-text-gradient hover:text-primary-500",
          },
        }}
      >
        <ThemeProvider>
          <ThemeSwitcher />
          <Story />
        </ThemeProvider>
      </ClerkProvider>
    ),
  ],
};

export default preview;
