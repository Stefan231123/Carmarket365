import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  TrendingUp, 
  Building2, 
  User, 
  Shield, 
  Search, 
  Car,
  BarChart3,
  ChevronRight,
  Crown
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useSafeAuth } from '../contexts/AuthContextSafe';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  color: string;
  badge?: string;
  features: string[];
}

function DashboardCard({ title, description, icon: Icon, onClick, color, badge, features }: DashboardCardProps) {
  return (
    <Card className="border-zinc-200 rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-zinc-50 group cursor-pointer overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-xl ${color} mb-4`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {badge && (
            <Badge variant="secondary" className="rounded-full text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
              {feature}
            </div>
          ))}
        </div>
        <Button 
          onClick={onClick}
          className="w-full h-12 rounded-full font-medium transition-all duration-300 group-hover:shadow-lg"
          size="lg"
        >
          Access Dashboard
          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DashboardSelector() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useSafeAuth();

  // If user is not admin, redirect them to their appropriate dashboard
  if (!user || user.role !== 'ADMIN') {
    if (user?.role === 'DEALER') {
      navigate('/dealer-dashboard');
      return null;
    } else if (user?.role === 'USER') {
      navigate('/private-dashboard');
      return null;
    } else {
      navigate('/signin');
      return null;
    }
  }

  const dashboardOptions = [
    {
      title: 'Admin Dashboard',
      description: 'Complete platform management and administrative controls',
      icon: Settings,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      badge: 'Primary',
      features: [
        'User Management & Roles',
        'Platform Analytics',
        'Listing Moderation',
        'System Health Monitoring',
        'Revenue & Transaction Reports'
      ],
      onClick: () => navigate('/admin-dashboard'),
    },
    {
      title: 'SEO Dashboard',
      description: 'Search engine optimization tools and analytics',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      badge: 'Marketing',
      features: [
        'Keyword Management',
        'Meta Data Optimization',
        'SEO Performance Analytics',
        'Technical SEO Audits',
        'Competitor Analysis'
      ],
      onClick: () => navigate('/admin/seo'),
    },
    {
      title: 'Dealer Dashboard',
      description: 'View dealer tools and management (Admin View)',
      icon: Building2,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      badge: 'View As',
      features: [
        'Inventory Management',
        'Sales Performance',
        'Customer Inquiries',
        'Dealer Analytics',
        'Lead Management'
      ],
      onClick: () => navigate('/dealer-dashboard'),
    },
    {
      title: 'Private Dashboard',
      description: 'Individual user experience (Admin View)',
      icon: User,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      badge: 'View As',
      features: [
        'Saved Cars & Favorites',
        'Search History',
        'Price Alerts',
        'Personal Profile',
        'Buying Activity'
      ],
      onClick: () => navigate('/private-dashboard'),
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-black to-gray-800 rounded-2xl mr-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Admin Dashboard Center
              </h1>
              <p className="text-lg text-gray-600">
                Welcome back, {user?.name || user?.email}
              </p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your dashboard to access different aspects of the CarMarket365 platform. 
            As an administrator, you have full access to all management tools.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center border-zinc-200 rounded-2xl">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          <Card className="text-center border-zinc-200 rounded-2xl">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">1,284</div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </CardContent>
          </Card>
          <Card className="text-center border-zinc-200 rounded-2xl">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Dealers</div>
            </CardContent>
          </Card>
          <Card className="text-center border-zinc-200 rounded-2xl">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">€89k</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {dashboardOptions.map((dashboard, index) => (
            <DashboardCard
              key={index}
              title={dashboard.title}
              description={dashboard.description}
              icon={dashboard.icon}
              color={dashboard.color}
              badge={dashboard.badge}
              features={dashboard.features}
              onClick={dashboard.onClick}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 p-1 bg-white rounded-full shadow-lg border border-zinc-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cars')}
              className="rounded-full hover:bg-gray-100"
            >
              <Car className="h-4 w-4 mr-2" />
              Browse Cars
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/registered-dealers')}
              className="rounded-full hover:bg-gray-100"
            >
              <Building2 className="h-4 w-4 mr-2" />
              View Dealers
            </Button>
            <Button
              variant="ghost"
              size="sm" 
              onClick={() => navigate('/advanced-search')}
              className="rounded-full hover:bg-gray-100"
            >
              <Search className="h-4 w-4 mr-2" />
              Advanced Search
            </Button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            All dashboards provide real-time data and comprehensive management capabilities.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            System Status: <span className="text-green-600 font-medium">Fully Operational</span>
          </p>
        </div>
      </div>
    </section>
  );
}