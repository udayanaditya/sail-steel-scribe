
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Factory, Users, Award, TrendingUp } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Factory,
      title: 'Modern Steel Production',
      description: 'State-of-the-art facilities producing high-quality steel products'
    },
    {
      icon: Users,
      title: 'Expert Workforce',
      description: 'Skilled professionals committed to excellence and innovation'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'ISO certified processes ensuring superior product quality'
    },
    {
      icon: TrendingUp,
      title: 'Growth & Innovation',
      description: 'Continuous expansion and technological advancement'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center steel-plant-bg">
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-devanagari">
              Steel Authority of India Limited
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Leading the nation's steel production with excellence and innovation
            </p>
            <div className="space-x-4">
              <Link to="/inventory">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  Check Inventory
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Excellence in Steel Manufacturing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SAIL stands as India's premier steel producer, combining traditional expertise with modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 sail-gradient rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 sail-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Manufacturing Units</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Tonnes Annual Capacity</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
