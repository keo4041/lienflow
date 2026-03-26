import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./firebase.js";
import * as admin from "firebase-admin";

export const syncInvoices = onCall(async (request) => {
  if (!request.auth || !request.auth.token.companyId) {
    throw new HttpsError("unauthenticated", "User must be part of a company.");
  }

  const companyId = request.auth.token.companyId as string;
  const mockMode = request.data.mock || true;

  if (mockMode) {
    const mockInvoices = [
      {
        qbId: "1001",
        customerName: "Acme Construction",
        amount: 4500.00,
        jobAddress: { raw: "123 Main St, Los Angeles, CA 90001", normalized: "", cassVerified: false },
        riskScore: 0.1,
        riskFlags: []
      },
      {
        qbId: "1002",
        customerName: "Ghost Developments",
        amount: 15200.00,
        jobAddress: { raw: "999 Unknown Ave, Miami, FL 33101", normalized: "", cassVerified: false },
        riskScore: 0.85,
        riskFlags: ["address_mismatch", "high_amount_anomaly"]
      }
    ];

    const batch = db.batch();
    for (const inv of mockInvoices) {
      const invRef = db.collection("invoices").doc(`${companyId}_${inv.qbId}`);
      batch.set(invRef, {
        ...inv,
        companyId,
        syncAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }

    const auditRef = db.collection("audit_logs").doc();
    batch.set(auditRef, {
      companyId,
      actorId: request.auth.uid,
      action: "invoice_sync",
      resourceId: companyId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      metadata: { mock: true, count: mockInvoices.length }
    });

    await batch.commit();
    return { success: true, count: mockInvoices.length };
  }

  return { success: false, message: "Real QB Sync not implemented yet." };
});
