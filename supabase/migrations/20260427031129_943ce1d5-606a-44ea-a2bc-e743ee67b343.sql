-- Drop the SELECT policy that allowed listing all files in the bucket.
-- Public buckets are still accessible via direct public URLs without a SELECT policy.
DROP POLICY IF EXISTS "Anyone can view questionnaire photos" ON storage.objects;