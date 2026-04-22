export const generatePaymentReference = () => {
      return `TRX-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}