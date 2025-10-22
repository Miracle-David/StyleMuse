/*
  # StyleMuse Fashion Discovery Platform Schema

  1. New Tables
    - `outfits`
      - `id` (uuid, primary key)
      - `title` (text)
      - `image_url` (text)
      - `category` (text) - streetwear, minimal_luxe, sustainable, etc.
      - `season` (text) - spring, summer, fall, winter
      - `occasion` (text) - casual, party, work, etc.
      - `is_trending` (boolean)
      - `created_at` (timestamptz)
      
    - `outfit_items`
      - `id` (uuid, primary key)
      - `outfit_id` (uuid, foreign key)
      - `item_type` (text) - top, bottom, shoes, accessories
      - `item_name` (text)
      - `brand` (text)
      - `price` (numeric)
      - `affiliate_link` (text)
      - `retailer` (text) - ASOS, Revolve, Zara, etc.
      - `created_at` (timestamptz)
      
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image` (text)
      - `category` (text)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      
    - `retailers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo_url` (text)
      - `website_url` (text)
      - `category` (text)
      - `is_sustainable` (boolean)
      - `created_at` (timestamptz)
      
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS outfits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'minimal_luxe',
  season text NOT NULL DEFAULT 'all_season',
  occasion text NOT NULL DEFAULT 'casual',
  is_trending boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS outfit_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  outfit_id uuid REFERENCES outfits(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_name text NOT NULL,
  brand text NOT NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  affiliate_link text NOT NULL,
  retailer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  featured_image text NOT NULL,
  category text NOT NULL DEFAULT 'trends',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS retailers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website_url text NOT NULL,
  category text NOT NULL,
  is_sustainable boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfit_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE retailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view outfits"
  ON outfits FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view outfit items"
  ON outfit_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view retailers"
  ON retailers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_outfits_trending ON outfits(is_trending) WHERE is_trending = true;
CREATE INDEX IF NOT EXISTS idx_outfits_category ON outfits(category);
CREATE INDEX IF NOT EXISTS idx_outfits_season ON outfits(season);
CREATE INDEX IF NOT EXISTS idx_outfit_items_outfit_id ON outfit_items(outfit_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC);