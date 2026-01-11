import { useState } from 'react';
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

interface CarListing {
  id: string;
  title: string;
  image: string;
  price: number;
  mileage: string;
  year: string;
  status: 'active' | 'sold' | 'pending';
  views: number;
  inquiries: number;
  createdAt: string;
}

interface ExpressSaleListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  image?: string;
  images?: string[];
  location: string;
  dealer: string;
  sellerName: string;
  contactPhone: string;
  contactEmail: string;
  submittedAt: string;
  country: string;
  status: 'new' | 'contacted' | 'sold' | 'expired';
}

export default function DealerDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for listings
  const listings: CarListing[] = [
    {
      id: '1',
      title: t('hardcodedFixes.dealerDashboard.mockData.bmw3Series320i2022'),
      image: '/placeholder.svg',
      price: 35000,
      mileage: t('hardcodedFixes.dealerDashboard.mockData.mileage25k'),
      year: '2022',
      status: 'active',
      views: 156,
      inquiries: 8,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: t('hardcodedFixes.dealerDashboard.mockData.audiA4Avant2021'),
      image: '/placeholder.svg',
      price: 42000,
      mileage: t('hardcodedFixes.dealerDashboard.mockData.mileage18k'),
      year: '2021',
      status: 'pending',
      views: 203,
      inquiries: 12,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: t('hardcodedFixes.dealerDashboard.mockData.mercedesCClass2020'),
      image: '/placeholder.svg',
      price: 38000,
      mileage: t('hardcodedFixes.dealerDashboard.mockData.mileage32k'),
      year: '2020',
      status: 'sold',
      views: 89,
      inquiries: 5,
      createdAt: '2024-01-05'
    }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onViewListing = () => {
    console.log('View listing clicked');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="rounded-full">{t('dealerDashboard.myListings.statusBadges.active')}</Badge>;
      case 'sold':
        return <Badge variant="secondary" className="rounded-full">{t('dealerDashboard.myListings.statusBadges.sold')}</Badge>;
      case 'pending':
        return <Badge variant="outline" className="rounded-full">{t('dealerDashboard.myListings.statusBadges.pending')}</Badge>;
      default:
        return <Badge variant="outline" className="rounded-full">{status}</Badge>;
    }
  };

  // Mock data for Express Sale listings from private users
  const expressListings: ExpressSaleListing[] = [
    {
      id: 'exp-1',
      make: 'BMW',
      model: '3 Series',
      year: 2019,
      price: 28000,
      mileage: 45000,
      fuelType: 'gasoline',
      transmission: 'automatic',
      image: '/placeholder.svg',
      location: 'Skopje, North Macedonia',
      dealer: 'Private Seller',
      sellerName: 'Marko Petrovski',
      contactPhone: '+389 70 123 456',
      contactEmail: 'marko.petrovski@email.com',
      submittedAt: '2024-01-20',
      country: 'North Macedonia',
      status: 'new'
    },
    {
      id: 'exp-2', 
      make: 'Audi',
      model: 'A4',
      year: 2020,
      price: 32000,
      mileage: 38000,
      fuelType: 'diesel',
      transmission: 'automatic',
      image: '/placeholder.svg',
      location: 'Bitola, North Macedonia',
      dealer: 'Private Seller',
      sellerName: 'Ana Nikolovska',
      contactPhone: '+389 71 234 567',
      contactEmail: 'ana.nikolovska@email.com',
      submittedAt: '2024-01-18',
      country: 'North Macedonia',
      status: 'contacted'
    },
    {
      id: 'exp-3',
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2018,
      price: 35000,
      mileage: 52000,
      fuelType: 'diesel',
      transmission: 'automatic', 
      image: '/placeholder.svg',
      location: 'Ohrid, North Macedonia',
      dealer: 'Private Seller',
      sellerName: 'Stefan Georgiev',
      contactPhone: '+389 72 345 678',
      contactEmail: 'stefan.georgiev@email.com',
      submittedAt: '2024-01-15',
      country: 'North Macedonia',
      status: 'new'
    }
  ];

  const getExpressStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-green-500 text-white rounded-full">{t('dealerDashboard.expressListings.statusBadges.new')}</Badge>;
      case 'contacted':
        return <Badge variant="secondary" className="rounded-full">{t('dealerDashboard.expressListings.statusBadges.contacted')}</Badge>;
      case 'sold':
        return <Badge variant="outline" className="rounded-full">{t('dealerDashboard.expressListings.statusBadges.sold')}</Badge>;
      case 'expired':
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl mb-3 text-foreground">
            {t('dealerDashboard.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('dealerDashboard.subtitle')}
          </p>
        </div>

        <Card className="max-w-5xl mx-auto p-8 rounded-2xl border border-zinc-100 shadow-xl bg-white">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center rounded-full p-1">
              {tabConfigs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-zinc-100 text-muted-foreground hover:bg-zinc-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
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
                  <div className="text-3xl font-bold text-gray-900">24</div>
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
                  <div className="text-3xl font-bold text-gray-900">2,847</div>
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
                  <div className="text-3xl font-bold text-gray-900">89</div>
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
                  <div className="text-3xl font-bold text-gray-900">€145,290</div>
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
                        <Progress value={85} className="w-20" />
                        <span className="text-sm font-medium">6 {t('dealerDashboard.overview.performance.monthlyData.sold')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('dealerDashboard.overview.performance.monthlyData.december')}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={70} className="w-20" />
                        <span className="text-sm font-medium">5 {t('dealerDashboard.overview.performance.monthlyData.sold')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('dealerDashboard.overview.performance.monthlyData.november')}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="w-20" />
                        <span className="text-sm font-medium">4 {t('dealerDashboard.overview.performance.monthlyData.sold')}</span>
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
                    {[
                      { name: "Anna Mueller", car: "BMW 3 Series", time: "2h ago", type: t('dealerDashboard.overview.recentInquiries.inquiryTypes.viewing') },
                      { name: "Thomas Koch", car: "Audi A4", time: "4h ago", type: t('dealerDashboard.overview.recentInquiries.inquiryTypes.price') },
                      { name: "Lisa Frank", car: "Mercedes C-Class", time: "6h ago", type: t('dealerDashboard.overview.recentInquiries.inquiryTypes.financing') }
                    ].map((inquiry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                          <p className="text-sm text-muted-foreground">{inquiry.car}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="rounded-full mb-1">
                            {inquiry.type}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{inquiry.time}</p>
                        </div>
                      </div>
                    ))}
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
            {/* Filters and Search */}
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
                        src={listing.image}
                        alt={listing.title}
                        className="w-20 h-16 object-cover rounded-2xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm truncate">{listing.title}</h3>
                            <p className="text-lg font-bold text-primary">€{listing.price.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{listing.mileage} • {listing.year}</p>
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
                                <DropdownMenuItem onClick={onViewListing}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t('dealer.viewListing')}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
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
                          <span>{listing.views} {t('dealerDashboard.myListings.mobileView.views')}</span>
                          <span>{listing.inquiries} {t('dealerDashboard.myListings.mobileView.inquiries')}</span>
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
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.views')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.inquiries')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.listed')}</TableHead>
                    <TableHead>{t('dealerDashboard.myListings.tableHeaders.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={listing.image}
                            alt={listing.title}
                            className="w-12 h-9 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{listing.title}</p>
                            <p className="text-sm text-muted-foreground">{listing.mileage} • {listing.year}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>€{listing.price.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(listing.status)}</TableCell>
                      <TableCell>{listing.views}</TableCell>
                      <TableCell>{listing.inquiries}</TableCell>
                      <TableCell>{new Date(listing.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={onViewListing}>
                              <Eye className="h-4 w-4 mr-2" />
                              {t('dealerDashboard.myListings.actions.viewListing')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
                  {[
                    {
                      customer: "Anna Mueller",
                      email: "anna.mueller@email.com",
                      car: "2022 BMW 3 Series 320i",
                      type: t('dealerDashboard.inquiries.inquiryTypes.testDriveRequest'),
                      date: `2 ${t('dealerDashboard.inquiries.time.hoursAgo')}`,
                      status: t('dealerDashboard.inquiries.status.new')
                    },
                    {
                      customer: "Thomas Koch",
                      email: "thomas.koch@email.com",
                      car: "2021 Audi A4 Avant",
                      type: t('dealerDashboard.inquiries.inquiryTypes.priceInquiry'),
                      date: `1 ${t('dealerDashboard.inquiries.time.dayAgo')}`,
                      status: t('dealerDashboard.inquiries.status.responded')
                    }
                  ].map((inquiry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-zinc-100 rounded-2xl">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{inquiry.customer}</p>
                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                          </div>
                          <div>
                            <p className="text-sm">{inquiry.car}</p>
                            <p className="text-xs text-muted-foreground">{inquiry.type}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'} className="rounded-full">
                              {inquiry.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{inquiry.date}</p>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-full h-12 shadow-md">
                        {t('dealerDashboard.inquiries.actions.respond')}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          )}

          {/* Express Sale Listings Tab */}
          {activeTab === "express" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{t('dealerDashboard.expressListings.title')}</h2>
                <p className="text-muted-foreground text-sm">{t('dealerDashboard.expressListings.description')}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full">
                  {expressListings.filter(l => l.status === 'new').length} {t('dealerDashboard.expressListings.newListings')}
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
              {expressListings.map((listing) => (
                <div key={listing.id} className="bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative">
                    <ImageWithFallback
                      src={listing.image || '/placeholder.svg'}
                      alt={`${listing.year} ${listing.make} ${listing.model}`}
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
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-lg font-bold text-foreground">
                          €{listing.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {/* Title */}
                    <div>
                      <h3 className="font-semibold text-lg text-foreground leading-tight">
                        {listing.year} {listing.make} {listing.model}
                      </h3>
                      <p className="text-sm text-muted-foreground">{listing.sellerName}</p>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Gauge className="h-4 w-4" />
                        <span>{listing.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Fuel className="h-4 w-4" />
                        <span>{t(`sell.fuelTypes.${listing.fuelType}`)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{t(`sell.transmissions.${listing.transmission}`)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{listing.year}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{listing.location}</span>
                    </div>

                    {/* Seller Contact Info */}
                    <div className="bg-muted/30 rounded-lg p-3 space-y-1">
                      <p className="text-xs text-muted-foreground">{t('dealerDashboard.expressListings.sellerContact')}</p>
                      <p className="text-sm font-medium">{listing.contactPhone}</p>
                      <p className="text-sm">{listing.contactEmail}</p>
                      <p className="text-xs text-muted-foreground">
                        {t('dealerDashboard.expressListings.submittedOn')} {new Date(listing.submittedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" size="sm">
                        {listing.status === 'new' ? t('dealerDashboard.expressListings.actions.contact') : t('dealerDashboard.expressListings.actions.viewContact')}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {expressListings.length === 0 && (
              <div className="text-center py-12">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">{t('dealerDashboard.expressListings.emptyState.title')}</h3>
                <p className="text-muted-foreground">{t('dealerDashboard.expressListings.emptyState.description')}</p>
              </div>
            )}

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
                    {filteredListings.slice(0, 3).map((listing, index) => (
                      <div key={listing.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                          <div>
                            <p className="font-medium text-sm">{listing.title}</p>
                            <p className="text-xs text-muted-foreground">{listing.views} {t('dealerDashboard.analytics.popularListings.views')}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="rounded-full">{listing.inquiries} {t('dealerDashboard.analytics.popularListings.inquiries')}</Badge>
                      </div>
                    ))}
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
                      <span className="font-medium">23 {t('dealerDashboard.analytics.performanceMetrics.values.days')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('dealerDashboard.analytics.performanceMetrics.metrics.conversionRate')}</span>
                      <span className="text-sm">12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('dealerDashboard.analytics.performanceMetrics.metrics.averageListingViews')}</span>
                      <span className="font-medium">118</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('dealerDashboard.analytics.performanceMetrics.metrics.responseTime')}</span>
                      <span className="font-medium">2.3 {t('dealerDashboard.analytics.performanceMetrics.values.hours')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </Card>

        <p className="text-center text-muted-foreground mt-8">
          {t('dealerDashboard.footerMessage')}<span className="font-semibold">24 {t('dealerDashboard.activeListingsCount')}</span> driving your success
        </p>
      </div>
    </section>
  );
}
