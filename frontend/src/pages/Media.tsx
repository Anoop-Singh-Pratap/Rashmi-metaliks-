import { useState, useEffect, useRef } from 'react';
import CustomHelmet from '../components/CustomHelmet';
import { motion } from 'framer-motion';
import { Calendar, Globe, Search, Filter, EyeIcon, Download, AlertCircle, Linkedin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';
import {  getBrochures, getCertificates, getNews } from '../services/cmsService';

// Interface for news items
interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  fullImage?: string;
  content: string;
  documentUrl: string | null;
}

// Define interfaces for other content types
interface Brochure {
  id: number;
  title: string;
  category: string;
  format: string;
  size: string;
  lastUpdated: string;
  thumbnail: string;
  downloadUrl: string;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  description: string;
  image: string | null;
  file: string | null;
}

const Media = () => {
  // State for content
  const [news, setNews] = useState<NewsItem[]>([]);
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingCachedData, setUsingCachedData] = useState<boolean>(false);
  
  // Filtering and display state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'brochures' | 'certificates'>('news');
  const [expandedNewsId, setExpandedNewsId] = useState<number | null>(null);
  
  // Add new state for view mode toggle
  const [viewMode, setViewMode] = useState<'regular' | 'linkedin'>('regular');
  const linkedInContainerRef = useRef<HTMLDivElement>(null);
  
  const categories = ['All', 'Achievement', 'Expansion', 'Award', 'Sustainability'];
  
  // Modify the useEffect to handle LinkedIn widget loading
  useEffect(() => {
    if (viewMode === 'linkedin' && !document.getElementById('sk-linkedin-script')) {
      const script = document.createElement('script');
      script.id = 'sk-linkedin-script';
      script.src = 'https://widgets.sociablekit.com/linkedin-page-posts/widget.js';
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up script if component unmounts
        const existingScript = document.getElementById('sk-linkedin-script');
        if (existingScript) document.body.removeChild(existingScript);
      };
    }
  }, [viewMode]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data based on active tab to improve performance
        if (activeTab === 'news') {
          console.log('Fetching news data...');
          const newsData = await getNews();

          console.log('News data received:', newsData);
          setNews(Array.isArray(newsData) ? newsData : []);
          
          // If we have data, clear any previous errors
          if (newsData && newsData.length > 0) {
            setError(null);
            setUsingCachedData(false);
          }
          
          // Check if we're using cached data 
          const isUsingCached = localStorage.getItem('rashmi_using_cached_news') === 'true' || !navigator.onLine;
          if (isUsingCached) {
            setUsingCachedData(true);
            const cachedTimestamp = localStorage.getItem('rashmi_cached_news_timestamp');
            const timestampText = cachedTimestamp 
              ? new Date(Number(cachedTimestamp)).toLocaleString() 
              : 'unknown time';
            setError(`Showing cached data because Strapi CMS is ${!navigator.onLine ? 'offline' : 'unreachable'}. Content was last updated on ${timestampText}.`);
            
            // Clear the flag so we don't show this message unnecessarily on subsequent loads when online
            if (navigator.onLine) {
              localStorage.removeItem('rashmi_using_cached_news');
            }
          } else {
            setUsingCachedData(false);
            setError(null);
          }
        } else if (activeTab === 'brochures') {
          const brochuresData = await getBrochures();
          setBrochures(brochuresData);
          
          // Check if we're using cached data
          const isUsingCached = localStorage.getItem('rashmi_using_cached_brochures') === 'true' || !navigator.onLine;
          if (isUsingCached) {
            setUsingCachedData(true);
            const cachedTimestamp = localStorage.getItem('rashmi_cached_brochures_timestamp');
            const timestampText = cachedTimestamp 
              ? new Date(Number(cachedTimestamp)).toLocaleString() 
              : 'unknown time';
            setError(`Showing cached data because Strapi CMS is ${!navigator.onLine ? 'offline' : 'unreachable'}. Content was last updated on ${timestampText}.`);
            
            // Clear the flag so we don't show this message unnecessarily on subsequent loads when online
            if (navigator.onLine) {
              localStorage.removeItem('rashmi_using_cached_brochures');
            }
          } else {
            setUsingCachedData(false);
            setError(null);
          }
        } else if (activeTab === 'certificates') {
          const certificatesData = await getCertificates();
          setCertificates(certificatesData);
          
          // Check if we're using cached data
          const isUsingCached = localStorage.getItem('rashmi_using_cached_certificates') === 'true' || !navigator.onLine;
          if (isUsingCached) {
            setUsingCachedData(true);
            const cachedTimestamp = localStorage.getItem('rashmi_cached_certificates_timestamp');
            const timestampText = cachedTimestamp 
              ? new Date(Number(cachedTimestamp)).toLocaleString() 
              : 'unknown time';
            setError(`Showing cached data because Strapi CMS is ${!navigator.onLine ? 'offline' : 'unreachable'}. Content was last updated on ${timestampText}.`);
            
            // Clear the flag so we don't show this message unnecessarily on subsequent loads when online
            if (navigator.onLine) {
              localStorage.removeItem('rashmi_using_cached_certificates');
            }
          } else {
            setUsingCachedData(false);
            setError(null);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Using fallback data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // Update category filter when a category button is clicked
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    // Reset expanded article when filter changes
    setExpandedNewsId(null);
  };
  
  // Filter news based on selected category and search term
  const filteredNews = news.filter(item => {
    // Check if the item matches the search term
    const matchesSearch = 
      searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if the item matches the selected category
    const matchesCategory = 
      selectedCategory === 'All' || 
      item.category === selectedCategory;
    
    // Item must match both conditions to be included
    return matchesSearch && matchesCategory;
  });
  
  const toggleArticle = (id: number) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <CustomHelmet
        title="Media & News | Rashmi Metaliks"
        description="Latest news, press releases, and media coverage about Rashmi Metaliks and our industry-leading steel products."
        keywords="Rashmi Metaliks news, steel industry news, company updates, press releases"
        canonicalUrl="https://www.rashmimetaliks.com/media"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-rashmi-dark to-background/80">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585974738771-84483dd9f89f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Media & <span className="text-rashmi-red">News</span>
            </h1>
            <RevealText
              text="Latest Updates from Rashmi Group"
              as="h2"
              className="text-2xl md:text-3xl font-display text-muted-foreground mb-6"
              staggerDelay={0.05}
              initialDelay={0.5}
            />
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              Stay informed about the latest developments, achievements, and initiatives from Rashmi Group, 
              a leader in the steel manufacturing industry.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none z-[-1]"
        >
          <div className="bg-rashmi-red/20 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
      </section>
      
      {/* View Mode Toggle */}
      <section className="py-4 bg-card border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-4">
            <div className="inline-flex p-1 bg-muted rounded-full">
              <button
                onClick={() => setViewMode('regular')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  viewMode === 'regular' 
                    ? 'bg-white dark:bg-gray-800 shadow-sm text-rashmi-red' 
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Media Content
              </button>
              <button
                onClick={() => setViewMode('linkedin')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                  viewMode === 'linkedin' 
                    ? 'bg-white dark:bg-gray-800 shadow-sm text-rashmi-red' 
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Linkedin size={16} className="mr-1.5" />
                LinkedIn Feed
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {viewMode === 'regular' ? (
        <>
          {/* Filters Section */}
          <section className="py-8 bg-card border-y border-border/40">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                  <Filter size={16} className="text-muted-foreground flex-shrink-0" />
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors
                                ${selectedCategory === category 
                                  ? 'bg-rashmi-red text-white' 
                                  : 'bg-muted hover:bg-muted/80 text-foreground'}`}
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="w-full py-2 pl-10 pr-4 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>
          </section>
          
          {/* News Grid Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {/* Display active filters if any are selected */}
              {(selectedCategory !== 'All' || searchTerm !== '') && (
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'All' && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-rashmi-red/10 border border-rashmi-red/20 text-rashmi-red">
                        <span>Category: {selectedCategory}</span>
                        <button 
                          onClick={() => setSelectedCategory('All')}
                          className="ml-2 text-rashmi-red/80 hover:text-rashmi-red"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {searchTerm !== '' && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-rashmi-red/10 border border-rashmi-red/20 text-rashmi-red">
                        <span>Search: {searchTerm}</span>
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="ml-2 text-rashmi-red/80 hover:text-rashmi-red"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Display offline/cached data notification */}
              {usingCachedData && (
                <div className="mb-6 p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-800">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800">Offline Mode</h3>
                      <p className="text-sm mt-1">
                        Showing cached content because Strapi CMS is offline. The data was last updated on {
                          new Date(Number(localStorage.getItem(`rashmi_cached_${activeTab}_timestamp`) || Date.now())).toLocaleString()
                        }.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Display error if any */}
              {error && !usingCachedData && (
                <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-800">Error</h3>
                      <p className="text-sm mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Loading state */}
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rashmi-red"></div>
                </div>
              ) : activeTab === 'news' ? (
                filteredNews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.map(news => (
                      <motion.article
                        key={news.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="relative aspect-video">
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => news.fullImage && window.open(news.fullImage, '_blank')}
                            title={news.fullImage ? 'Click to view full size image' : undefined}
                          />
                          <div className="absolute top-0 right-0 m-2 px-3 py-1 bg-card/80 backdrop-blur-sm text-xs font-medium rounded-full border border-border/40">
                            {news.category}
                          </div>
                          {news.fullImage && (
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                              Click to enlarge
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <Calendar size={14} className="mr-1" />
                            {new Date(news.date).toLocaleDateString('en-US', {
                              year: 'numeric', month: 'long', day: 'numeric'
                            })}
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                          <p className="text-muted-foreground mb-4 flex-grow">{news.excerpt}</p>
                          
                          <button
                            onClick={() => toggleArticle(news.id)}
                            className="inline-flex items-center text-rashmi-red hover:text-rashmi-red/80 transition-colors"
                          >
                            {expandedNewsId === news.id ? 'Read Less' : 'Read More'}
                            <EyeIcon size={16} className="ml-1" />
                          </button>
                          
                          {expandedNewsId === news.id && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-border/40"
                            >
                              <div className="text-muted-foreground prose prose-sm max-w-none">
                                {news.content.split('\n').map((paragraph, index) => (
                                  paragraph.trim() ? (
                                    <p key={index} className="mb-4 last:mb-0">{paragraph.trim()}</p>
                                  ) : (
                                    <br key={index} />
                                  )
                                ))}
                              </div>
                              <div className="mt-4 pt-4 border-t border-border/40 flex justify-between">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Globe size={14} className="mr-1" />
                                  News
                                </div>
                                {news.documentUrl ? (
                                  <a 
                                    href={news.documentUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm inline-flex items-center text-rashmi-red hover:text-rashmi-red/80 transition-colors"
                                    download
                                  >
                                    <Download size={14} className="mr-1" />
                                    Download PDF
                                  </a>
                                ) : null}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-card border border-border rounded-xl p-10 inline-block">
                      <Search size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-bold mb-2">No results found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    {activeTab === 'brochures' ? 'Brochures' : 'Certificates'} content will be shown here.
                  </p>
                </div>
              )}
            </div>
          </section>
          
          {/* Press Releases CTA Section */}
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
                    Press & Media <span className="text-rashmi-red">Inquiries</span>
                  </h2>
                  <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                    For press releases, media kits, or interview requests, please contact our media relations team.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href="/contact-us"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
                    >
                      Contact Media Team
                    </motion.a>
                    <motion.a
                      href="#subscribe"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="inline-flex items-center px-6 py-3 bg-card border border-border text-foreground font-medium rounded-lg transition-colors hover:bg-muted"
                    >
                      Subscribe to Updates
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        // LinkedIn Feed Section
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold flex items-center">
                    <Linkedin size={24} className="text-[#0A66C2] mr-2" />
                    <span>LinkedIn <span className="text-rashmi-red">Updates</span></span>
                  </h2>
                  <span className="text-sm text-muted-foreground">Powered by SociableKit</span>
                </div>
                {/* LinkedIn feed embed using iframe */}
                <div className="linkedin-feed-container overflow-hidden rounded-lg">
                  <iframe 
                    src='https://widgets.sociablekit.com/linkedin-page-posts/iframe/25562308' 
                    frameBorder='0' 
                    width='100%'
                    height='800'
                    title="Rashmi Metaliks LinkedIn Feed"
                    className="bg-white"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default Media;
