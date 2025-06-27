import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface HumanLoopSectionProps {
  isHumanLoopExpanded: boolean;
  setIsHumanLoopExpanded: (expanded: boolean) => void;
}

export const HumanLoopSection: React.FC<HumanLoopSectionProps> = ({
  isHumanLoopExpanded,
  setIsHumanLoopExpanded,
}) => {
  const handleHeaderClick = () => {
    console.log('HumanLoopSection header clicked, current state:', isHumanLoopExpanded);
    setIsHumanLoopExpanded(!isHumanLoopExpanded);
  };

  return (
    <Card 
      className="mb-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      onClick={handleHeaderClick}
    >
      <CardHeader className="select-none">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
            <AlertTriangle className="h-4 w-4" />
            Human-in-the-Loop Interactions
          </CardTitle>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            {isHumanLoopExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
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
                &quot;I found contact for email address you provided. You want to update first name to the new name you specified. This will permanently change the contact information. Do you want to proceed? (yes/no)&quot;
              </p>
            </div>
            
            <div className="p-3 bg-amber-50 border border-amber-200 dark:bg-amber-900 dark:border-amber-700 rounded">
              <p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Order Creation</p>
              <p className="text-amber-700 dark:text-amber-300 text-xs mt-1">
                &quot;I&apos;m about to create an order with the customer email, products, and currency you specified. This will generate a binding order. Confirm to proceed? (yes/no)&quot;
              </p>
            </div>
            
            <div className="p-3 bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-700 rounded">
              <p className="font-semibold text-red-800 dark:text-red-200 text-sm">Order Cancellation</p>
              <p className="text-red-700 dark:text-red-300 text-xs mt-1">
                &quot;Ready to cancel the order/line items you specified. This will permanently remove these items and may trigger a partial refund. Continue? (yes/no)&quot;
              </p>
            </div>
            
            <div className="p-3 bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-700 rounded">
              <p className="font-semibold text-green-800 dark:text-green-200 text-sm">Drawdown Order Creation</p>
              <p className="text-green-700 dark:text-green-300 text-xs mt-1">
                &quot;I&apos;m about to create a drawdown order with £50,000 credit for customer, valid for 12 months with quarterly billing. This will set up pre-paid credits and future invoice schedule. Confirm to proceed? (yes/no)&quot;
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900 dark:border-blue-700 rounded">
              <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Credit Application</p>
              <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">
                &quot;Ready to apply £5,000 drawdown credit to order. Current balance: £25,000. Remaining after application: £20,000. This will reduce customer&apos;s available drawdown credits. Continue? (yes/no)&quot;
              </p>
            </div>
            
            <div className="p-3 bg-purple-50 border border-purple-200 dark:bg-purple-900 dark:border-purple-700 rounded">
              <p className="font-semibold text-purple-800 dark:text-purple-200 text-sm">Chained Workflow</p>
              <p className="text-purple-700 dark:text-purple-300 text-xs mt-1">
                &quot;I&apos;ll execute this 4-step workflow: Step 1: Convert prospect opportunity → Step 2: Find contact → Step 3: Update details → Step 4: Create sales link. This will modify data across multiple systems. Execute complete workflow chain? (yes/no)&quot;
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}; 