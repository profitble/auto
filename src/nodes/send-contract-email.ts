import { NodeInput, NodeOutput, EmailData } from '../types';

export async function run(input: NodeInput): Promise<NodeOutput> {
  console.log('📧 Send Contract Email: Delivering signing link to creator');

  if (!input.contract) {
    throw new Error('Contract data missing - cannot send email');
  }

  // In a real implementation, this would:
  // - Use email service (SendGrid, Postmark, etc.)
  // - Load email template from file/database
  // - Personalize email content
  // - Track email delivery status
  // - Handle bounces and failures

  const emailData: EmailData = {
    to: input.creator.email,
    subject: `Please sign your coaching agreement - ${input.creator.firstName}`,
    template: 'contract-signing-email',
    variables: {
      firstName: input.creator.firstName,
      lastName: input.creator.lastName,
      signingUrl: input.contract.signingUrl,
      contractUrl: input.contract.contractUrl,
      supportEmail: 'support@yourcompany.com'
    }
  };

  // Simulate email sending
  console.log(`📬 Sending contract email to: ${emailData.to}`);
  console.log(`📋 Subject: ${emailData.subject}`);
  console.log(`🔗 Signing link: ${input.contract.signingUrl}`);

  // Mock email service response
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  const updatedPayload: NodeOutput = {
    ...input,
    metadata: {
      ...input.metadata,
      contractEmailSent: true,
      contractEmailId: messageId,
      emailSentAt: new Date().toISOString()
    }
  };

  console.log(`✅ Contract email sent to ${input.creator.email} (ID: ${messageId})`);
  return updatedPayload;
}