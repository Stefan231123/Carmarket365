import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Upload,
  Target,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Types for keyword data
interface KeywordData {
  id: string;
  keyword: string;
  ranking: number;
  previousRanking: number;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  url: string;
  targetPage: string;
  category: 'brand' | 'model' | 'location' | 'general';
  lastUpdated: string;
  rankingHistory: Array<{ date: string; ranking: number; }>;
}

interface KeywordGroup {
  category: string;
  keywords: KeywordData[];
  averageRanking: number;
  totalVolume: number;
}

export default function KeywordManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('ranking');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordData | null>(null);

  // Mock keyword data with automotive focus
  const keywords: KeywordData[] = [
    {
      id: '1',
      keyword: 'used cars Macedonia',
      ranking: 3,
      previousRanking: 5,
      searchVolume: 2400,
      difficulty: 65,
      cpc: 1.25,
      url: '/cars',
      targetPage: 'Car Browse Page',
      category: 'location',
      lastUpdated: '2024-01-20',
      rankingHistory: [
        { date: '2024-01-01', ranking: 8 },
        { date: '2024-01-08', ranking: 7 },
        { date: '2024-01-15', ranking: 5 },
        { date: '2024-01-20', ranking: 3 }
      ]
    },
    {
      id: '2',
      keyword: 'BMW X5 for sale',
      ranking: 7,
      previousRanking: 8,
      searchVolume: 1800,
      difficulty: 72,
      cpc: 2.15,
      url: '/cars?make=bmw&model=x5',
      targetPage: 'BMW X5 Listings',
      category: 'model',
      lastUpdated: '2024-01-20',
      rankingHistory: [
        { date: '2024-01-01', ranking: 12 },
        { date: '2024-01-08', ranking: 10 },
        { date: '2024-01-15', ranking: 8 },
        { date: '2024-01-20', ranking: 7 }
      ]
    },
    {
      id: '3',
      keyword: 'car dealers Skopje',
      ranking: 12,
      previousRanking: 15,
      searchVolume: 950,
      difficulty: 58,
      cpc: 1.80,
      url: '/registered-dealers',
      targetPage: 'Dealer Directory',
      category: 'location',
      lastUpdated: '2024-01-20',
      rankingHistory: [
        { date: '2024-01-01', ranking: 18 },
        { date: '2024-01-08', ranking: 16 },
        { date: '2024-01-15', ranking: 15 },
        { date: '2024-01-20', ranking: 12 }
      ]
    },
    {
      id: '4',
      keyword: 'Audi A4 price Macedonia',
      ranking: 15,
      previousRanking: 12,
      searchVolume: 720,
      difficulty: 68,
      cpc: 1.95,
      url: '/cars?make=audi&model=a4',
      targetPage: 'Audi A4 Listings',
      category: 'model',
      lastUpdated: '2024-01-20',
      rankingHistory: [
        { date: '2024-01-01', ranking: 10 },
        { date: '2024-01-08', ranking: 11 },
        { date: '2024-01-15', ranking: 12 },
        { date: '2024-01-20', ranking: 15 }
      ]
    },
    {
      id: '5',
      keyword: 'Mercedes-Benz',
      ranking: 5,
      previousRanking: 5,
      searchVolume: 3200,
      difficulty: 85,
      cpc: 2.45,
      url: '/cars?make=mercedes-benz',
      targetPage: 'Mercedes Listings',
      category: 'brand',
      lastUpdated: '2024-01-20',
      rankingHistory: [
        { date: '2024-01-01', ranking: 6 },
        { date: '2024-01-08', ranking: 5 },
        { date: '2024-01-15', ranking: 5 },
        { date: '2024-01-20', ranking: 5 }
      ]
    },
    {
      id: '6',
      keyword: 'car financing Macedonia',
      ranking: 8,
      previousRanking: 10,
      searchVolume: 1100,
      difficulty: 55,
      cpc: 3.20,
      url: '/financing',
      targetPage: 'Financing Page',
      category: 'general',
      lastUpdated: '2024-01-20',
      rankingHistory: [
        { date: '2024-01-01', ranking: 14 },
        { date: '2024-01-08', ranking: 12 },
        { date: '2024-01-15', ranking: 10 },
        { date: '2024-01-20', ranking: 8 }
      ]
    }
  ];

  const filteredKeywords = keywords.filter(keyword => {
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         keyword.targetPage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || keyword.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedKeywords = [...filteredKeywords].sort((a, b) => {
    switch (sortBy) {
      case 'ranking':
        return a.ranking - b.ranking;
      case 'volume':
        return b.searchVolume - a.searchVolume;
      case 'difficulty':
        return b.difficulty - a.difficulty;
      case 'change':
        return (a.previousRanking - a.ranking) - (b.previousRanking - b.ranking);
      default:
        return 0;
    }
  });

  const getRankingChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) return { direction: 'up', value: change, color: 'text-green-600', icon: TrendingUp };
    if (change < 0) return { direction: 'down', value: Math.abs(change), color: 'text-red-600', icon: TrendingDown };
    return { direction: 'same', value: 0, color: 'text-gray-500', icon: Minus };
  };

  const getDifficultyBadge = (difficulty: number) => {
    if (difficulty >= 80) return <Badge variant="destructive">Very Hard</Badge>;
    if (difficulty >= 60) return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Hard</Badge>;
    if (difficulty >= 40) return <Badge variant="outline">Medium</Badge>;
    return <Badge variant="default">Easy</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      brand: 'bg-blue-100 text-blue-700',
      model: 'bg-green-100 text-green-700',
      location: 'bg-purple-100 text-purple-700',
      general: 'bg-orange-100 text-orange-700'
    };
    
    return (
      <Badge variant="secondary" className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700'}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };

  // Group keywords by category for summary
  const keywordGroups = keywords.reduce((groups: KeywordGroup[], keyword) => {
    const existingGroup = groups.find(g => g.category === keyword.category);
    if (existingGroup) {
      existingGroup.keywords.push(keyword);
      existingGroup.totalVolume += keyword.searchVolume;
    } else {
      groups.push({
        category: keyword.category,
        keywords: [keyword],
        averageRanking: 0,
        totalVolume: keyword.searchVolume
      });
    }
    return groups;
  }, []);

  // Calculate average rankings
  keywordGroups.forEach(group => {
    group.averageRanking = group.keywords.reduce((sum, k) => sum + k.ranking, 0) / group.keywords.length;
  });

  const chartConfig = {
    ranking: { label: "Position", color: "#3b82f6" },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Keywords</p>
                <p className="text-2xl font-bold">{keywords.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Position</p>
                <p className="text-2xl font-bold">
                  {Math.round(keywords.reduce((sum, k) => sum + k.ranking, 0) / keywords.length)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">
                  {(keywords.reduce((sum, k) => sum + k.searchVolume, 0) / 1000).toFixed(1)}K
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Improved</p>
                <p className="text-2xl font-bold text-green-600">
                  {keywords.filter(k => k.ranking < k.previousRanking).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
            <CardDescription>Average ranking and search volume by keyword category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keywordGroups.map((group) => (
                <div key={group.category} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getCategoryBadge(group.category)}
                    <div>
                      <p className="font-medium">{group.keywords.length} keywords</p>
                      <p className="text-sm text-muted-foreground">
                        Avg. position: {Math.round(group.averageRanking)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{group.totalVolume.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">monthly volume</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Ranking Trends</CardTitle>
            <CardDescription>Position changes over time</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedKeyword ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">{selectedKeyword.keyword}</h4>
                  <Button variant="outline" size="sm" onClick={() => setSelectedKeyword(null)}>
                    Show All
                  </Button>
                </div>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedKeyword.rankingHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 2', 'dataMax + 2']} reversed />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="ranking" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p>Click on a keyword to view its ranking trends</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>Monitor and manage your keyword performance</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Keywords
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Keywords</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="keywords">Keywords (one per line)</Label>
                      <Textarea 
                        id="keywords"
                        placeholder="used cars Skopje&#10;BMW for sale&#10;car dealership Macedonia"
                        className="min-h-[120px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="target-url">Target URL (optional)</Label>
                      <Input id="target-url" placeholder="/cars" />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brand">Brand</SelectItem>
                          <SelectItem value="model">Model</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddDialogOpen(false)}>
                        Add Keywords
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search keywords..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10" 
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="model">Model</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ranking">Position</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="change">Change</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>CPC</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Target Page</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedKeywords.map((keyword) => {
                const change = getRankingChange(keyword.ranking, keyword.previousRanking);
                const ChangeIcon = change.icon;
                
                return (
                  <TableRow 
                    key={keyword.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedKeyword(keyword)}
                  >
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{keyword.keyword}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">#{keyword.ranking}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${change.color}`}>
                        <ChangeIcon className="h-4 w-4" />
                        {change.value > 0 && <span>{change.value}</span>}
                      </div>
                    </TableCell>
                    <TableCell>{keyword.searchVolume.toLocaleString()}</TableCell>
                    <TableCell>{getDifficultyBadge(keyword.difficulty)}</TableCell>
                    <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
                    <TableCell>{getCategoryBadge(keyword.category)}</TableCell>
                    <TableCell className="max-w-xs truncate">{keyword.targetPage}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={(e) => {e.stopPropagation(); setSelectedKeyword(keyword);}}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}