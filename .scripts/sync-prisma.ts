import execSh from "exec-sh";

execSh(
  "pnpm prisma generate && pnpm prisma db push --accept-data-loss && pnpm prisma db seed"
);
