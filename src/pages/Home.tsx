import React from 'react';
import ChatBot from '../components/ChatBot';
import NewsSection from '../components/NewsSection';
import QuickLink from '../components/QuickLink';
import { FileText, BookOpen, GraduationCap, FileOutput } from 'lucide-react';

const quickLinks = [
  {
    href: '/terms',
    icon: BookOpen,
    title: 'Groundwater Terms',
    description: 'Learn about groundwater terminology'
  },
  {
    href: '/noc',
    icon: FileText,
    title: 'NOC Guidelines',
    description: 'Access NOC application process'
  },
  {
    href: '/training',
    icon: GraduationCap,
    title: 'Training',
    description: 'Explore learning opportunities'
  },
  {
    href: '/reports',
    icon: FileOutput,
    title: 'AI Reports',
    description: 'Generate detailed analysis'
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section with Chatbot */}
      <div className="bg-hero-pattern bg-cover bg-center">
        <div className="bg-gradient-to-r from-primary/95 to-secondary/95 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold mb-4">Welcome to Bhujal.io</h1>
                <p className="text-xl text-gray-200">
                  Your comprehensive platform for groundwater information and AI-powered insights
                </p>
              </div>
              <div className="mt-8 md:mt-0">
                <ChatBot />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link) => (
            <QuickLink key={link.href} {...link} />
          ))}
        </div>

        {/* News Section */}
        <NewsSection />
      </main>
    </>
  );
}