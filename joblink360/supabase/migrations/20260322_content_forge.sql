-- Sovereign Content Forge - Database Schema
-- Run this in Supabase SQL Editor

-- Create course_modules table
CREATE TABLE IF NOT EXISTS course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id VARCHAR(100) NOT NULL,
    module_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_md TEXT,
    summary TEXT,
    key_points JSONB DEFAULT '[]'::jsonb,
    action_plan TEXT,
    original_video_url VARCHAR(500),
    video_embed_url VARCHAR(500),
    audio_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    duration VARCHAR(50),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(course_id, module_number)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_status ON course_modules(status);

-- Add module_count to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS module_count INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_duration VARCHAR(50);

-- Enable RLS
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view published modules" ON course_modules
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can manage modules" ON course_modules
    FOR ALL USING (auth.role() = 'authenticated');

-- Update trigger
CREATE OR REPLACE FUNCTION update_course_module_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE courses SET module_count = module_count + 1 
        WHERE id = NEW.course_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE courses SET module_count = module_count - 1 
        WHERE id = OLD.course_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_module_count
    AFTER INSERT OR DELETE ON course_modules
    FOR EACH ROW
    EXECUTE FUNCTION update_course_module_count();
