import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { db } from "./firebase.js";
import * as admin from "firebase-admin";
export const runRiskEngine = onDocumentCreated("invoices/{invoiceId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot)
        return;
    const invoice = snapshot.data();
    const companyId = invoice.companyId;
    let riskScore = 0.1;
    const riskFlags = [];
    const duplicateQuery = await db.collection("invoices")
        .where("companyId", "==", companyId)
        .where("customerName", "==", invoice.customerName)
        .where("amount", "==", invoice.amount)
        .limit(5)
        .get();
    if (duplicateQuery.docs.length > 1) {
        riskScore += 0.4;
        riskFlags.push("ghost_invoice_suspect");
    }
    const lastInvoices = await db.collection("invoices")
        .where("companyId", "==", companyId)
        .orderBy("syncAt", "desc")
        .limit(20)
        .get();
    if (lastInvoices.docs.length > 5) {
        const amounts = lastInvoices.docs.map(d => d.data().amount);
        const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
        const stdDev = Math.sqrt(amounts.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / amounts.length);
        if (invoice.amount > mean + (2 * stdDev)) {
            riskScore += 0.3;
            riskFlags.push("high_amount_anomaly");
        }
    }
    if (!invoice.jobAddress.raw.includes(",")) {
        riskScore += 0.2;
        riskFlags.push("malformed_address");
    }
    riskScore = Math.min(riskScore, 0.99);
    await snapshot.ref.update({
        riskScore,
        riskFlags,
        riskAnalysisAt: admin.firestore.FieldValue.serverTimestamp()
    });
    await db.collection("audit_logs").add({
        companyId,
        actorId: "system_ai",
        action: "risk_score_generated",
        resourceId: event.params.invoiceId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        metadata: { riskScore, riskFlags }
    });
});
//# sourceMappingURL=riskEngine.js.map