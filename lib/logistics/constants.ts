export const LogisticsType = {
  FLIGHT: "FLIGHT",
  HOTEL: "HOTEL",
  TRANSFER: "TRANSFER",
} as const;

export type LogisticsTypeValue =
  (typeof LogisticsType)[keyof typeof LogisticsType];

export const Status = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
} as const;

export type StatusValue = (typeof Status)[keyof typeof Status];

export const statusOptions: { value: StatusValue; label: string }[] = [
  { value: Status.PENDING, label: "Pendiente" },
  { value: Status.CONFIRMED, label: "Confirmado" },
  { value: Status.COMPLETED, label: "Completado" },
  { value: Status.CANCELED, label: "Cancelado" },
];
