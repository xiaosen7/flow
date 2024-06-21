import { z } from "zod";

export const PROFILE_SCHEMA = z.object({
  fullName: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.union([z.string().min(5).max(50), z.literal("")]),
  portfolioWebsite: z.union([z.string().url(), z.literal("")]),
  location: z.union([z.string().min(5).max(50), z.literal("")]),
});
