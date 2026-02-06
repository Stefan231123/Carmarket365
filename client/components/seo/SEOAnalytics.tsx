import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  Eye,
  Click,
  Search,
  Users,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Filter
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DatePickerWithRange } from '../ui/date-picker-with-range';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface AnalyticsData {
  organicTraffic: Array<{
    date: string;
    traffic: number;
    clicks: number;
    impressions: number;
    ctr: number;
    avgPosition: number;
  }>;
  topPages: Array<{
    url: string;
    pageTitle: string;
    clicks: number;
    impressions: number;
    ctr: number;
    avgPosition: number;
    change: number;
  }>;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    change: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    clicks: number;
    impressions: number;
    ctr: number;
  }>;
  countryBreakdown: Array<{
    country: string;
    clicks: number;
    impressions: number;
    ctr: number;
  }>;
}

export default function SEOAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    organicTraffic: [
      { date: '2024-01-01', traffic: 15200, clicks: 8200, impressions: 185000, ctr: 4.4, avgPosition: 16.2 },
      { date: '2024-01-02', traffic: 16800, clicks: 9100, impressions: 195000, ctr: 4.7, avgPosition: 15.8 },
      { date: '2024-01-03', traffic: 18200, clicks: 10300, impressions: 210000, ctr: 4.9, avgPosition: 15.1 },
      { date: '2024-01-04', traffic: 17100, clicks: 9800, impressions: 198000, ctr: 4.9, avgPosition: 14.8 },
      { date: '2024-01-05', traffic: 19800, clicks: 11500, impressions: 225000, ctr: 5.1, avgPosition: 14.2 },
      { date: '2024-01-06', traffic: 21900, clicks: 12800, impressions: 245000, ctr: 5.2, avgPosition: 13.8 },
      { date: '2024-01-07', traffic: 18900, clicks: 11200, impressions: 220000, ctr: 5.1, avgPosition: 14.0 }
    ],
    topPages: [
      {
        url: '/cars',
        pageTitle: 'Used Cars for Sale in Macedonia',
        clicks: 2450,
        impressions: 48500,
        ctr: 5.1,
        avgPosition: 8.2,
        change: 12.5
      },
      {
        url: '/cars/bmw',
        pageTitle: 'BMW Cars for Sale in Macedonia',
        clicks: 1850,
        impressions: 35200,
        ctr: 5.3,
        avgPosition: 6.8,
        change: 8.2
      },
      {
        url: '/registered-dealers',
        pageTitle: 'Registered Car Dealers Macedonia',
        clicks: 1220,
        impressions: 28800,
        ctr: 4.2,
        avgPosition: 12.1,
        change: -2.1
      },
      {
        url: '/cars/mercedes-benz',
        pageTitle: 'Mercedes-Benz Cars Macedonia',
        clicks: 980,
        impressions: 18600,
        ctr: 5.3,
        avgPosition: 7.2,
        change: 15.8
      },
      {
        url: '/financing',
        pageTitle: 'Car Financing Macedonia',
        clicks: 750,
        impressions: 22400,
        ctr: 3.3,
        avgPosition: 18.5,
        change: 22.1
      }
    ],
    topQueries: [
      {
        query: 'used cars Macedonia',
        clicks: 1850,
        impressions: 28500,
        ctr: 6.5,
        position: 3.2,
        change: 8.5
      },
      {
        query: 'BMW X5 for sale',
        clicks: 980,
        impressions: 15600,
        ctr: 6.3,
        position: 4.1,
        change: 12.2
      },
      {
        query: 'car dealers Skopje',
        clicks: 720,
        impressions: 12800,
        ctr: 5.6,
        position: 7.8,
        change: -3.2
      },
      {
        query: 'Mercedes C class Macedonia',
        clicks: 650,
        impressions: 11200,
        ctr: 5.8,
        position: 5.5,
        change: 18.9
      },
      {
        query: 'Audi A4 price',
        clicks: 580,
        impressions: 9800,
        ctr: 5.9,
        position: 6.2,
        change: -1.5
      }
    ],
    deviceBreakdown: [
      { device: 'Desktop', clicks: 7850, impressions: 145000, ctr: 5.4 },
      { device: 'Mobile', clicks: 3920, impressions: 89000, ctr: 4.4 },
      { device: 'Tablet', clicks: 430, impressions: 11000, ctr: 3.9 }
    ],
    countryBreakdown: [
      { country: 'Macedonia', clicks: 9500, impressions: 195000, ctr: 4.9 },
      { country: 'Serbia', clicks: 1200, impressions: 28500, ctr: 4.2 },
      { country: 'Montenegro', clicks: 680, impressions: 15200, ctr: 4.5 },
      { country: 'Albania', clicks: 420, impressions: 8800, ctr: 4.8 }
    ]
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return {
        icon: TrendingUp,
        color: 'text-green-600',
        prefix: '+'
      };
    } else if (change < 0) {
      return {
        icon: TrendingDown,
        color: 'text-red-600',
        prefix: ''
      };
    }
    return {
      icon: TrendingUp,
      color: 'text-gray-500',
      prefix: ''
    };
  };

  // Calculate totals from the data
  const totalClicks = analyticsData.organicTraffic.reduce((sum, day) => sum + day.clicks, 0);
  const totalImpressions = analyticsData.organicTraffic.reduce((sum, day) => sum + day.impressions, 0);
  const avgCTR = totalClicks / totalImpressions * 100;
  const avgPosition = analyticsData.organicTraffic.reduce((sum, day) => sum + day.avgPosition, 0) / analyticsData.organicTraffic.length;

  // Chart configurations
  const chartConfig = {
    clicks: { label: "Clicks", color: "#3b82f6" },
    impressions: { label: "Impressions", color: "#10b981" },
    ctr: { label: "CTR (%)", color: "#f59e0b" },
    position: { label: "Avg Position", color: "#ef4444" },
  };

  const DEVICE_COLORS = ['#3b82f6', '#10b981', '#f59e0b'];
  const COUNTRY_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">SEO Analytics & Reporting</h2>
          <p className="text-muted-foreground">Comprehensive SEO performance analysis and insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-3xl font-bold">{totalClicks.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <Click className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Impressions</p>
                <p className="text-3xl font-bold">{(totalImpressions / 1000).toFixed(0)}K</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+8.2%</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average CTR</p>
                <p className="text-3xl font-bold">{avgCTR.toFixed(1)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+0.3%</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Position</p>
                <p className="text-3xl font-bold">{avgPosition.toFixed(1)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">-1.2</span>
                </div>
              </div>
              <Search className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="queries">Queries</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Organic search performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.organicTraffic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={3} name="Clicks" />
                    <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#10b981" strokeWidth={2} name="Impressions" />
                    <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#f59e0b" strokeWidth={2} name="CTR (%)" />
                    <Line yAxisId="right" type="monotone" dataKey="avgPosition" stroke="#ef4444" strokeWidth={2} name="Avg Position" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.topPages.slice(0, 3).map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{page.pageTitle}</p>
                        <p className="text-xs text-muted-foreground truncate">{page.url}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-sm">{page.clicks} clicks</p>
                        <p className="text-xs text-muted-foreground">{page.ctr.toFixed(1)}% CTR</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Search Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.topQueries.slice(0, 3).map((query, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{query.query}</p>
                        <p className="text-xs text-muted-foreground">Position #{query.position.toFixed(1)}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-sm">{query.clicks} clicks</p>
                        <p className="text-xs text-muted-foreground">{query.ctr.toFixed(1)}% CTR</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">CTR Improvement</p>
                      <p className="text-xs text-green-600">BMW pages CTR increased by 15.8%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <TrendingDown className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Position Drop</p>
                      <p className="text-xs text-yellow-600">Dealer pages dropped 2 positions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">New Opportunities</p>
                      <p className="text-xs text-blue-600">3 new keywords in top 20</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
              <CardDescription>Pages driving the most organic traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Page</th>
                      <th className="text-right py-3 px-2">Clicks</th>
                      <th className="text-right py-3 px-2">Impressions</th>
                      <th className="text-right py-3 px-2">CTR</th>
                      <th className="text-right py-3 px-2">Avg Position</th>
                      <th className="text-right py-3 px-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topPages.map((page, index) => {
                      const change = getChangeIndicator(page.change);
                      const ChangeIcon = change.icon;
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">
                            <div className="max-w-xs">
                              <p className="font-medium text-sm truncate">{page.pageTitle}</p>
                              <p className="text-xs text-muted-foreground truncate">{page.url}</p>
                            </div>
                          </td>
                          <td className="text-right py-3 px-2 font-medium">{page.clicks.toLocaleString()}</td>
                          <td className="text-right py-3 px-2">{page.impressions.toLocaleString()}</td>
                          <td className="text-right py-3 px-2">{page.ctr.toFixed(1)}%</td>
                          <td className="text-right py-3 px-2">{page.avgPosition.toFixed(1)}</td>
                          <td className="text-right py-3 px-2">
                            <div className={`flex items-center justify-end gap-1 ${change.color}`}>
                              <ChangeIcon className="h-3 w-3" />
                              <span className="text-sm">{change.prefix}{Math.abs(page.change).toFixed(1)}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Search Queries</CardTitle>
              <CardDescription>Keywords driving organic traffic to your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Query</th>
                      <th className="text-right py-3 px-2">Clicks</th>
                      <th className="text-right py-3 px-2">Impressions</th>
                      <th className="text-right py-3 px-2">CTR</th>
                      <th className="text-right py-3 px-2">Avg Position</th>
                      <th className="text-right py-3 px-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topQueries.map((query, index) => {
                      const change = getChangeIndicator(query.change);
                      const ChangeIcon = change.icon;
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">
                            <p className="font-medium text-sm">{query.query}</p>
                          </td>
                          <td className="text-right py-3 px-2 font-medium">{query.clicks.toLocaleString()}</td>
                          <td className="text-right py-3 px-2">{query.impressions.toLocaleString()}</td>
                          <td className="text-right py-3 px-2">{query.ctr.toFixed(1)}%</td>
                          <td className="text-right py-3 px-2">{query.position.toFixed(1)}</td>
                          <td className="text-right py-3 px-2">
                            <div className={`flex items-center justify-end gap-1 ${change.color}`}>
                              <ChangeIcon className="h-3 w-3" />
                              <span className="text-sm">{change.prefix}{Math.abs(query.change).toFixed(1)}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic by Device</CardTitle>
                <CardDescription>Device breakdown of organic traffic</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        dataKey="clicks"
                        data={analyticsData.deviceBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ device, clicks }) => `${device}: ${clicks}`}
                      >
                        {analyticsData.deviceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic by Country</CardTitle>
                <CardDescription>Geographic breakdown of organic traffic</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.countryBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="clicks" fill="#3b82f6" name="Clicks" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}