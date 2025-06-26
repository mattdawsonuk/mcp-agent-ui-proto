import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, FileText } from 'lucide-react';
import { AuditLog } from '@/data/auditLogs';
import { WorkflowMetrics } from '@/data/workflowMetrics';

interface AuditLogsTabProps {
  auditLogs: AuditLog[];
  workflowMetrics: WorkflowMetrics;
}

export const AuditLogsTab: React.FC<AuditLogsTabProps> = ({
  auditLogs,
  workflowMetrics,
}) => {
  return (
    <>
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
    </>
  );
}; 