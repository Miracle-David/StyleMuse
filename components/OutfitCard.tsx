'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Outfit, OutfitItem } from '@/lib/supabase';

interface OutfitCardProps {
  outfit: Outfit;
  items?: OutfitItem[];
}

export default function OutfitCard({ outfit, items = [] }: OutfitCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="masonry-item overflow-hidden hover-lift cursor-pointer group" onClick={() => setShowDetails(true)}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={outfit.image_url}
            alt={outfit.title}
            fill
            className="object-cover luxury-transition group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 luxury-transition" />

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 luxury-transition">
            <h3 className="text-white font-semibold text-lg mb-2">{outfit.title}</h3>
            <div className="flex gap-2 flex-wrap">
              {outfit.is_trending && (
                <Badge variant="secondary" className="bg-white/90 text-black">
                  Trending
                </Badge>
              )}
              <Badge variant="outline" className="border-white text-white">
                {outfit.category.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl">{outfit.title}</DialogTitle>
            <DialogDescription>
              {outfit.category.replace('_', ' ')} • {outfit.season} • {outfit.occasion}
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src={outfit.image_url}
                alt={outfit.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Shop This Look</h3>

              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 luxury-transition hover:shadow-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">{item.item_type}</p>
                          <h4 className="font-semibold">{item.item_name}</h4>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                        </div>
                        <p className="text-lg font-semibold">${item.price}</p>
                      </div>
                      <Button className="w-full mt-2" asChild>
                        <a href={item.affiliate_link} target="_blank" rel="noopener noreferrer">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Shop at {item.retailer}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Product details coming soon</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
