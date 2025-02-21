import express, { Router } from "express";
import { webhookController } from "../controllers/student/webhook.controller";

const router = Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookController.handleStripeWebhook
);

export { router as webhookRoute };
