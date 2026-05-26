import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Trash2, AlertTriangle, CheckCircle, Loader2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { SEO } from "@/components/SEO";
import { useSafeAuth } from "@/contexts/AuthContextSafe";
import { apiClient } from "@shared/api-client";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useSafeAuth();
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState("");

  // Logged-in user: delete account directly via API
  const handleDeleteLoggedIn = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account and ALL associated data? This action cannot be undone."
    );
    if (!confirmed) return;

    // Double confirmation
    const doubleConfirm = window.confirm(
      "FINAL WARNING: This will permanently delete your account, all your listings, images, favorites, and messages. Are you absolutely sure?"
    );
    if (!doubleConfirm) return;

    setDeleting(true);
    setError("");
    try {
      await apiClient.deleteMyAccount();
      setDeleted(true);
      await logout();
    } catch (err) {
      setError("Failed to delete account. Please try again or contact support@carmarket365.com");
      setDeleting(false);
    }
  };

  // Not logged in: submit email-based deletion request
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO title="Delete Account & Data" canonical="/delete-account" />

      {/* Header */}
      <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button variant="ghost" onClick={() => navigate('/')} className="bg-white/10 text-muted-foreground hover:bg-white/20 rounded-full px-6 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Delete Account & Data
            </h1>
            <p className="text-lg text-muted-foreground">
              Permanently delete your CarMarket365 account and all associated data.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">

          {/* What gets deleted */}
          <Card className="mb-8 border-orange-200 bg-orange-50 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-orange-900">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                What will be deleted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-orange-800 space-y-2">
                <li>&#8226; Your account profile (name, email, phone number)</li>
                <li>&#8226; All your vehicle listings and associated images</li>
                <li>&#8226; Your saved favorites and search history</li>
                <li>&#8226; All messages and inquiries</li>
                <li>&#8226; Location data associated with your account</li>
                <li>&#8226; Authentication tokens and login sessions</li>
              </ul>
              <p className="text-sm text-orange-700 mt-4 font-medium">
                This action is permanent and cannot be undone.
              </p>
            </CardContent>
          </Card>

          {/* Deletion completed */}
          {deleted && (
            <Card className="mb-8 border-green-200 bg-green-50 rounded-2xl">
              <CardContent className="pt-6">
                <div className="text-center py-6">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Account Deleted</h3>
                  <p className="text-sm text-green-700 mb-6">
                    Your account and all associated data have been permanently deleted.
                  </p>
                  <Button onClick={() => navigate('/')} className="rounded-full">
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Logged-in user: direct delete */}
          {!deleted && isAuthenticated && user && (
            <Card className="mb-8 border-2 border-red-300 bg-red-50/50 rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-red-900">
                  <Trash2 className="h-6 w-6 text-red-600" />
                  Delete your account
                </CardTitle>
                <CardDescription className="text-base">
                  You are logged in as <strong className="text-foreground">{user.email}</strong>. You can delete your account and all data immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <Button
                  variant="destructive"
                  className="w-full rounded-full h-14 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg"
                  onClick={handleDeleteLoggedIn}
                  disabled={deleting}
                >
                  {deleting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  {deleting ? "Deleting account..." : "Permanently Delete My Account"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Not logged-in: show login option + email form */}
          {!deleted && !isAuthenticated && (
            <Card className="mb-8 border-zinc-100 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-red-600" />
                  Delete your account
                </CardTitle>
                <CardDescription>
                  Choose one of the methods below to delete your account and data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Option 1: Log in first */}
                <div>
                  <h3 className="font-semibold mb-2">Option 1: Log in and delete instantly</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sign in to your account to delete it immediately with all associated data.
                  </p>
                  <Button onClick={() => navigate('/signin')} variant="outline" className="rounded-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In to Delete Account
                  </Button>
                </div>

                {/* Option 2: Email form */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-2">Option 2: Submit a deletion request</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you cannot access your account, enter your email below. We will verify and delete your account within 30 days.
                  </p>

                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                      <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-green-900 mb-2">Request Submitted</h3>
                      <p className="text-sm text-green-700">
                        We have received your deletion request for <strong>{email}</strong>. Your account and all associated data will be deleted within 30 days. You will receive a confirmation email once complete.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitRequest} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Email address associated with your account *</label>
                        <Input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Reason for deletion (optional)</label>
                        <Textarea
                          placeholder="Let us know why you're leaving (optional)"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="rounded-xl"
                          rows={3}
                        />
                      </div>
                      <Button type="submit" variant="destructive" className="w-full rounded-full h-12">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Submit Deletion Request
                      </Button>
                    </form>
                  )}
                </div>

                {/* Option 3: Email directly */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-2">Option 3: Contact us directly</h3>
                  <p className="text-sm text-muted-foreground">
                    Email <a href="mailto:support@carmarket365.com" className="text-primary hover:underline font-medium">support@carmarket365.com</a> with the subject "Account Deletion Request" and include the email associated with your account.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data retention info */}
          <Card className="border-zinc-100 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Data Retention Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>&#8226; Direct account deletions (logged-in users) are processed <strong>immediately</strong>.</li>
                <li>&#8226; Email-based deletion requests are processed within <strong>30 days</strong>.</li>
                <li>&#8226; Anonymized analytics data may be retained for service improvement.</li>
                <li>&#8226; Legal records required by law may be retained for the minimum required period.</li>
                <li>&#8226; Backup copies are purged within 90 days.</li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
