import { useState, useRef } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { GET_ALL_CAR_IMAGES, UPDATE_CAR_IMAGE_URL } from '@/lib/graphql/operations';
import { applyWatermark } from '@/lib/watermark';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface ImageRecord { id: string; url: string; thumbnailUrl?: string; carId: string; }
type JobStatus = 'idle' | 'running' | 'done' | 'error';

export default function AdminRewatermark() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<JobStatus>('idle');
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const abortRef = useRef(false);

  const [fetchImages] = useLazyQuery<{ getAllCarImages: ImageRecord[] }>(GET_ALL_CAR_IMAGES, {
    fetchPolicy: 'no-cache',
  });
  const [updateUrl] = useMutation(UPDATE_CAR_IMAGE_URL);

  const run = async () => {
    abortRef.current = false;
    setStatus('running');
    setDone(0); setSkipped(0); setErrors([]);

    const { data, error } = await fetchImages();
    if (error || !data) {
      setErrors([error?.message || 'Failed to fetch images']);
      setStatus('error');
      return;
    }

    const images = data.getAllCarImages;
    setTotal(images.length);

    for (const img of images) {
      if (abortRef.current) break;

      // Skip if already baked (Cloudinary URL with no transformation = clean original)
      // We detect old originals: URL contains /upload/ but NO existing l_fetch (not yet display-time watermarked at source)
      // The goal: re-upload so the stored file has the watermark baked in pixel-level
      try {
        // Fetch the original image as a Blob
        const response = await fetch(img.url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        const file = new File([blob], `image-${img.id}.jpg`, { type: blob.type || 'image/jpeg' });

        // Apply canvas watermark
        const watermarkedFile = await applyWatermark(file);

        // Upload to Cloudinary (new URL, new file with watermark baked in)
        const result = await uploadToCloudinary(watermarkedFile);

        // Update DB record
        await updateUrl({ variables: { id: img.id, url: result.url, thumbnailUrl: result.thumbnailUrl } });

        setDone(d => d + 1);
      } catch (err: any) {
        setErrors(prev => [...prev, `Image ${img.id}: ${err?.message || 'Unknown error'}`]);
        setSkipped(s => s + 1);
      }
    }

    setStatus('done');
  };

  const abort = () => { abortRef.current = true; };

  const pct = total > 0 ? Math.round(((done + skipped) / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-zinc-100 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin-dashboard')} className="rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" /> Admin Dashboard
          </Button>
          <h1 className="text-2xl font-semibold">Bulk Re-Watermark Images</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Bake Watermark Into All Existing Images
            </CardTitle>
            <CardDescription>
              Downloads every car image, applies the CarMarket365 logo watermark at the pixel level,
              and re-uploads it to Cloudinary — replacing the clean original so scrapers can no longer
              bypass the watermark by stripping the URL transformation.
              <br /><br />
              <strong>This is a one-time operation.</strong> New uploads already have the watermark baked in automatically.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {status === 'idle' && (
              <Button onClick={run} className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-full">
                Start Re-Watermarking All Images
              </Button>
            )}

            {status === 'running' && (
              <div className="space-y-4">
                <Progress value={pct} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing {done + skipped} / {total}
                  </span>
                  <span>{pct}%</span>
                </div>
                {errors.length > 0 && (
                  <p className="text-sm text-amber-600">{errors.length} error(s) so far — continuing…</p>
                )}
                <Button variant="outline" onClick={abort} className="w-full rounded-full border-zinc-200">
                  Stop
                </Button>
              </div>
            )}

            {status === 'done' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Completed</span>
                </div>
                <Progress value={100} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div><div className="text-2xl font-bold text-green-600">{done}</div><div className="text-muted-foreground">Updated</div></div>
                  <div><div className="text-2xl font-bold text-amber-500">{skipped}</div><div className="text-muted-foreground">Skipped</div></div>
                  <div><div className="text-2xl font-bold">{total}</div><div className="text-muted-foreground">Total</div></div>
                </div>
                {errors.length > 0 && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-amber-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.length} error(s)
                    </summary>
                    <ul className="mt-2 space-y-1 text-muted-foreground max-h-40 overflow-y-auto">
                      {errors.map((e, i) => <li key={i} className="truncate">{e}</li>)}
                    </ul>
                  </details>
                )}
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Failed to start</span>
                </div>
                <p className="text-sm text-muted-foreground">{errors[0]}</p>
                <Button onClick={run} className="w-full rounded-full">Retry</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
