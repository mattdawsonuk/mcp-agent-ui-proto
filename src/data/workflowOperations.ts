export interface WorkflowOperation {
  category: string;
  icon: string;
  workflows: string[];
}

export const readOperations: WorkflowOperation[] = [
  {
    category: "Contact & Customer Lookups",
    icon: "Users",
    workflows: [
      "Find contact for... (customer record by email)",
      "Search for contact ID... (customer record by ID)",
      "Find account by number... (customer account by number)",
      "Find customer... in brand... (customer in company division)",
      "Find customer using CIM contact ID... in brand... (customer by contact ID)",
      "Look up customer account in brand... (account details in division)",
      "Search customer database for brand... (all customers in division)"
    ]
  },
  {
    category: "Order & Transaction History",
    icon: "FileText",
    workflows: [
      "Get order details for order number... (order information)",
      "Find order by ID... (order by system ID)",
      "Query all orders for brand... with limit... (recent orders list)",
      "Show recent orders placed in brand... (latest customer orders)",
      "Get learner order details for brand... (training orders)",
      "Get invoice details for header ID... (billing document)",
      "Show credit memo details for header ID... (refund document)"
    ]
  },
  {
    category: "Product Catalog & Inventory",
    icon: "Package",
    workflows: [
      "Find all training products for brand... (courses & certifications)",
      "Show membership products in brand... (subscription services)",
      "Query professional-service products with limit... (consulting services)",
      "Find bundle products for brand... (package deals)",
      "Show file-review products available in brand... (document review services)",
      "Find drawdown products for brand... (pre-paid credit products)",
      "Query drawdown credit balances for customer... (available credits)",
      "Show drawdown usage history for customer... (credit usage report)",
      "Query other type products in brand... (miscellaneous products)"
    ]
  },
  {
    category: "Drawdown & Credit Management",
    icon: "CreditCard",
    workflows: [
      "Get drawdown balance for customer... in brand... (available credits)",
      "Show drawdown transactions for customer... from date... (credit history)",
      "Query available drawdown credits for customer... (usable credits)",
      "Get drawdown usage report for customer... period... (spending report)",
      "Find pending drawdown invoices for customer... (upcoming bills)",
      "Show future invoice schedule for drawdown customer... (billing calendar)",
      "Get drawdown credit history for customer... in brand... (credit transactions)",
      "Query expired drawdown credits for customer... (outdated credits)"
    ]
  },
  {
    category: "Learner & Subscription Info",
    icon: "CheckCircle",
    workflows: [
      "Get learner seats for order... and line item... (training allocations)",
      "Get memberships for contact... in brand... (active subscriptions)",
      "Get learning path subscriptions for contact... (course programs)",
      "Get training pass subscriptions for contact... (training access)",
      "Get online course products for contact... (e-learning access)",
      "Get booking subscriptions for contact... (event reservations)",
      "Get qualifications for contact ID... (certifications earned)",
      "Get learning record for contact... (training history)",
      "Get training history for contact... in brand... (course completion)",
      "Get course completion status for contact... (progress tracking)",
      "Get learning progress for contact... in programme... (course progress)",
      "Get assessment results for contact... in course... (test scores)",
      "Get certification history for contact... (credentials earned)",
      "Get learning activity log for contact... from date... (recent activity)",
      "Get continuing professional development record for contact... (CPD points)"
    ]
  },
  {
    category: "Salesforce Integration",
    icon: "Zap",
    workflows: [
      "Get Salesforce opportunity... (sales prospect details)",
      "Find opportunity named... (sales prospect by name)",
      "Get opportunities for booker email... (prospects by contact)",
      "Query all opportunities from... to... (prospects by date range)",
      "Get opportunities for Salesforce account ID... (prospects by account)",
      "Find opportunity linked to CommerceTools order ID... (prospect to order link)"
    ]
  },
  {
    category: "Financial Management",
    icon: "CreditCard",
    workflows: [
      "Get invoice details for header ID... (billing document details)",
      "Get credit memo details for header ID... (refund document details)",
      "Get invoice header by ID... (billing summary)",
      "Get credit memo header by ID... (refund summary)",
      "Find invoice for order... (bill for specific order)",
      "Find credit memo for invoice... (refund for specific bill)",
      "Get financial transaction history for customer... (payment history)",
      "Get payment status for invoice... (bill payment status)"
    ]
  }
];

export const createOperations: WorkflowOperation[] = [
  {
    category: "Cart & Order Creation",
    icon: "ShoppingCart",
    workflows: [
      "Create cart for customer... in currency... for brand... (draft order)",
      "Create new cart in currency... for customer... (shopping basket)",
      "Generate invoice order from cart... (convert draft to final order)",
      "Process invoice order from existing cart... (complete the purchase)",
      "Convert cart... to invoice order for customer... (finalize draft order)"
    ]
  },
  {
    category: "Drawdown Order Creation",
    icon: "Package",
    workflows: [
      "Create drawdown order for customer... with credit amount... (pre-paid credits setup)",
      "Generate future invoice schedule for drawdown order... (billing calendar)",
      "Create drawdown credit allocation for customer... (assign credits)",
      "Setup recurring drawdown billing for customer... (automatic billing)",
      "Generate drawdown agreement for customer... in brand... (credit contract)"
    ]
  },
  {
    category: "Sales Link Creation",
    icon: "CreditCard",
    workflows: [
      "Create B2B sales link for customer... in currency... (business order URL)",
      "Generate B2C sales link for customer... (individual order URL)",
      "Create cart link for customer... in currency... and type... (shareable order)",
      "Generate sales link in currency... for contact ID... (order URL by contact)",
      "Create sales link in currency... for customer type... (typed order link)"
    ]
  }
];

export const modifyDeleteOperations: WorkflowOperation[] = [
  {
    category: "Contact Updates",
    icon: "Edit",
    workflows: [
      "Update contact... first name to... (change customer first name)",
      "Update contact... last name to... (change customer surname)",
      "Update contact... full name to... (change complete name)",
      "Find contact... and update names to... (lookup and rename)"
    ]
  },
  {
    category: "Cart & Product Management",
    icon: "ShoppingCart",
    workflows: [
      "Add training product... to existing cart... (add course to order)",
      "Add multiple products... to cart... (add several items)",
      "Add line item... to sales link... (add product to order URL)",
      "Change quantity of product... in sales link to... (modify item count)",
      "Set custom price... for line item... in cart link... (override product price)",
      "Apply tax rate... for customer location... (set regional tax)",
      "Remove line item... from cart link... (delete product from order)"
    ]
  },
  {
    category: "Learner & Seat Management",
    icon: "Users",
    workflows: [
      "Assign learner seat to contact... (allocate training place)",
      "Add multiple learner seats to training program... (bulk allocate)",
      "Enable auto-renewal for membership... (automatic subscription)",
      "Disable membership renewal for... (stop auto-renewal)",
      "Update membership... auto-renewal settings to... (modify renewal)"
    ]
  },
  {
    category: "Drawdown & Credit Management",
    icon: "CreditCard",
    workflows: [
      "Apply drawdown credit to order... (use pre-paid credits)",
      "Adjust drawdown balance for customer... (modify credit balance)",
      "Process drawdown usage for services... (deduct credits used)",
      "Update future invoice schedule for customer... (modify billing calendar)",
      "Extend drawdown credit expiry for customer... (extend credit validity)",
      "Transfer drawdown credits between customers... (move credits)"
    ]
  },
  {
    category: "Sales Link Finalisation",
    icon: "CheckCircle",
    workflows: [
      "Finalise sales link... as invoice payment (complete order for billing)",
      "Complete cart link... with credit/debit card payment option (card checkout)",
      "Finalise sales link... with instalment payment plan (payment plan setup)",
      "Process cart link... for invoice billing (convert to bill)"
    ]
  },
  {
    category: "Order Cancellations (High Risk)",
    icon: "Trash2",
    workflows: [
      "Cancel order... completely (delete entire order)",
      "Cancel line item... from order... (remove specific product)",
      "Remove... units from order... (reduce quantity)",
      "Cancel all training products from order... (remove all courses)",
      "Cancel full learner order... (delete training order)",
      "Partial order cancellation for specific line items... (selective removal)"
    ]
  }
];

export const chainedOperations: WorkflowOperation[] = [
  {
    category: "Contact Management Chains",
    icon: "Users",
    workflows: [
      "Find contact for... → Update contact first name to... (lookup and rename)",
      "Find contact for... → Update contact last name to... (lookup and change surname)",
      "Search for contact ID... → Update contact full name to... (ID lookup and rename)",
      "Find contact for... → Create B2B sales link for customer... in currency... (contact to business order)",
      "Find contact for... → Create cart for customer... in currency... for brand... (contact to draft order)",
      "Find contact for... → Get memberships for contact... in brand... (contact to subscriptions)",
      "Convert prospect opportunity... → Find contact for... → Update contact details... → Create sales link... (prospect to order)",
      "Find contact for... → Get learning record for contact... → Get training history for contact... (contact to training history)"
    ]
  },
  {
    category: "Customer & Order Chains",
    icon: "ShoppingCart",
    workflows: [
      "Find customer... in brand... → Create cart for customer... in currency... (customer to draft order)",
      "Find customer... in brand... → Generate B2C sales link for customer... (customer to individual order)",
      "Get order details for order number... → Cancel order... completely (lookup and cancel order)",
      "Get order details for order number... → Cancel line item... from order... (lookup and remove product)",
      "Find order by ID... → Add training product... to existing cart... (order to add course)",
      "Query all orders for brand... → Generate invoice order from cart... (orders list to billing)",
      "Get order details for order number... → Get invoice details for header ID... (order to billing info)",
      "Find order by ID... → Get credit memo details for header ID... (order to refund info)",
      "Get invoice details for header ID... → Get payment status for invoice... (billing to payment status)"
    ]
  },
  {
    category: "Product & Sales Chains",
    icon: "Package",
    workflows: [
      "Find all training products for brand... → Add training product... to existing cart... (courses to order)",
      "Show membership products in brand... → Create cart for customer... in currency... (subscriptions to draft)",
      "Query professional-service products → Create B2B sales link for customer... (consulting to business order)",
      "Find bundle products for brand... → Set custom price... for line item... (packages to custom pricing)",
      "Get learner seats for order... → Assign learner seat to contact... (seats to allocation)",
      "Get memberships for contact... → Enable auto-renewal for membership... (subscriptions to auto-renew)",
      "Get course completion status for contact... → Find all training products for brand... → Create cart for customer... (progress to new courses)",
      "Get learning progress for contact... → Query professional-service products → Add training product... to cart... (progress to consulting)"
    ]
  },
  {
    category: "Salesforce Integration Chains",
    icon: "Zap",
    workflows: [
      "Get Salesforce opportunity... → Find contact for... → Create cart for customer... (prospect to draft order)",
      "Find opportunity named... → Get opportunities for booker email... → Create B2B sales link... (prospect search to business order)",
      "Get opportunities for Salesforce account ID... → Find customer... in brand... → Generate invoice order... (account prospects to billing)",
      "Find opportunity linked to CommerceTools order ID... → Get order details for order number... → Cancel order... (linked prospect to cancel)",
      "Query all opportunities from... to... → Find contact for... → Update contact full name... (prospects period to contact update)",
      "Get Salesforce opportunity... → Create sales link... for customer type... → Finalise sales link... (prospect to completed order)",
      "Convert prospect opportunity... → Find contact for... → Create B2B sales link for customer... in currency... (convert to business order)",
      "Get Salesforce opportunity... → Find customer... in brand... → Create cart for customer... → Generate sales link... (prospect to shareable order)"
    ]
  },
  {
    category: "Learner Record Management Chains",
    icon: "CheckCircle",
    workflows: [
      "Find contact for... → Get learning record for contact... → Get training history for contact... (contact to complete learning profile)",
      "Search for contact ID... → Get course completion status for contact... → Get assessment results for contact... (ID to learning assessment)",
      "Get learner seats for order... → Get learning progress for contact... → Assign learner seat to contact... (seats to progress to allocation)",
      "Find contact for... → Get continuing professional development record for contact... → Get qualification history... (contact to CPD and qualifications)",
      "Get memberships for contact... → Get learning activity log for contact... → Get certification history for contact... (subscriptions to activity to credentials)",
      "Find contact for... → Get learning record for contact... → Create cart for customer... → Add training product... (learning profile to new course order)"
    ]
  },
  {
    category: "Financial Management Chains",
    icon: "CreditCard",
    workflows: [
      "Get order details for order number... → Get invoice details for header ID... → Get payment status for invoice... (order to billing to payment)",
      "Find customer... in brand... → Get financial transaction history for customer... → Get invoice details... (customer to financial history)",
      "Get invoice details for header ID... → Get credit memo details for header ID... → Find order by ID... (billing to refund to order)",
      "Get order details for order number... → Find invoice for order... → Get credit memo for invoice... (order to bill to refund)",
      "Get invoice header by ID... → Get payment status for invoice... → Get credit memo details... (billing summary to payment to refund)",
      "Find customer... → Get financial transaction history... → Get invoice details... → Generate credit memo... (customer to finance to refund creation)"
    ]
  },
  {
    category: "Drawdown & Credit Chains",
    icon: "CreditCard",
    workflows: [
      "Find customer... → Get drawdown balance for customer... → Apply drawdown credit to order... (customer to credits to payment)",
      "Query drawdown products... → Create drawdown order for customer... → Setup recurring billing... (credits products to pre-paid setup)",
      "Get drawdown usage history... → Adjust drawdown balance... → Update future invoice schedule... (usage to balance to billing calendar)",
      "Find drawdown products... → Create cart for customer... → Apply drawdown credit to order... (credits products to draft to payment)",
      "Get customer... → Query available drawdown credits... → Process drawdown usage for services... (customer to available credits to usage)",
      "Find order... → Apply drawdown credit to order... → Update future invoice schedule... (order to credit payment to billing)",
      "Get drawdown balance... → Transfer drawdown credits... → Generate future invoice schedule... (balance to transfer to billing setup)",
      "Query expired drawdown credits... → Extend drawdown credit expiry... → Process drawdown usage... (expired to extension to usage)"
    ]
  },
  {
    category: "Advanced Multi-Step Workflows",
    icon: "Settings",
    workflows: [
      "Find contact for... → Find customer... in brand... → Create cart... → Add multiple products... → Finalise sales link... (complete order workflow)",
      "Search for contact ID... → Get memberships for contact... → Disable membership renewal... → Create new cart... (subscription management to new order)",
      "Get order details... → Cancel line item... → Create cart for customer... → Add training product... (order modification to replacement)",
      "Find customer... → Query all orders... → Get learner seats... → Assign learner seat to contact... (customer to orders to training allocation)",
      "Get Salesforce opportunity... → Find contact... → Create B2B sales link... → Add line item... → Apply tax rate... (prospect to complete business order)",
      "Find all training products... → Create cart... → Set custom price... → Apply tax rate... → Finalise sales link... (products to custom-priced order)",
      "Convert prospect opportunity... → Find contact for... → Update contact details... → Create sales link... → Add products... → Finalise sales link... (full prospect conversion)",
      "Find contact for... → Get learning record for contact... → Get course completion status... → Create cart for customer... → Add training product... (learning assessment to new training)",
      "Get training history for contact... → Get assessment results for contact... → Find all training products... → Create B2B sales link... → Add line item... (training history to business order)",
      "Search for contact ID... → Get continuing professional development record... → Query professional-service products → Create cart... → Finalise sales link... (CPD to professional services order)",
      "Get order details for order number... → Get invoice details for header ID... → Get payment status... → Get credit memo details... (complete financial audit trail)",
      "Find customer... → Get financial transaction history... → Get invoice details... → Create cart for customer... → Generate sales link... (financial review to new order)",
      "Get invoice header by ID... → Find order by ID... → Get customer details... → Create credit memo... → Process refund... (billing to refund processing)"
    ]
  }
]; 