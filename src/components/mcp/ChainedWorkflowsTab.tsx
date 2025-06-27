import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { chainedOperations, WorkflowOperation } from '@/data/workflowOperations';

interface ChainedWorkflowsTabProps {
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
}

const iconMap = {
  Zap: () => <Zap className="h-4 w-4" />,
  Users: () => <Zap className="h-4 w-4" />,
  FileText: () => <Zap className="h-4 w-4" />,
  CreditCard: () => <Zap className="h-4 w-4" />,
  Package: () => <Zap className="h-4 w-4" />,
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

export const ChainedWorkflowsTab: React.FC<ChainedWorkflowsTabProps> = ({
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
}) => {
  return (
    <>
      <div className="mb-4 p-4 bg-purple-50 border border-purple-200 dark:bg-purple-900 dark:border-purple-700 rounded-lg">
        <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
          <Zap className="h-5 w-5" />
          <span className="font-semibold">Chained Workflows</span>
        </div>
        <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
          These are multi-step workflows that combine read, create, and modify operations in sequence. Each step builds on the previous one.
        </p>
      </div>
      {renderWorkflowSection(
        chainedOperations,
        'chained',
        'bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800',
        'text-purple-800 dark:text-purple-200',
        expandedSections,
        toggleSectionExpanded,
        handlePromptClick
      )}
    </>
  );
}; 