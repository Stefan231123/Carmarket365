import { useState } from 'react';
import { 
  Globe, 
  FileText, 
  Link, 
  Settings, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Edit,
  Eye,
  Copy,
  Trash2,
  Plus,
  Search,
  ExternalLink,
  Shield,
  Zap,
  Clock
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';

// Types for technical SEO data
interface SitemapInfo {
  id: string;
  name: string;
  url: string;
  type: 'main' | 'cars' | 'dealers' | 'news' | 'images';
  urlCount: number;
  lastGenerated: string;
  lastSubmitted: string;
  status: 'active' | 'error' | 'pending';
  fileSize: string;
  errors?: string[];
}

interface RedirectRule {
  id: string;
  source: string;
  target: string;
  statusCode: number;
  type: 'permanent' | 'temporary';
  createdAt: string;
  lastHit?: string;
  hitCount: number;
  isActive: boolean;
}

interface CrawlError {
  id: string;
  url: string;
  errorType: 'not_found' | 'server_error' | 'access_denied' | 'timeout';
  statusCode: number;
  message: string;
  firstDetected: string;
  lastDetected: string;
  occurrences: number;
  fixed: boolean;
}

interface TechnicalIssue {
  id: string;
  type: 'performance' | 'mobile' | 'structure' | 'security';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  affectedUrls: number;
  recommendation: string;
  estimatedImpact: 'high' | 'medium' | 'low';
  fixComplexity: 'easy' | 'medium' | 'hard';
}

export default function TechnicalSEO() {
  const [activeTab, setActiveTab] = useState('sitemaps');
  const [isRobotsTxtModalOpen, setIsRobotsTxtModalOpen] = useState(false);
  const [isAddRedirectModalOpen, setIsAddRedirectModalOpen] = useState(false);

  // Mock data for sitemaps
  const sitemaps: SitemapInfo[] = [
    {
      id: '1',
      name: 'Main Sitemap',
      url: '/sitemap.xml',
      type: 'main',
      urlCount: 1250,
      lastGenerated: '2024-01-20T10:00:00Z',
      lastSubmitted: '2024-01-20T10:05:00Z',
      status: 'active',
      fileSize: '85KB'
    },
    {
      id: '2',
      name: 'Car Listings Sitemap',
      url: '/sitemap-cars.xml',
      type: 'cars',
      urlCount: 8540,
      lastGenerated: '2024-01-20T10:00:00Z',
      lastSubmitted: '2024-01-20T10:05:00Z',
      status: 'active',
      fileSize: '2.1MB'
    },
    {
      id: '3',
      name: 'Dealers Sitemap',
      url: '/sitemap-dealers.xml',
      type: 'dealers',
      urlCount: 156,
      lastGenerated: '2024-01-20T10:00:00Z',
      lastSubmitted: '2024-01-19T09:30:00Z',
      status: 'error',
      fileSize: '12KB',
      errors: ['Failed to submit to Google Search Console']
    },
    {
      id: '4',
      name: 'Images Sitemap',
      url: '/sitemap-images.xml',
      type: 'images',
      urlCount: 25600,
      lastGenerated: '2024-01-20T08:30:00Z',
      lastSubmitted: '2024-01-20T08:35:00Z',
      status: 'active',
      fileSize: '4.8MB'
    }
  ];

  // Mock redirect rules
  const redirectRules: RedirectRule[] = [
    {
      id: '1',
      source: '/old-cars-page',
      target: '/cars',
      statusCode: 301,
      type: 'permanent',
      createdAt: '2024-01-15',
      lastHit: '2024-01-20',
      hitCount: 245,
      isActive: true
    },
    {
      id: '2',
      source: '/dealers-old',
      target: '/registered-dealers',
      statusCode: 301,
      type: 'permanent',
      createdAt: '2024-01-10',
      lastHit: '2024-01-19',
      hitCount: 89,
      isActive: true
    },
    {
      id: '3',
      source: '/temporary-maintenance',
      target: '/',
      statusCode: 302,
      type: 'temporary',
      createdAt: '2024-01-18',
      lastHit: '2024-01-18',
      hitCount: 12,
      isActive: false
    }
  ];

  // Mock crawl errors
  const crawlErrors: CrawlError[] = [
    {
      id: '1',
      url: '/cars/discontinued-model-123',
      errorType: 'not_found',
      statusCode: 404,
      message: 'Page not found - Car listing removed',
      firstDetected: '2024-01-18',
      lastDetected: '2024-01-20',
      occurrences: 15,
      fixed: false
    },
    {
      id: '2',
      url: '/dealer/invalid-dealer-id',
      errorType: 'not_found',
      statusCode: 404,
      message: 'Dealer profile not found',
      firstDetected: '2024-01-15',
      lastDetected: '2024-01-19',
      occurrences: 8,
      fixed: false
    },
    {
      id: '3',
      url: '/search/timeout-query',
      errorType: 'timeout',
      statusCode: 504,
      message: 'Request timeout during search',
      firstDetected: '2024-01-20',
      lastDetected: '2024-01-20',
      occurrences: 3,
      fixed: false
    }
  ];

  // Mock technical issues
  const technicalIssues: TechnicalIssue[] = [
    {
      id: '1',
      type: 'performance',
      severity: 'critical',
      title: 'Large Image Files Affecting Load Speed',
      description: 'Car listing images are not optimized, causing slow page load times.',
      affectedUrls: 456,
      recommendation: 'Implement WebP format and lazy loading for car images',
      estimatedImpact: 'high',
      fixComplexity: 'medium'
    },
    {
      id: '2',
      type: 'mobile',
      severity: 'warning',
      title: 'Mobile Usability Issues',
      description: 'Some buttons are too small for mobile touch targets.',
      affectedUrls: 23,
      recommendation: 'Increase button sizes to meet mobile accessibility standards',
      estimatedImpact: 'medium',
      fixComplexity: 'easy'
    },
    {
      id: '3',
      type: 'structure',
      severity: 'warning',
      title: 'Missing Schema Markup',
      description: 'Car listings lack structured data markup for better search visibility.',
      affectedUrls: 8540,
      recommendation: 'Implement Vehicle and Offer schema markup for all car listings',
      estimatedImpact: 'high',
      fixComplexity: 'medium'
    }
  ];

  // Sample robots.txt content
  const [robotsTxtContent, setRobotsTxtContent] = useState(`User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot  
Allow: /

# Block admin areas
Disallow: /admin/
Disallow: /api/

# Allow sitemaps
Sitemap: https://carmarket365.com/sitemap.xml
Sitemap: https://carmarket365.com/sitemap-cars.xml
Sitemap: https://carmarket365.com/sitemap-dealers.xml

# Crawl-delay for less important bots
User-agent: *
Crawl-delay: 1`);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'error':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Error</Badge>;
      case 'pending':
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Warning</Badge>;
      case 'info':
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      performance: 'bg-red-100 text-red-700',
      mobile: 'bg-blue-100 text-blue-700',
      structure: 'bg-green-100 text-green-700',
      security: 'bg-purple-100 text-purple-700'
    };
    
    return (
      <Badge variant="secondary" className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700'}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const generateSitemap = (sitemapId: string) => {
    // Mock sitemap generation
    console.log(`Generating sitemap: ${sitemapId}`);
  };

  const submitToSearchConsole = (sitemapId: string) => {
    // Mock search console submission
    console.log(`Submitting sitemap to Search Console: ${sitemapId}`);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="sitemaps">Sitemaps</TabsTrigger>
            <TabsTrigger value="redirects">Redirects</TabsTrigger>
            <TabsTrigger value="robots">Robots.txt</TabsTrigger>
            <TabsTrigger value="crawl-errors">Crawl Errors</TabsTrigger>
            <TabsTrigger value="issues">Technical Issues</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Scan Site
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Sitemaps Tab */}
        <TabsContent value="sitemaps" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>XML Sitemaps</CardTitle>
                  <CardDescription>Manage and monitor your website sitemaps</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Sitemap
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sitemaps.map((sitemap) => (
                  <Card key={sitemap.id} className="border">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{sitemap.name}</h4>
                            {getStatusBadge(sitemap.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{sitemap.url}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">URLs:</span>
                              <span className="ml-2 font-medium">{sitemap.urlCount.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Size:</span>
                              <span className="ml-2 font-medium">{sitemap.fileSize}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Generated:</span>
                              <span className="ml-2 font-medium">{new Date(sitemap.lastGenerated).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Submitted:</span>
                              <span className="ml-2 font-medium">{new Date(sitemap.lastSubmitted).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {sitemap.errors && (
                            <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
                              <p className="text-sm text-red-700">
                                <XCircle className="h-4 w-4 inline mr-1" />
                                {sitemap.errors.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => generateSitemap(sitemap.id)}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => submitToSearchConsole(sitemap.id)}>
                            <Upload className="h-4 w-4" />
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

        {/* Redirects Tab */}
        <TabsContent value="redirects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>URL Redirects</CardTitle>
                  <CardDescription>Manage 301 and 302 redirects for your website</CardDescription>
                </div>
                <Dialog open={isAddRedirectModalOpen} onOpenChange={setIsAddRedirectModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Redirect
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add URL Redirect</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Source URL</Label>
                        <Input placeholder="/old-page" />
                      </div>
                      <div>
                        <Label>Target URL</Label>
                        <Input placeholder="/new-page" />
                      </div>
                      <div>
                        <Label>Redirect Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select redirect type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="301">301 Permanent</SelectItem>
                            <SelectItem value="302">302 Temporary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="active" />
                        <Label htmlFor="active">Active</Label>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsAddRedirectModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddRedirectModalOpen(false)}>
                          Create Redirect
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hits</TableHead>
                    <TableHead>Last Hit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redirectRules.map((redirect) => (
                    <TableRow key={redirect.id}>
                      <TableCell className="font-mono text-sm">{redirect.source}</TableCell>
                      <TableCell className="font-mono text-sm">{redirect.target}</TableCell>
                      <TableCell>
                        <Badge variant={redirect.statusCode === 301 ? 'default' : 'outline'}>
                          {redirect.statusCode} {redirect.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {redirect.isActive ? (
                          <Badge variant="default" className="bg-green-100 text-green-700">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>{redirect.hitCount}</TableCell>
                      <TableCell>{redirect.lastHit ? new Date(redirect.lastHit).toLocaleDateString() : 'Never'}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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

        {/* Robots.txt Tab */}
        <TabsContent value="robots" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Robots.txt Management</CardTitle>
                  <CardDescription>Control how search engines crawl your website</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test in Search Console
                  </Button>
                  <Dialog open={isRobotsTxtModalOpen} onOpenChange={setIsRobotsTxtModalOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Robots.txt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Edit Robots.txt</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Robots.txt Content</Label>
                          <Textarea 
                            value={robotsTxtContent}
                            onChange={(e) => setRobotsTxtContent(e.target.value)}
                            className="min-h-[400px] font-mono text-sm"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setIsRobotsTxtModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsRobotsTxtModalOpen(false)}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Current Status: Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Robots.txt file is accessible at: <code className="bg-muted px-1 py-0.5 rounded">https://carmarket365.com/robots.txt</code>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Rules</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-sm bg-muted p-3 rounded border overflow-x-auto">
                        {robotsTxtContent}
                      </pre>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Validation Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Syntax is valid</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">All sitemaps referenced</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Admin areas properly blocked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">File size is optimal (&lt; 500KB)</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Crawl Errors Tab */}
        <TabsContent value="crawl-errors" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Crawl Errors</CardTitle>
                  <CardDescription>Monitor and fix crawling issues found by search engines</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh from GSC
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead>
                    <TableHead>Error Type</TableHead>
                    <TableHead>Status Code</TableHead>
                    <TableHead>Occurrences</TableHead>
                    <TableHead>First Detected</TableHead>
                    <TableHead>Last Detected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {crawlErrors.map((error) => (
                    <TableRow key={error.id}>
                      <TableCell className="font-mono text-sm max-w-xs truncate">{error.url}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-red-500 text-red-700">
                          {error.errorType.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">{error.statusCode}</Badge>
                      </TableCell>
                      <TableCell>{error.occurrences}</TableCell>
                      <TableCell>{new Date(error.firstDetected).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(error.lastDetected).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {error.fixed ? (
                          <Badge variant="default" className="bg-green-100 text-green-700">Fixed</Badge>
                        ) : (
                          <Badge variant="destructive">Open</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
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

        {/* Technical Issues Tab */}
        <TabsContent value="issues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical SEO Issues</CardTitle>
              <CardDescription>Automated scan results and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {technicalIssues.map((issue) => (
                  <Card key={issue.id} className="border-l-4 border-l-red-500 data-[severity='warning']:border-l-yellow-500 data-[severity='info']:border-l-blue-500" data-severity={issue.severity}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{issue.title}</h4>
                            {getSeverityBadge(issue.severity)}
                            {getTypeBadge(issue.type)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-muted-foreground">Affected URLs:</span>
                              <span className="ml-2 font-medium">{issue.affectedUrls.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Impact:</span>
                              <span className="ml-2 font-medium">{issue.estimatedImpact}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Fix Complexity:</span>
                              <span className="ml-2 font-medium">{issue.fixComplexity}</span>
                            </div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded border border-blue-200">
                            <p className="text-sm text-blue-800">
                              <span className="font-medium">Recommendation: </span>
                              {issue.recommendation}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
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
      </Tabs>
    </div>
  );
}