export function run(input: any) {
  console.log("Notion Coaching Board: Adding client to coaching board");
  return {
    notionPageId: "page_abc123",
    clientName: input.customerName,
    status: "added"
  };
}