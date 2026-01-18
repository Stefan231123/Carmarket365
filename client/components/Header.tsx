import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, User, Heart, Car, Building2, Settings, LogOut, Search } from "lucide-react";
import { useSafeAuth } from "@/contexts/AuthContextSafe";
import { useTranslation } from "@/hooks/useTranslation";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onSignInClick?: () => void;
  onHomeClick?: () => void;
  onSellClick?: () => void;
  onSavedClick?: () => void;
  onExpressSellClick?: () => void;
}

export function Header({ 
  onSignInClick, 
  onHomeClick, 
  onSellClick, 
  onSavedClick, 
  onExpressSellClick
}: HeaderProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useSafeAuth();
  const { t, currentLanguage } = useTranslation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Dashboard redirect logic based on user role
  const handleDashboardClick = () => {
    if (!isAuthenticated || !user) {
      onSignInClick?.();
      return;
    }
    
    // For now, use React Router navigation. In production with subdomains, 
    // this logic can be updated to handle cross-subdomain navigation
    switch (user.role) {
      case 'ADMIN':
        navigate('/admin-dashboard');
        break;
      case 'DEALER':
        navigate('/dealer-dashboard');
        break;
      case 'USER':
      default:
        navigate('/private-dashboard');
        break;
    }
  };

  // Get dashboard label based on user role
  const getDashboardLabel = () => {
    if (!user) return t('header.dashboard');
    
    switch (user.role) {
      case 'ADMIN':
        return t('admin.dashboard');
      case 'DEALER':
        return t('header.dashboard');
      case 'USER':
      default:
        return t('header.dashboard');
    }
  };

  // Get dashboard icon based on user role
  const getDashboardIcon = () => {
    if (!user) return User;
    
    switch (user.role) {
      case 'ADMIN':
        return Settings;
      case 'DEALER':
        return Building2;
      case 'USER':
      default:
        return User;
    }
  };

  const handleNavClick = (action?: () => void) => {
    action?.();
    closeMobileMenu();
  };

  return (
    <header className="border-b border-white/10 bg-black sticky top-0 z-50 shadow-lg shadow-black/50 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Primary Navigation */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer hover:shadow-md hover:shadow-white/10 rounded-lg px-2 py-1 transition-all duration-200" onClick={onHomeClick}>
              <Car className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              <span className="text-lg sm:text-xl font-bold text-white">{t('brand.name')}</span>
            </div>
            
            {/* Prominent Sell Link */}
            <div className="hidden sm:flex">
              <Button 
                variant="outline"
                size="sm"
                onClick={onSellClick}
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white hover:text-white hover:shadow-lg hover:shadow-white/20 transition-all duration-200 rounded-full px-4"
              >
                <Car className="h-4 w-4 mr-2" />
                {t('header.sellCar')}
              </Button>
            </div>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onSavedClick} className="text-white hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/20 transition-all duration-200 rounded-full px-4">
              <Heart className="h-4 w-4 mr-2" />
              {t('header.savedCars')}
            </Button>
            
            <CountrySwitcher className="text-white" />
            
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {/* Dashboard Button */}
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleDashboardClick} 
                  className="hover:shadow-lg hover:shadow-black/25 transition-all duration-200"
                >
                  {(() => {
                    const IconComponent = getDashboardIcon();
                    return (
                      <>
                        <IconComponent className="h-4 w-4 mr-2" />
                        <span className="hidden lg:inline">{getDashboardLabel()}</span>
                        <span className="lg:hidden">{t('header.dashboard')}</span>
                      </>
                    );
                  })()}
                </Button>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/20 transition-all duration-200 rounded-full px-3">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {user.role.toLowerCase()} {t('auth.userType')}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDashboardClick}>
                      {(() => {
                        const IconComponent = getDashboardIcon();
                        return (
                          <>
                            <IconComponent className="mr-2 h-4 w-4" />
                            <span>{getDashboardLabel()}</span>
                          </>
                        );
                      })()}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('header.signOut')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={onSignInClick} className="text-white hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/20 transition-all duration-200 rounded-full px-4">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">{t('header.signIn')}</span>
              </Button>
            )}
            
            <Button size="sm" onClick={onExpressSellClick} className="bg-white text-black hover:bg-white/90 hover:shadow-lg hover:shadow-white/25 transition-all duration-200 rounded-full px-4">
              <span className="hidden lg:inline">
                {t('sell.expressTitle')}
              </span>
              <span className="lg:hidden">
                {t('sell.expressTitle')}
              </span>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={onSavedClick} 
              className="text-white hover:bg-white/10 rounded-full px-4 py-3 min-w-[44px] min-h-[44px]"
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="text-white hover:bg-white/10 rounded-full px-4 py-3 min-w-[44px] min-h-[44px]"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>{t('common.menu')}</SheetTitle>
                  <SheetDescription>
                    {t('header.welcome')}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 text-base" 
                    onClick={() => handleNavClick(onSellClick)}
                  >
                    <Car className="h-5 w-5 mr-3" />
                    {t('header.sellCar')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 text-base" 
                    onClick={() => handleNavClick(onExpressSellClick)}
                  >
                    <Car className="h-5 w-5 mr-3" />
                    {t('sell.expressTitle')}
                  </Button>
                  {isAuthenticated && user ? (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start h-12 text-base" 
                        onClick={() => handleNavClick(handleDashboardClick)}
                      >
                        {(() => {
                          const IconComponent = getDashboardIcon();
                          return (
                            <>
                              <IconComponent className="h-5 w-5 mr-3" />
                              {getDashboardLabel()}
                            </>
                          );
                        })()}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start h-12 text-base text-red-600 border-red-200 hover:bg-red-50" 
                        onClick={() => handleNavClick(logout)}
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        {t('header.signOut')}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 text-base" 
                      onClick={() => handleNavClick(onSignInClick)}
                    >
                      <User className="h-5 w-5 mr-3" />
                      {t('header.signIn')}
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
