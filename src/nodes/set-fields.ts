import { NodeInput, NodeOutput } from '../types';

export async function run(input: NodeInput): Promise<NodeOutput> {
  console.log('🔧 Set Fields: Normalizing form data');

  // In a real implementation, this would:
  // - Map form field names to standardized schema
  // - Validate required fields
  // - Apply business logic transformations
  // - Sanitize and format data

  const normalizedData = {
    ...input,
    creator: {
      ...input.creator,
      // Ensure proper case formatting
      firstName: capitalizeFirst(input.creator.firstName),
      lastName: capitalizeFirst(input.creator.lastName),
      email: input.creator.email.toLowerCase().trim()
    },
    metadata: {
      ...input.metadata,
      normalized: true,
      processedAt: new Date().toISOString(),
      // Example field mappings from raw form data
      serviceCategory: normalizeServiceType(input.metadata.serviceType),
      contactPreference: input.metadata.originalFields?.contact_pref || 'email'
    }
  };

  console.log(`✅ Fields normalized for ${normalizedData.creator.email}`);
  return normalizedData;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function normalizeServiceType(serviceType: string): string {
  // Example normalization logic
  const mappings: Record<string, string> = {
    'web_dev': 'Web Development',
    'mobile_app': 'Mobile Development',
    'consulting': 'Business Consulting',
    'design': 'UI/UX Design'
  };

  return mappings[serviceType] || serviceType;
}