'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
        toast.error('This email is already subscribed!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } else {
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Have questions? Want to collaborate? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="contact-email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input id="subject" placeholder="What's this about?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                />
              </div>
              <Button size="lg" className="w-full">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </Card>

          <div>
            <Card className="p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6">Newsletter</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join thousands of fashion enthusiasts and receive weekly style inspiration,
                trend reports, and exclusive looks delivered straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button size="lg" className="w-full" disabled={loading}>
                  <Mail className="mr-2 h-5 w-5" />
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stay connected and never miss a style moment. Follow us for daily inspiration.
              </p>
              <div className="space-y-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-lg luxury-transition"
                >
                  <Instagram className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">Instagram</p>
                    <p className="text-sm text-gray-600">@stylemuse</p>
                  </div>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-lg luxury-transition"
                >
                  <Facebook className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">Facebook</p>
                    <p className="text-sm text-gray-600">StyleMuse</p>
                  </div>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-lg luxury-transition"
                >
                  <Youtube className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">YouTube</p>
                    <p className="text-sm text-gray-600">StyleMuse TV</p>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-12 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-gray-700" />
          <h3 className="text-2xl font-bold mb-3">For Business Inquiries</h3>
          <p className="text-gray-600 mb-4">
            Interested in partnerships, collaborations, or press inquiries?
          </p>
          <a
            href="mailto:hello@stylemuse.com"
            className="text-lg font-medium hover:underline"
          >
            hello@stylemuse.com
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
