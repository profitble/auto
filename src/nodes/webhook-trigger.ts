import { NodeInput, NodeOutput, FormData, WorkflowPayload } from '../types';

export async function run(formData: FormData): Promise<NodeOutput> {
  console.log('🎯 Webhook Trigger: Received form submission');
  console.log('Form data:', JSON.stringify(formData, null, 2));

  // In a real implementation, this would:
  // - Validate webhook signature (Fillout/Tally)
  // - Parse and validate form payload
  // - Extract creator information
  // - Initialize workflow tracking

  const workflowPayload: WorkflowPayload = {
    id: `workflow_${Date.now()}`,
    timestamp: new Date(),
    creator: formData.creator,
    status: 'started',
    metadata: {
      source: 'fillout',
      originalFields: formData.rawFields,
      serviceType: formData.serviceType
    }
  };

  console.log(`✅ Workflow initiated for ${formData.creator.email}`);
  return workflowPayload;
}