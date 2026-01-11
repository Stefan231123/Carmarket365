import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Phone, 
  Mail, 
  Calendar,
  Gauge,
  Fuel,
  Euro,
  Eye,
  Trash2,
  Edit3,
  MessageSquare,
  Bell,
  Shield,
  Download,
  Upload,
  Camera,
  Menu
} from "lucide-react";
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useTranslation } from '../hooks/useTranslation';

export default function PrivateDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("saved");
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+49 30 12345678",
    city: "Berlin",
    country: "Germany",
    avatar: ""
  });

  // Mock data for saved cars
  const savedCars = [
    {
      id: "1",
      make: "BMW",
      model: "3 Series",
      year: 2022,
      price: 45000,
      mileage: 25000,
      fuel: "Diesel",
      location: "Berlin",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      savedDate: "2024-01-15"
    },
    {
      id: "2",
      make: "Audi",
      model: "A4",
      year: 2021,
      price: 42000,
      mileage: 35000,
      fuel: "Petrol",
      location: "Munich",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
      savedDate: "2024-01-20"
    }
  ];

  // Mock data for user's listings
  const userListings = [
    {
      id: "3",
      make: "Volkswagen",
      model: "Golf",
      year: 2019,
      price: 18500,
      mileage: 45000,
      fuel: "Petrol",
      location: "Berlin",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      status: "Active",
      views: 127,
      inquiries: 8,
      createdDate: "2024-01-10"
    }
  ];

  // Mock data for express sale listings
  const expressListings = [
    {
      id: "4",
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2020,
      estimatedPrice: "€32,000 - €35,000",
      mileage: 28000,
      fuel: "Hybrid",
      status: "Under Review",
      submittedDate: "2024-01-25",
      photos: 12
    }
  ];

  // Mock data for last searches
  const lastSearches = [
    {
      id: "1",
      query: "BMW 3 Series 2020-2023",
      filters: "Price: €30k-€50k, Location: Berlin",
      results: 45,
      searchDate: "2024-01-28"
    },
    {
      id: "2",
      query: "Audi A4 Diesel",
      filters: "Price: €35k-€45k, Mileage: <50k km",
      results: 23,
      searchDate: "2024-01-27"
    }
  ];

  const handleProfileUpdate = () => {
    console.log("Profile updated:", userProfile);
    alert(t('privateDashboard.profileUpdatedSuccessfully'));
  };

  const handleRemoveSaved = (carId: string) => {
    console.log("Removing saved car:", carId);
    alert(t('privateDashboard.carRemovedFromSaved'));
  };

  const handleDeleteListing = (listingId: string) => {
    console.log("Deleting listing:", listingId);
    alert(t('privateDashboard.listingDeletedSuccessfully'));
  };

  const onBackToHome = () => {
    navigate('/');
  };

  const onViewListing = () => {
    navigate('/car-detail/1');
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
                                <span>{car.fuel}</span>
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
                            <Button size="sm" onClick={onViewListing} className="flex-1 sm:flex-none bg-black text-white hover:bg-black/90 rounded-full px-6 h-12 shadow-md">
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
              <Button size="sm" className="bg-black text-white hover:bg-black/90 rounded-full px-6 h-12 shadow-md">
                <Search className="h-4 w-4 mr-2" />
{t('privateDashboard.newSearch')}
              </Button>
            </div>

            <div className="grid gap-4">
              {lastSearches.map((search) => (
                <Card key={search.id} className="border-zinc-100 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-medium">{search.query}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{search.filters}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                          <span>{search.results} {t('privateDashboard.resultsFound')}</span>
                          <span>{t('privateDashboard.searchedOn')} {new Date(search.searchDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                          <Search className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">{t('privateDashboard.searchAgain')}</span>
                          <span className="sm:hidden">{t('privateDashboard.search')}</span>
                        </Button>
                        <Button size="sm" className="flex-1 sm:flex-none bg-black text-white hover:bg-black/90 rounded-full h-12 shadow-md">
                          <span className="hidden sm:inline">{t('privateDashboard.viewResults')}</span>
                          <span className="sm:hidden">{t('privateDashboard.results')}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

            <div className="grid gap-4 sm:gap-6">
              {userListings.map((listing) => (
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
                              <Badge variant="secondary" className="rounded-full">{listing.status}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Gauge className="h-3 w-3 mr-1" />
                                {listing.mileage.toLocaleString()} km
                              </span>
                              <span className="flex items-center">
                                <Fuel className="h-3 w-3 mr-1" />
                                {listing.fuel}
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
                            <Button size="sm" onClick={onViewListing} className="flex-1 sm:flex-none bg-black text-white hover:bg-black/90 rounded-full h-12 shadow-md">
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

            <div className="grid gap-4 sm:gap-6">
              {expressListings.map((listing) => (
                <Card key={listing.id} className="border-zinc-100 rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-medium">{listing.year} {listing.make} {listing.model}</h3>
                          <Badge variant={listing.status === "Under Review" ? "secondary" : "default"} className="rounded-full">
                            {listing.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Gauge className="h-3 w-3 mr-1" />
                            {listing.mileage.toLocaleString()} km
                          </span>
                          <span className="flex items-center">
                            <Fuel className="h-3 w-3 mr-1" />
                            {listing.fuel}
                          </span>
                          <span className="flex items-center">
                            <Camera className="h-3 w-3 mr-1" />
{listing.photos} {t('privateDashboard.photos')}
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-primary mt-2">
{t('privateDashboard.estimatedValue')} {listing.estimatedPrice}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
{t('privateDashboard.submittedOn')} {new Date(listing.submittedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col gap-2">
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                          <Eye className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">{t('privateDashboard.viewDetails')}</span>
                          <span className="sm:hidden">{t('privateDashboard.view')}</span>
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                          <Edit3 className="h-4 w-4 mr-2" />
{t('privateDashboard.edit')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    <AvatarFallback className="text-lg">{userProfile.firstName[0]}{userProfile.lastName[0]}</AvatarFallback>
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
                  <Button variant="outline" className="w-full bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                    <Download className="h-4 w-4 mr-2" />
{t('privateDashboard.downloadMyData')}
                  </Button>
                  <Button variant="outline" className="w-full bg-zinc-100 border-none rounded-full h-12 hover:bg-zinc-200">
                    <Shield className="h-4 w-4 mr-2" />
{t('privateDashboard.changePassword')}
                  </Button>
                  <Separator />
                  <Button variant="destructive" className="w-full rounded-full h-12">
{t('privateDashboard.deleteAccount')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </Card>

        <p className="text-center text-muted-foreground mt-8">
          Welcome back <span className="font-semibold">{userProfile.firstName}</span> - manage your car market experience
        </p>
      </div>
    </section>
      );
  }