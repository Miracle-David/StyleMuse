'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { supabase, type BlogPost } from '@/lib/supabase';
import { format } from 'date-fns';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (data) setPosts(data);
    setLoading(false);
  }

  const samplePosts = [
    {
      id: '1',
      title: 'Spring 2025 Trend Forecast',
      excerpt: 'Discover the must-have pieces and emerging styles dominating runways this season.',
      featured_image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Trends',
      published_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'How to Build a Capsule Wardrobe',
      excerpt: 'Essential tips for creating a versatile, sustainable closet with timeless pieces.',
      featured_image: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Style Guide',
      published_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Sustainable Fashion Brands to Know',
      excerpt: 'Meet the eco-conscious designers making waves in ethical fashion.',
      featured_image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Sustainability',
      published_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Mastering Layering for Fall',
      excerpt: 'Expert techniques for creating depth and dimension in your autumn outfits.',
      featured_image: 'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Style Guide',
      published_at: new Date().toISOString(),
    },
  ];

  const displayPosts = posts.length > 0 ? posts : samplePosts;

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Fashion Journal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Trend forecasts, styling tips, and insider insights from the world of fashion
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4">
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">All</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Trends</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Style Guide</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Sustainability</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Interviews</Badge>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-96 animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover-lift cursor-pointer group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover luxury-transition group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-gray-600 luxury-transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.published_at), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      5 min read
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
