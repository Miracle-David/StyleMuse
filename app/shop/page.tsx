'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Leaf } from 'lucide-react';
import { supabase, type Retailer } from '@/lib/supabase';

export default function ShopPage() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchRetailers();
  }, []);

  async function fetchRetailers() {
    const { data } = await supabase
      .from('retailers')
      .select('*')
      .order('name');

    if (data) setRetailers(data);
    setLoading(false);
  }

  const filteredRetailers = filter === 'all'
    ? retailers
    : retailers.filter((r) => filter === 'sustainable' ? r.is_sustainable : r.category === filter);

  const categories = [
    { id: 'all', name: 'All Retailers' },
    { id: 'sustainable', name: 'Sustainable' },
    { id: 'fast_fashion', name: 'Fast Fashion' },
    { id: 'contemporary', name: 'Contemporary' },
    { id: 'evening_wear', name: 'Evening Wear' },
    { id: 'luxury', name: 'Luxury' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Shop Directory</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Curated retailers for every style and budget. From sustainable favorites to luxury destinations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={filter === cat.id ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap px-4 py-2"
              onClick={() => setFilter(cat.id)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-64 animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : filteredRetailers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRetailers.map((retailer) => (
              <Card key={retailer.id} className="p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{retailer.name}</h3>
                    <Badge variant="secondary" className="mb-2">
                      {retailer.category.replace('_', ' ')}
                    </Badge>
                    {retailer.is_sustainable && (
                      <Badge variant="outline" className="ml-2 border-green-600 text-green-700">
                        <Leaf className="h-3 w-3 mr-1" />
                        Sustainable
                      </Badge>
                    )}
                  </div>
                </div>

                <Button className="w-full mt-4" asChild>
                  <a href={retailer.website_url} target="_blank" rel="noopener noreferrer">
                    Visit Store
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No retailers found in this category</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="h-12 w-12 mx-auto mb-4 text-green-700" />
            <h2 className="text-3xl font-bold mb-4">Shopping Sustainably</h2>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Look for the sustainability badge to support brands committed to ethical practices,
              eco-friendly materials, and fair labor standards. Every conscious purchase makes a difference.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
