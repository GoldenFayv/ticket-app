import axios from "axios";

const generatePaymentLink = async (payload) => {
  const baseUrl = process.env.FPS_BASE_URL;
  const url = `${baseUrl}/payments`;

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${process.env.FPS_SECRET}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.data.status && response.data.status !== "success") {
    const error = new Error(
      response.data.message ?? "Failed to generate payment link",
    );
    error.statusCode = 400;
    throw error;
  }

  return response.data.data;
};

export default generatePaymentLink;
