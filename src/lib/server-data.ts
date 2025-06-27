import { initialAuditLogs } from '@/data/auditLogs';
import { initialWorkflowMetrics } from '@/data/workflowMetrics';
import { readOperations, createOperations, modifyDeleteOperations, chainedOperations } from '@/data/workflowOperations';
import { humanLoopExamples, humanLoopIntro } from '@/data/humanLoop';
import { mockUserProfile } from '@/data/userProfile';
import { WorkflowOperationsResponse } from '@/lib/api';

export async function getWorkflowOperations(): Promise<WorkflowOperationsResponse> {
  // Simulate server-side processing delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    read: readOperations,
    create: createOperations,
    modifyDelete: modifyDeleteOperations,
    chained: chainedOperations
  };
}

export async function getAuditLogs() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return initialAuditLogs;
}

export async function getWorkflowMetrics() {
  await new Promise(resolve => setTimeout(resolve, 75));
  return initialWorkflowMetrics;
}

export async function getHumanLoopData() {
  await new Promise(resolve => setTimeout(resolve, 30));
  return { intro: humanLoopIntro, examples: humanLoopExamples };
}

export async function getUserProfile() {
  await new Promise(resolve => setTimeout(resolve, 25));
  return mockUserProfile;
} 