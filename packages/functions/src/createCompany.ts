import { onCall, HttpsError } from "firebase-functions/v2/https";
import { auth, db } from "./firebase.js";
import * as admin from "firebase-admin";

export const createCompany = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  const { name } = request.data;
  if (!name) {
    throw new HttpsError("invalid-argument", "Company name is required.");
  }

  const userId = request.auth.uid;
  const companyRef = db.collection("companies").doc();
  const companyId = companyRef.id;

  const batch = db.batch();

  batch.set(companyRef, {
    name,
    primaryContactEmail: request.auth.token.email || "",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    subscriptionStatus: "trial",
    settings: { autoSync: true, riskThreshold: 80 }
  });

  const userRef = db.collection("users").doc(userId);
  batch.set(userRef, {
    companyId,
    role: "admin",
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  const auditRef = db.collection("audit_logs").doc();
  batch.set(auditRef, {
    companyId,
    actorId: userId,
    action: "company_created",
    resourceId: companyId,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    metadata: {
      ip: request.rawRequest.ip || "unknown",
      userAgent: request.rawRequest.headers["user-agent"] || "unknown"
    }
  });

  await batch.commit();
  await auth.setCustomUserClaims(userId, { companyId, role: "admin" });

  return { companyId };
});
