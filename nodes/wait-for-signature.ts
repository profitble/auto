export function run(input: any) {
  console.log("Wait for Signature: Monitoring contract status");
  return {
    contractId: input.contractId,
    signatureStatus: "signed",
    completedAt: Date.now()
  };
}