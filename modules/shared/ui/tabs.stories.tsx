import { Meta } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default {
  component: Tabs,
  args: {},
} as Meta<typeof Tabs>;

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">account</TabsContent>
      <TabsContent value="password">password</TabsContent>
    </Tabs>
  );
}
