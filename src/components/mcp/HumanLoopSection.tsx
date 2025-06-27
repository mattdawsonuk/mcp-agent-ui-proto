import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { fetchHumanLoopData } from '@/lib/api';
import { HumanLoopExample } from '@/data/humanLoop';

interface HumanLoopSectionProps {
  isHumanLoopExpanded: boolean;
  setIsHumanLoopExpanded: (expanded: boolean) => void;
}

export const HumanLoopSection: React.FC<HumanLoopSectionProps> = ({
  isHumanLoopExpanded,
  setIsHumanLoopExpanded,
}) => {
  const [humanLoopData, setHumanLoopData] = useState<{ intro: string; examples: HumanLoopExample[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHumanLoopData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchHumanLoopData();
        setHumanLoopData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load human-in-the-loop data');
      } finally {
        setIsLoading(false);
      }
    };

    loadHumanLoopData();
  }, []);

  const handleHeaderClick = () => {
    console.log('HumanLoopSection header clicked, current state:', isHumanLoopExpanded);
    setIsHumanLoopExpanded(!isHumanLoopExpanded);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900',
          border: 'border-blue-200 dark:border-blue-700',
          title: 'text-blue-800 dark:text-blue-200',
          text: 'text-blue-700 dark:text-blue-300'
        };
      case 'amber':
        return {
          bg: 'bg-amber-50 dark:bg-amber-900',
          border: 'border-amber-200 dark:border-amber-700',
          title: 'text-amber-800 dark:text-amber-200',
          text: 'text-amber-700 dark:text-amber-300'
        };
      case 'red':
        return {
          bg: 'bg-red-50 dark:bg-red-900',
          border: 'border-red-200 dark:border-red-700',
          title: 'text-red-800 dark:text-red-200',
          text: 'text-red-700 dark:text-red-300'
        };
      case 'green':
        return {
          bg: 'bg-green-50 dark:bg-green-900',
          border: 'border-green-200 dark:border-green-700',
          title: 'text-green-800 dark:text-green-200',
          text: 'text-green-700 dark:text-green-300'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900',
          border: 'border-purple-200 dark:border-purple-700',
          title: 'text-purple-800 dark:text-purple-200',
          text: 'text-purple-700 dark:text-purple-300'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900',
          border: 'border-gray-200 dark:border-gray-700',
          title: 'text-gray-800 dark:text-gray-200',
          text: 'text-gray-700 dark:text-gray-300'
        };
    }
  };

  return (
    <Card 
      className="mb-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      onClick={handleHeaderClick}
    >
      <CardHeader className="select-none">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
            <AlertTriangle className="h-4 w-4" />
            Human-in-the-Loop Interactions
          </CardTitle>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isHumanLoopExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </CardHeader>
      
      {isHumanLoopExpanded && (
        <CardContent className="space-y-4">
          {error ? (
            <div className="text-red-600 dark:text-red-400 text-sm">
              Error loading data: {error}
            </div>
          ) : !humanLoopData ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {humanLoopData.intro}
              </p>
              
              <div className="space-y-3">
                {humanLoopData.examples.map((example, index) => {
                  const colorClasses = getColorClasses(example.color);
                  return (
                    <div 
                      key={index}
                      className={`p-3 ${colorClasses.bg} border ${colorClasses.border} rounded`}
                    >
                      <p className={`font-semibold ${colorClasses.title} text-sm`}>
                        {example.title}
                      </p>
                      <p className={`${colorClasses.text} text-xs mt-1`}>
                        {example.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}; 