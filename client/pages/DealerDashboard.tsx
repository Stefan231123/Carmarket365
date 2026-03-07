/**
 * DealerDashboard Component - Updated with Real GraphQL Data Integration
 * 
 * Features implemented:
 * 1. Real GraphQL queries for dealer data instead of mock data
 * 2. Dashboard stats (active listings, views, inquiries, revenue)
 * 3. Performance metrics (sales, conversion rate, response times)
 * 4. Real car listings with filtering and search
 * 5. Live car inquiries from customers
 * 6. Express sale opportunities from private sellers
 * 7. Comprehensive loading states and error handling
 * 8. Real-time data updates using Apollo Client
 * 
 * GraphQL Operations Used:
 * - getDealerStats: Dashboard overview statistics
 * - getDealerPerformance: Performance metrics
 * - getDealerListings: Dealer's car listings with filters
 * - getDealerInquiries: Customer inquiries for dealer's cars
 * - getExpressSaleOpportunities: Quick sale opportunities from private sellers
 * - getRecentDealerInquiries: Recent inquiries for overview section
 * - getDealerPopularListings: Most popular listings for analytics
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Users, Euro, TrendingUp, Plus, Search, Filter, Download, Eye, Edit, Trash2, MoreHorizontal, Zap, Heart, MapPin, Fuel, Gauge, Calendar } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { CarCard } from '../components/CarCard';
import { AdminBreadcrumb } from '../components/AdminBreadcrumb';
import { useDealerListings, useDealerDashboardData, useExpressSaleOpportunities, useDealerInquiries } from '../hooks/useDealerDashboard';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Types are now imported from dealer-operations.ts

export default function DealerDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // GraphQL queries
  const { stats, performance, recentInquiries, popularListings, loading: dashboardLoading, error: dashboardError } = useDealerDashboardData();
  const { data: listingsData, loading: listingsLoading, error: listingsError } = useDealerListings(statusFilter !== 'all' ? statusFilter.toUpperCase() : undefined, searchTerm || undefined);
  const { data: expressData, loading: expressLoading, error: expressError } = useExpressSaleOpportunities();
  const { data: inquiriesData, loading: inquiriesLoading, error: inquiriesError } = useDealerInquiries();

  // Extract data with fallbacks
  const listings = listingsData?.getDealerListings || [];
  const expressListings = expressData?.getExpressSaleOpportunities || [];
  const allInquiries = inquiriesData?.getDealerInquiries || [];

  // Filter listings based on search term
  const filteredListings = listings.filter(listing => {
    if (!searchTerm) return true;
    return listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           listing.carMake?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           listing.carModel?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Loading state for overview tab
  if (activeTab === 'overview' && dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state handling
  const hasError = dashboardError || listingsError || expressError || inquiriesError;
  if (hasError) {
    console.error('Dashboard error:', hasError);
    return (
      <>
        <AdminBreadcrumb currentPage={t('dealerDashboard.breadcrumb')} />
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl mb-3 text-foreground">
                {t('dealerDashboard.title')}
              </h1>
              <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <div className="text-red-500 text-center">
                  <h3 className="text-lg font-semibold mb-2">{t('dealerDashboard.error.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('dealerDashboard.error.description')}
                  </p>
                  <Button onClick={() => window.location.reload()} className="w-full">
                    {t('dealerDashboard.error.refresh')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const onViewListing = (listingId: string) => {
    navigate(`/cars/${listingId}`);
  };

  const onEditListing = (listingId: string) => {
    navigate(`/edit-listing/${listingId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="default" className="rounded-full">{t('dealerDashboard.myListings.statusBadges.active')}</Badge>;
      case 'SOLD':
        return <Badge variant="secondary" className="rounded-full">{t('dealerDashboard.myListings.statusBadges.sold')}</Badge>;
      case 'PENDING_APPROVAL':
        return <Badge variant="outline" className="rounded-full">{t('dealerDashboard.myListings.statusBadges.pending')}</Badge>;
      case 'DRAFT':
        return <Badge variant="outline" className="rounded-full">{t('dealerDashboard.myListings.statusBadges.draft')}</Badge>;
      default:
        return <Badge variant="outline" className="rounded-full">{status}</Badge>;
    }
  };

  // Express sale listings are now loaded from GraphQL

  const getExpressStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500 text-white rounded-full">{t('dealerDashboard.expressListings.statusBadges.new')}</Badge>;
      case 'SOLD':
        return <Badge variant="outline" className="rounded-full">{t('dealerDashboard.expressListings.statusBadges.sold')}</Badge>;
      case 'CLOSED':
        return <Badge variant="destructive" className="rounded-full">{t('dealerDashboard.expressListings.statusBadges.expired')}</Badge>;
      default:
        return <Badge variant="outline" className="rounded-full">{status}</Badge>;
    }
  };

  const tabConfigs = [
    { value: "overview", icon: TrendingUp, label: t('dealerDashboard.tabs.overview') },
    { value: "listings", icon: Car, label: t('dealerDashboard.tabs.myListings') },
    { value: "express", icon: Zap, label: t('dealerDashboard.tabs.expressListings') },
    { value: "inquiries", icon: Users, label: t('dealerDashboard.tabs.inquiries') },
    { value: "analytics", icon: Eye, label: t('dealerDashboard.tabs.analytics') }
  ];

  return (
    <>
      <AdminBreadcrumb currentPage={t('dealerDashboard.breadcrumb')} />
      <section className="py-10 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl mb-3 text-foreground">
            {t('dealerDashboard.title')}
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('dealerDashboard.subtitle')}
          </p>
        </div>

        <Card className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 rounded-2xl border border-zinc-100 shadow-xl bg-white">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6 overflow-x-auto">
            <div className="flex flex-wrap items-center justify-center gap-1 rounded-full p-1">
              {tabConfigs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 min-h-[44px] rounded-full transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-zinc-100 text-muted-foreground hover:bg-zinc-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-xs sm:text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('dealerDashboard.overview.stats.activeListings.title')}</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats?.activeListings || 0}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600 font-medium">{t('dealerDashboard.overview.stats.activeListings.description')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('dealerDashboard.overview.stats.totalViews.title')}</CardTitle>
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Eye className="h-5 w-5 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats?.totalViews?.toLocaleString() || 0}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600 font-medium">{t('dealerDashboard.overview.stats.totalViews.description')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-green-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('dealerDashboard.overview.stats.inquiries.title')}</CardTitle>
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats?.totalInquiries || 0}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600 font-medium">{t('dealerDashboard.overview.stats.inquiries.description')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-orange-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('dealerDashboard.overview.stats.revenue.title')}</CardTitle>
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <Euro className="h-5 w-5 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">€{stats?.revenue?.toLocaleString() || 0}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600 font-medium">{t('dealerDashboard.overview.stats.revenue.description')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {t('dealerDashboard.overview.performance.title')}
                  </CardTitle>
                  <CardDescription>{t('dealerDashboard.overview.performance.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('dealerDashboard.overview.performance.monthlyData.january')}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={performance?.salesThisMonth ? Math.min((performance.salesThisMonth / 10) * 100, 100) : 0} className="w-20" />
                        <span className="text-sm font-medium">{performance?.salesThisMonth || 0} {t('dealerDashboard.overview.performance.monthlyData.sold')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('dealerDashboard.overview.performance.monthlyData.december')}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={performance?.salesLastMonth ? Math.min((performance.salesLastMonth / 10) * 100, 100) : 0} className="w-20" />
                        <span className="text-sm font-medium">{performance?.salesLastMonth || 0} {t('dealerDashboard.overview.performance.monthlyData.sold')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('dealerDashboard.overview.performance.conversionRate')}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={performance?.conversionRate || 0} className="w-20" />
                        <span className="text-sm font-medium">{performance?.conversionRate?.toFixed(1) || 0}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {t('dealerDashboard.overview.recentInquiries.title')}
                  </CardTitle>
                  <CardDescription>{t('dealerDashboard.overview.recentInquiries.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentInquiries.length > 0 ? recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{inquiry.customerName || inquiry.customer?.name || t('dealerDashboard.overview.recentInquiries.anonymous')}</p>
                          <p className="text-sm text-muted-foreground">{inquiry.car?.carMake?.name} {inquiry.car?.carModel?.name}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="rounded-full mb-1">
                            {inquiry.type.toLowerCase()}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{new Date(inquiry.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>{t('dealerDashboard.overview.recentInquiries.noRecentInquiries')}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col items-center gap-2 mt-6">
              <Button size="lg" onClick={() => setActiveTab("listings")} className="bg-black text-white hover:bg-black/90 px-8 h-12 rounded-full shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                {t('dealerDashboard.overview.actions.addNewListing')}
              </Button>
              <button onClick={() => setActiveTab("analytics")} className="text-sm text-foreground/70 underline-offset-4 hover:underline">
                {t('dealerDashboard.overview.actions.viewAnalytics')}
              </button>
            </div>
          </div>
          )}

          {/* My Listings Tab */}
          {activeTab === "listings" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            {listingsLoading && (
              <div className="text-center py-8">
                <LoadingSpinner />
                <p className="text-muted-foreground mt-2">{t('dealerDashboard.loading.listings')}</p>
              </div>
            )}
            {/* Filters and Search - Only show when not loading */}
            {!listingsLoading && (
            <>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('dealerDashboard.myListings.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t('dealerDashboard.myListings.filterByStatus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('dealerDashboard.myListings.statusOptions.allStatus')}</SelectItem>
                    <SelectItem value="active">{t('dealerDashboard.myListings.statusOptions.active')}</SelectItem>
                    <SelectItem value="sold">{t('dealerDashboard.myListings.statusOptions.sold')}</SelectItem>
                    <SelectItem value="pending">{t('dealerDashboard.myListings.statusOptions.pending')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t('dealerDashboard.myListings.exportReport')}</span>
                <span className="sm:hidden">{t('dealerDashboard.myListings.export')}</span>
              </Button>
            </div>

            {/* Listings - Mobile Cards / Desktop Table */}
            <div className="sm:hidden space-y-4">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="border-zinc-100 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <ImageWithFallback
                        src={listing.imageUrls?.[0] || '/placeholder.svg'}
                        alt={listing.title}
                        className="w-20 h-16 object-cover rounded-2xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm truncate">{listing.title}</h3>
                            <p className="text-lg font-bold text-primary">€{listing.price.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{listing.mileage?.toLocaleString()} km • {listing.year}</p>
                          </div>
                          <div className="flex-shrink-0">
                            {getStatusBadge(listing.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="mt-1">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => onViewListing(listing.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t('dealer.viewListing')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onEditListing(listing.id)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  {t('dealer.editListing')}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {t('dealer.deleteListing')}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>{t('dealerDashboard.myListings.listed')}: {new Date(listing.createdAt).toLocaleDateString()}</span>
                          <span>{t('dealerDashboard.myListings.updated')}: {new Date(listing.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.car')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.price')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.status')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.makeModel')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.listed')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.lastUpdated')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={listing.imageUrls?.[0] || '/placeholder.svg'}
                            alt={listing.title}
                            className="w-12 h-9 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{listing.title}</p>
                            <p className="text-sm text-muted-foreground">{listing.mileage?.toLocaleString()} km • {listing.year}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>€{listing.price.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(listing.status)}</TableCell>
                      <TableCell>{listing.carMake?.name} {listing.carModel?.name}</TableCell>
                      <TableCell>{new Date(listing.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(listing.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => onViewListing(listing.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              {t('dealerDashboard.myListings.actions.viewListing')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditListing(listing.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              {t('dealerDashboard.myListings.actions.editListing')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('dealerDashboard.myListings.actions.deleteListing')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            </>
            )}
          </div>
          )}

          {/* Inquiries Tab */}
          {activeTab === "inquiries" && (
          <div className="space-y-6">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('dealerDashboard.inquiries.title')}</CardTitle>
                <CardDescription>{t('dealerDashboard.inquiries.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiriesLoading ? (
                    <div className="text-center py-8">
                      <LoadingSpinner />
                    </div>
                  ) : allInquiries.length > 0 ? allInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-zinc-100 rounded-2xl">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="min-w-0">
                            <p className="font-medium truncate">{inquiry.customerName || inquiry.customer?.name || t('dealerDashboard.inquiries.anonymous')}</p>
                            <p className="text-sm text-muted-foreground truncate">{inquiry.customerEmail || inquiry.customer?.email || t('dealerDashboard.inquiries.noEmail')}</p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm">{inquiry.car?.carMake?.name} {inquiry.car?.carModel?.name}</p>
                            <p className="text-xs text-muted-foreground">{inquiry.type.toLowerCase()}</p>
                          </div>
                          <div className="sm:text-right">
                            <Badge variant={inquiry.status === 'NEW' ? 'default' : 'secondary'} className="rounded-full">
                              {inquiry.status.toLowerCase()}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-full h-12 shadow-md w-full sm:w-auto">
                        {t('dealerDashboard.inquiries.actions.respond')}
                      </Button>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>{t('dealerDashboard.inquiries.noInquiriesYet')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          )}

          {/* Express Sale Listings Tab */}
          {activeTab === "express" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            {expressLoading && (
              <div className="text-center py-8">
                <LoadingSpinner />
                <p className="text-muted-foreground mt-2">{t('dealerDashboard.loading.express')}</p>
              </div>
            )}
            {/* Header - Only show when not loading */}
            {!expressLoading && (
            <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{t('dealerDashboard.expressListings.title')}</h2>
                <p className="text-muted-foreground text-sm">{t('dealerDashboard.expressListings.description')}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full">
                  {expressListings.filter(l => l.status === 'ACTIVE').length} {t('dealerDashboard.expressListings.newListings')}
                </Badge>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('dealerDashboard.expressListings.searchPlaceholder')}
                  className="pl-10 w-full sm:w-64 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-40 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t('dealerDashboard.expressListings.filterByStatus')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('dealerDashboard.expressListings.statusOptions.allStatus')}</SelectItem>
                  <SelectItem value="new">{t('dealerDashboard.expressListings.statusOptions.new')}</SelectItem>
                  <SelectItem value="contacted">{t('dealerDashboard.expressListings.statusOptions.contacted')}</SelectItem>
                  <SelectItem value="sold">{t('dealerDashboard.expressListings.statusOptions.sold')}</SelectItem>
                  <SelectItem value="expired">{t('dealerDashboard.expressListings.statusOptions.expired')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Express Sale Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expressLoading ? (
                <div className="col-span-full text-center py-8">
                  <LoadingSpinner />
                </div>
              ) : expressListings.length > 0 ? expressListings.map((listing) => (
                <div key={listing.id} className="bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => navigate(`/cars/${listing.id}`)}>
                  {/* Image */}
                  <div className="relative">
                    <ImageWithFallback
                      src={listing.imageUrls?.[0] || '/placeholder.svg'}
                      alt={listing.vehicleDescription}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      {getExpressStatusBadge(listing.status)}
                    </div>

                    {/* Express Sale Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-orange-500 text-white rounded-full">
                        <Zap className="h-3 w-3 mr-1" />
                        {t('dealerDashboard.expressListings.expressBadge')}
                      </Badge>
                    </div>

                    {/* Price overlay */}
                    {listing.askingPrice && (
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-lg font-bold text-foreground">
                            €{listing.askingPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {/* Title */}
                    <div>
                      <h3 className="font-semibold text-lg text-foreground leading-tight">
                        {listing.vehicleDescription}
                      </h3>
                      <p className="text-sm text-muted-foreground">{listing.seller?.name || t('dealerDashboard.expressListings.privateSeller')}</p>
                    </div>

                    {/* Details - Show full description */}
                    <div className="text-sm text-muted-foreground">
                      <p>{listing.details}</p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{listing.location}</span>
                    </div>

                    {/* Seller Contact Info */}
                    <div className="bg-muted/30 rounded-lg p-3 space-y-1">
                      <p className="text-xs text-muted-foreground">{t('dealerDashboard.expressListings.sellerContact')}</p>
                      <p className="text-sm font-medium">{listing.seller?.name || t('dealerDashboard.expressListings.anonymousSeller')}</p>
                      <p className="text-sm">{listing.seller?.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {t('dealerDashboard.expressListings.submittedOn')} {new Date(listing.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Interest indicator */}
                    {listing.interestedDealers && listing.interestedDealers.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {listing.interestedDealers.length} {t('dealerDashboard.expressListings.dealersInterested')}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/cars/${listing.id}`); }}>
                        {listing.status === 'ACTIVE' ? t('dealerDashboard.expressListings.actions.contact') : t('dealerDashboard.expressListings.actions.viewContact')}
                      </Button>
                      <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">{t('dealerDashboard.expressListings.emptyState.title')}</h3>
                  <p className="text-muted-foreground">{t('dealerDashboard.expressListings.emptyState.description')}</p>
                </div>
              )}
            </div>

            {/* Empty state is now handled inside the grid */}

            {/* Footer Info */}
            <div className="bg-muted/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">{t('dealerDashboard.expressListings.info.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('dealerDashboard.expressListings.info.description')}</p>
                </div>
              </div>
            </div>
            </>
            )}
          </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('dealerDashboard.analytics.popularListings.title')}</CardTitle>
                  <CardDescription>{t('dealerDashboard.analytics.popularListings.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularListings && popularListings.length > 0 ? popularListings.map((listing, index) => (
                      <div key={listing.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                          <div>
                            <p className="font-medium text-sm">{listing.title}</p>
                            <p className="text-xs text-muted-foreground">{listing.carMake?.name} {listing.carModel?.name}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="rounded-full">€{listing.price.toLocaleString()}</Badge>
                      </div>
                    )) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>{t('dealerDashboard.analytics.popularListings.noData')}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('dealerDashboard.analytics.performanceMetrics.title')}</CardTitle>
                  <CardDescription>{t('dealerDashboard.analytics.performanceMetrics.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('dealerDashboard.analytics.performanceMetrics.metrics.averageTimeToSell')}</span>
                      <span className="font-medium">{performance?.averageTimeToSell || 0} {t('dealerDashboard.analytics.performanceMetrics.values.days')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('dealerDashboard.analytics.performanceMetrics.metrics.conversionRate')}</span>
                      <span className="text-sm">{performance?.conversionRate?.toFixed(1) || 0}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('dealerDashboard.analytics.performanceMetrics.metrics.averageListingViews')}</span>
                      <span className="font-medium">{performance?.averageListingViews || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('dealerDashboard.analytics.performanceMetrics.metrics.responseTime')}</span>
                      <span className="font-medium">{performance?.averageResponseTime || 0} {t('dealerDashboard.analytics.performanceMetrics.values.hours')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </Card>

        <p className="text-center text-muted-foreground mt-8">
          {t('dealerDashboard.footerMessage')}<span className="font-semibold">{stats?.activeListings || 0} {t('dealerDashboard.activeListingsCount')}</span> {t('dealerDashboard.drivingYourSuccess')}
        </p>
      </div>
    </section>
    </>
  );
}
