import { tickets } from "./tickets.store";
import { Ticket, Priority, Status } from "../types/ticket";

export const PRIORITIES: Priority[] = ["critical", "high", "medium", "low"];
export const STATUSES: Status[] = ["open", "in-progress", "resolved"];

export function getAllTickets(): Ticket[] {
  return tickets;
}

export function getTicketById(id: number): Ticket | undefined {
  return tickets.find(t => t.id === id);
}

function nextId(): number {
  return tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
}

export function createTicket(input: {
  title: string;
  description: string;
  priority: Priority;
}): Ticket {
  const newTicket: Ticket = {
    id: nextId(),
    title: input.title,
    description: input.description,
    priority: input.priority,
    status: "open",
    createdAt: new Date().toISOString()
  };

  tickets.push(newTicket);
  return newTicket;
}

export function updateTicket(
  id: number,
  updates: Partial<Pick<Ticket, "title" | "description" | "priority" | "status">>
): Ticket | undefined {
  const ticket = getTicketById(id);
  if (!ticket) return undefined;

  Object.assign(ticket, updates);
  return ticket;
}

export function deleteTicket(id: number): boolean {
  const idx = tickets.findIndex(t => t.id === id);
  if (idx === -1) return false;

  tickets.splice(idx, 1);
  return true;
}
