import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Settings,
  Zap,
  Target,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';

// Types for SEO tasks and automation
interface SEOTask {
  id: string;
  title: string;
  description: string;
  type: 'automated' | 'manual' | 'recurring';
  category: 'keyword_tracking' | 'content_optimization' | 'technical_audit' | 'reporting' | 'competitor_analysis';
  status: 'active' | 'paused' | 'completed' | 'failed';
  priority: 'high' | 'medium' | 'low';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    days?: string[];
  };
  nextRun?: string;
  lastRun?: string;
  lastResult?: string;
  progress?: number;
  createdAt: string;
  estimatedDuration: string;
  owner: string;
}

interface TaskExecution {
  id: string;
  taskId: string;
  taskTitle: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  result?: string;
  logs?: string[];
  duration?: string;
  errorMessage?: string;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'schedule' | 'event' | 'threshold';
  condition: string;
  action: string;
  isActive: boolean;
  lastTriggered?: string;
  triggerCount: number;
  createdAt: string;
}

export default function SEOTaskManagement() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock SEO tasks data
  const seoTasks: SEOTask[] = [
    {
      id: '1',
      title: 'Daily Keyword Ranking Check',
      description: 'Automatically check rankings for all tracked keywords and update dashboard',
      type: 'automated',
      category: 'keyword_tracking',
      status: 'active',
      priority: 'high',
      schedule: {
        frequency: 'daily',
        time: '06:00'
      },
      nextRun: '2024-01-21T06:00:00Z',
      lastRun: '2024-01-20T06:00:00Z',
      lastResult: 'Success: 1,247 keywords checked',
      progress: 100,
      createdAt: '2024-01-10',
      estimatedDuration: '15 minutes',
      owner: 'System'
    },
    {
      id: '2',
      title: 'Weekly Competitor Analysis',
      description: 'Analyze competitor keyword rankings and traffic patterns',
      type: 'recurring',
      category: 'competitor_analysis',
      status: 'active',
      priority: 'medium',
      schedule: {
        frequency: 'weekly',
        time: '09:00',
        days: ['monday']
      },
      nextRun: '2024-01-22T09:00:00Z',
      lastRun: '2024-01-15T09:00:00Z',
      lastResult: 'Success: 3 competitors analyzed',
      progress: 100,
      createdAt: '2024-01-05',
      estimatedDuration: '45 minutes',
      owner: 'SEO Team'
    },
    {
      id: '3',
      title: 'Technical SEO Audit',
      description: 'Run comprehensive technical SEO audit on all pages',
      type: 'manual',
      category: 'technical_audit',
      status: 'completed',
      priority: 'high',
      lastRun: '2024-01-18T14:30:00Z',
      lastResult: 'Success: 156 issues found',
      progress: 100,
      createdAt: '2024-01-18',
      estimatedDuration: '2 hours',
      owner: 'John Doe'
    },
    {
      id: '4',
      title: 'Monthly SEO Report Generation',
      description: 'Generate comprehensive SEO performance report for stakeholders',
      type: 'automated',
      category: 'reporting',
      status: 'active',
      priority: 'medium',
      schedule: {
        frequency: 'monthly',
        time: '08:00'
      },
      nextRun: '2024-02-01T08:00:00Z',
      lastRun: '2024-01-01T08:00:00Z',
      lastResult: 'Success: Report generated and sent',
      progress: 100,
      createdAt: '2023-12-15',
      estimatedDuration: '30 minutes',
      owner: 'System'
    },
    {
      id: '5',
      title: 'Content Optimization Review',
      description: 'Review and optimize meta tags for new car listings',
      type: 'manual',
      category: 'content_optimization',
      status: 'paused',
      priority: 'low',
      progress: 65,
      createdAt: '2024-01-19',
      estimatedDuration: '3 hours',
      owner: 'Jane Smith'
    }
  ];

  // Mock task executions
  const taskExecutions: TaskExecution[] = [
    {
      id: '1',
      taskId: '1',
      taskTitle: 'Daily Keyword Ranking Check',
      startTime: '2024-01-20T06:00:00Z',
      endTime: '2024-01-20T06:15:00Z',
      status: 'completed',
      result: 'Successfully checked 1,247 keywords. 45 improved rankings, 12 declined.',
      duration: '15 minutes',
      logs: [
        '06:00:00 - Starting keyword ranking check',
        '06:02:30 - Fetched data for BMW keywords (245 keywords)',
        '06:05:15 - Fetched data for Mercedes keywords (198 keywords)',
        '06:12:45 - Processing completed',
        '06:15:00 - Task completed successfully'
      ]
    },
    {
      id: '2',
      taskId: '2',
      taskTitle: 'Weekly Competitor Analysis',
      startTime: '2024-01-20T14:00:00Z',
      status: 'running',
      logs: [
        '14:00:00 - Starting competitor analysis',
        '14:05:30 - Analyzing AutoTrader.mk',
        '14:15:45 - Analyzing Cars.mk',
        '14:25:12 - Processing keyword overlaps'
      ]
    },
    {
      id: '3',
      taskId: '4',
      taskTitle: 'Monthly SEO Report Generation',
      startTime: '2024-01-19T10:30:00Z',
      endTime: '2024-01-19T10:35:00Z',
      status: 'failed',
      errorMessage: 'Failed to connect to analytics API',
      duration: '5 minutes'
    }
  ];

  // Mock automation rules
  const automationRules: AutomationRule[] = [
    {
      id: '1',
      name: 'Auto-fix broken redirects',
      trigger: 'threshold',
      condition: 'When 404 errors > 10 per day',
      action: 'Create redirect rules automatically',
      isActive: true,
      lastTriggered: '2024-01-18T16:30:00Z',
      triggerCount: 3,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'Keyword ranking alerts',
      trigger: 'event',
      condition: 'When keyword drops > 5 positions',
      action: 'Send notification to SEO team',
      isActive: true,
      lastTriggered: '2024-01-19T08:15:00Z',
      triggerCount: 12,
      createdAt: '2024-01-08'
    },
    {
      id: '3',
      name: 'Weekly sitemap update',
      trigger: 'schedule',
      condition: 'Every Sunday at 2:00 AM',
      action: 'Regenerate and submit sitemaps',
      isActive: true,
      lastTriggered: '2024-01-14T02:00:00Z',
      triggerCount: 8,
      createdAt: '2023-12-01'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-700"><Play className="h-3 w-3 mr-1" />Active</Badge>;
      case 'paused':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700"><Pause className="h-3 w-3 mr-1" />Paused</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-blue-100 text-blue-700"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      case 'running':
        return <Badge variant="outline" className="border-blue-500 text-blue-700"><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Running</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'keyword_tracking':
        return <Target className="h-4 w-4" />;
      case 'competitor_analysis':
        return <TrendingUp className="h-4 w-4" />;
      case 'technical_audit':
        return <Settings className="h-4 w-4" />;
      case 'reporting':
        return <Eye className="h-4 w-4" />;
      case 'content_optimization':
        return <Edit className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const filteredTasks = seoTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const runTask = (taskId: string) => {
    console.log(`Running task: ${taskId}`);
  };

  const pauseTask = (taskId: string) => {
    console.log(`Pausing task: ${taskId}`);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="history">Execution History</TabsTrigger>
            <TabsTrigger value="automation">Automation Rules</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Dialog open={isCreateTaskModalOpen} onOpenChange={setIsCreateTaskModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create SEO Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Task Title</Label>
                    <Input placeholder="Enter task title" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea placeholder="Describe what this task does" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="keyword_tracking">Keyword Tracking</SelectItem>
                        <SelectItem value="competitor_analysis">Competitor Analysis</SelectItem>
                        <SelectItem value="technical_audit">Technical Audit</SelectItem>
                        <SelectItem value="reporting">Reporting</SelectItem>
                        <SelectItem value="content_optimization">Content Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select task type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automated">Automated</SelectItem>
                        <SelectItem value="recurring">Recurring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsCreateTaskModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateTaskModalOpen(false)}>
                      Create Task
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>SEO Tasks</CardTitle>
                  <CardDescription>Manage and monitor your SEO tasks and automation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search tasks..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10" 
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="border">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(task.category)}
                            <h4 className="font-semibold">{task.title}</h4>
                            {getStatusBadge(task.status)}
                            {getPriorityBadge(task.priority)}
                            <Badge variant="outline" className="text-xs">
                              {task.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                          
                          {task.progress !== undefined && task.progress < 100 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="w-full h-2" />
                            </div>
                          )}

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            {task.schedule && (
                              <div>
                                <span className="text-muted-foreground">Schedule:</span>
                                <span className="ml-2 font-medium">{task.schedule.frequency} at {task.schedule.time}</span>
                              </div>
                            )}
                            {task.nextRun && (
                              <div>
                                <span className="text-muted-foreground">Next Run:</span>
                                <span className="ml-2 font-medium">{new Date(task.nextRun).toLocaleDateString()}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-muted-foreground">Duration:</span>
                              <span className="ml-2 font-medium">{task.estimatedDuration}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Owner:</span>
                              <span className="ml-2 font-medium">{task.owner}</span>
                            </div>
                          </div>

                          {task.lastResult && (
                            <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                              <span className="font-medium">Last Result: </span>
                              {task.lastResult}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          {task.status === 'active' || task.status === 'paused' ? (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => runTask(task.id)}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => pauseTask(task.id)}
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Execution History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Execution History</CardTitle>
              <CardDescription>Monitor task execution results and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskExecutions.map((execution) => (
                    <TableRow key={execution.id}>
                      <TableCell className="font-medium">{execution.taskTitle}</TableCell>
                      <TableCell>{new Date(execution.startTime).toLocaleString()}</TableCell>
                      <TableCell>{execution.duration || 'Running...'}</TableCell>
                      <TableCell>{getStatusBadge(execution.status)}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {execution.result || execution.errorMessage || 'In progress...'}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Task Execution Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Task: {execution.taskTitle}</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Started: {new Date(execution.startTime).toLocaleString()}
                                  {execution.endTime && ` | Ended: ${new Date(execution.endTime).toLocaleString()}`}
                                </p>
                              </div>
                              {execution.result && (
                                <div>
                                  <Label>Result</Label>
                                  <p className="text-sm mt-1">{execution.result}</p>
                                </div>
                              )}
                              {execution.errorMessage && (
                                <div>
                                  <Label>Error</Label>
                                  <p className="text-sm text-red-600 mt-1">{execution.errorMessage}</p>
                                </div>
                              )}
                              {execution.logs && (
                                <div>
                                  <Label>Logs</Label>
                                  <div className="bg-black text-green-400 p-3 rounded font-mono text-xs mt-1 max-h-60 overflow-y-auto">
                                    {execution.logs.map((log, index) => (
                                      <div key={index}>{log}</div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Rules Tab */}
        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Automation Rules</CardTitle>
                  <CardDescription>Configure automated responses to SEO events and conditions</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <Card key={rule.id} className="border">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{rule.name}</h4>
                            {rule.isActive ? (
                              <Badge variant="default" className="bg-green-100 text-green-700">Active</Badge>
                            ) : (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {rule.trigger}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Condition:</span>
                              <span className="ml-2">{rule.condition}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Action:</span>
                              <span className="ml-2">{rule.action}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Triggers:</span>
                              <span className="ml-2 font-medium">{rule.triggerCount}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Triggered:</span>
                              <span className="ml-2 font-medium">
                                {rule.lastTriggered ? new Date(rule.lastTriggered).toLocaleDateString() : 'Never'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Switch checked={rule.isActive} />
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Schedule Overview</CardTitle>
              <CardDescription>View upcoming automated tasks and their schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoTasks
                  .filter(task => task.nextRun)
                  .sort((a, b) => new Date(a.nextRun!).getTime() - new Date(b.nextRun!).getTime())
                  .map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(task.category)}
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Next run: {new Date(task.nextRun!).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(task.status)}
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.schedule?.frequency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}