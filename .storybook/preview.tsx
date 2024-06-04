import "@app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { EThemeMode, ThemeProvider, useTheme } from "@modules/theme";
import type { Preview } from "@storybook/react";
import { useEffect } from "react";
import "./preview.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

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
    (Story, context) => {
      // enable background change to theme change
      const {
        globals: { backgrounds },
      } = context;
      const backgroundMode =
        backgrounds?.value === "#333333" ? EThemeMode.Dark : EThemeMode.Light;

      const { setMode } = useTheme();

      useEffect(() => {
        setMode(backgroundMode);
      }, [backgroundMode]);

      return <Story />;
    },
    (Story) => {
      // global providers
      useEffect(() => {
        document.body.classList.add(inter.variable); // font
      }, []);
      return (
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <ThemeProvider>
            <Story />
          </ThemeProvider>
        </ClerkProvider>
      );
    },
  ],
};

export default preview;
