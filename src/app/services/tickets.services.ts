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
