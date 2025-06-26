export interface WorkflowMetrics {
  totalWorkflows: number;
  successfulWorkflows: number;
  userErrors: number;
  systemErrors: number;
  businessErrors: number;
  averageCompletionTime: string;
  mostCommonError: string;
  peakUsageTime: string;
}

export const initialWorkflowMetrics: WorkflowMetrics = {
  totalWorkflows: 127,
  successfulWorkflows: 98,
  userErrors: 18,
  systemErrors: 7,
  businessErrors: 4,
  averageCompletionTime: '2.1 seconds',
  mostCommonError: 'Invalid email format',
  peakUsageTime: '14:00-15:00'
}; 