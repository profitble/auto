export function run(input: any) {
  console.log("Welcome Email: Sending welcome email to new client");
  return {
    emailId: "welcome_999",
    sentTo: input.email,
    status: "sent"
  };
}