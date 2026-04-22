import { prisma } from "../../../config/prisma.js";
import { generatePaymentReference } from "../enum/services/payment.services.js";
import { paymentValidationSchema } from "../validations/payment.validation.js";
import { PaymentStatus } from "../../../generated/prisma/client.js";
import createTransaction from "./create.transaction.action.js";
import generatePaymentLink from "./generate.payment.link.action.js";

const getPaymentLink = async (payload) => {
  // validate the payload
  validated = paymentValidationSchema.safeParse(payload);

  // generate reference
  const reference = generatePaymentReference();

  payload["reference"] = reference;

  // get the orders
  const result = await prisma.order.aggregate({
    _sum: {
      price: true,
    },
    where: {
      id: { in: payload.orderIds },
      payment_status: PaymentStatus.PENDING,
    },
  });

  if (orders.length < 1) {
    throw new Error("Select valid order(s)");
  }

  const totalAmount = result._sum.price || 0;

  payload["amount"] = totalAmount;
  // const totalAmount = orders.reduce((sum, order) => sum + order.price, 0);

  // create transaction with the validated payload with the generated reference
  const transansaction = await prisma.$transaction(
    async (transaction) => await createTransaction(payload, transaction),
  );

  payload["email"] = order[0].buyer_email;

  // generate payment link withe the reference
  const link = await generatePaymentLink(payload);

  // return payment gateway successful response
  return link;
};

export default getPaymentLink;
