import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Users, Building2, TrendingUp, Shield, Search, Filter, Eye, Edit, Trash2, MoreHorizontal, UserCheck, Ban } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'dealer' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastLogin: string;
}

interface Listing {
  id: string;
  title: string;
  category: string;
  seller: string;
  price: number;
  status: 'active' | 'sold' | 'pending' | 'flagged';
  thumbnail: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [listingSearchTerm, setListingSearchTerm] = useState('');
  const [listingStatusFilter, setListingStatusFilter] = useState('all');

  // Mock data for users
  const allUsers: User[] = [
    {
      id: '1',
      name: t('hardcodedFixes.adminDashboard.mockData.johnDealer'),
      email: t('hardcodedFixes.adminDashboard.mockData.johnDealerEmail'),
      role: 'dealer',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      name: t('hardcodedFixes.adminDashboard.mockData.annaCustomer'),
      email: t('hardcodedFixes.adminDashboard.mockData.annaCustomerEmail'),
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-19'
    },
    {
      id: '3',
      name: t('hardcodedFixes.adminDashboard.mockData.bobAdmin'),
      email: t('hardcodedFixes.adminDashboard.mockData.bobAdminEmail'),
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastLogin: '2024-01-20'
    }
  ];

  // Mock data for listings
  const allListings: Listing[] = [
    {
      id: '1',
      title: t('hardcodedFixes.adminDashboard.mockData.bmw3Series2022'),
      category: t('hardcodedFixes.adminDashboard.mockData.sedan'),
      seller: t('hardcodedFixes.adminDashboard.mockData.johnDealer'),
      price: 35000,
      status: 'active',
      thumbnail: '/placeholder.svg',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: t('hardcodedFixes.adminDashboard.mockData.audiA42021'),
      category: t('hardcodedFixes.adminDashboard.mockData.sedan'),
      seller: t('hardcodedFixes.adminDashboard.mockData.premiumMotors'),
      price: 42000,
      status: 'flagged',
      thumbnail: '/placeholder.svg',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: t('hardcodedFixes.adminDashboard.mockData.mercedesCClass2020'),
      category: t('hardcodedFixes.adminDashboard.mockData.luxury'),
      seller: t('hardcodedFixes.adminDashboard.mockData.eliteCars'),
      price: 38000,
      status: 'sold',
      thumbnail: '/placeholder.svg',
      createdAt: '2024-01-05'
    }
  ];

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || user.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredListings = allListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(listingSearchTerm.toLowerCase()) ||
                         listing.seller.toLowerCase().includes(listingSearchTerm.toLowerCase());
    const matchesStatus = listingStatusFilter === 'all' || listing.status === listingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const onViewListing = (listingId: string) => {
    navigate(`/cars/${listingId}`);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="destructive" className="rounded-full">{t('adminDashboard.userManagement.roleBadges.admin')}</Badge>;
      case 'dealer':
        return <Badge variant="default" className="rounded-full">{t('adminDashboard.userManagement.roleBadges.dealer')}</Badge>;
      case 'customer':
        return <Badge variant="secondary" className="rounded-full">{t('adminDashboard.userManagement.roleBadges.customer')}</Badge>;
      default:
        return <Badge variant="outline" className="rounded-full">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="rounded-full">{t('adminDashboard.allListings.statusBadges.active')}</Badge>;
      case 'sold':
        return <Badge variant="secondary" className="rounded-full">{t('adminDashboard.allListings.statusBadges.sold')}</Badge>;
      case 'pending':
        return <Badge variant="outline" className="rounded-full">{t('adminDashboard.allListings.statusBadges.pending')}</Badge>;
      case 'flagged':
        return <Badge variant="destructive" className="rounded-full">{t('adminDashboard.allListings.statusBadges.flagged')}</Badge>;
      case 'suspended':
        return <Badge variant="destructive" className="rounded-full">{t('hardcodedFixes.adminDashboard.statusBadges.suspended')}</Badge>;
      default:
        return <Badge variant="outline" className="rounded-full">{status}</Badge>;
    }
  };

  const getUserStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="rounded-full">{t('adminDashboard.userManagement.statusBadges.active')}</Badge>;
      case 'suspended':
        return <Badge variant="destructive" className="rounded-full">{t('adminDashboard.userManagement.statusBadges.suspended')}</Badge>;
      case 'pending':
        return <Badge variant="outline" className="rounded-full">{t('adminDashboard.userManagement.statusBadges.pending')}</Badge>;
      default:
        return <Badge variant="outline" className="rounded-full">{status}</Badge>;
    }
  };

  const getCategoryIcon = (_category: string) => {
    return <Car className="h-4 w-4" />;
  };

  const tabConfigs = [
    { value: "overview", icon: TrendingUp, label: t('adminDashboard.tabs.overview') },
    { value: "listings", icon: Car, label: t('adminDashboard.tabs.allListings') },
    { value: "users", icon: Users, label: t('adminDashboard.tabs.userManagement') },
    { value: "reports", icon: Shield, label: t('adminDashboard.tabs.reports') }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl mb-3 text-foreground">
            {t('adminDashboard.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('adminDashboard.subtitle')}
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
              <Card className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-zinc-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('adminDashboard.overview.stats.totalUsers.title')}</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">2,847</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600 font-medium">{t('adminDashboard.overview.stats.totalUsers.description')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-zinc-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('adminDashboard.overview.stats.activeDealers.title')}</CardTitle>
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">156</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600 font-medium">{t('adminDashboard.overview.stats.activeDealers.description')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-zinc-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('adminDashboard.overview.stats.totalListings.title')}</CardTitle>
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Car className="h-5 w-5 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">1,284</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600 font-medium">{t('adminDashboard.overview.stats.totalListings.description')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-zinc-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('adminDashboard.overview.stats.platformRevenue.title')}</CardTitle>
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">€89,240</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-600 font-medium">{t('adminDashboard.overview.stats.platformRevenue.description')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('adminDashboard.overview.recentActivity.title')}</CardTitle>
                  <CardDescription>{t('adminDashboard.overview.recentActivity.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: t('adminDashboard.overview.recentActivity.activities.newDealerRegistration'), user: t('hardcodedFixes.adminDashboard.mockData.premiumMotorsGmbH'), time: t('hardcodedFixes.adminDashboard.mockData.twoHoursAgo') },
                      { action: t('adminDashboard.overview.recentActivity.activities.listingFlaggedForReview'), user: t('hardcodedFixes.adminDashboard.mockData.eliteCars'), time: t('hardcodedFixes.adminDashboard.mockData.fourHoursAgo') },
                      { action: t('adminDashboard.overview.recentActivity.activities.userAccountSuspended'), user: t('hardcodedFixes.adminDashboard.mockData.suspiciousUser'), time: t('hardcodedFixes.adminDashboard.mockData.sixHoursAgo') },
                      { action: t('adminDashboard.overview.recentActivity.activities.paymentProcessed'), user: t('hardcodedFixes.adminDashboard.mockData.autoHausBerlin'), time: t('hardcodedFixes.adminDashboard.mockData.eightHoursAgo') }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('adminDashboard.overview.systemHealth.title')}</CardTitle>
                  <CardDescription>{t('adminDashboard.overview.systemHealth.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.overview.systemHealth.metrics.serverUptime')}</span>
                      <Badge variant="default">99.9%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.overview.systemHealth.metrics.averageResponseTime')}</span>
                      <span className="font-medium">145ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.overview.systemHealth.metrics.activeSessions')}</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.overview.systemHealth.metrics.errorRate')}</span>
                      <Badge variant="secondary">0.02%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col items-center gap-2 mt-6">
              <Button size="lg" onClick={() => setActiveTab("users")} className="bg-black text-white hover:bg-black/90 px-8 h-12 rounded-full shadow-md">
                <Users className="h-4 w-4 mr-2" />
                {t('adminDashboard.overview.actions.manageUsers')}
              </Button>
              <button onClick={() => setActiveTab("reports")} className="text-sm text-foreground/70 underline-offset-4 hover:underline">
                {t('adminDashboard.overview.actions.viewReports')}
              </button>
            </div>
          </div>
          )}

          {/* All Listings Tab */}
          {activeTab === "listings" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('adminDashboard.allListings.searchPlaceholder')}
                    value={listingSearchTerm}
                    onChange={(e) => setListingSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>
                <Select value={listingStatusFilter} onValueChange={setListingStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t('adminDashboard.allListings.filterByStatus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('adminDashboard.allListings.statusOptions.allStatus')}</SelectItem>
                    <SelectItem value="active">{t('adminDashboard.allListings.statusOptions.active')}</SelectItem>
                    <SelectItem value="sold">{t('adminDashboard.allListings.statusOptions.sold')}</SelectItem>
                    <SelectItem value="pending">{t('adminDashboard.allListings.statusOptions.pending')}</SelectItem>
                    <SelectItem value="flagged">{t('adminDashboard.allListings.statusOptions.flagged')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Listings Cards - Mobile */}
            <Card className="sm:hidden border-zinc-100 rounded-2xl">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {filteredListings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-3 border border-zinc-100 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <img 
                          src={listing.thumbnail} 
                          alt={listing.title}
                          className="w-12 h-9 object-cover rounded-2xl"
                        />
                        <div>
                          <p className="font-medium text-sm">{listing.title}</p>
                          <p className="text-xs text-muted-foreground">{listing.seller}</p>
                          <p className="text-sm">€{listing.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
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
                              {t('adminDashboard.allListings.actions.viewListing')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {t('adminDashboard.allListings.actions.editListing')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('adminDashboard.allListings.actions.deleteListing')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Desktop Table */}
            <div className="hidden sm:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('adminDashboard.allListings.tableHeaders.image')}</TableHead>
                    <TableHead>{t('adminDashboard.allListings.tableHeaders.title')}</TableHead>
                    <TableHead>{t('adminDashboard.allListings.tableHeaders.category')}</TableHead>
                    <TableHead>{t('adminDashboard.allListings.tableHeaders.seller')}</TableHead>
                    <TableHead>{t('adminDashboard.allListings.tableHeaders.price')}</TableHead>
                    <TableHead>{t('adminDashboard.allListings.tableHeaders.status')}</TableHead>
                    <TableHead>{t('adminDashboard.allListings.tableHeaders.created')}</TableHead>
                    <TableHead>{t('adminDashboard.allListings.tableHeaders.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <img 
                          src={listing.thumbnail} 
                          alt={listing.title}
                          className="w-12 h-9 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{listing.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getCategoryIcon(listing.category)}
                          <span className="ml-2">{listing.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>{listing.seller}</TableCell>
                      <TableCell>€{listing.price.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(listing.status)}</TableCell>
                      <TableCell>{listing.createdAt}</TableCell>
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
                              {t('adminDashboard.allListings.actions.viewListing')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {t('adminDashboard.allListings.actions.editListing')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('adminDashboard.allListings.actions.deleteListing')}
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

          {/* User Management Tab */}
          {activeTab === "users" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('adminDashboard.userManagement.title')}</CardTitle>
                <CardDescription>{t('adminDashboard.userManagement.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Filters */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Input 
                      placeholder={t('adminDashboard.userManagement.searchPlaceholder')} 
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                  <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                    <SelectTrigger className="w-full sm:w-[150px] h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue placeholder={t('adminDashboard.userManagement.roleFilter.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('adminDashboard.userManagement.roleFilter.options.allRoles')}</SelectItem>
                      <SelectItem value="customer">{t('adminDashboard.userManagement.roleFilter.options.customer')}</SelectItem>
                      <SelectItem value="dealer">{t('adminDashboard.userManagement.roleFilter.options.dealer')}</SelectItem>
                      <SelectItem value="admin">{t('adminDashboard.userManagement.roleFilter.options.admin')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('adminDashboard.userManagement.tableHeaders.user')}</TableHead>
                      <TableHead>{t('adminDashboard.userManagement.tableHeaders.role')}</TableHead>
                      <TableHead>{t('adminDashboard.userManagement.tableHeaders.status')}</TableHead>
                      <TableHead>{t('adminDashboard.userManagement.tableHeaders.joinDate')}</TableHead>
                      <TableHead>{t('adminDashboard.userManagement.tableHeaders.lastLogin')}</TableHead>
                      <TableHead>{t('adminDashboard.userManagement.tableHeaders.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <UserCheck className="h-4 w-4 mr-2" />
                                {t('adminDashboard.userManagement.actions.viewProfile')}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('adminDashboard.userManagement.actions.editUser')}
                              </DropdownMenuItem>
                              {user.status === 'active' ? (
                                <DropdownMenuItem className="text-red-600">
                                  <Ban className="h-4 w-4 mr-2" />
                                  {t('adminDashboard.userManagement.actions.suspendUser')}
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  {t('adminDashboard.userManagement.actions.activateUser')}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('adminDashboard.reports.platformStatistics.title')}</CardTitle>
                  <CardDescription>{t('adminDashboard.reports.platformStatistics.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.reports.platformStatistics.metrics.totalRevenue')}</span>
                      <span className="font-medium">€89,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.reports.platformStatistics.metrics.newUserRegistrations')}</span>
                      <span className="font-medium">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.reports.platformStatistics.metrics.successfulTransactions')}</span>
                      <span className="font-medium">456</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.reports.platformStatistics.metrics.averageListingPrice')}</span>
                      <span className="font-medium">€28,450</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('adminDashboard.reports.contentModeration.title')}</CardTitle>
                  <CardDescription>{t('adminDashboard.reports.contentModeration.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.reports.contentModeration.items.flaggedListings')}</span>
                      <Badge variant="destructive" className="rounded-full">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.reports.contentModeration.items.pendingDealerApplications')}</span>
                      <Badge variant="outline" className="rounded-full">8</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.reports.contentModeration.items.reportedUsers')}</span>
                      <Badge variant="destructive" className="rounded-full">2</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('adminDashboard.reports.contentModeration.items.disputes')}</span>
                      <Badge variant="outline" className="rounded-full">1</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </Card>

        <p className="text-center text-muted-foreground mt-8">
          {t('adminDashboard.footerMessage')}<span className="font-semibold">{t('adminDashboard.systemStatus')}</span> with full operational oversight
        </p>
      </div>
    </section>
  );
}
