"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, ShoppingCart, FileText, CreditCard, BarChart3, Settings, AlertTriangle, CheckCircle, Package, Zap, Eye, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

// MynaUI-style inline SVG icons for chat interface
const MynaArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

const MynaMessage = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const MynaSend = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.912 12H3l18-9-9 18-2.088-6Z" />
  </svg>
);

const MCPWorkflowInterface = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('workflows');
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

  const addAuditLog = (
    workflow: string,
    errorType: string,
    errorMessage: string | null,
    userInput: string,
    completionTime: string | null,
    validationChecks: string[],
    resolution: string,
    severity: string
  ) => {
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

  const handlePromptClick = (prompt: string, operationType: string = 'read') => {
    const params = new URLSearchParams({ workflow: prompt, type: operationType });
    router.push(`/mcp/chat?${params.toString()}`);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {currentView === 'workflows' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">MCP Staging Org Workflow Interface</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Organised by operation type. Click any button to execute a workflow.</p>
              
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Read - Immediate execution
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  Create - Requires confirmation
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 flex items-center gap-1">
                  <Edit className="h-3 w-3" />
                  Modify - Requires confirmation
                </Badge>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center gap-1">
                  <Trash2 className="h-3 w-3" />
                  Delete - High risk, requires confirmation
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Chained - Multi-step workflows
                </Badge>
              </div>
            </div>

            {/* Human-in-the-Loop Interactions - Expandable/Collapsible */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
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
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    All create, modify, and delete operations require explicit user confirmation before execution to prevent accidental changes.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900 dark:border-blue-700 rounded">
                      <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Contact Updates</p>
                      <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">
                        "I found contact for email address you provided. You want to update first name to the new name you specified. This will permanently change the contact information. Do you want to proceed? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900 dark:border-amber-700 rounded">
                      <p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Order Creation</p>
                      <p className="text-amber-700 dark:text-amber-300 text-xs mt-1">
                        "I'm about to create an order with the customer email, products, and currency you specified. This will generate a binding order. Confirm to proceed? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-700 rounded">
                      <p className="font-semibold text-red-800 dark:text-red-200 text-sm">Order Cancellation</p>
                      <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                        "Ready to cancel the order/line items you specified. This will permanently remove these items and may trigger a partial refund. Continue? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-700 rounded">
                      <p className="font-semibold text-green-800 dark:text-green-200 text-sm">Drawdown Order Creation</p>
                      <p className="text-green-700 dark:text-green-300 text-xs mt-1">
                        "I'm about to create a drawdown order with £50,000 credit for customer, valid for 12 months with quarterly billing. This will set up pre-paid credits and future invoice schedule. Confirm to proceed? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900 dark:border-blue-700 rounded">
                      <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Credit Application</p>
                      <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">
                        "Ready to apply £5,000 drawdown credit to order. Current balance: £25,000. Remaining after application: £20,000. This will reduce customer's available drawdown credits. Continue? (yes/no)"
                      </p>
                    </div>
                    
                    <div className="p-3 bg-purple-50 border border-purple-200 dark:bg-purple-900 dark:border-purple-700 rounded">
                      <p className="font-semibold text-purple-800 dark:text-purple-200 text-sm">Chained Workflow</p>
                      <p className="text-purple-700 dark:text-purple-300 text-xs mt-1">
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
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-700 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Safe Operations</span>
                      </div>
                      <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                        These read-only operations execute immediately without confirmation. No data will be modified.
                      </p>
                    </div>
                    {renderWorkflowSection(
                      readOperations, 
                      'read', 
                      'bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800', 
                      'text-green-800 dark:text-green-200',
                      <Eye className="h-4 w-4" />
                    )}
                  </TabsContent>

                  <TabsContent value="create" className="mt-6">
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900 dark:border-blue-700 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                        <Plus className="h-5 w-5" />
                        <span className="font-semibold">Creation Operations</span>
                      </div>
                      <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                        These operations create new records and require user confirmation before proceeding.
                      </p>
                    </div>
                    {renderWorkflowSection(
                      createOperations, 
                      'create', 
                      'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800', 
                      'text-blue-800 dark:text-blue-200',
                      <Plus className="h-4 w-4" />
                    )}
                  </TabsContent>

                  <TabsContent value="modify" className="mt-6">
                    <div className="mb-4 p-4 bg-amber-50 border border-amber-200 dark:bg-amber-900 dark:border-amber-700 rounded-lg">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="font-semibold">Modification & Deletion Operations</span>
                      </div>
                      <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                        These operations modify or delete existing data. All require confirmation and some may be irreversible.
                      </p>
                    </div>
                    {renderWorkflowSection(
                      modifyDeleteOperations, 
                      'modify', 
                      'bg-amber-50 hover:bg-amber-100 dark:bg-amber-900 dark:hover:bg-amber-800', 
                      'text-amber-800 dark:text-amber-200',
                      <Edit className="h-4 w-4" />
                    )}
                  </TabsContent>

                  <TabsContent value="chained" className="mt-6">
                    <div className="mb-4 p-4 bg-purple-50 border border-purple-200 dark:bg-purple-900 dark:border-purple-700 rounded-lg">
                      <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                        <Zap className="h-5 w-5" />
                        <span className="font-semibold">Chained Workflows</span>
                      </div>
                      <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                        These are multi-step workflows that combine read, create, and modify operations in sequence. Each step builds on the previous one.
                      </p>
                    </div>
                    {renderWorkflowSection(
                      chainedOperations, 
                      'chained', 
                      'bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800', 
                      'text-purple-800 dark:text-purple-200',
                      <Zap className="h-4 w-4" />
                    )}
                  </TabsContent>

                  <TabsContent value="audit" className="mt-6">
                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 mb-3">
                        <BarChart3 className="h-5 w-5" />
                        <span className="font-semibold">Audit & Error Capture System</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                        Comprehensive logging of all agent interactions, error tracking, and workflow performance analytics.
                      </p>
                      
                      {/* Metrics Dashboard */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{workflowMetrics.totalWorkflows}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Total Workflows</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{workflowMetrics.successfulWorkflows}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Successful</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded">
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{workflowMetrics.userErrors + workflowMetrics.systemErrors + workflowMetrics.businessErrors}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Total Errors</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{workflowMetrics.averageCompletionTime}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Time</div>
                        </div>
                      </div>

                      {/* Error Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-3 bg-yellow-50 border border-yellow-200 dark:bg-yellow-900 dark:border-yellow-700 rounded">
                          <div className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">{workflowMetrics.userErrors}</div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-300">User Errors</div>
                          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Invalid inputs, format errors</div>
                        </div>
                        <div className="p-3 bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-700 rounded">
                          <div className="text-lg font-semibold text-red-800 dark:text-red-200">{workflowMetrics.systemErrors}</div>
                          <div className="text-sm text-red-700 dark:text-red-300">System Errors</div>
                          <div className="text-xs text-red-600 dark:text-red-400 mt-1">Technical failures, API issues</div>
                        </div>
                        <div className="p-3 bg-orange-50 border border-orange-200 dark:bg-orange-900 dark:border-orange-700 rounded">
                          <div className="text-lg font-semibold text-orange-800 dark:text-orange-200">{workflowMetrics.businessErrors}</div>
                          <div className="text-sm text-orange-700 dark:text-orange-300">Business Logic Errors</div>
                          <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">Policy violations, insufficient credits</div>
                        </div>
                      </div>
                    </div>

                    {/* Audit Log Table */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 dark:text-white">
                          <FileText className="h-5 w-5" />
                          Detailed Audit Log
                        </CardTitle>
                        <CardDescription className="dark:text-gray-300">
                          Real-time capture of all agent interactions, errors, and workflow performance
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                <th className="text-left p-3 font-semibold dark:text-white">Audit ID</th>
                                <th className="text-left p-3 font-semibold dark:text-white">Timestamp</th>
                                <th className="text-left p-3 font-semibold dark:text-white">User</th>
                                <th className="text-left p-3 font-semibold dark:text-white">Workflow</th>
                                <th className="text-left p-3 font-semibold dark:text-white">Status</th>
                                <th className="text-left p-3 font-semibold dark:text-white">Completion Time</th>
                                <th className="text-left p-3 font-semibold dark:text-white">Validation Checks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {auditLogs.map((log, index) => (
                                <tr key={log.id} className={`border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'}`}>
                                  <td className="p-3 font-mono text-sm dark:text-gray-200">{log.id}</td>
                                  <td className="p-3 text-sm dark:text-gray-200">{log.timestamp}</td>
                                  <td className="p-3 text-sm dark:text-gray-200">
                                    <div className="truncate max-w-32" title={log.user}>
                                      {log.user}
                                    </div>
                                  </td>
                                  <td className="p-3 dark:text-gray-200">
                                    <div className="truncate max-w-48" title={log.workflow}>
                                      {log.workflow}
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <Badge 
                                      className={
                                        log.errorType === 'SUCCESS' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                        log.errorType === 'USER_ERROR' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                        log.errorType === 'SYSTEM_ERROR' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                        log.errorType === 'BUSINESS_ERROR' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                      }
                                    >
                                      {log.errorType === 'SUCCESS' ? '✅ Success' :
                                       log.errorType === 'USER_ERROR' ? '⚠️ User Error' :
                                       log.errorType === 'SYSTEM_ERROR' ? '❌ System Error' :
                                       log.errorType === 'BUSINESS_ERROR' ? '🚫 Business Error' :
                                       '📋 Policy Error'}
                                    </Badge>
                                  </td>
                                  <td className="p-3 text-sm dark:text-gray-200">
                                    {log.completionTime || '—'}
                                  </td>
                                  <td className="p-3">
                                    <div className="text-xs dark:text-gray-400">
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
                              <div key={log.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      className={
                                        log.errorType === 'USER_ERROR' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                        log.errorType === 'SYSTEM_ERROR' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                        log.errorType === 'BUSINESS_ERROR' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                      }
                                    >
                                      {log.errorType.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-sm font-medium dark:text-gray-200">{log.id}</span>
                                  </div>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{log.timestamp}</span>
                                </div>
                                <div className="mb-2">
                                  <strong className="text-sm dark:text-gray-200">Workflow:</strong> <span className="text-sm dark:text-gray-200">{log.workflow}</span>
                                </div>
                                <div className="mb-2">
                                  <strong className="text-sm dark:text-gray-200">User Input:</strong> <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1 rounded dark:text-gray-200">{log.userInput}</code>
                                </div>
                                <div className="mb-2">
                                  <strong className="text-sm dark:text-gray-200">Error:</strong> <span className="text-sm text-red-700 dark:text-red-400">{log.errorMessage}</span>
                                </div>
                                <div className="mb-2">
                                  <strong className="text-sm dark:text-gray-200">Validation Checks:</strong> 
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {log.validationChecks.map((check, i) => (
                                      <span key={i} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">{check}</span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <strong className="text-sm dark:text-gray-200">Resolution:</strong> <span className="text-sm text-green-700 dark:text-green-400">{log.resolution}</span>
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
        ) : null}
      </div>
    </div>
  );
};

export default MCPWorkflowInterface;