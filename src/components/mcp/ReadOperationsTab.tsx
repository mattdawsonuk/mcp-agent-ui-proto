import React from 'react';
import { readOperations } from '@/data/workflowOperations';
import WorkflowOperationsList from './WorkflowOperationsList';

interface ReadOperationsTabProps {
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
  setSectionRef?: (el: HTMLDivElement | null) => void;
}

export const ReadOperationsTab: React.FC<ReadOperationsTabProps> = ({
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
  setSectionRef,
}) => {
  return (
    <WorkflowOperationsList
      operations={readOperations}
      operationType="read"
      expandedSections={expandedSections}
      toggleSectionExpanded={toggleSectionExpanded}
      handlePromptClick={handlePromptClick}
      setSectionRef={setSectionRef}
    />
  );
}; 