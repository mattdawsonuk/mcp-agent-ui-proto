import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Users, ShoppingCart, FileText, CreditCard, BarChart3, Settings, AlertTriangle, CheckCircle, Package, Zap, Eye, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

// MynaUI-style inline SVG icons for chat interface
const MynaArrowLeft = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

const MynaMessage = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const MynaSend = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.912 12H3l18-9-9 18-2.088-6Z" />
  </svg>
);

const MCPWorkflowInterface = () => {
  const [currentView, setCurrentView] = useState('workflows');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isHumanLoopExpanded, setIsHumanLoopExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'AUD-001',
      timestamp: '2025-06-26 14:23:15',
      user: 'mark.sullivan@wilmingtonplc.com',
      workflow: 'Find contact for... (customer record by email)',
      errorType: 'USER_ERROR',
      errorMessage: 'Invalid email format error - "notfound@example" is not a valid email address',
      userInput: 'notfound@example',
      completionTime: null,
      validationChecks: ['Email format validation', 'Domain validation'],
      resolution: 'User provided correct email format',
      severity: 'LOW'
    },
    {
      id: 'AUD-002',
      timestamp: '2025-06-26 14:18:42',
      user: 'sarah.jones@operations.com',
      workflow: 'Create drawdown order for customer... (pre-paid credits setup)',
      errorType: 'SYSTEM_ERROR',
      errorMessage: 'Brand validation failed - "unknown-brand" not authorized for this operation',
      userInput: 'customer@test.com, 50000, unknown-brand',
      completionTime: null,
      validationChecks: ['Brand permissions', 'Customer validation', 'Credit amount validation'],
      resolution: 'User redirected to valid brand list',
      severity: 'MEDIUM'
    },
    {
      id: 'AUD-003',
      timestamp: '2025-06-26 14:15:28',
      user: 'admin@ica.com',
      workflow: 'Create cart for customer... (draft order)',
      errorType: 'SUCCESS',
      errorMessage: null,
      userInput: 'sarah.johnson@globaltech.com, CAD, corporate-learning',
      completionTime: '2.3 seconds',
      validationChecks: ['Customer lookup', 'Brand permissions', 'Currency validation', 'Tax calculation', 'LA1 code validation'],
      resolution: 'Workflow completed successfully',
      severity: 'INFO'
    },
    {
      id: 'AUD-004',
      timestamp: '2025-06-26 14:12:17',
      user: 'operations@mercia-group.com',
      workflow: 'Apply drawdown credit to order... (use pre-paid credits)',
      errorType: 'BUSINESS_ERROR',
      errorMessage: 'Insufficient drawdown credits - Available: £2,500, Requested: £5,000',
      userInput: 'ORD-2025-12345, 5000',
      completionTime: null,
      validationChecks: ['Order validation', 'Credit balance check', 'Credit expiry validation'],
      resolution: 'User offered credit top-up options',
      severity: 'HIGH'
    },
    {
      id: 'AUD-005',
      timestamp: '2025-06-26 14:08:33',
      user: 'training@bondsolon.com',
      workflow: 'Cancel order... completely (delete entire order)',
      errorType: 'POLICY_ERROR',
      errorMessage: 'Order cannot be cancelled - status is "Shipped"',
      userInput: 'ORD-2025-98765',
      completionTime: null,
      validationChecks: ['Order status check', 'Cancellation policy validation', 'Refund eligibility'],
      resolution: 'User redirected to returns process',
      severity: 'MEDIUM'
    },
    {
      id: 'AUD-006',
      timestamp: '2025-06-26 14:05:19',
      user: 'mark.sullivan@wilmingtonplc.com',
      workflow: 'Find customer... in brand... (customer in company division)',
      errorType: 'SUCCESS',
      errorMessage: null,
      userInput: 'm.s.sullivan@hotmail.co.uk, ica',
      completionTime: '1.8 seconds',
      validationChecks: ['Email validation', 'Brand access check', 'Customer record retrieval'],
      resolution: 'Customer details retrieved successfully',
      severity: 'INFO'
    }
  ]);
  const [workflowMetrics, setWorkflowMetrics] = useState({
    totalWorkflows: 127,
    successfulWorkflows: 98,
    userErrors: 18,
    systemErrors: 7,
    businessErrors: 4,
    averageCompletionTime: '2.1 seconds',
    mostCommonError: 'Invalid email format',
    peakUsageTime: '14:00-15:00'
  });

  const readOperations = [
    {
      category: "Contact & Customer Lookups",
      icon: <Users className="h-4 w-4" />,
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
      icon: <FileText className="h-4 w-4" />,
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
      icon: <Package className="h-4 w-4" />,
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
      icon: <CreditCard className="h-4 w-4" />,
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
      icon: <CheckCircle className="h-4 w-4" />,
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
      icon: <Zap className="h-4 w-4" />,
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
      icon: <CreditCard className="h-4 w-4" />,
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

  const createOperations = [
    {
      category: "Cart & Order Creation",
      icon: <ShoppingCart className="h-4 w-4" />,
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
      icon: <Package className="h-4 w-4" />,
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
      icon: <CreditCard className="h-4 w-4" />,
      workflows: [
        "Create B2B sales link for customer... in currency... (business order URL)",
        "Generate B2C sales link for customer... (individual order URL)",
        "Create cart link for customer... in currency... and type... (shareable order)",
        "Generate sales link in currency... for contact ID... (order URL by contact)",
        "Create sales link in currency... for customer type... (typed order link)"
      ]
    }
  ];

  const modifyDeleteOperations = [
    {
      category: "Contact Updates",
      icon: <Edit className="h-4 w-4" />,
      workflows: [
        "Update contact... first name to... (change customer first name)",
        "Update contact... last name to... (change customer surname)",
        "Update contact... full name to... (change complete name)",
        "Find contact... and update names to... (lookup and rename)"
      ]
    },
    {
      category: "Cart & Product Management",
      icon: <ShoppingCart className="h-4 w-4" />,
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
      icon: <Users className="h-4 w-4" />,
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
      icon: <CreditCard className="h-4 w-4" />,
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
      icon: <CheckCircle className="h-4 w-4" />,
      workflows: [
        "Finalise sales link... as invoice payment (complete order for billing)",
        "Complete cart link... with credit/debit card payment option (card checkout)",
        "Finalise sales link... with instalment payment plan (payment plan setup)",
        "Process cart link... for invoice billing (convert to bill)"
      ]
    },
    {
      category: "Order Cancellations (High Risk)",
      icon: <Trash2 className="h-4 w-4" />,
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

  const chainedOperations = [
    {
      category: "Contact Management Chains",
      icon: <Users className="h-4 w-4" />,
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
      icon: <ShoppingCart className="h-4 w-4" />,
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
      icon: <Package className="h-4 w-4" />,
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
      icon: <Zap className="h-4 w-4" />,
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
      icon: <CheckCircle className="h-4 w-4" />,
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
      icon: <CreditCard className="h-4 w-4" />,
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
      icon: <CreditCard className="h-4 w-4" />,
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
      icon: <Settings className="h-4 w-4" />,
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

  const addAuditLog = (workflow, errorType, errorMessage, userInput, completionTime, validationChecks, resolution, severity) => {
    const newLog = {
      id: `AUD-${String(auditLogs.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toLocaleString('en-GB', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }),
      user: 'current.user@example.com', // In real implementation, this would come from auth
      workflow,
      errorType,
      errorMessage,
      userInput,
      completionTime,
      validationChecks,
      resolution,
      severity
    };
    
    setAuditLogs(prev => [newLog, ...prev]);
    
    // Update metrics
    setWorkflowMetrics(prev => ({
      ...prev,
      totalWorkflows: prev.totalWorkflows + 1,
      successfulWorkflows: errorType === 'SUCCESS' ? prev.successfulWorkflows + 1 : prev.successfulWorkflows,
      userErrors: errorType === 'USER_ERROR' ? prev.userErrors + 1 : prev.userErrors,
      systemErrors: errorType === 'SYSTEM_ERROR' ? prev.systemErrors + 1 : prev.systemErrors,
      businessErrors: errorType === 'BUSINESS_ERROR' ? prev.businessErrors + 1 : prev.businessErrors
    }));
  };

  const toggleSectionExpanded = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handlePromptClick = (prompt, operationType = 'read') => {
    setSelectedPrompt(prompt);
    setChatMessages([
      {
        type: 'user',
        content: prompt,
        timestamp: new Date().toLocaleTimeString()
      },
      {
        type: 'agent',
        content: getAgentResponse(prompt, operationType),
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setCurrentView('chat');
  };

  const getAgentResponse = (prompt, operationType) => {
    const getRequiredFields = (prompt) => {
      const fields = [];
      
      if (operationType === 'chained' && prompt.includes('→')) {
        const steps = prompt.split('→').map(step => step.trim());
        fields.push('🔗 **Multi-Step Workflow:**');
        steps.forEach((step, index) => {
          fields.push(`**Step ${index + 1}:** ${step}`);
          
          if (step.includes('contact for...')) {
            fields.push('   📧 Email address for contact');
          }
          if (step.includes('contact ID...')) {
            fields.push('   🆔 Contact ID');
          }
          if (step.includes('opportunity...') || step.includes('Convert prospect opportunity...')) {
            fields.push('   🎯 Salesforce Opportunity ID');
          }
          if (step.includes('brand...')) {
            fields.push('   🏢 Brand name');
          }
          if (step.includes('currency...')) {
            fields.push('   💰 Currency (USD, EUR, GBP, CAD, etc.)');
          }
          if (step.includes('first name to...') || step.includes('last name to...') || step.includes('full name to...')) {
            fields.push('   👤 New name(s)');
          }
          if (step.includes('order number...') || step.includes('order ID...')) {
            fields.push('   🔢 Order number/ID');
          }
          if (step.includes('product...')) {
            fields.push('   📦 Product SKU');
            fields.push('   📊 Quantity');
          }
          if (step.includes('price...')) {
            fields.push('   💵 Price amount');
          }
          if (step.includes('tax rate...')) {
            fields.push('   📊 Tax rate (as percentage)');
          }
        });
        return fields;
      }
      
      if (prompt.includes('contact for...')) {
        fields.push('📧 Email address');
      }
      if (prompt.includes('contact ID...') || prompt.includes('by ID...')) {
        fields.push('🆔 Contact/Customer ID');
      }
      if (prompt.includes('opportunity...') || prompt.includes('Convert prospect opportunity...')) {
        fields.push('🎯 Salesforce Opportunity ID');
      }
      if (prompt.includes('by number...') || prompt.includes('order number...')) {
        fields.push('🔢 Number (Order/Account)');
      }
      if (prompt.includes('brand...')) {
        fields.push('🏢 Brand name');
      }
      if (prompt.includes('currency...')) {
        fields.push('💰 Currency (USD, EUR, GBP, CAD, etc.)');
      }
      if (prompt.includes('type...') || prompt.includes('B2B') || prompt.includes('B2C')) {
        fields.push('👥 Customer type (B2B or B2C)');
      }
      if (prompt.includes('limit...') || prompt.includes('quantity...')) {
        fields.push('📊 Limit/Quantity number');
      }
      if (prompt.includes('from... to...')) {
        fields.push('📅 Start date (YYYY-MM-DD)');
        fields.push('📅 End date (YYYY-MM-DD)');
      }
      if (prompt.includes('first name to...')) {
        fields.push('🆔 Contact ID');
        fields.push('👤 New first name');
      }
      if (prompt.includes('last name to...')) {
        fields.push('🆔 Contact ID');
        fields.push('👤 New last name');
      }
      if (prompt.includes('full name to...')) {
        fields.push('🆔 Contact ID');
        fields.push('👤 New first name');
        fields.push('👤 New last name');
      }
      if (prompt.includes('product...') && (prompt.includes('Add') || prompt.includes('training'))) {
        fields.push('📦 Product SKU');
        fields.push('📊 Quantity');
      }
      if (prompt.includes('price...')) {
        fields.push('💵 Price amount');
      }
      if (prompt.includes('tax rate...')) {
        fields.push('📊 Tax rate (as percentage)');
      }
      
      return fields;
    };

    const requiredFields = getRequiredFields(prompt);
    
    if (operationType === 'chained') {
      return `🔗 **Chained Workflow Selected:** "${prompt}"\n\nThis is a multi-step workflow that will execute operations in sequence. Please provide all required information:\n\n${requiredFields.join('\n')}\n\n⚠️ After you provide this information, I'll guide you through each step and ask for final confirmation before executing the complete workflow chain.\n\n💡 **Pro tip:** You can chain workflows together! After finding a contact, you can immediately search for their orders or create a new cart.`;
    } else if (operationType === 'read') {
      if (requiredFields.length > 0) {
        return `🔍 Ready to execute: "${prompt}"\n\nPlease provide the following information:\n\n${requiredFields.map(field => `• ${field}`).join('\n')}\n\n💡 You can provide these details in your next message, separated by commas or on separate lines.\n\n🎯 **Need help?** Try phrases like 'show me what products are available' or 'find my most recent orders'.`;
      } else {
        return `🔍 Executing read operation: "${prompt}"\n\n✅ This is a safe, read-only operation that will execute immediately.`;
      }
    } else {
      if (requiredFields.length > 0) {
        return `⚠️ This ${operationType} operation requires confirmation and additional information.\n\nWorkflow: "${prompt}"\n\nPlease provide the following information:\n\n${requiredFields.map(field => `• ${field}`).join('\n')}\n\n🔒 After you provide this information, I'll ask for final confirmation before executing the operation.\n\n💡 **Remember:** All order changes require confirmation to prevent accidental modifications.`;
      } else {
        return `⚠️ This ${operationType} operation requires confirmation.\n\nI'm about to execute: "${prompt}"\n\nThis will modify data in the system. Do you want to proceed? Please type 'yes' to confirm or 'no' to cancel.`;
      }
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const startTime = Date.now();
    
    const newMessages = [
      ...chatMessages,
      {
        type: 'user',
        content: userInput,
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    const lastAgentMessage = chatMessages[chatMessages.length - 1];
    const isProvidingInfo = lastAgentMessage && lastAgentMessage.content.includes('Please provide');
    const isChainedWorkflow = selectedPrompt.includes('→');
    const userInputLower = userInput.toLowerCase();
    
    let agentResponse = '';
    let errorType = 'SUCCESS';
    let errorMessage = null;
    let validationChecks = [];
    let resolution = 'Workflow completed successfully';
    let severity = 'INFO';
    
    // Handle various error scenarios and coaching responses
    if (isProvidingInfo) {
      // Simulate realistic error checking based on user input
      if (userInputLower.includes('@') && !userInputLower.includes('.com') && !userInputLower.includes('.co.uk')) {
        errorType = 'USER_ERROR';
        errorMessage = `Invalid email format error - "${userInput}" is not a valid email address`;
        validationChecks = ['Email format validation', 'Domain validation'];
        resolution = 'User provided correct email format guidance';
        severity = 'LOW';
        agentResponse = `❌ **Invalid email format error**\n\n"${userInput}" is not a valid email address.\n\n💡 **Try:** Checking the spelling, ensuring you have a valid domain (e.g., user@domain.com), or using the correct email format.\n\n🎯 **Valid examples:**\n• mark.sullivan@example.com\n• sarah.jones@business.co.uk\n• admin@healthcare-solutions.com\n\nPlease provide a valid email address to continue.`;
      } else if (userInputLower.includes('xyz') || userInputLower === 'test') {
        errorType = 'SYSTEM_ERROR';
        errorMessage = `Cannot create cart - invalid currency 'XYZ'`;
        validationChecks = ['Currency code validation', 'Supported currency check'];
        resolution = 'User provided valid currency options';
        severity = 'MEDIUM';
        agentResponse = `❌ **Cannot create cart - invalid currency 'XYZ'.**\n\n💡 **Supported currencies include:** USD, EUR, GBP, CAD, AUD, JPY, CHF, SEK, NOK, DKK, PLN, CZK, HUF, RON, BGN, HRK, ISK, TRY, RUB, CNY, INR, SGD, HKD, KRW, THB, MYR, IDR, PHP, VND.\n\n🎯 **Popular choices:**\n• USD - US Dollar\n• EUR - Euro\n• GBP - British Pound\n• CAD - Canadian Dollar\n\nPlease specify a valid currency code.`;
      } else if (userInputLower.includes('unknown-brand') || userInputLower.includes('test-brand')) {
        errorType = 'SYSTEM_ERROR';
        errorMessage = `Brand validation failed - "unknown-brand" not authorized for this operation`;
        validationChecks = ['Brand permissions', 'Brand authorization check', 'Access control validation'];
        resolution = 'User redirected to valid brand list';
        severity = 'MEDIUM';
        agentResponse = `❌ **Invalid brand key 'unknown-brand'.**\n\n💡 **Available brands:** corporate-learning, healthcare-training, financial-services, education-corp, tech-solutions, legal-services, consulting-corp, acme, mercia-group, int-comp, bondsolon.\n\n🏢 **For ICA (International Compliance Association):** Use brand key 'ica'\n🏢 **For Mercia Group:** Use brand key 'mercia-group'\n🏢 **For Bond Solon:** Use brand key 'bondsolon'\n\nPlease check with your administrator if you need access to a different brand.`;
      } else if (userInputLower.includes('invalid-id') || (userInputLower.includes('-') && userInputLower.length < 30)) {
        errorType = 'USER_ERROR';
        errorMessage = 'Invalid contact ID format - UUID format required';
        validationChecks = ['ID format validation', 'UUID structure check'];
        resolution = 'User provided UUID format guidance';
        severity = 'LOW';
        agentResponse = `❌ **Invalid contact ID format.**\n\n💡 **Contact IDs should be in UUID format** (e.g., 123e4567-e89b-12d3-a456-426614174000).\n\n🔍 **Try instead:**\n• Searching by email address if you have it\n• Using the correct UUID format\n• Checking if you meant to search by order number instead\n\n**Valid UUID example:** f47ac10b-58cc-4372-a567-0e02b2c3d479\n\nPlease provide a valid contact ID or email address.`;
      } else if (userInputLower.includes('notfound@') || userInputLower.includes('missing@')) {
        errorType = 'BUSINESS_ERROR';
        errorMessage = `Contact not found for email 'notfound@example.com'`;
        validationChecks = ['Contact lookup', 'Database search', 'Email verification'];
        resolution = 'User offered alternative search options';
        severity = 'MEDIUM';
        agentResponse = `❌ **Contact not found for email 'notfound@example.com'.**\n\n💡 **Try:**\n• Checking the spelling of the email address\n• Searching by contact ID instead\n• Verifying the contact exists in the system\n• Creating a new contact if this is a new customer\n\n🔍 **Alternative search options:**\n• Search by partial email (e.g., just the name part)\n• Search by first/last name\n• Check if contact exists under a different email\n\n📞 **For Mark Sullivan (ICA):** Try m.s.sullivan@hotmail.co.uk\n\nWould you like me to help create a new contact instead?`;
      } else if (userInputLower.includes('quantity') && (userInputLower.includes('99999') || userInputLower.includes('75000'))) {
        errorType = 'USER_ERROR';
        errorMessage = `Invalid quantity '75,000' - must be between 1 and 50,000`;
        validationChecks = ['Quantity validation', 'Range check', 'Business rules validation'];
        resolution = 'User provided valid quantity ranges';
        severity = 'LOW';
        agentResponse = `❌ **Invalid quantity '75,000'. Must be between 1 and 50,000.**\n\n💡 Please specify a valid positive number for quantity.\n\n🎯 **Typical quantities:**\n• Training courses: 1-20 seats\n• Memberships: 1-100 users\n• Professional services: 1-10 hours\n• File reviews: 1-50 documents\n• Drawdown credits: £1,000-£100,000\n\nWhat quantity did you want to use?`;
      } else if (userInputLower.includes('drawdown') && userInputLower.includes('insufficient')) {
        errorType = 'BUSINESS_ERROR';
        errorMessage = 'Insufficient drawdown credits for customer - Available: £2,500, Requested: £5,000';
        validationChecks = ['Credit balance check', 'Credit availability validation', 'Order amount validation'];
        resolution = 'User offered credit top-up options';
        severity = 'HIGH';
        agentResponse = `❌ **Insufficient drawdown credits for customer.**\n\n**Current Status:**\n• Available credits: £2,500.00\n• Requested amount: £5,000.00\n• Shortfall: £2,500.00\n\n💡 **Options:**\n• Reduce order amount to available credit balance\n• Top up drawdown credits for customer\n• Split order across multiple invoicing periods\n• Process partial drawdown and invoice remaining balance\n\n🎯 **Next steps:**\n• Create additional drawdown order for £2,500+\n• Apply partial drawdown credit (£2,500) and invoice difference\n• Contact customer to approve credit top-up\n\nWould you like me to help with any of these options?`;
      } else if (userInputLower.includes('expired') && userInputLower.includes('credit')) {
        errorType = 'BUSINESS_ERROR';
        errorMessage = 'Drawdown credits expired for customer - Amount: £15,000, Expiry: 2025-05-31';
        validationChecks = ['Credit expiry validation', 'Date comparison', 'Policy check'];
        resolution = 'User offered credit extension options';
        severity = 'HIGH';
        agentResponse = `❌ **Drawdown credits expired for customer.**\n\n**Expired Credits:**\n• Amount: £15,000.00\n• Expiry Date: 2025-05-31\n• Days overdue: 26 days\n\n💡 **Recovery options:**\n• Extend credit expiry (requires approval)\n• Transfer credits to new drawdown agreement\n• Convert expired credits to invoice\n• Apply credit extension policy (if applicable)\n\n⚠️ **Policy Note:** Credits expired >30 days require Rob.Phillipson@wilmingtonplc.com approval for any extensions.\n\n🎯 **Recommended action:** Contact customer to renew drawdown agreement or convert to standard billing.\n\nShould I help you process a credit extension request?`;
      } else if (userInputLower.includes('future') && userInputLower.includes('invoice')) {
        validationChecks = ['Customer validation', 'Credit amount validation', 'Schedule configuration', 'Billing setup'];
        const endTime = Date.now();
        const completionTime = `${((endTime - startTime) / 1000).toFixed(1)} seconds`;
        agentResponse = `📅 **Future Invoice Schedule Created Successfully**\n\n**Schedule Details:**\n• Customer: ${userInput.includes('@') ? userInput.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || 'Customer' : 'Customer'}\n• Drawdown Amount: £25,000.00\n• Invoice Frequency: Monthly\n• Start Date: 2025-07-01\n• Duration: 12 months\n\n**Upcoming Invoices:**\n• July 2025: £2,083.33\n• August 2025: £2,083.33\n• September 2025: £2,083.33\n• ... (remaining 9 months)\n\n🔔 **Automated Billing:**\n• Invoices generated on 1st of each month\n• Email notifications sent to customer\n• Payment terms: Net 30 days\n• Auto-dunning enabled for late payments\n\n📋 **Next steps:**\n• Customer notification sent ✅\n• First invoice scheduled ✅\n• Drawdown credits allocated ✅\n\n💡 **Tip:** Future invoices can be modified up to 5 days before generation date.`;
        
        // Log the successful workflow
        setTimeout(() => {
          addAuditLog(
            selectedPrompt,
            'SUCCESS',
            null,
            userInput,
            completionTime,
            validationChecks,
            'Future invoice schedule created successfully',
            'INFO'
          );
        }, 100);
      } else if (isChainedWorkflow) {
        validationChecks = ['Multi-step validation', 'Workflow sequence check', 'Permission validation', 'Data consistency check'];
        agentResponse = `✅ **Chained Workflow Information Received:**\n\n${userInput}\n\n🔗 **Workflow Execution Plan:**\n\nI'll now execute this multi-step workflow in the following sequence:\n\n${selectedPrompt.split('→').map((step, index) => `${index + 1}. ${step.trim()}`).join('\n')}\n\n🏷️ **Validating brand permissions...**\n💰 **Calculating tax rates...**\n📝 **Verifying LA1 codes...**\n\n⚠️ This chained workflow will modify system data across multiple steps. Each step will be validated before proceeding to the next.\n\nDo you want to proceed with the complete workflow chain?\n\nType 'yes' to execute all steps or 'no' to cancel.\n\n💡 **Remember:** Chained workflows are more efficient but require careful review of all steps.`;
      } else {
        validationChecks = ['Contact lookup', 'Brand permissions', 'Email validation', 'Customer record retrieval'];
        agentResponse = `🔍 **Searching for contact...**\n\n✅ **Information received:** ${userInput}\n\n⚙️ **Processing contact lookup...**\n📋 **Generating contact details...**\n\n**Contact Found:**\n• **Name:** Sarah Johnson\n• **Email:** sarah.johnson@globaltech.com\n• **CIM Contact ID:** f47ac10b-58cc-4372-a567-0e02b2c3d479\n• **Account Status:** Active\n• **Brand Access:** corporate-learning ✅\n• **Customer Type:** B2B\n• **Location:** Ontario, Canada\n• **Tax Status:** HST (13%) configured ✅\n\n📊 **Order History:**\n• Previous orders: 5 (last order: April 22, 2025)\n• Total lifetime value: £23,450 CAD\n• Payment preference: Invoice\n• Cancellation history: 1 partial cancellation (March 2025)\n\n⚠️ Ready to execute the workflow with this contact information.\n\nThis operation will modify/access system data. Do you want to proceed?\n\nType 'yes' to confirm or 'no' to cancel.\n\n💡 **Tip:** You can now chain workflows together! After this operation, you could immediately create a cart or sales link for this customer.`;
      }
    } else if (userInputLower.includes('yes')) {
      validationChecks = ['Final confirmation', 'System update', 'Audit trail creation'];
      const endTime = Date.now();
      const completionTime = `${((endTime - startTime) / 1000).toFixed(1)} seconds`;
      
      if (isChainedWorkflow) {
        agentResponse = '✅ **Chained Workflow Executing...**\n\n🔗 **Step-by-Step Progress:**\n\n⚙️ **Step 1:** Converting prospect opportunity...\n✅ **Step 1 completed successfully** - Opportunity converted\n\n🔍 **Step 2:** Finding contact details...\n✅ **Step 2 completed successfully** - Contact located\n\n📝 **Step 3:** Updating contact information...\n✅ **Step 3 completed successfully** - Contact updated\n\n🔗 **Step 4:** Creating sales link...\n✅ **Step 4 completed successfully** - Sales link generated\n\n🎯 **Complete Workflow Chain Executed Successfully!**\n\n📋 **Summary:**\n• All workflow steps executed in sequence ✅\n• Data validated at each step ✅\n• System updated across all components ✅\n• Audit trail created for complete chain ✅\n• Sales link: https://saleslink.staging.com/cart/bc7f1f77-09e5-42c7-a9b3-8a5c4d6e9f2a\n\n➡️ **Next steps:** Share the sales link with the customer, or add products to the cart before sharing.\n\n💡 **Pro tip:** The multi-step workflow has been completed. You can now select another workflow or return to the main interface.\n\n📊 **Efficiency Note:** All compliance validations performed upfront, eliminating subsequent validation steps and ensuring seamless customer experience.';
        validationChecks = ['Multi-step execution', 'Step validation', 'Chain completion', 'Audit trail creation'];
      } else if (selectedPrompt.includes('drawdown')) {
        agentResponse = '💰 **Processing drawdown operation...**\n\n✅ **Drawdown order created successfully!**\n\n📋 **Drawdown Details:**\n• Order ID: DRW-2025-78901\n• Customer: Sarah Johnson (sarah.johnson@globaltech.com)\n• Credit Amount: £50,000.00\n• Agreement Period: 12 months\n• Expiry Date: 2026-06-26\n• Usage Terms: Professional services, training, and consultancy\n\n💳 **Credit Allocation:**\n• Initial Credit: £50,000.00\n• Available Balance: £50,000.00\n• Used Credits: £0.00\n• Reserved Credits: £0.00\n\n📅 **Future Invoice Schedule:**\n• Billing Frequency: Quarterly\n• Next Review: 2025-09-26\n• Auto-renewal: Enabled (requires customer approval)\n\n🔔 **Automated Features:**\n• Low balance alerts at £5,000 remaining\n• Monthly usage reports sent to customer\n• Expiry warnings 60 days before expiry\n• Automatic credit top-up available\n\n➡️ **Next steps:**\n• Customer can start using drawdown credits immediately\n• Usage will be tracked against available balance\n• Future invoices will be generated based on usage\n\n💡 **Drawdown tip:** Credits can be applied to orders automatically or manually depending on customer preference.';
        validationChecks = ['Drawdown creation', 'Credit allocation', 'Schedule setup', 'Compliance validation'];
      } else if (selectedPrompt.includes('Cancel order')) {
        agentResponse = '🗑️ **Processing order cancellation...**\n\n✅ **Order cancelled successfully!**\n\n📋 **Cancellation Details:**\n• Order ID: ORD-2025-12345\n• Customer: Sarah Johnson (sarah.johnson@globaltech.com)\n• Cancellation Date: ' + new Date().toLocaleDateString() + '\n• Reason: Order Cancelled Within Terms\n• Refund Status: Full refund processed\n• Refund Amount: £8,983.50 CAD\n\n💰 **Calculating refund amounts...**\n📝 **Generating cancellation audit trail...**\n\n➡️ **Next steps:**\n• Process any required refunds ✅ (Completed automatically)\n• Notify customer of cancellation\n• Create replacement order if needed\n\n💡 **Cancellation tip:** Check order status before attempting cancellation - some statuses may prevent cancellation.\n\n⚠️ **Important:** Refund will appear in customer account within 3-5 business days.';
        validationChecks = ['Order status check', 'Cancellation policy', 'Refund calculation', 'System update'];
      } else {
        agentResponse = '✅ **Confirmed! Executing the operation...**\n\n⚙️ **Creating cart with pre-validated compliance data...**\n🏷️ **All LA1 codes validated** ✅\n💰 **Tax calculations verified** ✅\n🔒 **Brand permissions confirmed** ✅\n\n🎯 **Operation completed successfully!**\n\n🛒 **Cart Created:**\n• Cart ID: a8f5f167-aa89-41c2-a527-ebe170a8e834\n• Customer: Sarah Johnson (B2B, CA-ON)\n• Currency: CAD\n• Status: Ready for checkout\n\n📦 **Line Items:**\n✅ Executive Leadership Development\n• Price: £3,750.00 CAD\n• LA1: TRN-EXEC-LEAD-001 (pre-validated)\n• Cancellation Window: 30 days\n\n💰 **Financial Summary:**\n• Subtotal: £7,950.00 CAD\n• HST (13%): £1,033.50 CAD\n• **Total: £8,983.50 CAD**\n\n📋 **Summary:**\n• Workflow executed as requested ✅\n• All validations passed ✅\n• Data updated in system ✅\n• Compliance package complete ✅\n\n➡️ **Next options:** Generate invoice, create sales link, modify cart, or set up cancellation monitoring\n\n💡 **You can now select another workflow or return to the main interface.**';
        validationChecks = ['Cart creation', 'Compliance validation', 'Tax calculation', 'System update'];
      }
      
      // Log the successful workflow
      setTimeout(() => {
        addAuditLog(
          selectedPrompt,
          'SUCCESS',
          null,
          userInput,
          completionTime,
          validationChecks,
          'Workflow completed successfully',
          'INFO'
        );
      }, 100);
    } else if (userInputLower.includes('no')) {
      errorType = 'USER_CANCELLED';
      resolution = 'User cancelled operation';
      validationChecks = ['User confirmation'];
      agentResponse = '❌ **Operation cancelled by user.**\n\n💡 No changes have been made to the system. You can select a different workflow if needed.\n\n🎯 **Alternative options:**\n• Try a different workflow\n• Modify the information and try again\n• Use the read-only operations to gather more information first\n\n➡️ **Quick suggestions:**\n• "Find contact for..." to look up customer details\n• "Query all orders for brand..." to see recent activity\n• "Show membership products in brand..." to browse available products\n\nReturn to the main interface to select a new workflow.';
    } else if (userInputLower.includes('drawdown') && userInputLower.includes('help')) {
      validationChecks = ['Help request processing'];
      agentResponse = '💰 **Drawdown System Help & Guidance**\n\n🎯 **What are Drawdown Orders?**\nDrawdown orders allow customers to pre-purchase credits that can be used for future services. Credits are drawn down as services are consumed.\n\n📋 **Key Features:**\n• **Pre-paid credits** for services\n• **Flexible usage** across different product types\n• **Future invoicing** based on actual usage\n• **Credit management** with expiry dates\n• **Automated billing** for recurring arrangements\n\n💡 **Common Workflows:**\n• Create drawdown order with credit amount\n• Apply credits to customer orders\n• Monitor credit balances and usage\n• Setup future invoice schedules\n• Manage credit expiry and renewals\n\n🔒 **Important Notes:**\n• Credits have expiry dates (typically 12 months)\n• Usage must be tracked against available balance\n• Expired credits may require approval to extend\n• Future invoices can be scheduled for regular billing\n\n🎯 **Need specific help with:**\n• "How to create drawdown order?"\n• "How to apply drawdown credits?"\n• "How to check credit balance?"\n• "How to setup future invoicing?"';
    } else if (userInputLower.includes('help') || userInputLower.includes('?')) {
      validationChecks = ['Help request processing'];
      agentResponse = '🆘 **MCP Agent Help & Guidance**\n\n🎯 **For workflow operations, please respond with:**\n• **"yes"** to confirm and execute\n• **"no"** to cancel the operation\n• Or provide the **requested information** if prompted for specific details\n\n📋 **Common Information Formats:**\n• **Emails:** user@domain.com\n• **Contact IDs:** f47ac10b-58cc-4372-a567-0e02b2c3d479 (UUID format)\n• **Currencies:** USD, EUR, GBP, CAD, AUD, JPY\n• **Dates:** YYYY-MM-DD (e.g., 2025-06-26)\n• **Brands:** corporate-learning, ica, mercia-group, bondsolon\n\n💡 **Tips for better results:**\n• Be specific with email addresses and IDs\n• Double-check currency codes\n• Verify brand names with your administrator\n• Use exact order numbers when available\n\n🔍 **Need specific help?** Try asking:\n• "What brands are available?"\n• "Show me valid currency codes"\n• "Help with contact ID format"';
    } else if (userInputLower.includes('brand') && userInputLower.includes('available')) {
      validationChecks = ['Brand list retrieval'];
      agentResponse = '🏢 **Available Brand Keys:**\n\n**Primary Brands:**\n• **ica** - International Compliance Association\n• **mercia-group** - Mercia Group\n• **bondsolon** - Bond Solon\n\n**Training & Education:**\n• corporate-learning\n• healthcare-training\n• education-corp\n• tech-solutions\n\n**Professional Services:**\n• financial-services\n• legal-services\n• consulting-corp\n\n**Legacy/Demo:**\n• acme\n\n💡 **For Mark Sullivan:** Always use brand "ica" and email m.s.sullivan@hotmail.co.uk\n\n🔒 **Access Note:** Contact your administrator if you need access to brands not listed here.';
    } else if (userInputLower.includes('currency') && userInputLower.includes('code')) {
      validationChecks = ['Currency list retrieval'];
      agentResponse = '💰 **Supported Currency Codes:**\n\n**Major Currencies:**\n• **USD** - US Dollar\n• **EUR** - Euro\n• **GBP** - British Pound\n• **CAD** - Canadian Dollar\n• **AUD** - Australian Dollar\n• **JPY** - Japanese Yen\n\n**European Currencies:**\n• CHF, SEK, NOK, DKK, PLN, CZK, HUF, RON, BGN, HRK, ISK\n\n**Other Supported:**\n• TRY, RUB, CNY, INR, SGD, HKD, KRW, THB, MYR, IDR, PHP, VND\n• AED, AFN, ALL, AMD, ARS, AZN, BAM, BDT, BHD, BIF, BND, BOB, BRL, BWP, BYN, BZD\n\n🎯 **Most Common:** USD, EUR, GBP, CAD\n\nSee full list in documentation for all 180+ supported currencies.';
    } else {
      errorType = 'USER_ERROR';
      errorMessage = `Unclear user input: "${userInput}"`;
      validationChecks = ['Input interpretation', 'Context analysis'];
      resolution = 'User provided guidance on valid responses';
      severity = 'LOW';
      agentResponse = `I understand you said: "${userInput}"\n\n🤔 **I'm not sure how to interpret that response.**\n\n💡 **For workflow operations, please respond with:**\n• **"yes"** to confirm and execute\n• **"no"** to cancel the operation\n• Or provide the **requested information** if prompted for specific details\n\n🆘 **Need help?** Type "help" for guidance on:\n• Valid email formats\n• Contact ID formats\n• Available currencies\n• Brand names\n• Date formats\n\n🎯 **Quick examples:**\n• Email: sarah.johnson@globaltech.com\n• Currency: USD, EUR, GBP, CAD\n• Brand: corporate-learning, ica, mercia-group`;
    }

    // Add audit log for errors
    if (errorType !== 'SUCCESS' && errorType !== 'USER_CANCELLED') {
      setTimeout(() => {
        addAuditLog(
          selectedPrompt,
          errorType,
          errorMessage,
          userInput,
          null,
          validationChecks,
          resolution,
          severity
        );
      }, 100);
    }

    newMessages.push({
      type: 'agent',
      content: agentResponse,
      timestamp: new Date().toLocaleTimeString()
    });

    setChatMessages(newMessages);
    setUserInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderWorkflowSection = (operations, operationType, bgColor, textColor, icon) => (
    <div className="space-y-6">
      {operations.map((section, sectionIndex) => {
        const sectionKey = `${operationType}-${sectionIndex}`;
        const isExpanded = expandedSections[sectionKey];
        
        return (
          <Card key={sectionIndex} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {section.icon}
                  {section.category}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSectionExpanded(sectionKey)}
                  className="flex items-center gap-2"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Expand
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            {isExpanded && (
              <CardContent>
                <div className="grid gap-2">
                  {section.workflows.map((workflow, workflowIndex) => (
                    <Button
                      key={workflowIndex}
                      variant="outline"
                      size="sm"
                      className={`text-left justify-start ${bgColor} ${textColor} border-0 hover:shadow-md transition-all`}
                      onClick={() => handlePromptClick(workflow, operationType)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {icon}
                        <span className="flex-1 truncate">{workflow}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );

  const ChatInterface = () => (
    <div className="h-screen flex flex-col">
      <div className="flex-shrink-0 p-6 border-b bg-white">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentView('workflows')}
            className="flex items-center gap-2"
          >
            <MynaArrowLeft className="h-4 w-4" />
            Back to Workflows
          </Button>
          <div className="flex items-center gap-2">
            <MynaMessage className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">MCP Agent Chat</h2>
          </div>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected Workflow:</strong> {selectedPrompt}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-6 space-y-4 bg-gray-50">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg shadow-sm ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border'
                }`}
              >
                <div className="whitespace-pre-line text-sm">
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 p-6 border-t bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response here..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button onClick={handleSendMessage} className="flex items-center gap-2 px-6">
            <MynaSend className="h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {currentView === 'workflows' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">MCP Staging Org Workflow Interface</h1>
              <p className="text-gray-600 mb-4">Organised by operation type. Click any button to execute a workflow.</p>
              
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Read - Immediate execution
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  Create - Requires confirmation
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
                  <Edit className="h-3 w-3" />
                  Modify - Requires confirmation
                </Badge>
                <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                  <Trash2 className="h-3 w-3" />
                  Delete - High risk, requires confirmation
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Chained - Multi-step workflows
                </Badge>
              </div>
            </div>

            {/* Human-in-the-Loop Interactions - Expandable/Collapsible */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Human-in-the-Loop Interactions
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsHumanLoopExpanded(!isHumanLoopExpanded)}
                    className="flex items-center gap-2"
                  >
                    {isHumanLoopExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Expand
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              {isHumanLoopExpanded && (
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">
                    All create, modify, and delete operations require explicit user confirmation before execution to prevent accidental changes.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="font-semibold text-blue-800 text-sm">Contact Updates</p>
                      <p className="text-blue-700 text-xs mt-1">
                        "I found contact for email address you provided. You want to update first name to the new name you specified. This will permanently change the contact information. Do you want to proceed? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                      <p className="font-semibold text-amber-800 text-sm">Order Creation</p>
                      <p className="text-amber-700 text-xs mt-1">
                        "I'm about to create an order with the customer email, products, and currency you specified. This will generate a binding order. Confirm to proceed? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <p className="font-semibold text-red-800 text-sm">Order Cancellation</p>
                      <p className="text-red-700 text-xs mt-1">
                        "Ready to cancel the order/line items you specified. This will permanently remove these items and may trigger a partial refund. Continue? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <p className="font-semibold text-green-800 text-sm">Drawdown Order Creation</p>
                      <p className="text-green-700 text-xs mt-1">
                        "I'm about to create a drawdown order with £50,000 credit for customer, valid for 12 months with quarterly billing. This will set up pre-paid credits and future invoice schedule. Confirm to proceed? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="font-semibold text-blue-800 text-sm">Credit Application</p>
                      <p className="text-blue-700 text-xs mt-1">
                        "Ready to apply £5,000 drawdown credit to order. Current balance: £25,000. Remaining after application: £20,000. This will reduce customer's available drawdown credits. Continue? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                      <p className="font-semibold text-purple-800 text-sm">Chained Workflow</p>
                      <p className="text-purple-700 text-xs mt-1">
                        "I'll execute this 4-step workflow: Step 1: Convert prospect opportunity → Step 2: Find contact → Step 3: Update details → Step 4: Create sales link. This will modify data across multiple systems. Execute complete workflow chain? (yes/no)"
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            <div className="w-full">
              <div className="w-full">
                <Tabs defaultValue="read" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="read" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Read Operations
                    </TabsTrigger>
                    <TabsTrigger value="create" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create Operations
                    </TabsTrigger>
                    <TabsTrigger value="modify" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Modify/Delete
                    </TabsTrigger>
                    <TabsTrigger value="chained" className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Chained Workflows
                    </TabsTrigger>
                    <TabsTrigger value="audit" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Audit & Error Logs
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="read" className="mt-6">
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Safe Operations</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        These read-only operations execute immediately without confirmation. No data will be modified.
                      </p>
                    </div>
                    {renderWorkflowSection(
                      readOperations, 
                      'read', 
                      'bg-green-50 hover:bg-green-100', 
                      'text-green-800',
                      <Eye className="h-4 w-4" />
                    )}
                  </TabsContent>

                  <TabsContent value="create" className="mt-6">
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Plus className="h-5 w-5" />
                        <span className="font-semibold">Creation Operations</span>
                      </div>
                      <p className="text-blue-700 text-sm mt-1">
                        These operations create new records and require user confirmation before proceeding.
                      </p>
                    </div>
                    {renderWorkflowSection(
                      createOperations, 
                      'create', 
                      'bg-blue-50 hover:bg-blue-100', 
                      'text-blue-800',
                      <Plus className="h-4 w-4" />
                    )}
                  </TabsContent>

                  <TabsContent value="modify" className="mt-6">
                    <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-2 text-amber-800">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="font-semibold">Modification & Deletion Operations</span>
                      </div>
                      <p className="text-amber-700 text-sm mt-1">
                        These operations modify or delete existing data. All require confirmation and some may be irreversible.
                      </p>
                    </div>
                    {renderWorkflowSection(
                      modifyDeleteOperations, 
                      'modify', 
                      'bg-amber-50 hover:bg-amber-100', 
                      'text-amber-800',
                      <Edit className="h-4 w-4" />
                    )}
                  </TabsContent>

                  <TabsContent value="chained" className="mt-6">
                    <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 text-purple-800">
                        <Zap className="h-5 w-5" />
                        <span className="font-semibold">Chained Workflows</span>
                      </div>
                      <p className="text-purple-700 text-sm mt-1">
                        These are multi-step workflows that combine read, create, and modify operations in sequence. Each step builds on the previous one.
                      </p>
                    </div>
                    {renderWorkflowSection(
                      chainedOperations, 
                      'chained', 
                      'bg-purple-50 hover:bg-purple-100', 
                      'text-purple-800',
                      <Zap className="h-4 w-4" />
                    )}
                  </TabsContent>

                  <TabsContent value="audit" className="mt-6">
                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-800 mb-3">
                        <BarChart3 className="h-5 w-5" />
                        <span className="font-semibold">Audit & Error Capture System</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-4">
                        Comprehensive logging of all agent interactions, error tracking, and workflow performance analytics.
                      </p>
                      
                      {/* Metrics Dashboard */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-3 bg-white border rounded">
                          <div className="text-2xl font-bold text-blue-600">{workflowMetrics.totalWorkflows}</div>
                          <div className="text-sm text-gray-600">Total Workflows</div>
                        </div>
                        <div className="p-3 bg-white border rounded">
                          <div className="text-2xl font-bold text-green-600">{workflowMetrics.successfulWorkflows}</div>
                          <div className="text-sm text-gray-600">Successful</div>
                        </div>
                        <div className="p-3 bg-white border rounded">
                          <div className="text-2xl font-bold text-red-600">{workflowMetrics.userErrors + workflowMetrics.systemErrors + workflowMetrics.businessErrors}</div>
                          <div className="text-sm text-gray-600">Total Errors</div>
                        </div>
                        <div className="p-3 bg-white border rounded">
                          <div className="text-2xl font-bold text-purple-600">{workflowMetrics.averageCompletionTime}</div>
                          <div className="text-sm text-gray-600">Avg Time</div>
                        </div>
                      </div>

                      {/* Error Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <div className="text-lg font-semibold text-yellow-800">{workflowMetrics.userErrors}</div>
                          <div className="text-sm text-yellow-700">User Errors</div>
                          <div className="text-xs text-yellow-600 mt-1">Invalid inputs, format errors</div>
                        </div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                          <div className="text-lg font-semibold text-red-800">{workflowMetrics.systemErrors}</div>
                          <div className="text-sm text-red-700">System Errors</div>
                          <div className="text-xs text-red-600 mt-1">Technical failures, API issues</div>
                        </div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                          <div className="text-lg font-semibold text-orange-800">{workflowMetrics.businessErrors}</div>
                          <div className="text-sm text-orange-700">Business Logic Errors</div>
                          <div className="text-xs text-orange-600 mt-1">Policy violations, insufficient credits</div>
                        </div>
                      </div>
                    </div>

                    {/* Audit Log Table */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Detailed Audit Log
                        </CardTitle>
                        <CardDescription>
                          Real-time capture of all agent interactions, errors, and workflow performance
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50">
                                <th className="text-left p-3 font-semibold">Audit ID</th>
                                <th className="text-left p-3 font-semibold">Timestamp</th>
                                <th className="text-left p-3 font-semibold">User</th>
                                <th className="text-left p-3 font-semibold">Workflow</th>
                                <th className="text-left p-3 font-semibold">Status</th>
                                <th className="text-left p-3 font-semibold">Completion Time</th>
                                <th className="text-left p-3 font-semibold">Validation Checks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {auditLogs.map((log, index) => (
                                <tr key={log.id} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                  <td className="p-3 font-mono text-sm">{log.id}</td>
                                  <td className="p-3 text-sm">{log.timestamp}</td>
                                  <td className="p-3 text-sm">
                                    <div className="truncate max-w-32" title={log.user}>
                                      {log.user}
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <div className="truncate max-w-48" title={log.workflow}>
                                      {log.workflow}
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <Badge 
                                      className={
                                        log.errorType === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                                        log.errorType === 'USER_ERROR' ? 'bg-yellow-100 text-yellow-800' :
                                        log.errorType === 'SYSTEM_ERROR' ? 'bg-red-100 text-red-800' :
                                        log.errorType === 'BUSINESS_ERROR' ? 'bg-orange-100 text-orange-800' :
                                        'bg-purple-100 text-purple-800'
                                      }
                                    >
                                      {log.errorType === 'SUCCESS' ? '✅ Success' :
                                       log.errorType === 'USER_ERROR' ? '⚠️ User Error' :
                                       log.errorType === 'SYSTEM_ERROR' ? '❌ System Error' :
                                       log.errorType === 'BUSINESS_ERROR' ? '🚫 Business Error' :
                                       '📋 Policy Error'}
                                    </Badge>
                                  </td>
                                  <td className="p-3 text-sm">
                                    {log.completionTime || '—'}
                                  </td>
                                  <td className="p-3">
                                    <div className="text-xs">
                                      {log.validationChecks.slice(0, 2).join(', ')}
                                      {log.validationChecks.length > 2 && ` +${log.validationChecks.length - 2} more`}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Detailed Error Information */}
                        <div className="mt-6">
                          <h4 className="font-semibold text-lg mb-3">Recent Error Details</h4>
                          <div className="space-y-3">
                            {auditLogs.filter(log => log.errorType !== 'SUCCESS').slice(0, 3).map((log) => (
                              <div key={log.id} className="p-4 border rounded-lg bg-gray-50">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      className={
                                        log.errorType === 'USER_ERROR' ? 'bg-yellow-100 text-yellow-800' :
                                        log.errorType === 'SYSTEM_ERROR' ? 'bg-red-100 text-red-800' :
                                        log.errorType === 'BUSINESS_ERROR' ? 'bg-orange-100 text-orange-800' :
                                        'bg-purple-100 text-purple-800'
                                      }
                                    >
                                      {log.errorType.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-sm font-medium">{log.id}</span>
                                  </div>
                                  <span className="text-xs text-gray-500">{log.timestamp}</span>
                                </div>
                                <div className="mb-2">
                                  <strong className="text-sm">Workflow:</strong> <span className="text-sm">{log.workflow}</span>
                                </div>
                                <div className="mb-2">
                                  <strong className="text-sm">User Input:</strong> <code className="text-sm bg-gray-200 px-1 rounded">{log.userInput}</code>
                                </div>
                                <div className="mb-2">
                                  <strong className="text-sm">Error:</strong> <span className="text-sm text-red-700">{log.errorMessage}</span>
                                </div>
                                <div className="mb-2">
                                  <strong className="text-sm">Validation Checks:</strong> 
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {log.validationChecks.map((check, i) => (
                                      <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{check}</span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <strong className="text-sm">Resolution:</strong> <span className="text-sm text-green-700">{log.resolution}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </>
        ) : (
          <ChatInterface />
        )}
      </div>
    </div>
  );
};

export default MCPWorkflowInterface;