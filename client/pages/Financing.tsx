import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  DollarSign, 
  TrendingDown, 
  Shield, 
  Clock, 
  CheckCircle,
  PiggyBank,
  CreditCard,
  FileText,
  Phone,
  Mail,
  Users
} from "lucide-react";

interface LoanCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export default function Financing() {
  const { t } = useTranslation();
  const [loanAmount, setLoanAmount] = useState([25000]);
  const [downPayment, setDownPayment] = useState([5000]);
  const [loanTerm, setLoanTerm] = useState("60");
  const [interestRate, setInterestRate] = useState([6.5]);
  const [creditScore, setCreditScore] = useState("good");
  const [calculation, setCalculation] = useState<LoanCalculation>({
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  const creditScoreRanges = [
    { value: "excellent", label: "Excellent (750+)", rate: 4.5 },
    { value: "good", label: "Good (650-749)", rate: 6.5 },
    { value: "fair", label: "Fair (550-649)", rate: 10.5 },
    { value: "poor", label: "Poor (300-549)", rate: 15.5 }
  ];

  const loanTerms = [
    { value: "36", label: "36 months" },
    { value: "48", label: "48 months" },
    { value: "60", label: "60 months" },
    { value: "72", label: "72 months" },
    { value: "84", label: "84 months" }
  ];

  // Calculate loan when inputs change
  useEffect(() => {
    const principal = loanAmount[0] - downPayment[0];
    const monthlyRate = interestRate[0] / 100 / 12;
    const numPayments = parseInt(loanTerm);

    if (principal > 0 && monthlyRate > 0 && numPayments > 0) {
      const monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
                           (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalPayment = monthlyPayment * numPayments;
      const totalInterest = totalPayment - principal;

      setCalculation({
        monthlyPayment,
        totalInterest,
        totalPayment
      });
    }
  }, [loanAmount, downPayment, loanTerm, interestRate]);

  // Update interest rate when credit score changes
  useEffect(() => {
    const scoreData = creditScoreRanges.find(score => score.value === creditScore);
    if (scoreData) {
      setInterestRate([scoreData.rate]);
    }
  }, [creditScore]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-car-blue/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('hardcodedFixes.financing.hero.title')}
          </h1>
          <p className="text-lg text-car-gray mb-8 max-w-2xl mx-auto">
            {t('hardcodedFixes.financing.hero.subtitle')}
          </p>
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('hardcodedFixes.financing.features.quickApproval.title')}</h3>
              <p className="text-sm text-car-gray">{t('hardcodedFixes.financing.features.quickApproval.description')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <TrendingDown className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('hardcodedFixes.financing.features.lowRates.title')}</h3>
              <p className="text-sm text-car-gray">{t('hardcodedFixes.financing.features.lowRates.description')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('hardcodedFixes.financing.features.noCreditImpact.title')}</h3>
              <p className="text-sm text-car-gray">{t('hardcodedFixes.financing.features.noCreditImpact.description')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('hardcodedFixes.financing.features.expertSupport.title')}</h3>
              <p className="text-sm text-car-gray">{t('hardcodedFixes.financing.features.expertSupport.description')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Loan Calculator */}
          <div>
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {t('hardcodedFixes.financing.calculator.title')}
                </CardTitle>
                <CardDescription>
                  {t('hardcodedFixes.financing.calculator.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Vehicle Price */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('hardcodedFixes.financing.calculator.vehiclePrice')} {formatCurrency(loanAmount[0])}
                  </label>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    max={100000}
                    min={5000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-car-gray mt-1">
                    <span>$5,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('hardcodedFixes.financing.calculator.downPayment')} {formatCurrency(downPayment[0])} 
                    <span className="text-car-gray ml-2">
                      ({((downPayment[0] / loanAmount[0]) * 100).toFixed(1)}%)
                    </span>
                  </label>
                  <Slider
                    value={downPayment}
                    onValueChange={setDownPayment}
                    max={loanAmount[0] * 0.5}
                    min={0}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-car-gray mt-1">
                    <span>$0</span>
                    <span>{formatCurrency(loanAmount[0] * 0.5)}</span>
                  </div>
                </div>

                {/* Credit Score */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">{t('hardcodedFixes.financing.form.creditScoreRange')}</label>
                  <Select value={creditScore} onValueChange={setCreditScore}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {creditScoreRanges.map((score) => (
                        <SelectItem key={score.value} value={score.value}>
                          {score.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('hardcodedFixes.financing.calculator.interestRate')} {interestRate[0].toFixed(2)}% {t('hardcodedFixes.financing.calculator.aprLabel')}
                  </label>
                  <Slider
                    value={interestRate}
                    onValueChange={setInterestRate}
                    max={20}
                    min={2}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-car-gray mt-1">
                    <span>2.0%</span>
                    <span>20.0%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">{t('hardcodedFixes.financing.form.loanTerm')}</label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger className="h-12 bg-zinc-100 rounded-full border-none focus-visible:ring-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTerms.map((term) => (
                        <SelectItem key={term.value} value={term.value}>
                          {term.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Calculation Results */}
                <div className="bg-car-gray-light rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-foreground mb-4">{t('hardcodedFixes.financing.summary.loanSummary')}</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-car-gray">{t('hardcodedFixes.financing.summary.loanAmount')}</div>
                      <div className="text-lg font-semibold text-foreground">
                        {formatCurrency(loanAmount[0] - downPayment[0])}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-car-gray">{t('hardcodedFixes.financing.summary.monthlyPayment')}</div>
                      <div className="text-lg font-semibold text-primary">
                        {formatCurrency(calculation.monthlyPayment)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-car-gray">{t('hardcodedFixes.financing.summary.totalInterest')}</div>
                      <div className="text-lg font-semibold text-foreground">
                        {formatCurrency(calculation.totalInterest)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-car-gray">{t('hardcodedFixes.financing.summary.totalPayment')}</div>
                      <div className="text-lg font-semibold text-foreground">
                        {formatCurrency(calculation.totalPayment)}
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-black text-white hover:bg-black/90 rounded-full h-12" size="lg">
                  {t('hardcodedFixes.financing.contact.getPreApprovedNow')}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Financing Options & Information */}
          <div className="space-y-6">
            {/* Financing Options */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('hardcodedFixes.financing.options.financingOptions')}</CardTitle>
                <CardDescription>{t('hardcodedFixes.financing.options.chooseOption')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-zinc-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{t('hardcodedFixes.financing.options.traditionalAutoLoan')}</h4>
                    <Badge variant="secondary" className="rounded-full">{t('hardcodedFixes.financing.options.mostPopular')}</Badge>
                  </div>
                  <p className="text-sm text-car-gray mb-3">
                    {t('hardcodedFixes.financing.options.traditionalAutoLoanDescription')}
                  </p>
                  <ul className="text-sm text-car-gray space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.fixedInterestRates')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.termsFromMonths')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.noMileageRestrictions')}
                    </li>
                  </ul>
                </div>

                <div className="border border-zinc-100 rounded-2xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">{t('hardcodedFixes.financing.options.leaseOptions')}</h4>
                  <p className="text-sm text-car-gray mb-3">
                    {t('hardcodedFixes.financing.options.leaseOptionsDescription')}
                  </p>
                  <ul className="text-sm text-car-gray space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.lowerMonthlyPayments')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.latestModelAvailability')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.warrantyCoverageIncluded')}
                    </li>
                  </ul>
                </div>

                <div className="border border-zinc-100 rounded-2xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">{t('hardcodedFixes.financing.options.badCreditFinancing')}</h4>
                  <p className="text-sm text-car-gray mb-3">
                    {t('hardcodedFixes.financing.options.badCreditFinancingDescription')}
                  </p>
                  <ul className="text-sm text-car-gray space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.noMinimumCreditScore')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.creditRebuildingPrograms')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      {t('hardcodedFixes.financing.options.quickApprovalProcess')}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Financing Tips */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5" />
                  {t('hardcodedFixes.financing.tips.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t('hardcodedFixes.financing.tips.checkCreditScore')}</h4>
                      <p className="text-sm text-car-gray">
                        {t('hardcodedFixes.financing.tips.checkCreditScoreDesc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t('hardcodedFixes.financing.tips.saveForDownPayment')}</h4>
                      <p className="text-sm text-car-gray">
                        {t('hardcodedFixes.financing.tips.saveForDownPaymentDesc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t('hardcodedFixes.financing.tips.gatherDocumentation')}</h4>
                      <p className="text-sm text-car-gray">
                        {t('hardcodedFixes.financing.tips.gatherDocumentationDesc')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <Calculator className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t('hardcodedFixes.financing.tips.considerTotalCost')}</h4>
                      <p className="text-sm text-car-gray">
                        {t('hardcodedFixes.financing.tips.considerTotalCostDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle>{t('hardcodedFixes.financing.contact.needHelp')}</CardTitle>
                <CardDescription>{t('hardcodedFixes.financing.contact.needHelpDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{t('hardcodedFixes.financing.contact.callSpecialists')}</div>
                    <div className="text-sm text-car-gray">{t('hardcodedFixes.financing.contact.phone')}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{t('hardcodedFixes.financing.contact.emailSupport')}</div>
                    <div className="text-sm text-car-gray">{t('hardcodedFixes.financing.contact.email')}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{t('hardcodedFixes.financing.contact.hours')}</div>
                    <div className="text-sm text-car-gray">
                      {t('hardcodedFixes.financing.contact.hoursValue')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
