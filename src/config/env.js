import dotenv from "dotenv";

const loadEnv = () => {
  dotenv.config({
    path: "./.env",
  });
};

export default loadEnv;