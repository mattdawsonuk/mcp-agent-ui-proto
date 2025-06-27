import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { createOperations, WorkflowOperation } from '@/data/workflowOperations';

interface CreateOperationsTabProps {
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
  setSectionRef?: (el: HTMLDivElement | null) => void;
}

const iconMap = {
  ShoppingCart: () => <Plus className="h-4 w-4" />,
  FileText: () => <Plus className="h-4 w-4" />,
  CreditCard: () => <Plus className="h-4 w-4" />,
  Package: () => <Plus className="h-4 w-4" />,
  Zap: () => <Plus className="h-4 w-4" />,
};

const renderWorkflowSection = (
  operations: WorkflowOperation[],
  operationType: string,
  bgColor: string,
  textColor: string,
  expandedSections: Record<string, boolean>,
  toggleSectionExpanded: (sectionKey: string) => void,
  handlePromptClick: (prompt: string, operationType: string) => void,
  setSectionRef?: (el: HTMLDivElement | null) => void
) => (
  <div className="space-y-6">
    {operations.map((section, sectionIndex) => {
      const sectionKey = `${operationType}-${sectionIndex}`;
      const isExpanded = expandedSections[sectionKey];
      const Icon = iconMap[section.icon as keyof typeof iconMap];
      
      const handleHeaderClick = () => {
        toggleSectionExpanded(sectionKey);
      };
      
      return (
        <Card 
          key={sectionIndex} 
          className="w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors scroll-mt-24"
          onClick={handleHeaderClick}
          data-section-index={sectionIndex}
          ref={setSectionRef}
        >
          <CardHeader className="select-none">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                {Icon && <Icon />}
                {section.category}
              </CardTitle>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </div>
          </CardHeader>
          {isExpanded && (
            <CardContent>
              <div className="grid gap-2">
                {section.workflows.map((workflow, workflowIndex) => (
                  <Button
                    key={workflowIndex}
                    variant="outline"
                    size="sm"
                    className={`text-left justify-start ${bgColor} ${textColor} border-0 hover:shadow-md transition-all`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePromptClick(workflow, operationType);
                    }}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {Icon && <Icon />}
                      <span className="flex-1 truncate">{workflow}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      );
    })}
  </div>
);

export const CreateOperationsTab: React.FC<CreateOperationsTabProps> = ({
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
  setSectionRef,
}) => {
  return (
    <>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900 dark:border-blue-700 rounded-lg">
        <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Creation Operations</span>
        </div>
        <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
          These operations create new records and require user confirmation before proceeding.
        </p>
      </div>
      {renderWorkflowSection(
        createOperations,
        'create',
        'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800',
        'text-blue-800 dark:text-blue-200',
        expandedSections,
        toggleSectionExpanded,
        handlePromptClick,
        setSectionRef
      )}
    </>
  );
}; 