import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./firebase.js";
import * as admin from "firebase-admin";

export const sendNotice = onCall(async (request) => {
  if (!request.auth || !request.auth.token.companyId) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  const { invoiceId, type = "intent_to_lien" } = request.data;
  if (!invoiceId) {
    throw new HttpsError("invalid-argument", "Invoice ID is required.");
  }

  const companyId = request.auth.token.companyId as string;
  const invoiceRef = db.collection("invoices").doc(invoiceId);
  const invoiceSnap = await invoiceRef.get();

  if (!invoiceSnap.exists) {
    throw new HttpsError("not-found", "Invoice not found.");
  }

  const invoice = invoiceSnap.data()!;
  if (invoice.companyId !== companyId) {
    throw new HttpsError("permission-denied", "Unauthorized.");
  }

  if (invoice.linkedNoticeId) {
    throw new HttpsError("already-exists", "Notice already sent for this invoice.");
  }

  const noticeRef = db.collection("notices").doc();
  const noticeId = noticeRef.id;

  const mockTrackingId = "lbl_" + Math.random().toString(36).substr(2, 9);
  const mockPdfUrl = "https://example.com/notices/" + noticeId + ".pdf";

  const batch = db.batch();

  batch.set(noticeRef, {
    companyId,
    invoiceId,
    type,
    lobTrackingId: mockTrackingId,
    status: "mailed",
    generatedPdfUrl: mockPdfUrl,
    sentAt: admin.firestore.FieldValue.serverTimestamp(),
    amount: invoice.amount,
    customerName: invoice.customerName
  });

  batch.update(invoiceRef, {
    linkedNoticeId: noticeId,
    status: "notice_sent"
  });

  const auditRef = db.collection("audit_logs").doc();
  batch.set(auditRef, {
    companyId,
    actorId: request.auth.uid,
    action: "notice_sent",
    resourceId: noticeId,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    metadata: { invoiceId, lobTrackingId: mockTrackingId }
  });

  await batch.commit();
  return { noticeId, trackingId: mockTrackingId };
});
