import { WorkflowOperation } from '@/data/workflowOperations';
import { AuditLog } from '@/data/auditLogs';
import { WorkflowMetrics } from '@/data/workflowMetrics';
import { HumanLoopExample } from '@/data/humanLoop';
import { UserProfile } from '@/data/userProfile';

export interface WorkflowOperationsResponse {
  read: WorkflowOperation[];
  create: WorkflowOperation[];
  modifyDelete: WorkflowOperation[];
  chained: WorkflowOperation[];
}

export async function fetchWorkflowOperations(): Promise<WorkflowOperationsResponse> {
  const response = await fetch('/api/workflow-operations');
  if (!response.ok) {
    throw new Error('Failed to fetch workflow operations');
  }
  return response.json();
}

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  const response = await fetch('/api/audit-logs');
  if (!response.ok) {
    throw new Error('Failed to fetch audit logs');
  }
  return response.json();
}

export async function fetchWorkflowMetrics(): Promise<WorkflowMetrics> {
  const response = await fetch('/api/workflow-metrics');
  if (!response.ok) {
    throw new Error('Failed to fetch workflow metrics');
  }
  return response.json();
}

export async function fetchHumanLoopData(): Promise<{ intro: string; examples: HumanLoopExample[] }> {
  const response = await fetch('/api/human-loop');
  if (!response.ok) {
    throw new Error('Failed to fetch human-in-the-loop data');
  }
  return response.json();
}

export async function fetchUserProfile(): Promise<UserProfile> {
  const response = await fetch('/api/user-profile');
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
} 