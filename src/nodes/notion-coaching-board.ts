import { NodeInput, NodeOutput, NotionPage } from '../types';

export async function run(input: NodeInput): Promise<NodeOutput> {
  console.log('📝 Notion Coaching Board: Creating client page and updating Kanban');

  // In a real implementation, this would:
  // - Call Notion API to create new page in coaching database
  // - Populate page with client information and contract details
  // - Set initial Kanban status to "New Client"
  // - Add client to coaching pipeline tracking
  // - Create related pages (project notes, session logs, etc.)

  const notionPage: NotionPage = {
    pageId: `page_${Date.now()}_${input.creator.email.split('@')[0]}`,
    url: `https://notion.so/coaching-board/${generateNotionSlug(input.creator)}`,
    status: 'new',
    databaseId: 'coaching_clients_db_123'
  };

  // Simulate Notion API calls
  console.log(`📋 Creating Notion page for: ${input.creator.firstName} ${input.creator.lastName}`);
  console.log(`🔗 Page URL: ${notionPage.url}`);
  console.log(`📊 Kanban status: ${notionPage.status}`);

  // Mock page creation with client details
  const pageContent = {
    title: `${input.creator.firstName} ${input.creator.lastName} - Coaching Client`,
    properties: {
      'Client Email': input.creator.email,
      'Service Type': input.metadata.serviceCategory || 'General Coaching',
      'Status': 'New Client',
      'Contract Signed': input.contract?.status === 'signed',
      'Onboarding Started': new Date().toISOString(),
      'Next Action': 'Send welcome materials'
    }
  };

  console.log('📄 Page content:', JSON.stringify(pageContent, null, 2));

  const updatedPayload: NodeOutput = {
    ...input,
    notion: notionPage,
    metadata: {
      ...input.metadata,
      notionPageCreated: true,
      notionPageId: notionPage.pageId,
      notionUrl: notionPage.url,
      kanbanStatus: notionPage.status,
      notionCreatedAt: new Date().toISOString()
    }
  };

  console.log(`✅ Notion coaching board updated for ${input.creator.email}`);
  return updatedPayload;
}

function generateNotionSlug(creator: { firstName: string; lastName: string }): string {
  return `${creator.firstName}-${creator.lastName}-${Date.now()}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-');
}