import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
export const hello = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map