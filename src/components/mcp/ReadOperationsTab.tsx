import React from 'react';
import { Eye } from 'lucide-react';
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
      title="Read Operations"
      description="These operations retrieve data and execute immediately without requiring user confirmation."
      headerIcon={Eye}
      colorScheme={{
        bg: 'bg-green-50 dark:bg-green-900',
        border: 'border-green-200 dark:border-green-700',
        text: 'text-green-800 dark:text-green-200',
        buttonBg: 'bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800',
        buttonHover: 'hover:bg-green-100 dark:hover:bg-green-800',
        buttonText: 'text-green-800 dark:text-green-200',
      }}
      expandedSections={expandedSections}
      toggleSectionExpanded={toggleSectionExpanded}
      handlePromptClick={handlePromptClick}
      setSectionRef={setSectionRef}
    />
  );
}; 