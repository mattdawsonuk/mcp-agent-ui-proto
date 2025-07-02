"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuditLog } from '@/data/auditLogs';
import { getWorkflowConfig } from '@/lib/workflowColors';
import { fetchAuditLogs, fetchUserProfile } from '@/lib/api';
import { UserProfile } from '@/data/userProfile';
import { Loader2 } from 'lucide-react';

// MynaUI-style inline SVG icons for chat interface
const MynaArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

const MynaSend = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.912 12H3l18-9-9 18-2.088-6Z" />
  </svg>
);

interface ChatMessage {
  type: 'user' | 'agent';
  content: string;
  timestamp: string;
}

const MCPChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Get workflow details from URL parameters
  const selectedPrompt = searchParams.get('workflow') || '';
  const operationType = searchParams.get('type') || 'read';

  // Fetch audit logs on component mount
  useEffect(() => {
    const loadAuditLogs = async () => {
      try {
        const logs = await fetchAuditLogs();
        setAuditLogs(logs);
      } catch (error) {
        console.error('Failed to fetch audit logs:', error);
      }
    };

    loadAuditLogs();
  }, []);

  // Fetch user profile on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    loadUserProfile();
  }, []);

  // Store current MCP state when navigating to chat
  useEffect(() => {
    if (selectedPrompt) {
      // Store the current MCP page state for when we navigate back
      const mcpState = {
        tab: searchParams.get('tab') || 'read',
        section: searchParams.get('section') || null,
        humanLoop: searchParams.get('humanLoop') || null
      };
      sessionStorage.setItem('mcp-page-state', JSON.stringify(mcpState));
    }
  }, [selectedPrompt, searchParams]);

  const handleBackToWorkflows = () => {
    // Restore the MCP page state when navigating back
    const savedState = sessionStorage.getItem('mcp-page-state');
    if (savedState) {
      const state = JSON.parse(savedState);
      const params = new URLSearchParams();
      
      if (state.tab) params.set('tab', state.tab);
      if (state.section) params.set('section', state.section);
      if (state.humanLoop) params.set('humanLoop', state.humanLoop);
      
      const url = params.toString() ? `/mcp?${params.toString()}` : '/mcp';
      router.push(url);
    } else {
      router.push('/mcp');
    }
  };

  useEffect(() => {
    // Initialize chat with the selected workflow
    if (selectedPrompt) {
      setChatMessages([
        {
          type: 'user',
          content: selectedPrompt,
          timestamp: new Date().toLocaleTimeString()
        },
        {
          type: 'agent',
          content: getAgentResponse(selectedPrompt, operationType),
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }
  }, [selectedPrompt, operationType]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

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
    const newLog: AuditLog = {
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
      user: userProfile?.email || 'current.user@example.com', // Use profile email if available
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
  };

  const getAgentResponse = (prompt: string, operationType: string) => {
    const getRequiredFields = (prompt: string) => {
      const fields: string[] = [];
      
      if (operationType === 'chained' && prompt.includes('→')) {
        const steps = prompt.split('→').map((step: string) => step.trim());
        fields.push('🔗 **Multi-Step Workflow:**');
        steps.forEach((step: string, index: number) => {
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
    
    const newMessages: ChatMessage[] = [
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
    let errorMessage: string | null = null;
    let validationChecks: string[] = [];
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
        agentResponse = `❌ **Invalid contact ID format.**\n\n💡 **Contact IDs should be in UUID format** (e.g., 123e4567-e89b-12d3-a456-426614174000).\n\n💡 **Try instead:**\n• Searching by email address if you have it\n• Using the correct UUID format\n• Checking if you meant to search by order number instead\n\n**Valid UUID example:** f47ac10b-58cc-4372-a567-0e02b2c3d479\n\nPlease provide a valid contact ID or email address.`;
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const config = getWorkflowConfig(operationType);
  const { colorScheme } = config;

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-shrink-0 p-6 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBackToWorkflows}
                className="rounded-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Return to main workflow interface"
              >
                <MynaArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold dark:text-white ml-2">MCP Agent Chat</h2>
            </div>
          </div>
          <div className={`p-3 ${colorScheme.bg} border ${colorScheme.border} rounded-lg`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={colorScheme.icon}>
                <config.icon className="h-4 w-4" />
              </span>
              <span className={`text-sm font-medium ${colorScheme.text}`}>
                {config.title}
              </span>
            </div>
            <p className={`text-sm ${colorScheme.text}`}>
              <strong>Selected Workflow:</strong> {selectedPrompt}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 h-full">
          <div className="h-full overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-lg shadow-sm border ${
                    message.type === 'user'
                      ? `${colorScheme.bg} ${colorScheme.border} ${colorScheme.text}`
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700'
                  }`}
                >
                  <div className="whitespace-pre-line text-sm">
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? colorScheme.text : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 p-6 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="flex gap-0 items-stretch">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response here..."
              className={`flex-1 h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-l-lg rounded-r-none focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            />
            <Button
              onClick={handleSendMessage}
              className="h-12 flex items-center gap-2 px-6 rounded-l-none rounded-r-lg border-l-0"
              aria-label="Send message to MCP agent"
            >
              <MynaSend className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MCPChatPageWrapper = () => {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">Loading chat...</p>
        </div>
      </div>
    }>
      <MCPChatPage />
    </Suspense>
  );
};

export default MCPChatPageWrapper; 