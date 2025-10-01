# Automation Pipeline

A TypeScript automation pipeline designed for GitDiagram visualization.

## Workflow Steps

1. **Webhook Trigger** - Receives form data from Fillout/Tally
2. **Set Fields** - Normalizes and maps form fields
3. **DocuSeal Contract** - Generates contract and signing link
4. **Send Contract Email** - Delivers signing link to creator
5. **Wait for Signature** - Processes DocuSeal webhook
6. **Notion Coaching Board** - Creates coaching page and Kanban entry
7. **Stripe Onboarding** - Sets up Connect account
8. **Welcome Email** - Sends comprehensive onboarding materials

## Architecture

Each workflow step is implemented as an independent module in the `nodes/` directory. The central `workflow.ts` orchestrates the pipeline by importing and chaining these nodes together.

## GitDiagram Visualization

When viewed in GitDiagram, the import relationships between files create a visual representation of the automation workflow, making the pipeline architecture immediately clear.

## Usage

```bash
npm install
npm run dev
```