export function run(input: any) {
  console.log("Send Contract Email: Sending contract via email");
  return {
    emailId: "email_789",
    sentTo: input.email,
    status: "sent"
  };
}