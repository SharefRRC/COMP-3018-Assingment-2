import { Request, Response } from "express";
import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket } from "../services/tickets.services";


export function getAll(_req: Request, res: Response) {
  return res.status(200).json({ data: getAllTickets() });
}

export function getOne(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = getTicketById(id);

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  return res.status(200).json({ data: ticket });
}


export function create(req: Request, res: Response) {
  const ticket = createTicket(req.body);
  return res.status(201).json({ data: ticket });
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = updateTicket(id, req.body);

  if (!updated) return res.status(404).json({ message: "Ticket not found" });

  return res.status(200).json({ data: updated });
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = deleteTicket(id);

  if (!ok) return res.status(404).json({ message: "Ticket not found" });

  return res.status(200).json({ message: "Ticket deleted" });
}