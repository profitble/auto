export function run() {
  console.log("Webhook Trigger: Received webhook event");
  return { webhookData: "incoming-request", timestamp: Date.now() };
}