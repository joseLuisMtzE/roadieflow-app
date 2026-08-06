import type { Session } from "next-auth";

import { Role } from "@/lib/generated/prisma/client";

export type RbacAction = "create" | "update" | "read";
export type RbacResource = "artist" | "event" | "logistics";

const M3_ADMIN_WRITE_ACTIONS: RbacAction[] = ["create", "update"];
const M3_WRITE_RESOURCES: RbacResource[] = ["artist", "event", "logistics"];

export class UnauthenticatedError extends Error {
  constructor(message = "Debes iniciar sesión") {
    super(message);
    this.name = "UnauthenticatedError";
  }
}

export class AuthorizationError extends Error {
  constructor(message = "No tienes permiso para realizar esta acción") {
    super(message);
    this.name = "AuthorizationError";
  }
}

function isM3WritePermission(
  action: RbacAction,
  resource: RbacResource,
): boolean {
  return (
    M3_ADMIN_WRITE_ACTIONS.includes(action) &&
    M3_WRITE_RESOURCES.includes(resource)
  );
}

/** M3: create/update en tour entities requiere rol ADMIN. */
export function assertCan(
  session: Session | null,
  action: RbacAction,
  resource: RbacResource,
): asserts session is Session {
  if (!session?.user?.id) {
    throw new UnauthenticatedError();
  }

  if (
    isM3WritePermission(action, resource) &&
    session.user.role !== Role.ADMIN
  ) {
    throw new AuthorizationError(
      "Solo administradores pueden crear o editar datos de la gira",
    );
  }
}

export function requireAdmin(session: Session | null): Session {
  if (!session?.user?.id) {
    throw new UnauthenticatedError();
  }

  if (session.user.role !== Role.ADMIN) {
    throw new AuthorizationError(
      "Solo administradores pueden realizar esta acción",
    );
  }

  return session;
}

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function toActionError(error: unknown): ActionResult<never> {
  if (
    error instanceof UnauthenticatedError ||
    error instanceof AuthorizationError
  ) {
    return { ok: false, error: error.message };
  }

  console.error(error);
  return { ok: false, error: "Ocurrió un error inesperado" };
}
