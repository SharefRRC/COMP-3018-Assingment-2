import { Ticket } from "../types/ticket";

const BASE_SCORES: Record<Ticket["priority"], number> = {
  critical: 50,
  high: 30,
  medium: 20,
  low: 10
};

export function calculateTicketAgeDays(createdAtIso: string): number {
  const created = new Date(createdAtIso).getTime();
  const now = Date.now();
  const diffMs = now - created;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return days < 0 ? 0 : days;
}

export function calculateUrgencyScore(ticket: Ticket, ticketAgeDays: number): number {
  return BASE_SCORES[ticket.priority] + ticketAgeDays * 5;
}

export function urgencyLevelFromScore(score: number): string {
  if (score >= 80) return "Critical. Immediate attention required.";
  if (score >= 55) return "High urgency. Prioritize resolution.";
  if (score >= 30) return "Moderate. Schedule for attention.";
  return "Low urgency. Address when capacity allows.";
}
