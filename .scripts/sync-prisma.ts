import execSh from "exec-sh";

execSh("pnpm prisma generate && pnpm prisma db push && pnpm prisma db seed");
