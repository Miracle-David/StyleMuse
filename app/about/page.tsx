import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Sparkles, Heart, Leaf, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About StyleMuse</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Where fashion inspiration becomes effortlessly shoppable
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            StyleMuse was born from a simple belief: finding and shopping your perfect style shouldn't be complicated.
            We've created a seamless bridge between fashion inspiration and accessible shopping, curating the best
            looks from across the style spectrum and making every piece instantly shoppable.
          </p>

          <p className="text-gray-700 leading-relaxed mb-12">
            In a world overwhelmed with choice, we cut through the noise to deliver curated, trend-forward fashion
            inspiration that speaks to your unique aesthetic. Whether you're drawn to minimal luxury, bold streetwear,
            or conscious sustainability, StyleMuse is your personal fashion compass.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <Sparkles className="h-10 w-10 mb-4 text-gray-700" />
            <h3 className="text-2xl font-semibold mb-3">Curated Inspiration</h3>
            <p className="text-gray-600 leading-relaxed">
              Every outfit is hand-selected by our team of style experts, ensuring you discover only
              the most inspiring, wearable looks that align with current trends and timeless aesthetics.
            </p>
          </Card>

          <Card className="p-8">
            <Heart className="h-10 w-10 mb-4 text-gray-700" />
            <h3 className="text-2xl font-semibold mb-3">Effortless Shopping</h3>
            <p className="text-gray-600 leading-relaxed">
              See something you love? Click to shop. We've partnered with trusted retailers to make
              purchasing your favorite looks as seamless as discovering them.
            </p>
          </Card>

          <Card className="p-8">
            <Leaf className="h-10 w-10 mb-4 text-green-700" />
            <h3 className="text-2xl font-semibold mb-3">Conscious Choices</h3>
            <p className="text-gray-600 leading-relaxed">
              We spotlight sustainable brands and eco-conscious fashion, empowering you to make
              purchasing decisions that align with your values while staying stylish.
            </p>
          </Card>

          <Card className="p-8">
            <TrendingUp className="h-10 w-10 mb-4 text-gray-700" />
            <h3 className="text-2xl font-semibold mb-3">Trend Intelligence</h3>
            <p className="text-gray-600 leading-relaxed">
              Stay ahead of the curve with our AI-powered trend forecasting and expert editorial
              content that keeps you informed about what's next in fashion.
            </p>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6">What We Believe</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Style is personal.</strong> There's no one-size-fits-all approach to fashion. We celebrate
            diversity in aesthetics and help you discover looks that resonate with your unique identity.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Fashion should be accessible.</strong> Great style isn't reserved for the elite. We feature
            options across every price point, ensuring inspiration is accessible to all.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sustainability matters.</strong> The fashion industry has a responsibility to our planet.
            We prioritize featuring brands that share our commitment to ethical and sustainable practices.
          </p>
          <p className="text-gray-700 leading-relaxed mb-12">
            <strong>Inspiration drives action.</strong> Beautiful imagery is just the beginning. We make it
            effortless to transform inspiration into your reality with one-click shopping experiences.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            StyleMuse is more than a platform—it's a community of fashion enthusiasts who believe in
            the power of personal style. Follow us on social media, subscribe to our newsletter, and
            join thousands discovering their perfect aesthetic every day.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
