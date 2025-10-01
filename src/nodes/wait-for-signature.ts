import { NodeInput, NodeOutput, SignatureEvent } from '../types';

export async function run(input: NodeInput): Promise<NodeOutput> {
  console.log('⏱️  Wait for Signature: Processing DocuSeal webhook');

  if (!input.contract) {
    throw new Error('Contract data missing - cannot process signature');
  }

  // In a real implementation, this would:
  // - Receive webhook from DocuSeal when document is signed
  // - Verify webhook signature for security
  // - Parse signature event payload
  // - Update contract status
  // - Download signed document
  // - Store signed document in secure location

  // Simulate signature completion event
  const signatureEvent: SignatureEvent = {
    documentId: input.contract.documentId,
    signerEmail: input.creator.email,
    status: 'completed',
    signedAt: new Date(),
    signedDocumentUrl: `${input.contract.contractUrl.replace('.pdf', '_signed.pdf')}`
  };

  console.log(`✍️  Document signed by: ${signatureEvent.signerEmail}`);
  console.log(`📄 Signed document: ${signatureEvent.signedDocumentUrl}`);

  const updatedPayload: NodeOutput = {
    ...input,
    contract: {
      ...input.contract,
      status: 'signed'
    },
    status: 'signed',
    metadata: {
      ...input.metadata,
      contractSigned: true,
      signedAt: signatureEvent.signedAt?.toISOString(),
      signedDocumentUrl: signatureEvent.signedDocumentUrl,
      signatureProcessedAt: new Date().toISOString()
    }
  };

  console.log(`✅ Signature processed for ${input.creator.email}`);
  return updatedPayload;
}