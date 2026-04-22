import crypto from "crypto";

export const generateOrderReference = () => {
  return `ORD-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
};

export const generateTicketCode = () => {
  return `TKT-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
};