import React from 'react';
import { Zap } from 'lucide-react';
import { chainedOperations } from '@/data/workflowOperations';
import WorkflowOperationsList from './WorkflowOperationsList';

interface ChainedWorkflowsTabProps {
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
  setSectionRef?: (el: HTMLDivElement | null) => void;
}

export const ChainedWorkflowsTab: React.FC<ChainedWorkflowsTabProps> = ({
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
  setSectionRef,
}) => {
  return (
    <WorkflowOperationsList
      operations={chainedOperations}
      operationType="chained"
      title="Chained Workflows"
      description="Multi-step workflows that execute a series of operations in sequence."
      headerIcon={Zap}
      colorScheme={{
        bg: 'bg-purple-50 dark:bg-purple-900',
        border: 'border-purple-200 dark:border-purple-700',
        text: 'text-purple-800 dark:text-purple-200',
        buttonBg: 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800',
        buttonHover: 'hover:bg-purple-100 dark:hover:bg-purple-800',
        buttonText: 'text-purple-800 dark:text-purple-200',
      }}
      expandedSections={expandedSections}
      toggleSectionExpanded={toggleSectionExpanded}
      handlePromptClick={handlePromptClick}
      setSectionRef={setSectionRef}
    />
  );
}; 