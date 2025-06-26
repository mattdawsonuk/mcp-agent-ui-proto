export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  workflow: string;
  errorType: string;
  errorMessage: string | null;
  userInput: string;
  completionTime: string | null;
  validationChecks: string[];
  resolution: string;
  severity: string;
}

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'AUD-001',
    timestamp: '2025-06-26 14:23:15',
    user: 'mark.sullivan@wilmingtonplc.com',
    workflow: 'Find contact for... (customer record by email)',
    errorType: 'USER_ERROR',
    errorMessage: 'Invalid email format error - "notfound@example" is not a valid email address',
    userInput: 'notfound@example',
    completionTime: null,
    validationChecks: ['Email format validation', 'Domain validation'],
    resolution: 'User provided correct email format',
    severity: 'LOW'
  },
  {
    id: 'AUD-002',
    timestamp: '2025-06-26 14:18:42',
    user: 'sarah.jones@operations.com',
    workflow: 'Create drawdown order for customer... (pre-paid credits setup)',
    errorType: 'SYSTEM_ERROR',
    errorMessage: 'Brand validation failed - "unknown-brand" not authorized for this operation',
    userInput: 'customer@test.com, 50000, unknown-brand',
    completionTime: null,
    validationChecks: ['Brand permissions', 'Customer validation', 'Credit amount validation'],
    resolution: 'User redirected to valid brand list',
    severity: 'MEDIUM'
  },
  {
    id: 'AUD-003',
    timestamp: '2025-06-26 14:15:28',
    user: 'admin@ica.com',
    workflow: 'Create cart for customer... (draft order)',
    errorType: 'SUCCESS',
    errorMessage: null,
    userInput: 'sarah.johnson@globaltech.com, CAD, corporate-learning',
    completionTime: '2.3 seconds',
    validationChecks: ['Customer lookup', 'Brand permissions', 'Currency validation', 'Tax calculation', 'LA1 code validation'],
    resolution: 'Workflow completed successfully',
    severity: 'INFO'
  },
  {
    id: 'AUD-004',
    timestamp: '2025-06-26 14:12:17',
    user: 'operations@mercia-group.com',
    workflow: 'Apply drawdown credit to order... (use pre-paid credits)',
    errorType: 'BUSINESS_ERROR',
    errorMessage: 'Insufficient drawdown credits - Available: £2,500, Requested: £5,000',
    userInput: 'ORD-2025-12345, 5000',
    completionTime: null,
    validationChecks: ['Order validation', 'Credit balance check', 'Credit expiry validation'],
    resolution: 'User offered credit top-up options',
    severity: 'HIGH'
  },
  {
    id: 'AUD-005',
    timestamp: '2025-06-26 14:08:33',
    user: 'training@bondsolon.com',
    workflow: 'Cancel order... completely (delete entire order)',
    errorType: 'POLICY_ERROR',
    errorMessage: 'Order cannot be cancelled - status is "Shipped"',
    userInput: 'ORD-2025-98765',
    completionTime: null,
    validationChecks: ['Order status check', 'Cancellation policy validation', 'Refund eligibility'],
    resolution: 'User redirected to returns process',
    severity: 'MEDIUM'
  },
  {
    id: 'AUD-006',
    timestamp: '2025-06-26 14:05:19',
    user: 'mark.sullivan@wilmingtonplc.com',
    workflow: 'Find customer... in brand... (customer in company division)',
    errorType: 'SUCCESS',
    errorMessage: null,
    userInput: 'm.s.sullivan@hotmail.co.uk, ica',
    completionTime: '1.8 seconds',
    validationChecks: ['Email validation', 'Brand access check', 'Customer record retrieval'],
    resolution: 'Customer details retrieved successfully',
    severity: 'INFO'
  }
]; 