import { NodeInput, NodeOutput, EmailData } from '../types';

export async function run(input: NodeInput): Promise<NodeOutput> {
  console.log('🎉 Welcome Email: Sending comprehensive onboarding email');

  if (!input.contract || !input.notion || !input.stripe) {
    throw new Error('Missing required data - contract, notion, or stripe information not found');
  }

  // In a real implementation, this would:
  // - Use professional email service (SendGrid, Postmark, etc.)
  // - Load rich HTML email template
  // - Personalize with client data and links
  // - Include signed contract as attachment
  // - Track email engagement (opens, clicks)
  // - Set up follow-up email sequences

  const emailData: EmailData = {
    to: input.creator.email,
    subject: `Welcome to the program, ${input.creator.firstName}! Your next steps 🚀`,
    template: 'welcome-onboarding-email',
    variables: {
      firstName: input.creator.firstName,
      lastName: input.creator.lastName,
      signedContractUrl: input.metadata.signedDocumentUrl,
      notionBoardUrl: input.notion.url,
      stripeOnboardingUrl: input.stripe.onboardingUrl,
      supportEmail: 'support@yourcompany.com',
      schedulingLink: 'https://calendly.com/yourcompany/onboarding',
      slackInviteUrl: 'https://slack.com/invite/abc123'
    }
  };

  // Simulate comprehensive welcome email sending
  console.log(`📧 Sending welcome email to: ${emailData.to}`);
  console.log(`📋 Subject: ${emailData.subject}`);
  console.log('📎 Includes:');
  console.log(`   📄 Signed contract: ${input.metadata.signedDocumentUrl}`);
  console.log(`   📝 Coaching board: ${input.notion.url}`);
  console.log(`   💳 Stripe setup: ${input.stripe.onboardingUrl}`);

  // Mock comprehensive email content
  const emailContent = {
    welcome_message: `Welcome ${input.creator.firstName}! We're excited to have you join our coaching program.`,
    next_steps: [
      'Review your signed coaching agreement (attached)',
      'Access your personal coaching board in Notion',
      'Complete your Stripe payment setup',
      'Schedule your first coaching session',
      'Join our private Slack community'
    ],
    important_links: {
      coaching_board: input.notion.url,
      stripe_setup: input.stripe.onboardingUrl,
      scheduling: emailData.variables.schedulingLink,
      slack_invite: emailData.variables.slackInviteUrl
    }
  };

  console.log('📄 Email content preview:', JSON.stringify(emailContent, null, 2));

  const messageId = `welcome_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  const updatedPayload: NodeOutput = {
    ...input,
    status: 'completed',
    metadata: {
      ...input.metadata,
      welcomeEmailSent: true,
      welcomeEmailId: messageId,
      onboardingCompleted: true,
      workflowCompletedAt: new Date().toISOString()
    }
  };

  console.log(`✅ Welcome email sent to ${input.creator.email} (ID: ${messageId})`);
  console.log(`🎯 Workflow completed for ${input.creator.email}`);
  return updatedPayload;
}