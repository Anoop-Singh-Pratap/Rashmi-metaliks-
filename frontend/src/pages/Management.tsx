import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Users, Award, Target, TrendingUp } from 'lucide-react';

const Management = () => {
  const leadership = [
    {
      name: "Rajesh Agarwal",
      position: "Chairman & Managing Director",
      image: "/lovable-uploads/leadership-placeholder.jpg",
      description: "Leading Rashmi Metaliks with over 25 years of experience in the steel industry.",
    },
    {
      name: "Pradeep Kumar Agarwal", 
      position: "Executive Director",
      image: "/lovable-uploads/leadership-placeholder.jpg",
      description: "Overseeing operations and strategic planning with extensive industry expertise.",
    },
    {
      name: "Sanjay Agarwal",
      position: "Director - Marketing & Sales",
      image: "/lovable-uploads/leadership-placeholder.jpg", 
      description: "Driving business growth and market expansion across domestic and international markets.",
    }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8 text-rashmi-red" />,
      title: "Excellence",
      description: "Committed to delivering world-class products and maintaining the highest quality standards."
    },
    {
      icon: <Users className="w-8 h-8 text-rashmi-red" />,
      title: "Leadership",
      description: "Fostering innovation and leading by example in the steel manufacturing industry."
    },
    {
      icon: <Target className="w-8 h-8 text-rashmi-red" />,
      title: "Vision",
      description: "Building a sustainable future through responsible manufacturing and continuous improvement."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-rashmi-red" />,
      title: "Growth",
      description: "Driving consistent growth while maintaining our commitment to quality and sustainability."
    }
  ];

  return (
    <>
      <SEO 
        title="Management Team | Rashmi Metaliks Leadership"
        description="Meet the experienced leadership team driving Rashmi Metaliks' success as the world's 2nd largest DI pipe manufacturer. Learn about our management vision and values."
        keywords="Rashmi Metaliks management, leadership team, steel industry leaders, DI pipe manufacturing leadership"
        canonicalUrl="/management"
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-rashmi-red/20 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-rashmi-red">Leadership</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Experienced leadership driving innovation and excellence in steel manufacturing
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-rashmi-red" />
                <span>Experienced Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-rashmi-red" />
                <span>Industry Leaders</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-rashmi-red" />
                <span>Visionary Approach</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our experienced leadership team brings decades of industry expertise and vision 
              to drive Rashmi Metaliks' continued success and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-rashmi-red/20 to-rashmi-red/10 flex items-center justify-center">
                  <Users className="w-16 h-16 text-rashmi-red" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {leader.name}
                </h3>
                <p className="text-rashmi-red font-semibold mb-4">
                  {leader.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {leader.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The core values that guide our leadership and drive our commitment to excellence 
              in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-rashmi-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our leadership team to explore business opportunities and partnerships 
            with Rashmi Metaliks.
          </p>
          <Link 
            to="/contact-us"
            className="inline-flex items-center gap-2 bg-white text-rashmi-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Leadership Team
          </Link>
        </div>
      </div>
    </>
  );
};

export default Management;