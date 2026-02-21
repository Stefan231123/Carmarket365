import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Heart,
  Search,
  Car,
  Zap,
  User,
  Settings,
  MapPin,
  Gauge,
  Fuel,
  Eye,
  Trash2,
  Edit3,
  MessageSquare,
  Shield,
  Download,
  Upload,
  Loader2
} from "lucide-react";
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useTranslation } from '../hooks/useTranslation';
import { AdminBreadcrumb } from '../components/AdminBreadcrumb';
import { useSafeAuth } from '../contexts/AuthContextSafe';
import { useFavorites } from '../contexts/FavoritesContext';
import { apiClient } from '@shared/api-client';

export default function PrivateDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useSafeAuth();
  const { favorites, removeFromFavorites } = useFavorites();
  const [activeTab, setActiveTab] = useState("saved");
  const [myListings, setMyListings] = useState<any[]>([]);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [exportingData, setExportingData] = useState(false);

  // Helper function to translate status values
  const translateStatus = (status: string) => {
    switch (status) {
      case 'Active': case 'ACTIVE': return t('privateDashboard.statusActive');
      case 'Under Review': case 'PENDING': return t('privateDashboard.statusUnderReview');
      case 'Sold': case 'SOLD': return t('privateDashboard.statusSold');
      case 'Expired': case 'EXPIRED': return t('privateDashboard.statusExpired');
      default: return status;
    }
  };

  // Helper function to translate fuel types
  const translateFuelType = (fuelType: string) => {
    switch (fuelType) {
      case 'Diesel': case 'DIESEL': return t('privateDashboard.fuelDiesel');
      case 'Petrol': case 'GASOLINE': return t('privateDashboard.fuelPetrol');
      case 'Hybrid': case 'HYBRID': return t('privateDashboard.fuelHybrid');
      case 'Electric': case 'ELECTRIC': return t('privateDashboard.fuelElectric');
      case 'Gas': case 'LPG': case 'CNG': return t('privateDashboard.fuelGas');
      default: return fuelType;
    }
  };

  // Derive user profile from auth context
  const nameParts = (user?.name || '').split(' ');
  const [userProfile, setUserProfile] = useState({
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(' ') || "",
    email: user?.email || "",
    phone: user?.dealerPhoneNumber || "",
    city: user?.dealerCity || "",
    country: "",
    avatar: ""
  });

  // Update profile state when user data changes
  useEffect(() => {
    if (user) {
      const parts = (user.name || '').split(' ');
      setUserProfile({
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(' ') || "",
        email: user.email || "",
        phone: user.dealerPhoneNumber || "",
        city: user.dealerCity || "",
        country: "",
        avatar: ""
      });
    }
  }, [user]);

  // Load user's own listings from backend
  useEffect(() => {
    if (user) {
      setListingsLoading(true);
      apiClient.getMyListings()
        .then(listings => setMyListings(listings))
        .catch(() => setMyListings([]))
        .finally(() => setListingsLoading(false));
    }
  }, [user]);

  // GDPR: Export user data
  const handleExportData = async () => {
    setExportingData(true);
    try {
      const data = await apiClient.exportMyData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `carmarket365-my-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(t('privateDashboard.exportDataError') || 'Failed to export data');
    } finally {
      setExportingData(false);
    }
  };

  // GDPR: Delete account
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      t('privateDashboard.deleteAccountConfirmation') ||
      'Are you sure you want to permanently delete your account? This action cannot be undone.'
    );
    if (!confirmed) return;

    setDeletingAccount(true);
    try {
      await apiClient.deleteMyAccount();
      await logout();
      navigate('/');
    } catch (err) {
      alert(t('privateDashboard.deleteAccountError') || 'Failed to delete account');
      setDeletingAccount(false);
    }
  };

  // Map favorites to saved cars format
  const savedCars = favorites.map(fav => ({
    id: fav.id,
    make: fav.make,
    model: fav.model,
    year: fav.year,
    price: fav.price,
    mileage: 0,
    fuel: '',
    location: '',
    image: fav.image || fav.images?.[0] || '',
    savedDate: fav.dateAdded,
  }));

  // Map backend listings to the UI format
  const userListings = myListings.map(listing => ({
    id: listing.id,
    make: listing.make,
    model: listing.model,
    year: listing.year,
    price: listing.price,
    mileage: listing.mileage || 0,
    fuel: listing.fuelType || '',
    location: listing.location || '',
    image: listing.images?.[0]?.url || listing.images?.[0]?.thumbnailUrl || '',
    status: listing.isAvailable ? 'Active' : 'Sold',
    views: listing.viewCount || 0,
    inquiries: listing.inquiryCount || 0,
    createdDate: listing.createdAt,
  }));

  const handleProfileUpdate = () => {
    // Profile update is stored locally for now
    alert(t('privateDashboard.profileUpdatedSuccessfully'));
  };

  const handleRemoveSaved = (carId: string) => {
    removeFromFavorites(carId);
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm(t('privateDashboard.confirmDeleteListing') || 'Are you sure you want to delete this listing?')) return;
    try {
      await apiClient.deleteCar(listingId);
      setMyListings(prev => prev.filter(l => l.id !== listingId));
    } catch (error) {
      console.error('Failed to delete listing:', error);
      alert('Failed to delete listing. Please try again.');
    }
  };

  const onBackToHome = () => {
    navigate('/');
  };

  const onViewListing = (carId: string) => {
    navigate(`/car-detail/${carId}`);
  };

  const onCreateListing = () => {
    navigate('/sell-car');
  };

  const tabConfigs = [
    { value: "saved", icon: Heart, label: t('privateDashboard.savedCars'), shortLabel: t('privateDashboard.savedCars') },
    { value: "search", icon: Search, label: t('privateDashboard.lastSearch'), shortLabel: t('privateDashboard.search') },
    { value: "listings", icon: Car, label: t('privateDashboard.yourListings'), shortLabel: t('privateDashboard.yourListings') },
    { value: "express", icon: Zap, label: t('privateDashboard.expressSale'), shortLabel: t('privateDashboard.express') },
    { value: "contact", icon: User, label: t('privateDashboard.contact'), shortLabel: t('privateDashboard.contact') },
    { value: "settings", icon: Settings, label: t('privateDashboard.settings'), shortLabel: t('privateDashboard.settings') }
  ];

  return (
    <>
      <AdminBreadcrumb currentPage="Private Dashboard" />
      <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <Button variant="ghost" onClick={onBackToHome} className="bg-zinc-100 text-muted-foreground hover:bg-zinc-200 rounded-full px-6 py-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
{t('common.backToHome')}
          </Button>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl mb-3 text-foreground">
{t('privateDashboard.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
{t('privateDashboard.subtitle')}
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
                    <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
                    <span className="text-sm font-medium sm:hidden">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Saved Listings Tab */}
          {activeTab === "saved" && (
          <div>
            <div className="flex flex-col items-center gap-2 mb-6">
              <Badge variant="secondary" className="rounded-full px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 border-blue-200">{savedCars.length} {t('privateDashboard.savedCars')}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500" />
<span>{t('privateDashboard.yourListings')}</span>
              </div>
            </div>

            {savedCars.length === 0 && (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('privateDashboard.noSavedCars') || 'No saved cars yet. Browse listings and save your favorites!'}</p>
                <Button onClick={() => navigate('/browse')} className="mt-4 bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
                  <Search className="h-4 w-4 mr-2" />
                  {t('privateDashboard.startBrowsing') || 'Start Browsing'}
                </Button>
              </div>
            )}

            <div className="grid gap-6">
              {savedCars.map((car) => (
                <Card key={car.id} className="border-zinc-100 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-zinc-50">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-56 h-40 relative overflow-hidden rounded-2xl shadow-lg">
                        <ImageWithFallback
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                            <Heart className="h-5 w-5 text-red-500 fill-current" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{car.year} {car.make} {car.model}</h3>
                              <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-700 border-blue-200">
{t('privateDashboard.saved')}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-zinc-50 px-3 py-2 rounded-lg">
                                <Gauge className="h-4 w-4 text-blue-600" />
                                <span>{car.mileage.toLocaleString()} km</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-zinc-50 px-3 py-2 rounded-lg">
                                <Fuel className="h-4 w-4 text-green-600" />
                                <span>{translateFuelType(car.fuel)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-zinc-50 px-3 py-2 rounded-lg">
                                <MapPin className="h-4 w-4 text-red-600" />
                                <span>{car.location}</span>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-2">
                              €{car.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground bg-zinc-100 px-3 py-2 rounded-lg inline-block">
{t('privateDashboard.savedOn')} {new Date(car.savedDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex flex-row sm:flex-col gap-3">
                            <Button size="sm" onClick={() => onViewListing(car.id)} className="flex-1 sm:flex-none bg-black text-white hover:bg-black/90 rounded-full px-6 h-12 shadow-md">
                              <Eye className="h-4 w-4 mr-2" />
{t('privateDashboard.viewDetails')}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveSaved(car.id)}
                              className="flex-1 sm:flex-none bg-zinc-100 border-none rounded-full px-6 h-12 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
{t('privateDashboard.remove')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 mt-6">
              <Button size="lg" onClick={() => setActiveTab("search")} className="bg-black text-white hover:bg-black/90 px-8 h-12 rounded-full shadow-md">
                <Search className="h-4 w-4 mr-2" />
{t('privateDashboard.startNewSearch')}
              </Button>
              <button onClick={() => setActiveTab("listings")} className="text-sm text-foreground/70 underline-offset-4 hover:underline">
{t('privateDashboard.viewMyListings')}
              </button>
            </div>
          </div>
          )}

          {/* Last Search Tab */}
          {activeTab === "search" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl">{t('privateDashboard.lastSearches')}</h2>
                <p className="text-muted-foreground text-sm">{t('privateDashboard.recentSearchHistory')}</p>
              </div>
              <Button size="sm" onClick={() => navigate('/browse')} className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12 shadow-md">
                <Search className="h-4 w-4 mr-2" />
{t('privateDashboard.newSearch')}
              </Button>
            </div>

            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t('privateDashboard.noRecentSearches') || 'No recent searches. Start browsing to see your search history here!'}</p>
              <Button onClick={() => navigate('/browse')} className="mt-4 bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
                <Search className="h-4 w-4 mr-2" />
                {t('privateDashboard.startBrowsing') || 'Start Browsing'}
              </Button>
            </div>
          </div>
          )}

          {/* User Listings Tab */}
          {activeTab === "listings" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl">{t('privateDashboard.myListings')}</h2>
                <p className="text-muted-foreground text-sm">{t('privateDashboard.carsListedForSale')}</p>
              </div>
              <Button onClick={onCreateListing} size="sm" className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12 shadow-md">
                <Car className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t('privateDashboard.createNewListing')}</span>
                <span className="sm:hidden">{t('privateDashboard.newListing')}</span>
              </Button>
            </div>

            {listingsLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}

            {!listingsLoading && userListings.length === 0 && (
              <div className="text-center py-12">
                <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('privateDashboard.noListingsYet') || 'You have no listings yet. Create your first listing!'}</p>
                <Button onClick={onCreateListing} className="mt-4 bg-black text-white hover:bg-black/90 rounded-full px-6 h-12">
                  <Car className="h-4 w-4 mr-2" />
                  {t('privateDashboard.createNewListing')}
                </Button>
              </div>
            )}

            <div className="grid gap-4 sm:gap-6">
              {!listingsLoading && userListings.map((listing) => (
                <Card key={listing.id} className="border-zinc-100 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="w-full sm:w-48 h-32 relative overflow-hidden rounded-2xl">
                        <ImageWithFallback
                          src={listing.image}
                          alt={`${listing.make} ${listing.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col gap-3">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-lg font-medium">{listing.year} {listing.make} {listing.model}</h3>
                              <Badge variant="secondary" className="rounded-full">{translateStatus(listing.status)}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Gauge className="h-3 w-3 mr-1" />
                                {listing.mileage.toLocaleString()} km
                              </span>
                              <span className="flex items-center">
                                <Fuel className="h-3 w-3 mr-1" />
                                {translateFuelType(listing.fuel)}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {listing.location}
                              </span>
                            </div>
                            <div className="text-xl font-semibold text-primary mt-2">
                              €{listing.price.toLocaleString()}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
{listing.views} {t('privateDashboard.views')}
                              </span>
                              <span className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
{listing.inquiries} {t('privateDashboard.inquiries')}
                              </span>
                              <span>{t('privateDashboard.listed')} {new Date(listing.createdDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                              <Edit3 className="h-4 w-4 mr-2" />
{t('privateDashboard.edit')}
                            </Button>
                            <Button size="sm" onClick={() => onViewListing(listing.id)} className="flex-1 sm:flex-none bg-black text-white hover:bg-black/90 rounded-full h-12 shadow-md">
                              <Eye className="h-4 w-4 mr-2" />
{t('privateDashboard.view')}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteListing(listing.id)}
                              className="flex-1 sm:flex-none bg-zinc-100 border-none rounded-full h-12 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
{t('privateDashboard.delete')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          )}

          {/* Express Sale Listings Tab */}
          {activeTab === "express" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl">{t('privateDashboard.expressSaleListings')}</h2>
                <p className="text-muted-foreground text-sm">{t('privateDashboard.quickSaleRequests')}</p>
              </div>
              <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12 shadow-md">
                <Zap className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t('privateDashboard.newExpressSale')}</span>
                <span className="sm:hidden">{t('privateDashboard.newExpress')}</span>
              </Button>
            </div>

            <div className="text-center py-12">
              <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t('privateDashboard.expressSaleComingSoon') || 'Express sale feature is coming soon!'}</p>
            </div>
          </div>
          )}

          {/* Contact Details Tab */}
          {activeTab === "contact" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <div>
              <h2 className="text-xl sm:text-2xl">{t('privateDashboard.contactDetails')}</h2>
              <p className="text-muted-foreground text-sm">{t('privateDashboard.manageContactInfo')}</p>
            </div>

            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('privateDashboard.personalInformation')}</CardTitle>
                <CardDescription>{t('privateDashboard.updateProfileDetails')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback className="text-lg">{userProfile.firstName?.[0] || ''}{userProfile.lastName?.[0] || ''}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                    <Upload className="h-4 w-4 mr-2" />
{t('privateDashboard.changePhoto')}
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm text-muted-foreground">{t('privateDashboard.firstName')}</Label>
                    <Input
                      id="firstName"
                      value={userProfile.firstName}
                      onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm text-muted-foreground">{t('privateDashboard.lastName')}</Label>
                    <Input
                      id="lastName"
                      value={userProfile.lastName}
                      onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-muted-foreground">{t('privateDashboard.emailAddress')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-muted-foreground">{t('privateDashboard.phoneNumber')}</Label>
                  <Input
                    id="phone"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm text-muted-foreground">{t('privateDashboard.city')}</Label>
                    <Input
                      id="city"
                      value={userProfile.city}
                      onChange={(e) => setUserProfile({...userProfile, city: e.target.value})}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm text-muted-foreground">{t('privateDashboard.country')}</Label>
                    <Input
                      id="country"
                      value={userProfile.country}
                      onChange={(e) => setUserProfile({...userProfile, country: e.target.value})}
                      className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0"
                    />
                  </div>
                </div>

                <Button onClick={handleProfileUpdate} className="w-full sm:w-auto bg-black text-white hover:bg-black/90 rounded-full px-6 h-12 shadow-md">
{t('privateDashboard.saveChanges')}
                </Button>
              </CardContent>
            </Card>
          </div>
          )}

          {/* Account Settings Tab */}
          {activeTab === "settings" && (
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <div>
              <h2 className="text-xl sm:text-2xl">{t('privateDashboard.accountSettings')}</h2>
              <p className="text-muted-foreground text-sm">{t('privateDashboard.manageAccountPreferences')}</p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('privateDashboard.notifications')}</CardTitle>
                  <CardDescription>{t('privateDashboard.configureNotifications')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="font-medium">{t('privateDashboard.emailNotifications')}</div>
                      <div className="text-sm text-muted-foreground">{t('privateDashboard.receiveUpdatesViaEmail')}</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="font-medium">{t('privateDashboard.newListingsAlerts')}</div>
                      <div className="text-sm text-muted-foreground">{t('privateDashboard.notifyNewCarsMatching')}</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="font-medium">{t('privateDashboard.priceDropAlerts')}</div>
                      <div className="text-sm text-muted-foreground">{t('privateDashboard.notifyPriceDrops')}</div>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="font-medium">{t('privateDashboard.inquiryNotifications')}</div>
                      <div className="text-sm text-muted-foreground">{t('privateDashboard.notifyInquiries')}</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('privateDashboard.privacySettings')}</CardTitle>
                  <CardDescription>{t('privateDashboard.controlPrivacyPreferences')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="font-medium">{t('privateDashboard.profileVisibility')}</div>
                      <div className="text-sm text-muted-foreground">{t('privateDashboard.makeProfileVisible')}</div>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="font-medium">{t('privateDashboard.showContactInfo')}</div>
                      <div className="text-sm text-muted-foreground">{t('privateDashboard.displayContactOnListings')}</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="font-medium">{t('privateDashboard.dataAnalytics')}</div>
                      <div className="text-sm text-muted-foreground">{t('privateDashboard.helpImproveService')}</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-100 rounded-2xl">
                <CardHeader>
                  <CardTitle>{t('privateDashboard.accountManagement')}</CardTitle>
                  <CardDescription>{t('privateDashboard.manageAccountAndData')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200"
                    onClick={handleExportData}
                    disabled={exportingData}
                  >
                    {exportingData ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                    {t('privateDashboard.downloadMyData')}
                  </Button>
                  <Button variant="outline" className="w-full bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                    <Shield className="h-4 w-4 mr-2" />
{t('privateDashboard.changePassword')}
                  </Button>
                  <Separator />
                  <Button
                    variant="destructive"
                    className="w-full rounded-full h-12"
                    onClick={handleDeleteAccount}
                    disabled={deletingAccount}
                  >
                    {deletingAccount ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    {t('privateDashboard.deleteAccount')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </Card>

        <p className="text-center text-muted-foreground mt-8">
          {t('privateDashboard.welcomeBackMessage').replace('{name}', userProfile.firstName)}
        </p>
      </div>
    </section>
    </>
      );
  }