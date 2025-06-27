import { LucideIcon, Eye, FileText, PlusCircle, Edit3, Workflow } from 'lucide-react';

export interface WorkflowColorScheme {
  bg: string;
  border: string;
  text: string;
  icon: string;
  buttonBg: string;
  buttonHover: string;
  buttonText: string;
  userBubble: string;
  userText: string;
  userTimestamp: string;
  ring: string;
}

export interface WorkflowTypeConfig {
  icon: LucideIcon;
  title: string;
  description: string;
  colorScheme: WorkflowColorScheme;
}

export const workflowTypeConfigs: Record<string, WorkflowTypeConfig> = {
  read: {
    icon: Eye,
    title: 'Read Operations',
    description: 'These operations retrieve data and execute immediately without requiring user confirmation.',
    colorScheme: {
      bg: 'bg-slate-200 dark:bg-slate-700',
      border: 'border-slate-200 dark:border-slate-600/50',
      text: 'text-slate-800 dark:text-slate-200',
      icon: 'text-slate-600 dark:text-slate-400',
      buttonBg: 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600',
      buttonHover: 'hover:bg-slate-300 dark:hover:bg-slate-600',
      buttonText: 'text-slate-800 dark:text-slate-200',
      userBubble: 'bg-slate-600 dark:bg-slate-800',
      userText: 'text-white',
      userTimestamp: 'text-slate-100 dark:text-slate-300',
      ring: 'focus:ring-slate-500',
    }
  },
  create: {
    icon: PlusCircle,
    title: 'Creation Operations',
    description: 'These operations create new records and require user confirmation before proceeding.',
    colorScheme: {
      bg: 'bg-slate-200 dark:bg-slate-700',
      border: 'border-slate-200 dark:border-slate-600/50',
      text: 'text-slate-800 dark:text-slate-200',
      icon: 'text-slate-600 dark:text-slate-400',
      buttonBg: 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600',
      buttonHover: 'hover:bg-slate-300 dark:hover:bg-slate-600',
      buttonText: 'text-slate-800 dark:text-slate-200',
      userBubble: 'bg-slate-600 dark:bg-slate-800',
      userText: 'text-white',
      userTimestamp: 'text-slate-100 dark:text-slate-300',
      ring: 'focus:ring-slate-500',
    }
  },
  modify: {
    icon: Edit3,
    title: 'Modification & Deletion Operations',
    description: 'These operations modify or delete existing data. All require confirmation and some may be irreversible.',
    colorScheme: {
      bg: 'bg-slate-200 dark:bg-slate-700',
      border: 'border-slate-200 dark:border-slate-600/50',
      text: 'text-slate-800 dark:text-slate-200',
      icon: 'text-slate-600 dark:text-slate-400',
      buttonBg: 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600',
      buttonHover: 'hover:bg-slate-300 dark:hover:bg-slate-600',
      buttonText: 'text-slate-800 dark:text-slate-200',
      userBubble: 'bg-slate-600 dark:bg-slate-800',
      userText: 'text-white',
      userTimestamp: 'text-slate-100 dark:text-slate-300',
      ring: 'focus:ring-slate-500',
    }
  },
  chained: {
    icon: Workflow,
    title: 'Chained Workflows',
    description: 'Multi-step workflows that execute a series of operations in sequence.',
    colorScheme: {
      bg: 'bg-purple-200 dark:bg-purple-800',
      border: 'border-purple-200 dark:border-purple-700/50',
      text: 'text-purple-800 dark:text-purple-200',
      icon: 'text-purple-600 dark:text-purple-400',
      buttonBg: 'bg-purple-200 hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-700',
      buttonHover: 'hover:bg-purple-300 dark:hover:bg-purple-700',
      buttonText: 'text-purple-800 dark:text-purple-100',
      userBubble: 'bg-purple-600 dark:bg-purple-900',
      userText: 'text-white',
      userTimestamp: 'text-purple-100 dark:text-purple-300',
      ring: 'focus:ring-purple-500',
    }
  }
};

export const getWorkflowConfig = (type: string): WorkflowTypeConfig => {
  return workflowTypeConfigs[type] || {
    icon: FileText,
    title: 'Unknown Operation',
    description: 'Unknown operation type.',
    colorScheme: {
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      border: 'border-gray-200 dark:border-gray-600/50',
      text: 'text-gray-800 dark:text-gray-200',
      icon: 'text-gray-600 dark:text-gray-400',
      buttonBg: 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700',
      buttonHover: 'hover:bg-gray-100 dark:hover:bg-gray-700',
      buttonText: 'text-gray-800 dark:text-gray-200',
      userBubble: 'bg-gray-600 dark:bg-gray-800',
      userText: 'text-white',
      userTimestamp: 'text-gray-100 dark:text-gray-300',
      ring: 'focus:ring-gray-500',
    }
  };
};

export const getWorkflowColorScheme = (type: string): WorkflowColorScheme => {
  return getWorkflowConfig(type).colorScheme;
}; 