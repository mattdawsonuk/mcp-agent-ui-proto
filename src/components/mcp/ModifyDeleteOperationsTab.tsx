import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { modifyDeleteOperations } from '@/data/workflowOperations';
import WorkflowOperationsList from './WorkflowOperationsList';

interface ModifyDeleteOperationsTabProps {
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
  setSectionRef?: (el: HTMLDivElement | null) => void;
}

export const ModifyDeleteOperationsTab: React.FC<ModifyDeleteOperationsTabProps> = ({
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
  setSectionRef,
}) => {
  return (
    <WorkflowOperationsList
      operations={modifyDeleteOperations}
      operationType="modify"
      title="Modification & Deletion Operations"
      description="These operations modify or delete existing data. All require confirmation and some may be irreversible."
      headerIcon={AlertTriangle}
      colorScheme={{
        bg: 'bg-amber-50 dark:bg-amber-900',
        border: 'border-amber-200 dark:border-amber-700',
        text: 'text-amber-800 dark:text-amber-200',
        buttonBg: 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-900 dark:hover:bg-amber-800',
        buttonHover: 'hover:bg-amber-100 dark:hover:bg-amber-800',
        buttonText: 'text-amber-800 dark:text-amber-200',
      }}
      expandedSections={expandedSections}
      toggleSectionExpanded={toggleSectionExpanded}
      handlePromptClick={handlePromptClick}
      setSectionRef={setSectionRef}
    />
  );
}; 