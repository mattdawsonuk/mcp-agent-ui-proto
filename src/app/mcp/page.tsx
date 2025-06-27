import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { getWorkflowOperations, getAuditLogs, getWorkflowMetrics } from '@/lib/server-data';
import { MCPWorkflowInterfaceClient } from '@/components/mcp/MCPWorkflowInterfaceClient';

export default async function MCPWorkflowInterface() {
  // Fetch data server-side
  const [workflowOperations, auditLogs, workflowMetrics] = await Promise.all([
    getWorkflowOperations(),
    getAuditLogs(),
    getWorkflowMetrics()
  ]);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    }>
      <MCPWorkflowInterfaceClient 
        initialWorkflowOperations={workflowOperations}
        initialAuditLogs={auditLogs}
        initialWorkflowMetrics={workflowMetrics}
      />
    </Suspense>
  );
}