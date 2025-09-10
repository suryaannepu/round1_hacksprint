import React from 'react';
import { Zap, Shield, Smartphone, Globe, Palette, Code } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with modern build tools and efficient code splitting for instant loading.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure by Default',
      description: 'Built-in security features and best practices to protect your application and user data.',
      color: 'from-green-400 to-blue-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Responsive design that works perfectly on all devices, from mobile to desktop.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Global Ready',
      description: 'Internationalization support and CDN integration for worldwide accessibility.',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: Palette,
      title: 'Customizable',
      description: 'Flexible theming system with dark mode support and extensive customization options.',
      color: 'from-pink-400 to-red-500',
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Clean code architecture with TypeScript support and comprehensive documentation.',
      color: 'from-indigo-400 to-purple-500',
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to build modern, scalable applications with exceptional user experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl hover:shadow-soft-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-slide-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-soft-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;