import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Search,
  BarChart3,
  Target,
  Globe,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Types for competitor data
interface CompetitorData {
  id: string;
  name: string;
  domain: string;
  organicKeywords: number;
  organicTraffic: number;
  averageRanking: number;
  backlinks: number;
  lastAnalyzed: string;
  change30d: {
    keywords: number;
    traffic: number;
    ranking: number;
  };
  topKeywords: Array<{
    keyword: string;
    ranking: number;
    volume: number;
    ourRanking?: number;
  }>;
  trafficTrend: Array<{
    month: string;
    traffic: number;
  }>;
}

interface KeywordGap {
  keyword: string;
  competitorRanking: number;
  ourRanking?: number;
  volume: number;
  difficulty: number;
  opportunity: 'high' | 'medium' | 'low';
}

export default function CompetitorAnalysis() {
  const [isAddCompetitorOpen, setIsAddCompetitorOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock competitor data
  const competitors: CompetitorData[] = [
    {
      id: '1',
      name: 'AutoTrader Macedonia',
      domain: 'autotrader.mk',
      organicKeywords: 15420,
      organicTraffic: 85600,
      averageRanking: 12.5,
      backlinks: 2840,
      lastAnalyzed: '2024-01-20',
      change30d: {
        keywords: 120,
        traffic: 5400,
        ranking: -0.8
      },
      topKeywords: [
        { keyword: 'used cars Macedonia', ranking: 1, volume: 2400, ourRanking: 3 },
        { keyword: 'car dealers Skopje', ranking: 2, volume: 950, ourRanking: 12 },
        { keyword: 'BMW for sale Macedonia', ranking: 4, volume: 1200, ourRanking: 8 },
        { keyword: 'Mercedes Macedonia', ranking: 3, volume: 800, ourRanking: 5 }
      ],
      trafficTrend: [
        { month: 'Jan', traffic: 78000 },
        { month: 'Feb', traffic: 82000 },
        { month: 'Mar', traffic: 84500 },
        { month: 'Apr', traffic: 81200 },
        { month: 'May', traffic: 85600 },
        { month: 'Jun', traffic: 85600 }
      ]
    },
    {
      id: '2',
      name: 'Cars.mk',
      domain: 'cars.mk',
      organicKeywords: 8950,
      organicTraffic: 42300,
      averageRanking: 18.2,
      backlinks: 1650,
      lastAnalyzed: '2024-01-20',
      change30d: {
        keywords: -45,
        traffic: -2100,
        ranking: 1.2
      },
      topKeywords: [
        { keyword: 'Audi A4 Macedonia', ranking: 2, volume: 720, ourRanking: 15 },
        { keyword: 'car financing Macedonia', ranking: 5, volume: 1100, ourRanking: 8 },
        { keyword: 'Volkswagen Macedonia', ranking: 6, volume: 650, ourRanking: 11 },
        { keyword: 'used SUV Macedonia', ranking: 7, volume: 890, ourRanking: 9 }
      ],
      trafficTrend: [
        { month: 'Jan', traffic: 44400 },
        { month: 'Feb', traffic: 43800 },
        { month: 'Mar', traffic: 45200 },
        { month: 'Apr', traffic: 44100 },
        { month: 'May', traffic: 42800 },
        { month: 'Jun', traffic: 42300 }
      ]
    },
    {
      id: '3',
      name: 'MotorMK',
      domain: 'motor.mk',
      organicKeywords: 5670,
      organicTraffic: 28900,
      averageRanking: 22.8,
      backlinks: 890,
      lastAnalyzed: '2024-01-19',
      change30d: {
        keywords: 78,
        traffic: 1800,
        ranking: -1.5
      },
      topKeywords: [
        { keyword: 'Toyota Macedonia', ranking: 3, volume: 580, ourRanking: 7 },
        { keyword: 'car parts Macedonia', ranking: 1, volume: 450 },
        { keyword: 'auto service Skopje', ranking: 2, volume: 320 },
        { keyword: 'car insurance Macedonia', ranking: 4, volume: 280 }
      ],
      trafficTrend: [
        { month: 'Jan', traffic: 26500 },
        { month: 'Feb', traffic: 27200 },
        { month: 'Mar', traffic: 28100 },
        { month: 'Apr', traffic: 27800 },
        { month: 'May', traffic: 28500 },
        { month: 'Jun', traffic: 28900 }
      ]
    }
  ];

  // Mock keyword gaps
  const keywordGaps: KeywordGap[] = [
    {
      keyword: 'used cars Macedonia',
      competitorRanking: 1,
      ourRanking: 3,
      volume: 2400,
      difficulty: 65,
      opportunity: 'high'
    },
    {
      keyword: 'car dealers Skopje',
      competitorRanking: 2,
      ourRanking: 12,
      volume: 950,
      difficulty: 58,
      opportunity: 'high'
    },
    {
      keyword: 'Audi A4 Macedonia',
      competitorRanking: 2,
      ourRanking: 15,
      volume: 720,
      difficulty: 68,
      opportunity: 'medium'
    },
    {
      keyword: 'luxury cars Macedonia',
      competitorRanking: 5,
      ourRanking: undefined,
      volume: 480,
      difficulty: 72,
      opportunity: 'medium'
    },
    {
      keyword: 'hybrid cars Macedonia',
      competitorRanking: 3,
      ourRanking: undefined,
      volume: 340,
      difficulty: 55,
      opportunity: 'high'
    }
  ];

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return {
        icon: ArrowUpRight,
        color: 'text-green-600',
        prefix: '+'
      };
    } else if (change < 0) {
      return {
        icon: ArrowDownRight,
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

  const getOpportunityBadge = (opportunity: string) => {
    switch (opportunity) {
      case 'high':
        return <Badge variant="destructive">High Opportunity</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{opportunity}</Badge>;
    }
  };

  // Create comparison chart data
  const comparisonData = competitors.map(comp => ({
    name: comp.name.split(' ')[0], // Shortened name for chart
    keywords: comp.organicKeywords,
    traffic: comp.organicTraffic,
    avgRanking: comp.averageRanking,
    backlinks: comp.backlinks
  }));

  // Add our data for comparison
  comparisonData.push({
    name: 'CarMarket365',
    keywords: 1247,
    traffic: 18900,
    avgRanking: 15.2,
    backlinks: 456
  });

  const radarData = [
    { subject: 'Keywords', CarMarket365: 1247, AutoTrader: 15420, Cars: 8950 },
    { subject: 'Traffic', CarMarket365: 18900, AutoTrader: 85600, Cars: 42300 },
    { subject: 'Avg Ranking', CarMarket365: 15.2, AutoTrader: 12.5, Cars: 18.2 },
    { subject: 'Backlinks', CarMarket365: 456, AutoTrader: 2840, Cars: 1650 },
  ];

  const chartConfig = {
    keywords: { label: "Keywords", color: "#3b82f6" },
    traffic: { label: "Traffic", color: "#10b981" },
    backlinks: { label: "Backlinks", color: "#f59e0b" },
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keyword Gaps</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Dialog open={isAddCompetitorOpen} onOpenChange={setIsAddCompetitorOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Competitor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Competitor</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Competitor Name</Label>
                    <Input placeholder="e.g., AutoTrader Macedonia" />
                  </div>
                  <div>
                    <Label>Domain</Label>
                    <Input placeholder="e.g., autotrader.mk" />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsAddCompetitorOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddCompetitorOpen(false)}>
                      Add Competitor
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Competitor Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitors.map((competitor) => {
              const keywordsChange = getChangeIndicator(competitor.change30d.keywords);
              const trafficChange = getChangeIndicator(competitor.change30d.traffic);
              const KeywordsIcon = keywordsChange.icon;
              const TrafficIcon = trafficChange.icon;

              return (
                <Card key={competitor.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedCompetitor(competitor)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{competitor.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{competitor.domain}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Organic Keywords</span>
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{competitor.organicKeywords.toLocaleString()}</span>
                        <KeywordsIcon className={`h-3 w-3 ${keywordsChange.color}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Monthly Traffic</span>
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{competitor.organicTraffic.toLocaleString()}</span>
                        <TrafficIcon className={`h-3 w-3 ${trafficChange.color}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg. Ranking</span>
                      <span className="font-bold">#{competitor.averageRanking}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Backlinks</span>
                      <span className="font-bold">{competitor.backlinks.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Last analyzed: {competitor.lastAnalyzed}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed View Modal */}
          {selectedCompetitor && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedCompetitor.name} - Detailed Analysis</CardTitle>
                    <CardDescription>{selectedCompetitor.domain}</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedCompetitor(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Traffic Trend */}
                  <div>
                    <h4 className="font-semibold mb-3">Traffic Trend (6 months)</h4>
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedCompetitor.trafficTrend}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line 
                            type="monotone" 
                            dataKey="traffic" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  {/* Top Keywords */}
                  <div>
                    <h4 className="font-semibold mb-3">Top Ranking Keywords</h4>
                    <div className="space-y-2">
                      {selectedCompetitor.topKeywords.map((keyword, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="font-medium text-sm">{keyword.keyword}</p>
                            <p className="text-xs text-muted-foreground">Vol: {keyword.volume.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">
                              <span className="font-bold">#{keyword.ranking}</span>
                              {keyword.ourRanking && (
                                <span className="text-muted-foreground ml-2">vs #{keyword.ourRanking}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Gap Analysis</CardTitle>
              <CardDescription>Keywords where competitors rank better than us</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Competitor Position</TableHead>
                    <TableHead>Our Position</TableHead>
                    <TableHead>Monthly Volume</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywordGaps.map((gap, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{gap.keyword}</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="font-bold">
                          #{gap.competitorRanking}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {gap.ourRanking ? (
                          <Badge variant="outline" className="font-bold">
                            #{gap.ourRanking}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not ranking</Badge>
                        )}
                      </TableCell>
                      <TableCell>{gap.volume.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={gap.difficulty > 70 ? 'destructive' : gap.difficulty > 50 ? 'outline' : 'default'}>
                          {gap.difficulty}%
                        </Badge>
                      </TableCell>
                      <TableCell>{getOpportunityBadge(gap.opportunity)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Target className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>Compare key metrics across competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="keywords" fill="#3b82f6" name="Keywords" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Market Share Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Market Position</CardTitle>
                <CardDescription>Relative performance across key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Keywords Market Share</span>
                      <span className="text-sm text-muted-foreground">vs top competitors</span>
                    </div>
                    <div className="space-y-2">
                      {comparisonData.map((comp, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-20 text-sm truncate">{comp.name}</div>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${(comp.keywords / Math.max(...comparisonData.map(c => c.keywords))) * 100}%`
                              }}
                            />
                          </div>
                          <div className="w-16 text-sm text-right">{comp.keywords.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Traffic Market Share</span>
                    </div>
                    <div className="space-y-2">
                      {comparisonData.map((comp, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-20 text-sm truncate">{comp.name}</div>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width: `${(comp.traffic / Math.max(...comparisonData.map(c => c.traffic))) * 100}%`
                              }}
                            />
                          </div>
                          <div className="w-16 text-sm text-right">{comp.traffic.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}