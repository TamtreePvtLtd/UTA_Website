import cron from "node-cron";
import Student from "@/models/studentModel";
import { connectMongoDB } from "@/lib/mongodb";

if (!(global as any).expiredPlanJobStarted) {
  (global as any).expiredPlanJobStarted = true;

  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Running cron job: Checking expired student plans...");
      await connectMongoDB();

      const now = new Date();

      const result = await Student.updateMany(
        {
          planEndDate: { $lt: now },
          paymentStatus: { $ne: "pending" },
        },
        { $set: { paymentStatus: "pending" } }
      );

      if (result.modifiedCount > 0) {
        console.log(`Updated ${result.modifiedCount} expired student plans.`);
      } else {
        console.log("No expired plans found.");
      }
    } catch (err) {
      console.error("Error in cron job:", err);
    }
  });

  console.log("Cron job scheduled: Expired student plan checker.");
}