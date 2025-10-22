'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OutfitCard from '@/components/OutfitCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, TrendingUp, Leaf } from 'lucide-react';
import { supabase, type Outfit } from '@/lib/supabase';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function HomePage() {
  const [trendingOutfits, setTrendingOutfits] = useState<Outfit[]>([]);
  const [allOutfits, setAllOutfits] = useState<Outfit[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOutfits();
  }, []);

  async function fetchOutfits() {
    const { data: trending } = await supabase
      .from('outfits')
      .select('*')
      .eq('is_trending', true)
      .order('created_at', { ascending: false });

    const { data: all } = await supabase
      .from('outfits')
      .select('*')
      .order('created_at', { ascending: false });

    if (trending) setTrendingOutfits(trending);
    if (all) setAllOutfits(all);
    setLoading(false);
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Fashion hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 luxury-transition animate-in fade-in slide-in-from-bottom-4 duration-700">
            Discover Your Style Story
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Curated fashion inspiration meets effortless shopping
          </p>
          <Button size="lg" className="text-lg px-8 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300" asChild>
            <Link href="#trending">
              Explore Trends
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-600 text-lg">Curated looks everyone's loving</p>
          </div>
          <TrendingUp className="h-8 w-8 text-gray-400" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="h-96 animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : (
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {trendingOutfits.map((outfit) => (
                <CarouselItem key={outfit.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <OutfitCard outfit={outfit} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        )}
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-700" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Create Your Look</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Describe your dream outfit and let AI help you discover similar shoppable styles
            </p>
          </div>

          <Card className="p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="e.g., Summer party outfit with floral dress"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 text-lg py-6"
              />
              <Button size="lg" className="px-8 py-6">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Summer Party', 'Office Chic', 'Street Style', 'Date Night'].map((style) => (
                <Button
                  key={style}
                  variant="outline"
                  className="w-full"
                  onClick={() => setAiInput(style + ' Outfit')}
                >
                  {style}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">Style Gallery</h2>
            <p className="text-gray-600 text-lg">Browse endless inspiration</p>
          </div>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-4">
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">All</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Minimal Luxe</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Streetwear</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Sustainable</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Summer</Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap px-4 py-2">Party</Badge>
        </div>

        {loading ? (
          <div className="masonry-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="masonry-item h-96 animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {allOutfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="h-12 w-12 mx-auto mb-4 text-green-700" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Sustainable Fashion</h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover eco-conscious brands and track your positive impact. Every sustainable choice contributes to a better future.
          </p>
          <Button size="lg" variant="outline" className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white" asChild>
            <Link href="/shop?category=sustainable">
              Explore Sustainable Brands
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Inspired</h2>
        <p className="text-gray-600 text-lg mb-8">
          Get weekly style tips, trend reports, and exclusive looks delivered to your inbox
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <Input placeholder="Enter your email" type="email" className="flex-1 py-6 text-lg" />
          <Button size="lg" className="px-8 py-6">
            Subscribe
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
