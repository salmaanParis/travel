import React from 'react';
import { Plane, Compass, MapPin } from 'lucide-react';
import Button from '@/components/Button';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Covering the Left Side */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img src="/travel.png?height=400&width=600" alt="Beautiful destination" className="rounded-lg w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="lg:w-1/2 lg:pl-12">
            <h1 className="text-3xl font-bold mb-6">
              Discover the World with Us
            </h1>
            <p className="text-gray-600 mb-8">
              With more than 4 years in the tourism industry, we’re passionate about connecting you with the unique cultures and experiences each destination offers. Leave the guidebooks behind and immerse yourself in the adventure!
            </p>

            {/* Services */}
            <div className="space-y-6">
              <div className="flex items-start">
                <Plane className="w-6 h-6 mr-4 text-blue-500" />
                <div>
                  <h3 className="font-semibold mb-2">Book with Confidence</h3>
                  <p className="text-gray-600">We meticulously plan every detail so you can focus on enjoying your journey without worries.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Compass className="w-6 h-6 mr-4 text-blue-500" />
                <div>
                  <h3 className="font-semibold mb-2">Freedom to Explore</h3>
                  <p className="text-gray-600">Our itineraries are designed to give you the flexibility to discover hidden gems at your own pace.</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 text-blue-500" />
                <div>
                  <h3 className="font-semibold mb-2">Immerse Yourself in Culture</h3>
                  <p className="text-gray-600">Engage with local communities and traditions, creating unforgettable memories along the way.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
              Book Your Adventure!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;




