import React from 'react';
import { WorkflowOperation } from '@/data/workflowOperations';
import WorkflowOperationsList from './WorkflowOperationsList';

interface ModifyDeleteOperationsTabProps {
  operations: WorkflowOperation[];
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
  setSectionRef?: (el: HTMLDivElement | null) => void;
}

export const ModifyDeleteOperationsTab: React.FC<ModifyDeleteOperationsTabProps> = ({
  operations,
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
  setSectionRef,
}) => {
  return (
    <WorkflowOperationsList
      operations={operations}
      operationType="modify"
      expandedSections={expandedSections}
      toggleSectionExpanded={toggleSectionExpanded}
      handlePromptClick={handlePromptClick}
      setSectionRef={setSectionRef}
    />
  );
}; 