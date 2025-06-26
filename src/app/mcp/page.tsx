"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Eye, Plus, Edit, Trash2, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { initialAuditLogs, AuditLog } from '@/data/auditLogs';
import { initialWorkflowMetrics, WorkflowMetrics } from '@/data/workflowMetrics';
import { HumanLoopSection } from '@/components/mcp/HumanLoopSection';
import { ReadOperationsTab } from '@/components/mcp/ReadOperationsTab';
import { CreateOperationsTab } from '@/components/mcp/CreateOperationsTab';
import { ModifyDeleteOperationsTab } from '@/components/mcp/ModifyDeleteOperationsTab';
import { ChainedWorkflowsTab } from '@/components/mcp/ChainedWorkflowsTab';
import { AuditLogsTab } from '@/components/mcp/AuditLogsTab';

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
        <HumanLoopSection 
          isHumanLoopExpanded={isHumanLoopExpanded}
          setIsHumanLoopExpanded={setIsHumanLoopExpanded}
        />

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
                <ReadOperationsTab
                  expandedSections={expandedSections}
                  toggleSectionExpanded={toggleSectionExpanded}
                  handlePromptClick={handlePromptClick}
                />
              </TabsContent>

              <TabsContent value="create" className="mt-6">
                <CreateOperationsTab
                  expandedSections={expandedSections}
                  toggleSectionExpanded={toggleSectionExpanded}
                  handlePromptClick={handlePromptClick}
                />
              </TabsContent>

              <TabsContent value="modify" className="mt-6">
                <ModifyDeleteOperationsTab
                  expandedSections={expandedSections}
                  toggleSectionExpanded={toggleSectionExpanded}
                  handlePromptClick={handlePromptClick}
                />
              </TabsContent>

              <TabsContent value="chained" className="mt-6">
                <ChainedWorkflowsTab
                  expandedSections={expandedSections}
                  toggleSectionExpanded={toggleSectionExpanded}
                  handlePromptClick={handlePromptClick}
                />
              </TabsContent>

              <TabsContent value="audit" className="mt-6">
                <AuditLogsTab
                  auditLogs={auditLogs}
                  workflowMetrics={workflowMetrics}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPWorkflowInterface;