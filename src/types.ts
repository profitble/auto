export interface CreatorInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
}

export interface FormData {
  creator: CreatorInfo;
  serviceType: string;
  projectDescription?: string;
  rawFields: Record<string, any>;
}

export interface NormalizedFields {
  creator: CreatorInfo;
  serviceType: string;
  projectDescription?: string;
  metadata: Record<string, any>;
}

export interface ContractData {
  templateId: string;
  contractUrl: string;
  signingUrl: string;
  documentId: string;
  status: 'pending' | 'signed' | 'expired';
}

export interface EmailData {
  to: string;
  subject: string;
  template: string;
  variables: Record<string, any>;
  messageId?: string;
}

export interface SignatureEvent {
  documentId: string;
  signerEmail: string;
  status: 'completed' | 'declined' | 'expired';
  signedAt?: Date;
  signedDocumentUrl?: string;
}

export interface NotionPage {
  pageId: string;
  url: string;
  status: 'new' | 'in_progress' | 'completed';
  databaseId: string;
}

export interface StripeOnboarding {
  accountId: string;
  onboardingUrl: string;
  status: 'pending' | 'complete' | 'restricted';
}

export interface WorkflowPayload {
  id: string;
  timestamp: Date;
  creator: CreatorInfo;
  contract?: ContractData;
  notion?: NotionPage;
  stripe?: StripeOnboarding;
  status: 'started' | 'contract_sent' | 'signed' | 'onboarded' | 'completed';
  metadata: Record<string, any>;
}

export type NodeInput = WorkflowPayload;
export type NodeOutput = WorkflowPayload;

export interface NodeFunction {
  (input: NodeInput): Promise<NodeOutput>;
}