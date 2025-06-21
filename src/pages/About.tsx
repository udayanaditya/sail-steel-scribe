
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Calendar, Award } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '1973', event: 'SAIL incorporated as a public sector enterprise' },
    { year: '1978', event: 'First integrated steel plant commissioned' },
    { year: '1990', event: 'Modernization and expansion programs initiated' },
    { year: '2000', event: 'ISO certification achieved across all plants' },
    { year: '2010', event: 'Major capacity expansion projects completed' },
    { year: '2020', event: 'Digital transformation initiatives launched' }
  ];

  const plants = [
    'Bhilai Steel Plant, Chhattisgarh',
    'Rourkela Steel Plant, Odisha',
    'Durgapur Steel Plant, West Bengal',
    'Bokaro Steel Plant, Jharkhand',
    'IISCO Steel Plant, West Bengal',
    'Visvesvaraya Iron & Steel Plant, Karnataka'
  ];

  const products = [
    'Hot Rolled Products',
    'Cold Rolled Products',
    'Coated Products',
    'Stainless Steel',
    'Alloy Steel',
    'Special Steel',
    'Wire Rods',
    'Rail Products'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <section className="sail-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About SAIL
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Steel Authority of India Limited is India's largest steel-making company, 
              a public sector enterprise committed to nation building through quality steel production.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-6 w-6 text-blue-600" />
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  SAIL is India's largest steel-making company and one of the seven 'Navratna' Central Public Sector 
                  Enterprises (CPSEs) under the Ministry of Steel, Government of India. The company operates through 
                  five integrated steel plants and three special steel plants.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  With a strong focus on technology, quality, and environmental sustainability, SAIL has been at the 
                  forefront of India's industrial development for over five decades.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Public Sector</Badge>
                  <Badge variant="secondary">Navratna Company</Badge>
                  <Badge variant="secondary">ISO Certified</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Mission & Vision */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-blue-600" />
                  Mission & Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Mission</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    To be a respected world-class corporation and the leader in Indian steel business 
                    in terms of customer satisfaction through quality, productivity, profitability, 
                    and environment-friendliness.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    To achieve global benchmarks of excellence in all spheres of operations and 
                    customer satisfaction through continuous technological upgradation and 
                    human resource development.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Manufacturing Plants */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Manufacturing Plants</h2>
            <p className="text-gray-600">SAIL operates major steel plants across India</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                Plant Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plants.map((plant, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{plant}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products & Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle>Our Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {products.map((product, index) => (
                    <Badge key={index} variant="outline" className="justify-center py-2">
                      {product}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Key Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {milestone.year}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed pt-1">
                        {milestone.event}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
