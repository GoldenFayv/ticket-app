import {prisma} from "../../../config/prisma.js";
import {generatePaymentReference} from "../services/payment.services.js";
import {paymentValidationSchema} from "../validations/payment.validation.js";
import {PaymentStatus} from "../../../generated/prisma/client.js";
import createTransaction from "./create.transaction.action.js";
import generatePaymentLink from "./generate.payment.link.action.js";

const getPaymentLink = async (payload) => {
  // validate the payload
  const validated = paymentValidationSchema.safeParse(payload);

  // generate reference
  validated["reference"] = generatePaymentReference();

  // get the orders
  const orders = await prisma.order.aggregate({
    _sum: {
      price: true,
    },
    where: {
      id: { in: validated.orderIds },
      payment_status: PaymentStatus.PENDING,
    },
  });

  if (orders.length < 1) {
    throw new Error("Select valid order(s)");
  }

  validated["amount"] = orders._sum.price || 0;

  // const totalAmount = orders.reduce((sum, order) => sum + order.price, 0);

  // create transaction with the validated payload with the generated reference
  const transansaction = await prisma.$transaction(
    async (transaction) => await createTransaction(validated, transaction),
  );

  validated["email"] = orders[0].buyer_email;

  // generate payment link with the reference
  // return payment gateway successful response
  return await generatePaymentLink(validated);
};

export default getPaymentLink;
