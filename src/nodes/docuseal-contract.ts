import { NodeInput, NodeOutput, ContractData } from '../types';

export async function run(input: NodeInput): Promise<NodeOutput> {
  console.log('📋 DocuSeal Contract: Generating contract and signing link');

  // In a real implementation, this would:
  // - Call DocuSeal API to create document from template
  // - Auto-fill fields with creator information
  // - Generate unique signing link
  // - Set up webhook for signature completion
  // - Handle API errors and retries

  const contractData: ContractData = {
    templateId: 'template_coaching_agreement_v2',
    documentId: `doc_${Date.now()}_${input.creator.email.split('@')[0]}`,
    contractUrl: `https://docuseal.com/documents/contract_${Date.now()}.pdf`,
    signingUrl: `https://docuseal.com/sign/${generateSigningToken()}`,
    status: 'pending'
  };

  // Simulate API call to DocuSeal
  console.log(`📝 Contract created: ${contractData.documentId}`);
  console.log(`🔗 Signing URL: ${contractData.signingUrl}`);

  const updatedPayload: NodeOutput = {
    ...input,
    contract: contractData,
    status: 'contract_sent',
    metadata: {
      ...input.metadata,
      contractGenerated: true,
      contractCreatedAt: new Date().toISOString()
    }
  };

  console.log(`✅ Contract ready for ${input.creator.email}`);
  return updatedPayload;
}

function generateSigningToken(): string {
  // Generate a mock signing token
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}