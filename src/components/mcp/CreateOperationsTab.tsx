import React from 'react';
import { Plus } from 'lucide-react';
import { createOperations } from '@/data/workflowOperations';
import WorkflowOperationsList from './WorkflowOperationsList';

interface CreateOperationsTabProps {
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
  setSectionRef?: (el: HTMLDivElement | null) => void;
}

export const CreateOperationsTab: React.FC<CreateOperationsTabProps> = ({
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
  setSectionRef,
}) => {
  return (
    <WorkflowOperationsList
      operations={createOperations}
      operationType="create"
      title="Creation Operations"
      description="These operations create new records and require user confirmation before proceeding."
      headerIcon={Plus}
      colorScheme={{
        bg: 'bg-blue-50 dark:bg-blue-900',
        border: 'border-blue-200 dark:border-blue-700',
        text: 'text-blue-800 dark:text-blue-200',
        buttonBg: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800',
        buttonHover: 'hover:bg-blue-100 dark:hover:bg-blue-800',
        buttonText: 'text-blue-800 dark:text-blue-200',
      }}
      expandedSections={expandedSections}
      toggleSectionExpanded={toggleSectionExpanded}
      handlePromptClick={handlePromptClick}
      setSectionRef={setSectionRef}
    />
  );
}; 