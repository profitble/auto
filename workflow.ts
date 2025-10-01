import { run as webhookTrigger } from './nodes/webhook-trigger';
import { run as setFields } from './nodes/set-fields';
import { run as docusealContract } from './nodes/docuseal-contract';
import { run as sendContractEmail } from './nodes/send-contract-email';
import { run as waitForSignature } from './nodes/wait-for-signature';
import { run as notionCoachingBoard } from './nodes/notion-coaching-board';
import { run as stripeOnboarding } from './nodes/stripe-onboarding';
import { run as welcomeEmail } from './nodes/welcome-email';

export async function runWorkflow() {
  console.log("Starting automation workflow...");

  const step1 = webhookTrigger();
  const step2 = setFields(step1);
  const step3 = docusealContract(step2);
  const step4 = sendContractEmail({ ...step2, ...step3 });
  const step5 = waitForSignature(step3);
  const step6 = notionCoachingBoard(step2);
  const step7 = stripeOnboarding(step2);
  const step8 = welcomeEmail(step2);

  console.log("Workflow completed successfully!");
  return step8;
}

if (require.main === module) {
  runWorkflow();
}