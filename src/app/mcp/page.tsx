"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Eye, Plus, Edit, Trash2, Zap } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { initialAuditLogs, AuditLog } from '@/data/auditLogs';
import { initialWorkflowMetrics, WorkflowMetrics } from '@/data/workflowMetrics';
import { readOperations, createOperations, modifyDeleteOperations, chainedOperations } from '@/data/workflowOperations';
import { HumanLoopSection } from '@/components/mcp/HumanLoopSection';
import { ReadOperationsTab } from '@/components/mcp/ReadOperationsTab';
import { CreateOperationsTab } from '@/components/mcp/CreateOperationsTab';
import { ModifyDeleteOperationsTab } from '@/components/mcp/ModifyDeleteOperationsTab';
import { ChainedWorkflowsTab } from '@/components/mcp/ChainedWorkflowsTab';
import { AuditLogsTab } from '@/components/mcp/AuditLogsTab';

const MCPWorkflowInterface = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHumanLoopExpanded, setIsHumanLoopExpanded] = useState(false);
  const [auditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [workflowMetrics] = useState<WorkflowMetrics>(initialWorkflowMetrics);
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
  }, []); // Only run on mount

  const findSectionKeyForWorkflow = (workflow: string, type: string): string | null => {
    let operations;
    switch (type) {
      case 'read':
        operations = readOperations;
        break;
      case 'create':
        operations = createOperations;
        break;
      case 'modify':
        operations = modifyDeleteOperations;
        break;
      case 'chained':
        operations = chainedOperations;
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
    const firstHyphenIndex = stableKey.indexOf('-');
    const type = stableKey.substring(0, firstHyphenIndex);
    const categorySlug = stableKey.substring(firstHyphenIndex + 1);
    
    let operations;
    
    switch (type) {
      case 'read':
        operations = readOperations;
        break;
      case 'create':
        operations = createOperations;
        break;
      case 'modify':
        operations = modifyDeleteOperations;
        break;
      case 'chained':
        operations = chainedOperations;
        break;
      default:
        return null;
    }
    
    if (operations) {
      const sectionIndex = operations.findIndex(section => {
        const sectionSlug = section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return sectionSlug === categorySlug;
      });
      if (sectionIndex >= 0) {
        const indexKey = `${type}-${sectionIndex}`;
        return indexKey;
      }
    }
    
    return null;
  };

  const updateURL = (newParams: Record<string, string | null>) => {
    try {
      const params = new URLSearchParams(searchParams?.toString() || '');
      
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      
      const newURL = `/mcp?${params.toString()}`;
      router.push(newURL, { scroll: false });
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  };

  const toggleSectionExpanded = (sectionKey: string) => {
    const type = sectionKey.split('-')[0];
    let operations;
    
    switch (type) {
      case 'read':
        operations = readOperations;
        break;
      case 'create':
        operations = createOperations;
        break;
      case 'modify':
        operations = modifyDeleteOperations;
        break;
      case 'chained':
        operations = chainedOperations;
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

  // Create a function that creates section-specific ref setters
  const createSectionRefSetter = (operationType: string) => (el: HTMLDivElement | null) => {
    if (el) {
      // Find the section index by looking at the element's parent or data attribute
      const cardElement = el.closest('[data-section-index]');
      if (cardElement) {
        const sectionIndex = cardElement.getAttribute('data-section-index');
        if (sectionIndex) {
          const sectionKey = `${operationType}-${sectionIndex}`;
          sectionRefs.current[sectionKey] = el;
        }
      }
    }
  };

  // Create expandedSections object for compatibility with existing components
  const expandedSections: Record<string, boolean> = {};
  if (expandedSection) {
    // Convert stable section key back to index-based key for component compatibility
    const firstHyphenIndex = expandedSection.indexOf('-');
    const type = expandedSection.substring(0, firstHyphenIndex);
    const categorySlug = expandedSection.substring(firstHyphenIndex + 1);
    let operations;
    
    switch (type) {
      case 'read':
        operations = readOperations;
        break;
      case 'create':
        operations = createOperations;
        break;
      case 'modify':
        operations = modifyDeleteOperations;
        break;
      case 'chained':
        operations = chainedOperations;
        break;
      default:
        break;
    }
    
    if (operations) {
      const sectionIndex = operations.findIndex(section => {
        const sectionSlug = section.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return sectionSlug === categorySlug;
      });
      if (sectionIndex >= 0) {
        const indexKey = `${type}-${sectionIndex}`;
        expandedSections[indexKey] = true;
      }
    }
  }

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
          setIsHumanLoopExpanded={handleHumanLoopToggle}
        />

        <div className="w-full">
          <div className="w-full">
            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
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
                  setSectionRef={createSectionRefSetter('read')}
                />
              </TabsContent>

              <TabsContent value="create" className="mt-6">
                <CreateOperationsTab
                  expandedSections={expandedSections}
                  toggleSectionExpanded={toggleSectionExpanded}
                  handlePromptClick={handlePromptClick}
                  setSectionRef={createSectionRefSetter('create')}
                />
              </TabsContent>

              <TabsContent value="modify" className="mt-6">
                <ModifyDeleteOperationsTab
                  expandedSections={expandedSections}
                  toggleSectionExpanded={toggleSectionExpanded}
                  handlePromptClick={handlePromptClick}
                  setSectionRef={createSectionRefSetter('modify')}
                />
              </TabsContent>

              <TabsContent value="chained" className="mt-6">
                <ChainedWorkflowsTab
                  expandedSections={expandedSections}
                  toggleSectionExpanded={toggleSectionExpanded}
                  handlePromptClick={handlePromptClick}
                  setSectionRef={createSectionRefSetter('chained')}
                />
              </TabsContent>

              <TabsContent value="audit" className="mt-6">
                <AuditLogsTab
                  auditLogs={auditLogs}
                  workflowMetrics={workflowMetrics}
                  setSectionRef={createSectionRefSetter('audit')}
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