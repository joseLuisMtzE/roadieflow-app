import { LogisticsType } from "@/lib/generated/prisma/client";

const editSegment: Record<LogisticsType, string> = {
  FLIGHT: "flight",
  HOTEL: "hotel",
  TRANSFER: "transfer",
};

export function logisticsEditPath(
  eventId: string,
  logisticsId: string,
  type: LogisticsType,
): string {
  return `/events/${eventId}/logistics/${editSegment[type]}/${logisticsId}/edit`;
}

export function logisticsNewPath(eventId: string, type: LogisticsType): string {
  return `/events/${eventId}/logistics/${editSegment[type]}/new`;
}
