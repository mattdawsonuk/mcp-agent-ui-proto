import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { readOperations, WorkflowOperation } from '@/data/workflowOperations';

interface ReadOperationsTabProps {
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
}

const iconMap = {
  Users: () => <Eye className="h-4 w-4" />,
  FileText: () => <Eye className="h-4 w-4" />,
  Package: () => <Eye className="h-4 w-4" />,
  CreditCard: () => <Eye className="h-4 w-4" />,
  CheckCircle: () => <Eye className="h-4 w-4" />,
  Zap: () => <Eye className="h-4 w-4" />,
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
        <Card key={sectionIndex} className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                {Icon && <Icon />}
                {section.category}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSectionExpanded(sectionKey)}
                className="flex items-center gap-2"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Expand
                  </>
                )}
              </Button>
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
                    onClick={() => handlePromptClick(workflow, operationType)}
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

export const ReadOperationsTab: React.FC<ReadOperationsTabProps> = ({
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
}) => {
  return (
    <>
      <div className="mb-4 p-4 bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-700 rounded-lg">
        <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Safe Operations</span>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm mt-1">
          These read-only operations execute immediately without confirmation. No data will be modified.
        </p>
      </div>
      {renderWorkflowSection(
        readOperations,
        'read',
        'bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800',
        'text-green-800 dark:text-green-200',
        expandedSections,
        toggleSectionExpanded,
        handlePromptClick
      )}
    </>
  );
}; 