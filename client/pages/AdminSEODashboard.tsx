import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  BarChart3, 
  Target, 
  FileText, 
  Shield, 
  Users, 
  Globe, 
  TrendingUp, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Settings
} from 'lucide-react';
import KeywordManagement from '../components/seo/KeywordManagement';
import MetaDataManagement from '../components/seo/MetaDataManagement';
import CompetitorAnalysis from '../components/seo/CompetitorAnalysis';
import SEOAnalytics from '../components/seo/SEOAnalytics';
import TechnicalSEO from '../components/seo/TechnicalSEO';
import SEOTaskManagement from '../components/seo/SEOTaskManagement';
import { useTranslation } from '../hooks/useTranslation';
import { AdminBreadcrumb } from '../components/AdminBreadcrumb';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Types for SEO data
interface SEOHealthScore {
  overall: number;
  technical: number;
  content: number;
  performance: number;
  mobile: number;
}

interface KeywordData {
  id: string;
  keyword: string;
  ranking: number;
  previousRanking: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  lastUpdated: string;
}

interface MetaDataItem {
  id: string;
  url: string;
  title: string;
  description: string;
  titleLength: number;
  descriptionLength: number;
  status: 'good' | 'warning' | 'error';
  type: 'car-listing' | 'category' | 'homepage' | 'other';
}

interface CompetitorData {
  id: string;
  name: string;
  domain: string;
  organicKeywords: number;
  organicTraffic: number;
  averageRanking: number;
  backlinks: number;
  lastAnalyzed: string;
}

interface SEOAuditIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: 'technical' | 'content' | 'performance' | 'mobile';
  title: string;
  description: string;
  affectedUrls: number;
  priority: 'high' | 'medium' | 'low';
  fixComplexity: 'easy' | 'medium' | 'hard';
}

export default function AdminSEODashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock SEO data
  const seoHealthScore: SEOHealthScore = {
    overall: 78,
    technical: 85,
    content: 72,
    performance: 81,
    mobile: 74
  };

  const organicTrafficData = [
    { month: 'Jan', traffic: 12500, clicks: 8200, impressions: 45000 },
    { month: 'Feb', traffic: 13800, clicks: 9100, impressions: 48500 },
    { month: 'Mar', traffic: 15200, clicks: 10300, impressions: 52000 },
    { month: 'Apr', traffic: 14100, clicks: 9800, impressions: 49800 },
    { month: 'May', traffic: 16800, clicks: 11500, impressions: 56200 },
    { month: 'Jun', traffic: 18900, clicks: 12800, impressions: 61000 }
  ];

  const keywordRankings: KeywordData[] = [
    {
      id: '1',
      keyword: 'used cars Macedonia',
      ranking: 3,
      previousRanking: 5,
      searchVolume: 2400,
      difficulty: 65,
      url: '/cars',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      keyword: 'BMW X5 for sale',
      ranking: 7,
      previousRanking: 8,
      searchVolume: 1800,
      difficulty: 72,
      url: '/cars?make=bmw&model=x5',
      lastUpdated: '2024-01-20'
    },
    {
      id: '3',
      keyword: 'car dealers Skopje',
      ranking: 12,
      previousRanking: 15,
      searchVolume: 950,
      difficulty: 58,
      url: '/registered-dealers',
      lastUpdated: '2024-01-20'
    }
  ];

  const metaDataItems: MetaDataItem[] = [
    {
      id: '1',
      url: '/cars/123',
      title: '2020 BMW X5 - Excellent Condition',
      description: 'Well-maintained BMW X5 with low mileage, premium features, and full service history.',
      titleLength: 34,
      descriptionLength: 89,
      status: 'good',
      type: 'car-listing'
    },
    {
      id: '2',
      url: '/cars',
      title: 'Used Cars for Sale in Macedonia - Best Prices & Quality Vehicles',
      description: 'Find the perfect used car in Macedonia. Browse thousands of quality vehicles from trusted dealers with competitive prices.',
      titleLength: 68,
      descriptionLength: 118,
      status: 'warning',
      type: 'category'
    }
  ];

  const competitors: CompetitorData[] = [
    {
      id: '1',
      name: 'AutoTrader MK',
      domain: 'autotrader.mk',
      organicKeywords: 15420,
      organicTraffic: 85600,
      averageRanking: 12.5,
      backlinks: 2840,
      lastAnalyzed: '2024-01-19'
    },
    {
      id: '2',
      name: 'Cars.mk',
      domain: 'cars.mk',
      organicKeywords: 8950,
      organicTraffic: 42300,
      averageRanking: 18.2,
      backlinks: 1650,
      lastAnalyzed: '2024-01-19'
    }
  ];

  const auditIssues: SEOAuditIssue[] = [
    {
      id: '1',
      type: 'error',
      category: 'technical',
      title: 'Missing Schema Markup for Car Listings',
      description: 'Car listing pages are missing structured data markup for better search visibility.',
      affectedUrls: 245,
      priority: 'high',
      fixComplexity: 'medium'
    },
    {
      id: '2',
      type: 'warning',
      category: 'content',
      title: 'Duplicate Meta Descriptions',
      description: 'Multiple pages have identical meta descriptions, affecting search result diversity.',
      affectedUrls: 18,
      priority: 'medium',
      fixComplexity: 'easy'
    },
    {
      id: '3',
      type: 'warning',
      category: 'performance',
      title: 'Large Image Files Slowing Page Load',
      description: 'Car listing images are not optimized, causing slower page load times.',
      affectedUrls: 156,
      priority: 'medium',
      fixComplexity: 'easy'
    }
  ];

  const getRankingChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) return { direction: 'up', value: change, color: 'text-green-600' };
    if (change < 0) return { direction: 'down', value: Math.abs(change), color: 'text-red-600' };
    return { direction: 'same', value: 0, color: 'text-gray-500' };
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetaStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge variant="default" className="bg-green-100 text-green-700">Good</Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

  const chartConfig = {
    traffic: { label: "Organic Traffic", color: "#3b82f6" },
    clicks: { label: "Clicks", color: "#10b981" },
    impressions: { label: "Impressions", color: "#f59e0b" },
  };

  return (
    <>
      <AdminBreadcrumb currentPage="SEO Dashboard" />
      <section className="py-8 bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                SEO Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive SEO monitoring and optimization for CarMarket365
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
          
          {/* SEO Health Score */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overall SEO Health</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-blue-600">{seoHealthScore.overall}/100</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground w-16">Technical:</span>
                        <Progress value={seoHealthScore.technical} className="w-20 h-2" />
                        <span className="text-sm font-medium">{seoHealthScore.technical}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground w-16">Content:</span>
                        <Progress value={seoHealthScore.content} className="w-20 h-2" />
                        <span className="text-sm font-medium">{seoHealthScore.content}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground w-16">Mobile:</span>
                        <Progress value={seoHealthScore.mobile} className="w-20 h-2" />
                        <span className="text-sm font-medium">{seoHealthScore.mobile}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm">3 Critical Issues</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Full Audit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1 bg-white p-1 rounded-lg">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="keywords" className="text-xs">Keywords</TabsTrigger>
            <TabsTrigger value="metadata" className="text-xs">Meta Data</TabsTrigger>
            <TabsTrigger value="audit" className="text-xs">Audit</TabsTrigger>
            <TabsTrigger value="competitors" className="text-xs">Competitors</TabsTrigger>
            <TabsTrigger value="technical" className="text-xs">Technical</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18,900</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Keyword Rankings</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">Average position: 15.2</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Indexed Pages</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,456</div>
                  <p className="text-xs text-muted-foreground">+45 new pages this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2%</div>
                  <p className="text-xs text-muted-foreground">+0.8% improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Traffic Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Organic Traffic Trends</CardTitle>
                <CardDescription>6-month overview of organic search performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={organicTrafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="traffic" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="clicks" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent SEO Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent SEO Alerts</CardTitle>
                  <CardDescription>Latest issues and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {auditIssues.slice(0, 3).map((issue) => (
                    <div key={issue.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      {issue.type === 'error' ? (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{issue.title}</p>
                        <p className="text-xs text-muted-foreground">{issue.affectedUrls} pages affected</p>
                      </div>
                      {getPriorityBadge(issue.priority)}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Keywords</CardTitle>
                  <CardDescription>Keywords with best ranking improvements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {keywordRankings.slice(0, 3).map((keyword) => {
                    const change = getRankingChange(keyword.ranking, keyword.previousRanking);
                    return (
                      <div key={keyword.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{keyword.keyword}</p>
                          <p className="text-xs text-muted-foreground">Volume: {keyword.searchVolume.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">#{keyword.ranking}</div>
                          <div className={`text-xs ${change.color}`}>
                            {change.direction === 'up' && '↗'} 
                            {change.direction === 'down' && '↘'} 
                            {change.direction === 'same' && '→'} 
                            {change.value > 0 && change.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-6">
            <KeywordManagement />
          </TabsContent>

          {/* Meta Data Tab */}
          <TabsContent value="metadata" className="space-y-6">
            <MetaDataManagement />
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>SEO Audit & Analysis</CardTitle>
                    <CardDescription>Comprehensive site audit with actionable recommendations</CardDescription>
                  </div>
                  <Button>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Run New Audit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {auditIssues.map((issue) => (
                    <Card key={issue.id} className="border-l-4 border-l-red-500 data-[type='warning']:border-l-yellow-500 data-[type='info']:border-l-blue-500" data-type={issue.type}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {issue.type === 'error' ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : issue.type === 'warning' ? (
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-blue-500" />
                              )}
                              <h4 className="font-semibold">{issue.title}</h4>
                              {getPriorityBadge(issue.priority)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{issue.affectedUrls} pages affected</span>
                              <span>Fix complexity: {issue.fixComplexity}</span>
                              <span>Category: {issue.category}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm">
                              Fix Now
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

          {/* Competitors Tab */}
          <TabsContent value="competitors" className="space-y-6">
            <CompetitorAnalysis />
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <TechnicalSEO />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <SEOAnalytics />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <SEOTaskManagement />
          </TabsContent>
        </Tabs>
      </div>
    </section>
    </>
  );
}