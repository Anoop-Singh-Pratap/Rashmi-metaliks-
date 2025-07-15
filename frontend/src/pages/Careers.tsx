import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Filter, Search, Building, Heart, Award, Clock, Users, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';
import { Link } from 'react-router-dom';
import { fetchJobListings, JobListing } from '../services/jobService';
import SEO from '../components/SEO';
import { organizationSchema, generateBreadcrumbSchema } from '../lib/schema';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch job listings from Supabase
  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        const jobs = await fetchJobListings();
        setJobListings(jobs);
        setError('');
      } catch (err) {
        console.error('Failed to fetch job listings:', err);
        setError('Failed to load job listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    getJobs();
  }, []);
  
  // Extract unique departments and locations for filters
  const departments = ['All', ...Array.from(new Set(jobListings.map(job => job.department)))];
  const locations = ['All', ...Array.from(new Set(jobListings.map(job => job.location)))];
  
  // Filter jobs based on selections
  const filteredJobs = jobListings.filter(job => 
    (selectedDepartment === 'All' || job.department === selectedDepartment) &&
    (selectedLocation === 'All' || job.location === selectedLocation) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const toggleJob = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };
  
  // Benefits data
  const benefits = [
    {
      title: "Career Growth",
      description: "Continuous learning and career advancement opportunities",
      icon: Award
    },
    {
      title: "Work-Life Balance",
      description: "Flexible schedules and supportive work environment",
      icon: Clock
    },
    {
      title: "Health Benefits",
      description: "Comprehensive health insurance and wellness programs",
      icon: Heart
    },
    {
      title: "Collaborative Culture",
      description: "A diverse, inclusive, and supportive team environment",
      icon: Users
    }
  ];
  
  // Application steps
  const applicationSteps = [
    {
      title: "Apply Online",
      description: "Submit your application through our careers portal"
    },
    {
      title: "Initial Screening",
      description: "Our HR team reviews your application and qualifications"
    },
    {
      title: "Interview Process",
      description: "Multiple rounds to assess your skills and fit"
    },
    {
      title: "Offer & Onboarding",
      description: "Welcome to the Rashmi team!"
    }
  ];

  // Generate the careers page breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" }
  ]);

  // Create a JobPosting schema
  const createJobPostingSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "Multiple Career Opportunities",
      "description": "Explore career opportunities at Rashmi Group, a global leader in steel manufacturing",
      "datePosted": new Date().toISOString().split('T')[0],
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Rashmi Metaliks Limited",
        "sameAs": "https://www.rashmimetaliks.com"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "addressCountry": "IN"
        }
      },
      "employmentType": "FULL_TIME",
      "workHours": "Monday to Friday, 9:00 AM - 5:00 PM"
    };
  };

  // Combined schemas
  const schemas = [organizationSchema, breadcrumbSchema, createJobPostingSchema()];
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Careers at Rashmi Group | Join Our Global Steel Manufacturing Team"
        description="Join the Rashmi Group team and be part of a global leader in steel manufacturing. Explore current opportunities and apply for positions across engineering, manufacturing, sales, and corporate departments."
        keywords="Rashmi Group careers, steel industry jobs, manufacturing careers, metallurgy jobs, India steel careers, engineering jobs, DI pipe manufacturing careers"
        canonicalUrl="/careers"
        schema={schemas}
      />
      <Header />
      <main>
        {/* Hero Section with Video Background */}
        <section className="relative h-[60vh] overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <video 
              className="absolute w-full h-full object-cover" 
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/lovable-uploads/video-team.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-rashmi-dark/70"></div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative h-full flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <RevealText
                text="Join Our Team"
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white"
              />
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Be part of a dynamic team that's shaping the future of the steel industry with innovation, excellence, and sustainability
              </p>
              <Link 
                to="/careers/apply" 
                className="inline-flex items-center bg-rashmi-red text-white py-3 px-6 rounded-full font-medium hover:bg-rashmi-red/90 transition-colors"
              >
                Apply Now
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Current Openings Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Open Positions" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                <span className="text-rashmi-red">Current</span> Opportunities
              </h2>
              <p className="text-muted-foreground">
                Join our team of talented professionals and be part of our journey toward excellence in the steel industry.
              </p>
            </div>
            
            {/* Filters */}
            <div className="bg-card p-6 rounded-xl border border-border/40 shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select 
                    className="w-full p-2 rounded-md border border-border bg-background"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select 
                    className="w-full p-2 rounded-md border border-border bg-background"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search positions..."
                      className="w-full p-2 pl-10 rounded-md border border-border bg-background"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-muted-foreground w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-20">
                  <Loader2 className="animate-spin h-8 w-8 mx-auto text-rashmi-red mb-4" />
                  <p>Loading job listings...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border/40">
                  <Briefcase className="mx-auto text-muted-foreground w-12 h-12 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Error Loading Jobs</h3>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-card rounded-xl border border-border/40 overflow-hidden shadow-sm"
                  >
                    {/* Job Header - always visible */}
                    <div className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex flex-wrap items-center mt-2 gap-3">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Briefcase className="w-4 h-4 mr-1" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="px-2 py-0.5 bg-rashmi-red/10 text-rashmi-red text-xs rounded-full">
                              {job.type}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleJob(job.id)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                            expandedJob === job.id 
                              ? 'bg-muted hover:bg-muted/80 text-foreground' 
                              : 'bg-rashmi-red hover:bg-rashmi-red/90 text-white'
                          }`}
                        >
                          {expandedJob === job.id ? 'View Less' : 'View Details'}
                          {expandedJob === job.id ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Expanded Content */}
                    {expandedJob === job.id && (
                      <div className="px-6 pb-6 pt-2 border-t border-border/40">
                        <div className="prose prose-sm max-w-none">
                          <div className="mb-4">
                            <h4 className="text-base font-semibold mb-2">Description</h4>
                            <p className="text-muted-foreground">{job.description}</p>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-base font-semibold mb-2">Requirements</h4>
                            <p className="text-muted-foreground">{job.requirements}</p>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="text-base font-semibold mb-2">Responsibilities</h4>
                            <ul className="list-disc pl-5 text-muted-foreground">
                              {job.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="text-right">
                            <Link
                              to={`/careers/job/${job.id}`}
                              className="inline-block px-6 py-3 bg-rashmi-red hover:bg-rashmi-red/90 text-white dark:text-white rounded-md transition-colors"
                            >
                              Apply Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border/40">
                  <Briefcase className="mx-auto text-muted-foreground w-12 h-12 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No positions found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or check back later for new opportunities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Application Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="How to Join" />
              </div>
              <RevealText
                text="Application Process"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground">
                Our recruitment process is designed to find the best talent while providing you with a smooth candidate experience.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>
                
                {/* Steps */}
                {applicationSteps.map((step, index) => (
                  <div key={index} className="relative z-10 mb-12">
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                      <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8">
                        <div className={`bg-card border border-border p-6 rounded-xl ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rashmi-red flex items-center justify-center z-20 my-4 md:my-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      
                      <div className="md:w-1/2 md:pl-8">
                        {/* Empty space for layout purposes */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl">
                  <div className="bg-rashmi-red/5 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Ready to <span className="text-rashmi-red">Join Our Team?</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                  Don't see a position that fits your skills? Submit your resume for future opportunities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="#openings"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
                  >
                    Browse Open Positions
                    <ChevronDown className="ml-2" size={18} />
                  </motion.a>
                  <motion.a
                    href="/contact-us"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="inline-flex items-center px-6 py-3 bg-card border border-border text-foreground font-medium rounded-lg transition-colors hover:bg-muted"
                  >
                    Contact HR Team
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
