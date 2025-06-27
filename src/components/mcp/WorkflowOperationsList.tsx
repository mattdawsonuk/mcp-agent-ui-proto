import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WorkflowOperation } from '@/data/workflowOperations';
import { getWorkflowConfig } from '@/lib/workflowColors';

interface WorkflowOperationsListProps {
  operations: WorkflowOperation[];
  operationType: string;
  expandedSections: Record<string, boolean>;
  toggleSectionExpanded: (sectionKey: string) => void;
  handlePromptClick: (prompt: string, operationType: string) => void;
  setSectionRef?: (el: HTMLDivElement | null) => void;
}

const WorkflowOperationsList: React.FC<WorkflowOperationsListProps> = ({
  operations,
  operationType,
  expandedSections,
  toggleSectionExpanded,
  handlePromptClick,
  setSectionRef,
}) => {
  const config = getWorkflowConfig(operationType);
  const { colorScheme } = config;

  return (
    <>
      <div className="mb-4">
        <h2 className={`flex items-center gap-2 text-lg font-semibold ${colorScheme.text}`}>
          <config.icon className="h-5 w-5" />
          {config.title}
        </h2>
        <p className={`${colorScheme.text} text-sm mt-1 opacity-80`}>
          {config.description}
        </p>
      </div>
      
      <div className="space-y-6">
        {operations.map((section, sectionIndex) => {
          const sectionKey = `${operationType}-${sectionIndex}`;
          const isExpanded = expandedSections[sectionKey];
          
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
                    <config.icon className="h-4 w-4" />
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
                        className={`text-left justify-start ${colorScheme.buttonBg} ${colorScheme.buttonText} border-0 hover:shadow-md transition-all`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePromptClick(workflow, operationType);
                        }}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <config.icon className="h-4 w-4" />
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
    </>
  );
};

export default WorkflowOperationsList; 