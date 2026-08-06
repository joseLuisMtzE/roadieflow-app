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
import { flightDetailsSchema } from "@/lib/schemas/logistics/flight";

import {
  errorClassName,
  labelClassName,
  selectClassName,
  statusOptions,
} from "./form-utils";

const flightFormSchema = z
  .object({
    status: z.enum([
      Status.PENDING,
      Status.CONFIRMED,
      Status.COMPLETED,
      Status.CANCELED,
    ]),
    startTime: z.string().min(1, "La hora de inicio es obligatoria"),
    details: flightDetailsSchema,
  })
  .extend({ eventId: z.string().min(1) });

type FlightLogisticsFormProps = {
  eventId: string;
};

export function FlightLogisticsForm({ eventId }: FlightLogisticsFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<StatusValue>(Status.PENDING);
  const [startTime, setStartTime] = useState("");
  const [airline, setAirline] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [note, setNote] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    setSubmitError(null);

    const parsed = flightFormSchema.safeParse({
      eventId,
      status,
      startTime,
      details: { airline, flightNumber, from, to, note },
    });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setLoading(true);
    try {
      const result = await createLogistics({
        type: LogisticsType.FLIGHT,
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
        <label htmlFor="flight-start" className={labelClassName}>
          Hora de inicio
        </label>
        <Input
          id="flight-start"
          type="datetime-local"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="flight-status" className={labelClassName}>
          Estado
        </label>
        <select
          id="flight-status"
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
        <label htmlFor="flight-airline" className={labelClassName}>
          Aerolínea
        </label>
        <Input
          id="flight-airline"
          value={airline}
          onChange={(event) => setAirline(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="flight-number" className={labelClassName}>
          Número de vuelo
        </label>
        <Input
          id="flight-number"
          value={flightNumber}
          onChange={(event) => setFlightNumber(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="flight-from" className={labelClassName}>
          Origen
        </label>
        <Input
          id="flight-from"
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="flight-to" className={labelClassName}>
          Destino
        </label>
        <Input
          id="flight-to"
          value={to}
          onChange={(event) => setTo(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="flight-note" className={labelClassName}>
          Nota <span className="text-muted-foreground/70">(opcional)</span>
        </label>
        <Input
          id="flight-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
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
        {loading ? "Guardando…" : "Añadir vuelo"}
      </Button>
    </form>
  );
}
