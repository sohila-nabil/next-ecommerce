import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [createUser, updateUser, deleteUser],
});
