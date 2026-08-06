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
import { hotelDetailsSchema } from "@/lib/schemas/logistics/hotel";

import {
  errorClassName,
  labelClassName,
  selectClassName,
  statusOptions,
} from "./form-utils";

const hotelFormSchema = z
  .object({
    status: z.enum([
      Status.PENDING,
      Status.CONFIRMED,
      Status.COMPLETED,
      Status.CANCELED,
    ]),
    startTime: z.string().min(1, "La hora de inicio es obligatoria"),
    details: hotelDetailsSchema,
  })
  .extend({ eventId: z.string().min(1) });

type HotelLogisticsFormProps = {
  eventId: string;
  mode?: "create" | "edit";
  logisticsId?: string;
  defaultValues?: {
    status: StatusValue;
    startTime: string;
    name: string;
    address: string;
    checkIn: string;
    checkOut: string;
  };
};

export function HotelLogisticsForm({
  eventId,
  mode = "create",
  logisticsId,
  defaultValues,
}: HotelLogisticsFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<StatusValue>(
    defaultValues?.status ?? Status.PENDING,
  );
  const [startTime, setStartTime] = useState(defaultValues?.startTime ?? "");
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [address, setAddress] = useState(defaultValues?.address ?? "");
  const [checkIn, setCheckIn] = useState(defaultValues?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(defaultValues?.checkOut ?? "");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    setSubmitError(null);

    const parsed = hotelFormSchema.safeParse({
      eventId,
      status,
      startTime,
      details: { name, address, checkIn, checkOut },
    });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        type: LogisticsType.HOTEL,
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
        <label htmlFor="hotel-start" className={labelClassName}>
          Hora de inicio
        </label>
        <Input
          id="hotel-start"
          type="datetime-local"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="hotel-status" className={labelClassName}>
          Estado
        </label>
        <select
          id="hotel-status"
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
        <label htmlFor="hotel-name" className={labelClassName}>
          Hotel
        </label>
        <Input
          id="hotel-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="hotel-address" className={labelClassName}>
          Dirección
        </label>
        <Input
          id="hotel-address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="hotel-check-in" className={labelClassName}>
          Check-in
        </label>
        <Input
          id="hotel-check-in"
          type="date"
          value={checkIn}
          onChange={(event) => setCheckIn(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="hotel-check-out" className={labelClassName}>
          Check-out
        </label>
        <Input
          id="hotel-check-out"
          type="date"
          value={checkOut}
          onChange={(event) => setCheckOut(event.target.value)}
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
            : "Añadir hotel"}
      </Button>
    </form>
  );
}
