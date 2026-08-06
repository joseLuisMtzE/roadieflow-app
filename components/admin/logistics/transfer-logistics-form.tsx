"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { createLogistics } from "@/app/actions/logistics";
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
};

export function TransferLogisticsForm({ eventId }: TransferLogisticsFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<StatusValue>(Status.PENDING);
  const [startTime, setStartTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vehicle, setVehicle] = useState("");
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
      const result = await createLogistics({
        type: LogisticsType.TRANSFER,
        ...parsed.data,
      });

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
        {loading ? "Guardando…" : "Añadir traslado"}
      </Button>
    </form>
  );
}
