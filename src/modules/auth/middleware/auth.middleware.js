import jwt from "jsonwebtoken";
import { failureResponse } from "../../../helpers/responseHandler";

const authMiddleware = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return failureResponse(response, "Authentication required. Please log in to continue", null, 401)
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decoded;
    next();
  } catch (error) {
      return failureResponse(response, "Invalid or expired token. Please log in again", null, 401)
  }
};

export default authMiddleware;