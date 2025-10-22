import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Outfit = {
  id: string;
  title: string;
  image_url: string;
  category: string;
  season: string;
  occasion: string;
  is_trending: boolean;
  created_at: string;
};

export type OutfitItem = {
  id: string;
  outfit_id: string;
  item_type: string;
  item_name: string;
  brand: string;
  price: number;
  affiliate_link: string;
  retailer: string;
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category: string;
  published_at: string;
  created_at: string;
};

export type Retailer = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  category: string;
  is_sustainable: boolean;
  created_at: string;
};
