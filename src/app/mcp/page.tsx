"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, ShoppingCart, FileText, CreditCard, BarChart3, Settings, AlertTriangle, CheckCircle, Package, Zap, Eye, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { initialAuditLogs, AuditLog } from '@/data/auditLogs';
import { initialWorkflowMetrics, WorkflowMetrics } from '@/data/workflowMetrics';
import { readOperations, createOperations, modifyDeleteOperations, chainedOperations, WorkflowOperation } from '@/data/workflowOperations';

const iconMap = {
  Users,
  ShoppingCart,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  AlertTriangle,
  CheckCircle,
  Package,
  Zap,
  Eye,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
};

const MCPWorkflowInterface = () => {
  const router = useRouter();
  const [isHumanLoopExpanded, setIsHumanLoopExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [auditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [workflowMetrics] = useState<WorkflowMetrics>(initialWorkflowMetrics);

  const toggleSectionExpanded = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handlePromptClick = (prompt: string, operationType: string = 'read') => {
    const params = new URLSearchParams({ workflow: prompt, type: operationType });
    router.push(`/mcp/chat?${params.toString()}`);
  };

  const renderWorkflowSection = (
    operations: WorkflowOperation[],
    operationType: string,
    bgColor: string,
    textColor: string
  ) => (
    <div className="space-y-6">
      {operations.map((section, sectionIndex) => {
        const sectionKey = `${operationType}-${sectionIndex}`;
        const isExpanded = expandedSections[sectionKey];
        const Icon = iconMap[section.icon as keyof typeof iconMap];
        return (
          <Card key={sectionIndex} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {Icon && <Icon className="h-4 w-4" />}
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
                        {Icon && <Icon className="h-4 w-4" />}
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
                  'text-green-800 dark:text-green-200'
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
                  'text-blue-800 dark:text-blue-200'
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
                  'text-amber-800 dark:text-amber-200'
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
                  'text-purple-800 dark:text-purple-200'
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
      </div>
    </div>
  );
};

export default MCPWorkflowInterface;