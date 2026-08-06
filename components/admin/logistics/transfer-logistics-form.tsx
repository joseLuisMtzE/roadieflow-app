"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { createLogistics, updateLogistics } from "@/app/actions/logistics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LogisticsType,
  Status,
  type StatusValue,
} from "@/lib/logistics/constants";
import { transferDetailsSchema } from "@/lib/schemas/logistics/transfer";

import {
  errorClassName,
  labelClassName,
  selectClassName,
  statusOptions,
} from "./form-utils";

const transferFormSchema = z
  .object({
    status: z.enum([
      Status.PENDING,
      Status.CONFIRMED,
      Status.COMPLETED,
      Status.CANCELED,
    ]),
    startTime: z.string().min(1, "La hora de inicio es obligatoria"),
    details: transferDetailsSchema,
  })
  .extend({ eventId: z.string().min(1) });

type TransferLogisticsFormProps = {
  eventId: string;
  mode?: "create" | "edit";
  logisticsId?: string;
  defaultValues?: {
    status: StatusValue;
    startTime: string;
    from: string;
    to: string;
    vehicle: string;
  };
};

export function TransferLogisticsForm({
  eventId,
  mode = "create",
  logisticsId,
  defaultValues,
}: TransferLogisticsFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<StatusValue>(
    defaultValues?.status ?? Status.PENDING,
  );
  const [startTime, setStartTime] = useState(defaultValues?.startTime ?? "");
  const [from, setFrom] = useState(defaultValues?.from ?? "");
  const [to, setTo] = useState(defaultValues?.to ?? "");
  const [vehicle, setVehicle] = useState(defaultValues?.vehicle ?? "");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    setSubmitError(null);

    const parsed = transferFormSchema.safeParse({
      eventId,
      status,
      startTime,
      details: { from, to, vehicle },
    });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        type: LogisticsType.TRANSFER,
        ...parsed.data,
      };

      const result =
        mode === "edit" && logisticsId
          ? await updateLogistics({ ...payload, id: logisticsId })
          : await createLogistics(payload);

      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }

      router.push(`/events/${eventId}`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const errorMessage = fieldError ?? submitError;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="transfer-start" className={labelClassName}>
          Hora de inicio
        </label>
        <Input
          id="transfer-start"
          type="datetime-local"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="transfer-status" className={labelClassName}>
          Estado
        </label>
        <select
          id="transfer-status"
          value={status}
          onChange={(event) => setStatus(event.target.value as StatusValue)}
          disabled={loading}
          className={selectClassName}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="transfer-from" className={labelClassName}>
          Origen
        </label>
        <Input
          id="transfer-from"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="transfer-to" className={labelClassName}>
          Destino
        </label>
        <Input
          id="transfer-to"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="transfer-vehicle" className={labelClassName}>
          Vehículo
        </label>
        <Input
          id="transfer-vehicle"
          value={vehicle}
          onChange={(event) => setVehicle(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      {errorMessage ? (
        <p role="alert" className={errorClassName}>
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading
          ? "Guardando…"
          : mode === "edit"
            ? "Guardar cambios"
            : "Añadir traslado"}
      </Button>
    </form>
  );
}
