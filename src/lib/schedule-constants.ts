import { Shift } from "@prisma/client"

export type ScheduleItemInput = {
  id?: string
  userId?: string
  dni?: string
  name?: string
  date: string // "YYYY-MM-DD"
  campusId?: string
  campusName?: string
  shift: Shift
  expectedEntryTime?: string
  earlyEntryToleranceMinutes?: number
  gracePeriodMinutes?: number
  lateToleranceMinutes?: number
  enableEarlyTolerance?: boolean
  enableLateTolerance?: boolean
  notes?: string
}

// Valores base de referencia por turno (la hora de ingreso se configura manualmente en Reglas y Cronograma)
export const DEFAULT_SHIFT_TIMES: Record<
  Shift,
  { entry: string; early: number; grace: number; late: number; label: string; timeRange: string }
> = {
  MANANA: { entry: "08:00", early: 15, grace: 10, late: 30, label: "Mañana", timeRange: "Turno Mañana" },
  INTERMEDIO: { entry: "10:00", early: 15, grace: 10, late: 30, label: "Intermedio", timeRange: "Turno Intermedio" },
  TARDE: { entry: "14:00", early: 15, grace: 10, late: 30, label: "Tarde", timeRange: "Turno Tarde" },
  NOCHE: { entry: "20:00", early: 15, grace: 10, late: 30, label: "Noche", timeRange: "Turno Noche" },
  DESCANSO: { entry: "00:00", early: 0, grace: 0, late: 0, label: "Descanso / Libre", timeRange: "Día libre programado" },
  COMISION: { entry: "00:00", early: 0, grace: 0, late: 0, label: "Comisión / Evento (EV)", timeRange: "Comisión de servicio (Sin marcación)" },
}
