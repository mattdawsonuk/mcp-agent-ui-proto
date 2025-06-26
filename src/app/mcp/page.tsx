"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState } from "react";

export default function MCPWorkflowInterface() {
  const [executingWorkflows, setExecutingWorkflows] = useState<Set<string>>(new Set());

  const handleExecuteWorkflow = async (workflowName: string) => {
    setExecutingWorkflows(prev => new Set(prev).add(workflowName));
    
    // Simulate workflow execution
    setTimeout(() => {
      setExecutingWorkflows(prev => {
        const newSet = new Set(prev);
        newSet.delete(workflowName);
        return newSet;
      });
      alert(`${workflowName} workflow completed successfully!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            MCP Workflow Interface
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and execute Model Context Protocol workflows
          </p>
        </div>

        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="executions">Executions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Available Workflows
                  <Badge variant="secondary">3</Badge>
                </CardTitle>
                <CardDescription>
                  Manage your MCP workflow definitions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Data Processing</CardTitle>
                      <CardDescription>Process and analyze data files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full" 
                        onClick={() => handleExecuteWorkflow("Data Processing")}
                        disabled={executingWorkflows.has("Data Processing")}
                      >
                        {executingWorkflows.has("Data Processing") ? "Executing..." : "Execute"}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">File Operations</CardTitle>
                      <CardDescription>Manage file system operations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full"
                        onClick={() => handleExecuteWorkflow("File Operations")}
                        disabled={executingWorkflows.has("File Operations")}
                      >
                        {executingWorkflows.has("File Operations") ? "Executing..." : "Execute"}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">API Integration</CardTitle>
                      <CardDescription>Connect to external APIs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full"
                        onClick={() => handleExecuteWorkflow("API Integration")}
                        disabled={executingWorkflows.has("API Integration")}
                      >
                        {executingWorkflows.has("API Integration") ? "Executing..." : "Execute"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="executions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Executions</CardTitle>
                <CardDescription>
                  View the history of workflow executions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Data Processing</h4>
                      <p className="text-sm text-gray-500">Completed 2 minutes ago</p>
                    </div>
                    <Badge variant="default">Success</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">File Operations</h4>
                      <p className="text-sm text-gray-500">Completed 1 hour ago</p>
                    </div>
                    <Badge variant="destructive">Failed</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">API Integration</h4>
                      <p className="text-sm text-gray-500">Completed 3 hours ago</p>
                    </div>
                    <Badge variant="default">Success</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interface Settings</CardTitle>
                <CardDescription>
                  Configure your MCP workflow interface preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-refresh interval</label>
                  <select className="w-full p-2 border rounded-md cursor-pointer">
                    <option>5 seconds</option>
                    <option>10 seconds</option>
                    <option>30 seconds</option>
                    <option>1 minute</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default timeout</label>
                  <input 
                    type="number" 
                    placeholder="300" 
                    className="w-full p-2 border rounded-md cursor-text"
                  />
                </div>
                
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 