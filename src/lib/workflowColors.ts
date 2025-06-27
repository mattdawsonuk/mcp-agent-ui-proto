import { LucideIcon, Eye, Plus, AlertTriangle, Zap } from 'lucide-react';

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
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-700/50',
      text: 'text-green-800 dark:text-green-200',
      icon: 'text-green-600 dark:text-green-400',
      buttonBg: 'bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800',
      buttonHover: 'hover:bg-green-100 dark:hover:bg-green-800',
      buttonText: 'text-green-800 dark:text-green-200',
      userBubble: 'bg-green-600 dark:bg-green-900',
      userText: 'text-white',
      userTimestamp: 'text-green-100 dark:text-green-300'
    }
  },
  create: {
    icon: Plus,
    title: 'Creation Operations',
    description: 'These operations create new records and require user confirmation before proceeding.',
    colorScheme: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-200 dark:border-blue-700/50',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-600 dark:text-blue-400',
      buttonBg: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800',
      buttonHover: 'hover:bg-blue-100 dark:hover:bg-blue-800',
      buttonText: 'text-blue-800 dark:text-blue-200',
      userBubble: 'bg-blue-600 dark:bg-blue-900',
      userText: 'text-white',
      userTimestamp: 'text-blue-100 dark:text-blue-300'
    }
  },
  modify: {
    icon: AlertTriangle,
    title: 'Modification & Deletion Operations',
    description: 'These operations modify or delete existing data. All require confirmation and some may be irreversible.',
    colorScheme: {
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      border: 'border-amber-200 dark:border-amber-700/50',
      text: 'text-amber-800 dark:text-amber-200',
      icon: 'text-amber-600 dark:text-amber-400',
      buttonBg: 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-900 dark:hover:bg-amber-800',
      buttonHover: 'hover:bg-amber-100 dark:hover:bg-amber-800',
      buttonText: 'text-amber-800 dark:text-amber-200',
      userBubble: 'bg-amber-600 dark:bg-amber-900',
      userText: 'text-white',
      userTimestamp: 'text-amber-100 dark:text-amber-300'
    }
  },
  chained: {
    icon: Zap,
    title: 'Chained Workflows',
    description: 'Multi-step workflows that execute a series of operations in sequence.',
    colorScheme: {
      bg: 'bg-purple-50 dark:bg-purple-900/30',
      border: 'border-purple-200 dark:border-purple-700/50',
      text: 'text-purple-800 dark:text-purple-200',
      icon: 'text-purple-600 dark:text-purple-400',
      buttonBg: 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800',
      buttonHover: 'hover:bg-purple-100 dark:hover:bg-purple-800',
      buttonText: 'text-purple-800 dark:text-purple-200',
      userBubble: 'bg-purple-600 dark:bg-purple-900',
      userText: 'text-white',
      userTimestamp: 'text-purple-100 dark:text-purple-300'
    }
  }
};

export const getWorkflowConfig = (type: string): WorkflowTypeConfig => {
  return workflowTypeConfigs[type] || {
    icon: Eye,
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
      userTimestamp: 'text-gray-100 dark:text-gray-300'
    }
  };
};

export const getWorkflowColorScheme = (type: string): WorkflowColorScheme => {
  return getWorkflowConfig(type).colorScheme;
}; 