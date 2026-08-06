import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/rbac";

/** Server Actions M3: sesión activa + rol ADMIN antes de mutar datos. */
export async function requireAdminSession() {
  const session = await auth();
  return requireAdmin(session);
}
