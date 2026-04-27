-- Create public bucket for questionnaire photo uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('questionnaire-uploads', 'questionnaire-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone (anon + authenticated) to upload to this bucket
CREATE POLICY "Anyone can upload questionnaire photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'questionnaire-uploads');

-- Allow anyone to read files (bucket is public)
CREATE POLICY "Anyone can view questionnaire photos"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'questionnaire-uploads');