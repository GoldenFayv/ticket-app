import "dotenv/config";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 }); // default 10 min TTL

export default cache;