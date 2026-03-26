import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./firebase.js";
import * as admin from "firebase-admin";
export const addCredits = onCall(async (request) => {
    if (!request.auth || !request.auth.token.companyId) {
        throw new HttpsError("unauthenticated", "User must be logged in.");
    }
    const { amount } = request.data;
    if (!amount || typeof amount !== "number") {
        throw new HttpsError("invalid-argument", "Valid credit amount required.");
    }
    const companyId = request.auth.token.companyId;
    const companyRef = db.collection("companies").doc(companyId);
    await db.runTransaction(async (transaction) => {
        const companySnap = await transaction.get(companyRef);
        if (!companySnap.exists)
            throw new HttpsError("not-found", "Company not found.");
        const currentCredits = companySnap.data().credits || 0;
        transaction.update(companyRef, {
            credits: currentCredits + amount,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        const auditRef = db.collection("audit_logs").doc();
        transaction.set(auditRef, {
            companyId,
            actorId: request.auth?.uid || "unknown",
            action: "credits_added",
            resourceId: companyId,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            metadata: { amount, newTotal: currentCredits + amount }
        });
    });
    return { success: true };
});
//# sourceMappingURL=billing.js.map