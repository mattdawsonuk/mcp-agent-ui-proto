"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuditLog } from '@/data/auditLogs';
import { WorkflowMetrics } from '@/data/workflowMetrics';
import { WorkflowOperation } from '@/data/workflowOperations';
import { HumanLoopSection } from '@/components/mcp/HumanLoopSection';
import { ReadOperationsTab } from '@/components/mcp/ReadOperationsTab';
import { CreateOperationsTab } from '@/components/mcp/CreateOperationsTab';
import { ModifyDeleteOperationsTab } from '@/components/mcp/ModifyDeleteOperationsTab';
import { ChainedWorkflowsTab } from '@/components/mcp/ChainedWorkflowsTab';
import { AuditLogsTab } from '@/components/mcp/AuditLogsTab';
import { getWorkflowConfig } from '@/lib/workflowColors';
import { WorkflowOperationsResponse } from '@/lib/api';

interface MCPWorkflowInterfaceClientProps {
  initialWorkflowOperations: WorkflowOperationsResponse;
  initialAuditLogs: AuditLog[];
  initialWorkflowMetrics: WorkflowMetrics;
}

export const MCPWorkflowInterfaceClient: React.FC<MCPWorkflowInterfaceClientProps> = ({
  initialWorkflowOperations,
  initialAuditLogs,
  initialWorkflowMetrics
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHumanLoopExpanded, setIsHumanLoopExpanded] = useState(false);
  const [auditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [workflowMetrics] = useState<WorkflowMetrics>(initialWorkflowMetrics);
  const [workflowOperations] = useState<WorkflowOperationsResponse>(initialWorkflowOperations);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Get current state from URL parameters
  const currentTab = searchParams?.get('tab') || 'read';
  const expandedSection = searchParams?.get('section') || null;
  const isHumanLoopExpandedFromURL = searchParams?.get('humanLoop') === 'true';

  // Update state when URL parameters change
  useEffect(() => {
    setIsHumanLoopExpanded(isHumanLoopExpandedFromURL);
  }, [isHumanLoopExpandedFromURL]);

  // Scroll to section only on initial page load (not user interaction)
  useEffect(() => {
    if (!workflowOperations) return; // Wait for data to load
    
    // Use window.location.search directly to avoid useSearchParams timing issues
    const urlParams = new URLSearchParams(window.location.search);
    const workflow = urlParams.get('workflow');
    const type = urlParams.get('type');
    const expandedSectionFromURL = urlParams.get('section');
    
    // Only scroll if we have URL parameters indicating navigation back from chat or page refresh
    if (workflow || expandedSectionFromURL) {
      const scrollToSection = () => {
        if (workflow && type) {
          // Find which section contains this workflow
          const sectionKey = findSectionKeyForWorkflow(workflow, type);
          if (sectionKey && sectionRefs.current[sectionKey]) {
            setTimeout(() => {
              sectionRefs.current[sectionKey]?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }, 500);
          }
        } else if (expandedSectionFromURL) {
          // Convert stable key to index key for ref lookup
          const indexKey = findIndexKeyFromStableKey(expandedSectionFromURL);
          
          if (indexKey && sectionRefs.current[indexKey]) {
            // Scroll to expanded section with offset
            setTimeout(() => {
              const element = sectionRefs.current[indexKey];
              if (element) {
                const elementTop = element.offsetTop;
                const offset = 100; // 100px offset from top
                window.scrollTo({
                  top: elementTop - offset,
                  behavior: 'smooth'
                });
              }
            }, 500);
          }
        }
      };

      // Try to scroll immediately, and retry if refs aren't ready
      let retryCount = 0;
      const maxRetries = 20;
      
      const attemptScroll = () => {
        if (workflow && type) {
          const sectionKey = findSectionKeyForWorkflow(workflow, type);
          if (sectionKey && sectionRefs.current[sectionKey]) {
            scrollToSection();
          } else if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(attemptScroll, 100);
          }
        } else if (expandedSectionFromURL) {
          // Convert stable key to index key for ref lookup
          const indexKey = findIndexKeyFromStableKey(expandedSectionFromURL);
          if (indexKey && sectionRefs.current[indexKey]) {
            scrollToSection();
          } else if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(attemptScroll, 100);
          }
        }
      };

      attemptScroll();
    }
  }, [workflowOperations]); // Run when data loads

  const findSectionKeyForWorkflow = (workflow: string, type: string): string | null => {
    if (!workflowOperations) return null;
    
    let operations: WorkflowOperation[];
    switch (type) {
      case 'read':
        operations = workflowOperations.read;
        break;
      case 'create':
        operations = workflowOperations.create;
        break;
      case 'modify':
        operations = workflowOperations.modifyDelete;
        break;
      case 'chained':
        operations = workflowOperations.chained;
        break;
      default:
        return null;
    }
    
    for (let sectionIndex = 0; sectionIndex < operations.length; sectionIndex++) {
      const section = operations[sectionIndex];
      if (section.workflows.includes(workflow)) {
        return `${type}-${section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
      }
    }
    
    return null;
  };

  const findIndexKeyFromStableKey = (stableKey: string): string | null => {
    if (!workflowOperations) return null;
    
    const firstHyphenIndex = stableKey.indexOf('-');
    const type = stableKey.substring(0, firstHyphenIndex);
    const categorySlug = stableKey.substring(firstHyphenIndex + 1);
    
    let operations: WorkflowOperation[] = [];
    
    switch (type) {
      case 'read':
        operations = workflowOperations.read;
        break;
      case 'create':
        operations = workflowOperations.create;
        break;
      case 'modify':
        operations = workflowOperations.modifyDelete;
        break;
      case 'chained':
        operations = workflowOperations.chained;
        break;
      default:
        return null;
    }
    
    if (operations) {
      const sectionIndex = operations.findIndex(section => {
        const sectionSlug = section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return sectionSlug === categorySlug;
      });
      
      if (sectionIndex !== -1) {
        return `${type}-${sectionIndex}`;
      }
    }
    
    return null;
  };

  const updateURL = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(`/mcp${newUrl}`, { scroll: false });
  };

  const toggleSectionExpanded = (sectionKey: string) => {
    if (!workflowOperations) return;
    
    const type = sectionKey.split('-')[0];
    let operations: WorkflowOperation[];
    
    switch (type) {
      case 'read':
        operations = workflowOperations.read;
        break;
      case 'create':
        operations = workflowOperations.create;
        break;
      case 'modify':
        operations = workflowOperations.modifyDelete;
        break;
      case 'chained':
        operations = workflowOperations.chained;
        break;
      default:
        return;
    }
    
    const sectionIndex = parseInt(sectionKey.split('-')[1]);
    
    if (sectionIndex >= 0 && sectionIndex < operations.length) {
      const section = operations[sectionIndex];
      const stableSectionKey = `${type}-${section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
      
      const currentSection = searchParams?.get('section');
      const newExpandedSection = currentSection === stableSectionKey ? null : stableSectionKey;
      updateURL({ section: newExpandedSection });
    }
  };

  const handleHumanLoopToggle = (expanded: boolean) => {
    setIsHumanLoopExpanded(expanded);
    updateURL({ humanLoop: expanded ? 'true' : null });
  };

  const handleTabChange = (tab: string) => {
    updateURL({ tab, section: null }); // Clear section when changing tabs
  };

  const handlePromptClick = (prompt: string, operationType: string = 'read') => {
    const params = new URLSearchParams({ workflow: prompt, type: operationType });
    
    if (currentTab) params.set('tab', currentTab);
    if (expandedSection) params.set('section', expandedSection);
    if (isHumanLoopExpanded) params.set('humanLoop', 'true');
    
    router.push(`/mcp/chat?${params.toString()}`);
  };

  const createSectionRefSetter = (operationType: string) => (el: HTMLDivElement | null) => {
    if (el) {
      const sectionIndex = el.getAttribute('data-section-index');
      if (sectionIndex) {
        const sectionKey = `${operationType}-${sectionIndex}`;
        sectionRefs.current[sectionKey] = el;
      }
    }
  };

  // Helper to convert stable key to index key for a given operation type
  const getIndexKeyForTab = (tab: string) => {
    if (!expandedSection) return null;
    const stableKey = expandedSection;
    const firstHyphenIndex = stableKey.indexOf('-');
    const categorySlug = stableKey.substring(firstHyphenIndex + 1);
    let operations: WorkflowOperation[] = [];
    switch (tab) {
      case 'read':
        operations = workflowOperations.read;
        break;
      case 'create':
        operations = workflowOperations.create;
        break;
      case 'modify':
        operations = workflowOperations.modifyDelete;
        break;
      case 'chained':
        operations = workflowOperations.chained;
        break;
      default:
        return null;
    }
    if (operations) {
      const sectionIndex = operations.findIndex(section => {
        const sectionSlug = section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return sectionSlug === categorySlug;
      });
      if (sectionIndex !== -1) {
        return `${tab}-${sectionIndex}`;
      }
    }
    return null;
  };

  // Show main interface when data is loaded
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Aria</h1>
          <p className="text-xl text-blue-700 dark:text-blue-300 mb-1">Autonomous Responsive Intelligence Assistant</p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Wilmington PLC MCP Staging Org workflow interface organised by operation type. Click any button to execute a workflow.</p>
          
          <div className="flex gap-2 flex-wrap">
            {(() => {
              const readConfig = getWorkflowConfig('read');
              const createConfig = getWorkflowConfig('create');
              const modifyConfig = getWorkflowConfig('modify');
              const chainedConfig = getWorkflowConfig('chained');
              
              return (
                <>
                  <Badge className={`${readConfig.colorScheme.bg} ${readConfig.colorScheme.text} flex items-center gap-1`}>
                    <readConfig.icon className="h-3 w-3" />
                    Read - Immediate execution
                  </Badge>
                  <Badge className={`${createConfig.colorScheme.bg} ${createConfig.colorScheme.text} flex items-center gap-1`}>
                    <createConfig.icon className="h-3 w-3" />
                    Create - Requires confirmation
                  </Badge>
                  <Badge className={`${modifyConfig.colorScheme.bg} ${modifyConfig.colorScheme.text} flex items-center gap-1`}>
                    <modifyConfig.icon className="h-3 w-3" />
                    Modify - Requires confirmation
                  </Badge>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center gap-1">
                    <Trash2 className="h-3 w-3" />
                    Delete - High risk, requires confirmation
                  </Badge>
                  <Badge className={`${chainedConfig.colorScheme.bg} ${chainedConfig.colorScheme.text} flex items-center gap-1`}>
                    <chainedConfig.icon className="h-3 w-3" />
                    Chained - Multi-step workflows
                  </Badge>
                </>
              );
            })()}
          </div>
        </div>

        {/* Human-in-the-Loop Interactions - Expandable/Collapsible */}
        <HumanLoopSection 
          isHumanLoopExpanded={isHumanLoopExpanded}
          setIsHumanLoopExpanded={handleHumanLoopToggle}
        />

        {/* Main Tabs Interface */}
        <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="read" className="flex items-center gap-2" aria-label="View read operations - immediate execution workflows">
              {React.createElement(getWorkflowConfig('read').icon, { className: 'h-4 w-4' })}
              Read Operations
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2" aria-label="View create operations - workflows requiring confirmation">
              {React.createElement(getWorkflowConfig('create').icon, { className: 'h-4 w-4' })}
              Create Operations
            </TabsTrigger>
            <TabsTrigger value="modify" className="flex items-center gap-2" aria-label="View modify and delete operations - workflows requiring confirmation">
              {React.createElement(getWorkflowConfig('modify').icon, { className: 'h-4 w-4' })}
              Modify/Delete
            </TabsTrigger>
            <TabsTrigger value="chained" className="flex items-center gap-2" aria-label="View chained workflows - multi-step workflow operations">
              {React.createElement(getWorkflowConfig('chained').icon, { className: 'h-4 w-4' })}
              Chained Workflows
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2" aria-label="View audit logs and workflow metrics">
              <FileText className="h-4 w-4" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="read" className="space-y-6">
            <ReadOperationsTab
              operations={workflowOperations.read}
              expandedSections={getIndexKeyForTab('read') ? { [getIndexKeyForTab('read')!]: true } : {}}
              toggleSectionExpanded={toggleSectionExpanded}
              handlePromptClick={handlePromptClick}
              setSectionRef={createSectionRefSetter('read')}
            />
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <CreateOperationsTab
              operations={workflowOperations.create}
              expandedSections={getIndexKeyForTab('create') ? { [getIndexKeyForTab('create')!]: true } : {}}
              toggleSectionExpanded={toggleSectionExpanded}
              handlePromptClick={handlePromptClick}
              setSectionRef={createSectionRefSetter('create')}
            />
          </TabsContent>

          <TabsContent value="modify" className="space-y-6">
            <ModifyDeleteOperationsTab
              operations={workflowOperations.modifyDelete}
              expandedSections={getIndexKeyForTab('modify') ? { [getIndexKeyForTab('modify')!]: true } : {}}
              toggleSectionExpanded={toggleSectionExpanded}
              handlePromptClick={handlePromptClick}
              setSectionRef={createSectionRefSetter('modify')}
            />
          </TabsContent>

          <TabsContent value="chained" className="space-y-6">
            <ChainedWorkflowsTab
              operations={workflowOperations.chained}
              expandedSections={getIndexKeyForTab('chained') ? { [getIndexKeyForTab('chained')!]: true } : {}}
              toggleSectionExpanded={toggleSectionExpanded}
              handlePromptClick={handlePromptClick}
              setSectionRef={createSectionRefSetter('chained')}
            />
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <AuditLogsTab
              auditLogs={auditLogs}
              workflowMetrics={workflowMetrics}
              setSectionRef={createSectionRefSetter('audit')}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
