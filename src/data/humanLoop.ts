export interface HumanLoopExample {
  category: string;
  color: string;
  title: string;
  message: string;
}

export const humanLoopExamples: HumanLoopExample[] = [
  {
    category: 'Contact Updates',
    color: 'blue',
    title: 'Contact Updates',
    message: '"I found contact for email address you provided. You want to update first name to the new name you specified. This will permanently change the contact information. Do you want to proceed? (yes/no)"'
  },
  {
    category: 'Order Creation',
    color: 'amber',
    title: 'Order Creation',
    message: '"I\'m about to create an order with the customer email, products, and currency you specified. This will generate a binding order. Confirm to proceed? (yes/no)"'
  },
  {
    category: 'Order Cancellation',
    color: 'red',
    title: 'Order Cancellation',
    message: '"Ready to cancel the order/line items you specified. This will permanently remove these items and may trigger a partial refund. Continue? (yes/no)"'
  },
  {
    category: 'Drawdown Order Creation',
    color: 'green',
    title: 'Drawdown Order Creation',
    message: '"I\'m about to create a drawdown order with £50,000 credit for customer, valid for 12 months with quarterly billing. This will set up pre-paid credits and future invoice schedule. Confirm to proceed? (yes/no)"'
  },
  {
    category: 'Credit Application',
    color: 'blue',
    title: 'Credit Application',
    message: '"Ready to apply £5,000 drawdown credit to order. Current balance: £25,000. Remaining after application: £20,000. This will reduce customer\'s available drawdown credits. Continue? (yes/no)"'
  },
  {
    category: 'Chained Workflow',
    color: 'purple',
    title: 'Chained Workflow',
    message: '"I\'ll execute this 4-step workflow: Step 1: Convert prospect opportunity → Step 2: Find contact → Step 3: Update details → Step 4: Create sales link. This will modify data across multiple systems. Execute complete workflow chain? (yes/no)"'
  }
];

export const humanLoopIntro = 'All create, modify, and delete operations require explicit user confirmation before execution to prevent accidental changes.'; 