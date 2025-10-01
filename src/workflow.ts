import { FormData } from './types';

// Import all workflow nodes - these imports create the visual connections in GitDiagram
import * as webhookTrigger from './nodes/webhook-trigger';
import * as setFields from './nodes/set-fields';
import * as docusealContract from './nodes/docuseal-contract';
import * as sendContractEmail from './nodes/send-contract-email';
import * as waitForSignature from './nodes/wait-for-signature';
import * as notionCoachingBoard from './nodes/notion-coaching-board';
import * as stripeOnboarding from './nodes/stripe-onboarding';
import * as welcomeEmail from './nodes/welcome-email';

export async function executeWorkflow(formData: FormData): Promise<void> {
  console.log('🚀 Starting automation workflow...');
  console.log('════════════════════════════════════════');

  try {
    // Step 1: Process incoming webhook data
    let payload = await webhookTrigger.run(formData);
    console.log('────────────────────────────────────────');

    // Step 2: Normalize and set fields
    payload = await setFields.run(payload);
    console.log('────────────────────────────────────────');

    // Step 3: Generate contract and signing link
    payload = await docusealContract.run(payload);
    console.log('────────────────────────────────────────');

    // Step 4: Send contract email to creator
    payload = await sendContractEmail.run(payload);
    console.log('────────────────────────────────────────');

    // Step 5: Wait for signature (webhook simulation)
    payload = await waitForSignature.run(payload);
    console.log('────────────────────────────────────────');

    // Step 6: Create Notion coaching board entry
    payload = await notionCoachingBoard.run(payload);
    console.log('────────────────────────────────────────');

    // Step 7: Set up Stripe onboarding
    payload = await stripeOnboarding.run(payload);
    console.log('────────────────────────────────────────');

    // Step 8: Send comprehensive welcome email
    payload = await welcomeEmail.run(payload);
    console.log('────────────────────────────────────────');

    console.log('🎉 Workflow completed successfully!');
    console.log(`✅ Final status: ${payload.status}`);
    console.log(`📧 Creator: ${payload.creator.email}`);
    console.log('════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Workflow failed:', error);
    throw error;
  }
}

// Example usage / test runner
async function main() {
  // Mock form data from Fillout/Tally
  const sampleFormData: FormData = {
    creator: {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1-555-0123',
      company: 'Acme Corp'
    },
    serviceType: 'web_dev',
    projectDescription: 'E-commerce website development',
    rawFields: {
      contact_pref: 'email',
      budget_range: '10k-25k',
      timeline: '3-months',
      has_existing_site: false
    }
  };

  await executeWorkflow(sampleFormData);
}

// Run the workflow if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}