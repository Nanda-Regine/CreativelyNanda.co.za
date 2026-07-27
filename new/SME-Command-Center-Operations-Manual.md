# 🌿 SME COMMAND CENTER
# Operations Manual
*The complete reference guide for running your business on this system.*

**Mirembe Muse — Where Transformation Has a Template**
**Version 1.0 | For Operators, Founders & Freelancers**

---

## Purpose of This Manual

This Operations Manual is your deep-dive reference for the SME Command Center. Where the Quick-Start Guide gets you running, this manual keeps you running — explaining the logic behind each database, how data flows between them, how to handle edge cases, and how to build a sustainable daily operating rhythm that grows with your business.

Read this once fully. Then keep it accessible to return to specific sections when needed.

---

## System Architecture — How the 8 Databases Connect

The SME Command Center is a relational system. Every database is designed to link to others, so that updating one entry automatically surfaces that context everywhere else. Understanding these connections is the key to using the system at full power.

```
CLIENTS HUB
    ↓ links to
PROJECTS TRACKER ←→ REVENUE TRACKER
    ↓ links to
TASKS COMMAND CENTER
    ↓ links to
TEAM DIRECTORY

EXPENSES TRACKER ← standalone (links to Projects optionally)
INVENTORY MANAGER ← standalone (links to Clients/Projects optionally)
DOCUMENTS LIBRARY ← links to Clients + Projects
```

The Clients Hub is your anchor. Every project belongs to a client. Every revenue entry belongs to a client and a project. Every task belongs to a project (and therefore to a client). Never create a project without first creating the client.

---

## Database 1 — Clients Hub

### Purpose
The Clients Hub is the master record of every person or organisation you have done business with, are currently working with, or are in discussion with. It is your CRM (Client Relationship Manager).

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Client Name | Title | Full legal or trading name of the client |
| Status | Select | Lead / Active / Paused / Completed / Lost |
| Type | Select | Individual / Small Business / Corporate / NGO / Government |
| Industry | Select | The client's sector — customise to your market |
| Contract Value | Number | Total agreed contract amount in Rands |
| Revenue | Rollup | Auto-calculated from linked Revenue Tracker entries |
| Active Projects | Relation | Linked projects from Projects Tracker |
| Priority | Select | High / Medium / Low — your internal priority for this client |
| Last Contact | Date | Date of most recent meaningful communication |
| Next Follow-up | Date | Scheduled date for next contact |
| Notes | Text | Context, history, preferences, relationship notes |

### Status Definitions

**Lead** — A prospect who has shown interest but not yet signed or paid. Use this to track all pipeline activity. Move to Active when a contract is signed or first payment received.

**Active** — A current paying client with at least one open project. This is your primary working group.

**Paused** — A client whose work has temporarily stopped but the relationship is intact. Set a Next Follow-up date to re-engage.

**Completed** — All projects delivered and invoices settled. Keep these records — they are your business history and a source of testimonials and referrals.

**Lost** — A lead or client who did not convert or did not return. Logging these is important for tracking your conversion rate over time.

### Operating Procedures

**Adding a new client:**
Always create the client record before creating their first project. Minimum required fields: Client Name, Status, Type. Add contact details and contract value as soon as they are available.

**Updating Last Contact:**
Update this field every time you have a call, meeting, email exchange, or site visit. Set your Next Follow-up date at the same time. This field is your relationship health indicator — if Last Contact is more than 30 days ago for an Active client, something needs attention.

**Using the Notes field:**
Write context that lives nowhere else — client preferences, tone of communication, referral source, personal details that help you serve them well. This field is your institutional memory.

---

## Database 2 — Projects Tracker

### Purpose
The Projects Tracker is the operational core of your business. Every piece of work you deliver lives here, from proposal stage through to final payment.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Project Name | Title | Clear, descriptive name — include client name if helpful |
| Client | Relation | Linked client from Clients Hub |
| Status | Select | Proposal / Active / On Hold / Completed / Cancelled |
| Start Date | Date | Agreed or actual start date |
| Deadline | Date | Final delivery date |
| Project Value | Number | Full agreed project amount in Rands |
| Paid Amount | Rollup | Auto-calculated from linked Revenue Tracker entries |
| Outstanding Balance | Formula | Project Value minus Paid Amount |
| Progress % | Number | Your estimate of overall completion (0–100) |
| Deliverables | Text | List of specific outputs agreed with client |
| Team Members | Relation | Linked entries from Team Directory |
| Notes | Text | Meeting notes, change requests, scope discussions |

### Status Definitions

**Proposal** — Work has been scoped and quoted but not yet confirmed. Use this stage to track all active pitches.

**Active** — Work is in progress. This is your primary working view. Filter the Projects Tracker by Active to see your current workload at a glance.

**On Hold** — Work has been temporarily paused — awaiting client feedback, pending payment, or external dependency. Set a review date in Notes.

**Completed** — All deliverables submitted and accepted. Move here only once the final invoice is settled or formally noted as outstanding.

**Cancelled** — Project did not proceed. Log the reason in Notes. This data is valuable for understanding what types of projects or clients carry higher risk.

### Operating Procedures

**Project naming convention:**
Use a consistent format such as: [Client Name] — [Service Type] — [Month/Year]. Example: Khumalo Bakery — Website Redesign — Feb 2026. This makes filtering and searching much easier as your database grows.

**Updating Progress %:**
Update this field weekly at minimum. It is the data source for your dashboard progress bars. Be realistic — a project is not 90% done until the client has approved the final deliverable.

**Logging deliverables:**
List each deliverable explicitly in the Deliverables field. This protects you during scope disputes and ensures nothing is forgotten as you approach completion.

**Linking revenue entries:**
Every payment received should be logged in Revenue Tracker and linked back to the relevant project. The Paid Amount and Outstanding Balance fields calculate automatically — you should never have to manually compute what a client still owes you.

---

## Database 3 — Revenue Tracker

### Purpose
The Revenue Tracker is your complete income record. Every rand that enters your business should be logged here, linked to a client and project, and categorised. This database is the source of your financial dashboard and the foundation of your tax records.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Transaction | Title | Descriptive name — client + type + date |
| Client | Relation | Linked client from Clients Hub |
| Project | Relation | Linked project from Projects Tracker |
| Amount | Number | Amount received in Rands |
| Date Received | Date | The date the money actually arrived in your account |
| Month | Select | Month for grouping and reporting — Jan through Dec |
| Payment Method | Select | EFT / Cash / Card / PayPal / Yoco / Other |
| Invoice Number | Text | Your invoice reference number for this payment |
| Status | Select | Received / Pending / Partial / Overdue |
| Category | Select | Retainer / Project Fee / Deposit / Milestone / Ad-Hoc |

### Status Definitions

**Received** — Payment has cleared in your account. This is the default status for logged payments.

**Pending** — Invoice has been sent but payment not yet received. Use this to track outstanding invoices.

**Partial** — A portion of the invoice has been paid. Log the amount actually received and note the outstanding balance in the linked project.

**Overdue** — Payment is past the agreed due date. Entries with this status should trigger a follow-up action and a task in the Tasks Command Center.

### Operating Procedures

**Log every payment immediately:**
The moment a payment reflects in your account, open Revenue Tracker and log it. Batching this weekly leads to missed entries, incorrect balances, and tax headaches. A 60-second entry now saves hours in February.

**Invoice number discipline:**
Use a consistent invoice numbering system — for example: MM-2026-001, MM-2026-002. Log the same number in both your invoicing software (if any) and this tracker. Cross-referencing prevents disputes.

**Pending entries:**
When you send an invoice, immediately create a Pending entry in Revenue Tracker. This means your dashboard always reflects what is owed to you, not just what has arrived. Update the status to Received when payment clears.

**Month field:**
Always set the Month field manually even if Notion could infer it. This ensures your monthly revenue summaries are accurate for reporting and SARS submissions.

---

## Database 4 — Expenses Tracker

### Purpose
The Expenses Tracker is your complete expenditure record. Every rand that leaves your business belongs here. Maintained consistently, this database produces your deductible expense list for tax season and keeps you aware of your true profitability.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Expense | Title | Clear description of what was purchased |
| Amount | Number | Amount paid in Rands |
| Payment Date | Date | Date the payment was made |
| Category | Select | See categories below |
| Vendor | Text | Name of supplier or platform |
| Business/Personal | Select | Business / Personal / Mixed |
| Tax Deductible | Checkbox | Tick if this expense is deductible |
| Recurring | Checkbox | Tick if this is a monthly recurring cost |
| Receipt | Files | Upload or link to your proof of payment |

### Expense Categories

Use these categories consistently to ensure clean reporting:

- **Software & Subscriptions** — Notion, Adobe, hosting, tools
- **Marketing & Advertising** — paid ads, content creation costs
- **Professional Services** — accountant, lawyer, subcontractors
- **Office & Stationery** — supplies, printing, equipment
- **Transport & Travel** — Uber, fuel, parking, flights
- **Communication** — data, phone, internet
- **Training & Development** — courses, books, conferences
- **Banking & Finance** — bank fees, payment processing fees
- **Inventory & Stock** — materials, products purchased for resale
- **Other** — use sparingly; recategorise regularly

### Operating Procedures

**Tax deductibility:**
The Tax Deductible checkbox is your pre-audit preparation. Tick it for expenses directly related to generating income. When in doubt, consult your accountant. Do not leave this field blank.

**Receipt uploads:**
Every tax-deductible expense must have a receipt. Upload directly to the Receipt field in Notion or link to a folder. SARS requires proof — this field is your proof library.

**Recurring expenses:**
Tick the Recurring checkbox for subscriptions and monthly costs. This allows you to filter and see your fixed cost base at a glance — critical for cash flow management.

**Business vs Personal:**
If you use a personal card for a business expense (common in early-stage businesses), still log it as Business and note the reimbursement in the Notes field. Mixed expenses (e.g., a phone used for both work and personal) should be logged at the business-use proportion.

---

## Database 5 — Tasks Command Center

### Purpose
The Tasks Command Center manages all work actions — both your own tasks and those assigned to team members. Every task should be linked to a project and a client, which is what gives each item its full context.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Task | Title | Clear, action-oriented description — start with a verb |
| Status | Select | To Do / In Progress / Blocked / Done / Cancelled |
| Priority | Select | 🔴 Urgent / 🟠 High / 🟡 Medium / 🟢 Low |
| Due Date | Date | When this task must be completed |
| Assigned To | Relation | Linked team member from Team Directory |
| Related Project | Relation | Linked project from Projects Tracker |
| Related Client | Relation | Linked client from Clients Hub |
| Category | Select | Delivery / Admin / Finance / Marketing / Operations |
| Time Estimate | Number | Estimated hours to complete |
| Notes | Text | Context, instructions, dependencies |

### Task Writing Standards

A well-written task starts with an action verb and contains enough context to be completed without asking for clarification. Examples:

- ✅ "Send revised proposal to Khumalo Bakery by Thursday" 
- ✅ "Upload March invoices to Documents Library"
- ❌ "Khumalo" (too vague)
- ❌ "Follow up" (which client? about what?)

### Priority Definitions

**🔴 Urgent** — Due today or tomorrow, or has a hard external deadline. Address first.

**🟠 High** — Due this week, high business impact. Schedule dedicated time.

**🟡 Medium** — Due this month, moderate impact. Complete after urgent and high items.

**🟢 Low** — Nice to do, no immediate deadline. Batch and complete when capacity allows.

### Operating Procedures

**Daily task review:**
Every morning, filter Tasks by Status = To Do, sorted by Due Date ascending. This is your working list for the day. Update statuses in real time — not at the end of the day in a batch.

**Blocked tasks:**
If a task cannot be completed because of an external dependency (waiting for client feedback, waiting for payment), set Status to Blocked and note the dependency. Review blocked tasks weekly to chase outstanding items.

**Team tasks:**
Always assign tasks to a specific person using the Assigned To relation. Unassigned tasks do not get done. If you are a solo operator, assign tasks to yourself — the discipline of explicit assignment still matters.

---

## Database 6 — Team Directory

### Purpose
The Team Directory is your people database. Whether you have full-time employees, freelancers, subcontractors, or part-time helpers, every person who does work for your business belongs here.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Name | Title | Full name |
| Role | Text | Job title or function |
| Employment Type | Select | Full-time / Part-time / Freelance / Contractor / Intern |
| Email | Email | Primary work email |
| Phone | Phone | Mobile or work number |
| Start Date | Date | When they started working with you |
| Skills | Multi-select | Key capabilities and specialisations |
| Salary/Rate | Number | Monthly salary or hourly/project rate |
| Active Projects | Relation | Linked projects from Projects Tracker |
| Status | Select | Active / On Leave / Inactive |

### Operating Procedures

**Onboarding new team members:**
Create their Team Directory entry on their first day. Add their employment type, role, rate, and start date immediately. Link their first assigned project. Upload any relevant documents (contracts, NDA) to the Documents Library and note the link.

**Rate and salary confidentiality:**
If you share your Notion workspace with team members, apply Notion's page-level permissions to restrict visibility of the Salary/Rate field. In Notion, you can lock or hide specific database properties by adjusting the view settings.

**Skills field:**
Populate this field accurately — it becomes useful when assigning tasks and scoping new projects. Knowing at a glance that a team member has Adobe Illustrator skills saves the 'who can do this?' conversation.

---

## Database 7 — Inventory Manager

### Purpose
The Inventory Manager tracks your physical stock, equipment, and products. It is relevant if your business sells products, uses equipment to deliver services, or holds materials. Service-only businesses can leave this database dormant.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Product/Item | Title | Name of the product or item |
| SKU | Text | Stock-keeping unit or internal code |
| Category | Select | Product / Equipment / Materials / Consumables |
| Current Stock | Number | Units currently on hand |
| Minimum Stock | Number | Reorder threshold — Notion alerts when breached |
| Unit Cost | Number | Cost to acquire or produce one unit |
| Selling Price | Number | Price charged to customers |
| Supplier | Text | Name and contact of supplier |
| Location | Text | Where this item is stored |

### Operating Procedures

**Setting minimum stock levels:**
Set the Minimum Stock field for every item you hold. Create a filtered view called 'Reorder Needed' that shows only items where Current Stock ≤ Minimum Stock. Check this view weekly.

**Stock adjustments:**
Update Current Stock every time you receive new stock or fulfil an order. Do not let this fall behind — an inaccurate inventory is worse than no inventory.

**Markup tracking:**
The difference between Unit Cost and Selling Price is your gross margin per unit. Review this data quarterly to ensure your pricing reflects your actual costs.

---

## Database 8 — Documents Library

### Purpose
The Documents Library is the single home for every important business document. Proposals, contracts, receipts, SARS correspondence, insurance documents, certifications — all of it belongs here, linked to the relevant client and project.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Document Name | Title | Clear, descriptive name with date where relevant |
| Type | Select | Contract / Proposal / Invoice / Receipt / Compliance / Certificate / Template / Other |
| Related Client | Relation | Linked client from Clients Hub |
| Related Project | Relation | Linked project from Projects Tracker |
| Date Uploaded | Date | When the document was added |
| Status | Select | Draft / Signed / Active / Expired / Archived |
| File Link | Files & Media | Uploaded file or external link |

### Document Naming Convention

Use a consistent naming format to make retrieval fast:

`[Type] — [Client/Subject] — [Date]`

Examples:
- Contract — Dlamini Consulting — Jan 2026
- Invoice — MM-2026-014 — Khumalo Bakery — Feb 2026
- BBBEE Certificate — Mirembe Muse — 2026
- Proposal — CityConnect NPO — March 2026

### Operating Procedures

**Compliance documents:**
Store all SARS, BBBEE, CIPC, and SAHPRA documents here with expiry dates noted in the Status field. Set a reminder in your calendar 60 days before any compliance document expires.

**Client contracts:**
Every active client must have a signed contract in the Documents Library before work begins, or a clear reason noted for why one is not in place. Filter by Type = Contract and Status = Signed to audit this monthly.

**Version control:**
When a document is updated, mark the old version as Archived and upload the new version as a fresh entry. Do not delete old versions — they are your audit trail.

---

## Financial Management — Using the Dashboard

The SME Command Center main dashboard displays a Financial Snapshot using rollup and formula fields. Here is how to read and use it:

**Total Revenue (This Month):** Sum of all Revenue Tracker entries in the current month with Status = Received.

**Outstanding Invoices:** Sum of all Revenue Tracker entries with Status = Pending or Overdue.

**Total Expenses (This Month):** Sum of all Expenses Tracker entries for the current month.

**Net Position:** Revenue Received minus Total Expenses — your monthly profitability at a glance.

### Monthly Financial Review Checklist

Conduct this review on the last Friday of every month:

- [ ] All payments received this month logged in Revenue Tracker
- [ ] All expenses paid this month logged in Expenses Tracker
- [ ] Pending invoices reviewed — follow up on anything overdue
- [ ] Net position reviewed — is the business profitable this month?
- [ ] Outstanding balances per project checked — any projects significantly underpaid?
- [ ] Recurring expenses reviewed — are all subscriptions still necessary?

---

## Compliance Management (South African Context)

Use the Documents Library and a dedicated compliance calendar to manage the following:

| Compliance Item | Frequency | Notes |
|----------------|-----------|-------|
| SARS Provisional Tax | Twice yearly | August and February |
| SARS VAT Returns | Monthly or bi-monthly | If VAT registered |
| SARS Annual Tax Return | Annually | July–November |
| CIPC Annual Return | Annually | Due within 30 days of registration anniversary |
| BBBEE Certificate | Annually | Renew before expiry — required for government contracts |
| SAHPRA Registration | As applicable | Required for wellness/health products |
| UIF Contributions | Monthly | If you have employees |

---

## Team Operations

### Assigning Work to Team Members

1. Ensure the team member exists in Team Directory with Status = Active
2. In Projects Tracker, link them under Team Members on the relevant project
3. In Tasks Command Center, create individual tasks and assign using the Assigned To field
4. Set a due date and priority for every assigned task
5. Review assigned tasks in weekly team check-ins

### Weekly Team Check-In Process

1. Open Tasks Command Center filtered by Assigned To = [team member name]
2. Review Status of all tasks — In Progress, Blocked, or Done
3. Address any Blocked tasks — identify the blocker and assign a resolution task
4. Update project Progress % in Projects Tracker based on completed tasks

---

## Maintenance Schedule

### Daily (5–10 minutes)
- Log any payments received in Revenue Tracker
- Log any expenses paid in Expenses Tracker
- Update task statuses in Tasks Command Center
- Update Last Contact date in Clients Hub after any client interaction

### Weekly (30 minutes — recommend Friday afternoon)
- Review all Active projects for upcoming deadlines
- Check Outstanding Invoices — follow up on anything Overdue
- Update Progress % on all Active projects
- Review Tasks Command Center for any Blocked items
- Archive any completed projects

### Monthly (1–2 hours — recommend last Friday)
- Full financial review using the dashboard
- Review Clients Hub — any Active clients with no recent contact?
- Check Documents Library for expiring compliance documents
- Review Inventory Manager reorder needs
- Back up your Notion workspace (Settings → Export)

---

## Troubleshooting Common Issues

**Rollup fields showing incorrect totals:**
Check that the linked relation is correctly connected. Open the revenue or expense entry and confirm the Project and Client relations are populated. Rollups only count linked entries.

**Dashboard not updating:**
Notion dashboards update in real time, but occasionally require a page refresh. Press Ctrl+R (Windows) or Cmd+R (Mac) to force a refresh.

**Duplicate client entries:**
Use the search function (Ctrl+P / Cmd+P) before creating any new client. If duplicates exist, merge them by copying all relations and notes into one entry, then deleting the duplicate.

**Filtering not showing expected results:**
Check that the filter logic uses AND/OR correctly. Multiple filters on the same database stack as AND by default — change to OR if you want to see entries matching any of several conditions.

---

## 🌟 A Note from Nanda

> *"This system was built because every African entrepreneur deserves the same operational clarity that large companies pay consultants for.*
>
> *You built something real. Now build it on a foundation that can hold the weight of what it's becoming.*
>
> *Ubuntu. Affordability. Excellence."*
>
> — **Nandawula Regine Kabali-Kagwa, Founder, Mirembe Muse Digital**

---

*🌿 Mirembe Muse — Where Transformation Has a Template*

**Build with love. Build with excellence. Build for legacy.**
