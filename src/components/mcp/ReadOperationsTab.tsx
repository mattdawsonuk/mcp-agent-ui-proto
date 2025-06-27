import React from 'react';
import { WorkflowOperation } from '@/data/workflowOperations';
import WorkflowOperationsList from './WorkflowOperationsList';

interface ReadOperationsTabProps {
  operations: WorkflowOperation[];
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
  setSectionRef?: (el: HTMLDivElement | null) => void;
}

export const ReadOperationsTab: React.FC<ReadOperationsTabProps> = ({
  operations,
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
  setSectionRef,
}) => {
  return (
    <WorkflowOperationsList
      operations={operations}
      operationType="read"
      expandedSections={expandedSections}
      toggleSectionExpanded={toggleSectionExpanded}
      handlePromptClick={handlePromptClick}
      setSectionRef={setSectionRef}
    />
  );
}; 