import { Router } from "express";
import * as ticketsController from "../controllers/tickets.controller";
import { validateCreateTicket, validateUpdateTicket } from "../middleware/validateTicket";

export const ticketsRouter = Router();

ticketsRouter.get("/", ticketsController.getAll);
ticketsRouter.get("/:id", ticketsController.getOne);
ticketsRouter.post("/", validateCreateTicket, ticketsController.create);
ticketsRouter.put("/:id", validateUpdateTicket, ticketsController.update);
ticketsRouter.delete("/:id", ticketsController.remove);
