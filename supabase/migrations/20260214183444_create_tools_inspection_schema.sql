/*
  # Tools Inspection Platform Schema

  1. New Tables
    - `tools`
      - `id` (uuid, primary key) - Unique identifier for each tool
      - `barcode` (text, unique) - Unique barcode identifier for the tool
      - `name` (text) - Tool name/description
      - `category` (text) - Tool category (e.g., power tools, hand tools, etc.)
      - `serial_number` (text) - Manufacturer serial number
      - `photo_url` (text) - URL to tool photo
      - `created_at` (timestamptz) - When the tool was registered
      - `updated_at` (timestamptz) - Last update timestamp

    - `inspections`
      - `id` (uuid, primary key) - Unique identifier for each inspection
      - `tool_id` (uuid, foreign key) - References the tool being inspected
      - `inspector_name` (text) - Name of the person conducting inspection
      - `inspection_date` (date) - Date of inspection
      - `status` (text) - Inspection status (passed, failed, needs_repair)
      - `notes` (text) - Inspection notes and observations
      - `photo_url` (text) - URL to inspection photo
      - `created_at` (timestamptz) - When the inspection was recorded

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (for platform usage)
    
  3. Indexes
    - Index on barcode for fast lookups
    - Index on tool_id in inspections for query performance
*/

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  barcode text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  serial_number text DEFAULT '',
  photo_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create inspections table
CREATE TABLE IF NOT EXISTS inspections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  inspector_name text NOT NULL,
  inspection_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'passed',
  notes text DEFAULT '',
  photo_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tools_barcode ON tools(barcode);
CREATE INDEX IF NOT EXISTS idx_inspections_tool_id ON inspections(tool_id);
CREATE INDEX IF NOT EXISTS idx_inspections_date ON inspections(inspection_date DESC);

-- Enable Row Level Security
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

-- Create policies for tools table
CREATE POLICY "Anyone can view tools"
  ON tools FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tools"
  ON tools FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tools"
  ON tools FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete tools"
  ON tools FOR DELETE
  USING (true);

-- Create policies for inspections table
CREATE POLICY "Anyone can view inspections"
  ON inspections FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert inspections"
  ON inspections FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update inspections"
  ON inspections FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete inspections"
  ON inspections FOR DELETE
  USING (true);

-- Add constraint for inspection status
ALTER TABLE inspections ADD CONSTRAINT valid_status 
  CHECK (status IN ('passed', 'failed', 'needs_repair'));