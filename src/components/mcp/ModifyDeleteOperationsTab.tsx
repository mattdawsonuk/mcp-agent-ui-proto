import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { modifyDeleteOperations, WorkflowOperation } from '@/data/workflowOperations';

interface ModifyDeleteOperationsTabProps {
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
}

const iconMap = {
  Edit: () => <AlertTriangle className="h-4 w-4" />,
  Trash2: () => <AlertTriangle className="h-4 w-4" />,
  FileText: () => <AlertTriangle className="h-4 w-4" />,
  CreditCard: () => <AlertTriangle className="h-4 w-4" />,
  Package: () => <AlertTriangle className="h-4 w-4" />,
};

const renderWorkflowSection = (
  operations: WorkflowOperation[],
  operationType: string,
  bgColor: string,
  textColor: string,
  expandedSections: Record<string, boolean>,
  toggleSectionExpanded: (sectionKey: string) => void,
  handlePromptClick: (prompt: string, operationType: string) => void
) => (
  <div className="space-y-6">
    {operations.map((section, sectionIndex) => {
      const sectionKey = `${operationType}-${sectionIndex}`;
      const isExpanded = expandedSections[sectionKey];
      const Icon = iconMap[section.icon as keyof typeof iconMap];
      
      return (
        <Card 
          key={sectionIndex} 
          className="w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSectionExpanded(sectionKey)}
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

export const ModifyDeleteOperationsTab: React.FC<ModifyDeleteOperationsTabProps> = ({
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
}) => {
  return (
    <>
      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 dark:bg-amber-900 dark:border-amber-700 rounded-lg">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-semibold">Modification & Deletion Operations</span>
        </div>
        <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
          These operations modify or delete existing data. All require confirmation and some may be irreversible.
        </p>
      </div>
      {renderWorkflowSection(
        modifyDeleteOperations,
        'modify',
        'bg-amber-50 hover:bg-amber-100 dark:bg-amber-900 dark:hover:bg-amber-800',
        'text-amber-800 dark:text-amber-200',
        expandedSections,
        toggleSectionExpanded,
        handlePromptClick
      )}
    </>
  );
}; 