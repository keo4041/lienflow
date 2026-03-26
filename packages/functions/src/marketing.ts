import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./firebase.js";
import * as admin from "firebase-admin";

export const calculateLoss = onCall(async (request) => {
  const { email, hourlyWage, volume } = request.data;
  if (!email || !hourlyWage || !volume) {
    throw new HttpsError("invalid-argument", "Email, wage, and volume are required.");
  }

  const diyCostPerNotice = 8.86;
  const timePerNoticeMin = 30;

  const monthlyDiyCost = (volume * (timePerNoticeMin / 60) * hourlyWage) + (volume * diyCostPerNotice);
  const monthlyLienFlowCost = (volume * 19.95);

  const monthlyLoss = monthlyDiyCost - monthlyLienFlowCost;

  await db.collection("leads").add({
    email,
    hourlyWage,
    volume,
    monthlyLoss,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });

  return { monthlyLoss, monthlyDiyCost, monthlyLienFlowCost };
});
