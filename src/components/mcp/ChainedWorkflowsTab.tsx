import React from 'react';
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
      expandedSections={expandedSections}
      toggleSectionExpanded={toggleSectionExpanded}
      handlePromptClick={handlePromptClick}
      setSectionRef={setSectionRef}
    />
  );
}; 