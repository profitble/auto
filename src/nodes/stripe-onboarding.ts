import { NodeInput, NodeOutput, StripeOnboarding } from '../types';

export async function run(input: NodeInput): Promise<NodeOutput> {
  console.log('💳 Stripe Onboarding: Creating Connect account and onboarding link');

  // In a real implementation, this would:
  // - Call Stripe API to create Connect Express account
  // - Generate account onboarding link
  // - Set up webhooks for account status updates
  // - Configure payment processing capabilities
  // - Handle account verification requirements

  const stripeData: StripeOnboarding = {
    accountId: `acct_${Date.now()}_${generateAccountSuffix()}`,
    onboardingUrl: `https://connect.stripe.com/express/oauth/authorize?client_id=ca_xxx&state=${generateStateToken()}`,
    status: 'pending'
  };

  // Simulate Stripe Connect API calls
  console.log(`🏦 Creating Stripe account for: ${input.creator.email}`);
  console.log(`🔗 Onboarding URL: ${stripeData.onboardingUrl}`);
  console.log(`📊 Account status: ${stripeData.status}`);

  // Mock account creation with business details
  const accountDetails = {
    email: input.creator.email,
    business_type: 'individual',
    individual: {
      first_name: input.creator.firstName,
      last_name: input.creator.lastName,
      email: input.creator.email
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true }
    },
    business_profile: {
      mcc: '5734', // Computer software stores
      url: `https://yourcompany.com/creators/${input.creator.email.split('@')[0]}`
    }
  };

  console.log('💼 Account details:', JSON.stringify(accountDetails, null, 2));

  const updatedPayload: NodeOutput = {
    ...input,
    stripe: stripeData,
    metadata: {
      ...input.metadata,
      stripeAccountCreated: true,
      stripeAccountId: stripeData.accountId,
      stripeOnboardingUrl: stripeData.onboardingUrl,
      stripeCreatedAt: new Date().toISOString()
    }
  };

  console.log(`✅ Stripe onboarding ready for ${input.creator.email}`);
  return updatedPayload;
}

function generateAccountSuffix(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateStateToken(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}