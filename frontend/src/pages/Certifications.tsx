import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Search, Filter, Home, X, Award, Globe, Check, Shield, Download, Eye, ClipboardCheck, Calendar, ExternalLink, FolderOpen, File, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

// Certificate categories
const categories = [
  { value: "all", label: "All Certificates & Standards" },
  { value: "management", label: "Management System Certifications" },
  { value: "product", label: "Product Certifications" },
  { value: "laboratory", label: "Laboratory Accreditations" },
  { value: "pipes", label: "DI Pipe Certificates" },
  { value: "fittings", label: "DI Fitting & Flanging Certificates" },
  { value: "approval", label: "Country Approvals" },
];

// Certificate regions
const regions = [
  { value: "all", label: "All Regions" },
  { value: "global", label: "Global" },
  { value: "middleeast", label: "Middle East" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "africa", label: "Africa" },
];

// Certificate data structure
interface Certificate {
  id: number;
  title: string;
  category: string;
  description: string;
  issueDate?: string;
  expiryDate?: string;
  certificateNumber?: string;
  countries?: string[];
  region?: string;
  standard?: string;
  fileUrl?: string;  // URL to the PDF file
  thumbnailUrl?: string; // URL to the certificate thumbnail
  pdfSize?: string;  // Size of the PDF file
  certificationBody?: string; // The organization that issued the certificate
  featured?: boolean; // If the certificate should be featured/highlighted
}

// Specification data - kept for reference only, not displayed on the page
const specifications = [
  { id: "ISO2531", title: "ISO 2531", description: "Ductile iron pipes, fittings, and accessories for pressure pipelines" },
  { id: "ISO7186", title: "ISO 7186", description: "Ductile iron products for sewage applications" },
  { id: "BSEN545", title: "BSEN 545", description: "Ductile iron pipes, fittings, and accessories and their joints for water pipelines" },
  { id: "BSEN598", title: "BSEN 598", description: "Ductile iron pipes, fittings, and accessories and their joints for sewerage applications" },
  { id: "ISO4179", title: "ISO 4179", description: "Ductile iron pipes for pressure and non-pressure pipelines – centrifugal cement mortar lining general requirements" },
  { id: "BS4027", title: "BS 4027", description: "Specification for sulfate-resisting Portland cement. Requirements for composition, strength, physical, and chemical properties of three strength classes" },
  { id: "ISO8179", title: "ISO 8179", description: "Ductile iron pipes – external zinc coating" },
  { id: "BS3416", title: "BS 3416", description: "Specification for bitumen-based coatings for cold application, suitable for use in contact with potable water" },
  { id: "ISO4633", title: "ISO 4633", description: "Rubber seals-joint rings for water supply, drainage, and sewerage pipelines – specs for materials" },
  { id: "BS2494", title: "BS 2494", description: "Specification for elastomeric seals for joints in pipework and pipelines" },
  { id: "ISO8180", title: "ISO 8180", description: "Ductile iron pipes-polyethylene sleeving" },
  { id: "ISO7005", title: "ISO 7005-2", description: "Metallic flanges – part 2 cast iron flanges" },
  { id: "ISO4014", title: "ISO 4014", description: "Hexagon head bolts – produced grades A and B" },
  { id: "ISO4032", title: "ISO 4032", description: "Hexagon nuts, style 1 – produced grades A and B" },
  { id: "SASO1020", title: "SASO 1020", description: "Ductile cast iron pipes, fittings, and accessories for pressure pipelines - general requirements" },
  { id: "SASO1014", title: "SASO 1014", description: "Socket and spigot ductile cast iron pipes (GS 766) for pressure pipelines" },
  { id: "SASO1016", title: "SASO 1016", description: "Ductile cast iron pipes - external coating (GS 768) with zinc metal spraying and bituminous material finishing layer: methods of test" },
  { id: "SASO1017", title: "SASO 1017", description: "Ductile cast iron pipes - external coating (GS 769) with zinc metal spraying and bituminous material finishing layer" },
  { id: "GSO771", title: "GSO 771/1998", description: "Ductile cast iron pipes, fittings, and accessories for pressure pipelines - test methods" },
  { id: "SASO1022", title: "SASO 1022", description: "Ductile cast-iron pipes for pressure (GS 773) pipelines - centrifugal cement mortar lining- methods of test" },
  { id: "GSO774", title: "GSO 774/1997", description: "Ductile cast iron pipes for pressure pipelines - centrifugal cement mortar lining - general requirements" },
];

// Approvals by country/region
const approvals = [
  {
    country: "Saudi Arabia",
    region: "middleeast",
    agencies: [
      "SASO (Saudi Standards, Metrology and Quality Organization)",
      "National Water Company (NWC)",
      "Ministry of Electricity & Water",
      "Ministry of Municipal & Rural Affairs",
      "RCJY (Royal Commission for Jubail & Yanbu)",
      "ARAMCO & SABIC"
    ]
  },
  {
    country: "Kuwait",
    region: "middleeast",
    agencies: [
      "MEW - Ministry of Electricity & Water",
      "MPW - Ministry of Public Works",
      "MOD - Ministry of Defense",
      "KED - Kuwait Fire Dept.",
      "PAHW - Public Authority for Housing Welfare"
    ]
  },
  {
    country: "Qatar",
    region: "middleeast",
    agencies: [
      "Kahramaa (Qatar General Electricity & Water Corporation) approval pipes and fittings for water applications and repair & maintenance",
      "ASHGHAL (Public Work Authority) approval pipes and fittings for sewer applications",
      "Civil Defense - Fire Fighting Systems"
    ]
  },
  {
    country: "UAE",
    region: "middleeast",
    agencies: [
      "ADWEA (Abu Dhabi Water & Electricity Authority)",
      "ADSSC (Abu Dhabi Sewage Service Company)",
      "Dubai Municipality",
      "DEWA (Dubai Electricity and Water Authority)"
    ]
  },
  {
    country: "Bahrain",
    region: "middleeast",
    agencies: ["Ministry of Electricity and Water – EWA"]
  },
  {
    country: "India",
    region: "asia",
    agencies: [
      "Bureau of Indian Standards (BIS)",
      "Municipal Water Authorities",
      "Public Works Department"
    ]
  },
  {
    country: "Turkey",
    region: "europe",
    agencies: ["ISKI (Istanbul Water and Sewerage Administration)"]
  },
  {
    country: "European Union",
    region: "europe",
    agencies: [
      "BSI (British Standards Institution)",
      "Water Regulations Advisory Scheme (WRAS)"
    ]
  },
  {
    country: "Other Countries",
    region: "global",
    agencies: ["Approvals for water and/or sewerage in Egypt, Iraq, Yemen, Jordan, Lebanon, Syria, Libya, Romania"]
  }
];

// Certificate data - Comprehensive audit-based data with all certificates from folders
const certifications: Certificate[] = [
  // ISO Management System Certifications (4)
  {
    id: 1,
    title: "BSI ISO 9001:2015 Quality Management System Certificate",
    category: "management",
    region: "global",
    description: "Quality Management System certification ensuring our products meet customer and regulatory requirements",
    issueDate: "2021-12-30",
    expiryDate: "2024-12-30",
    certificateNumber: "FM 729671",
    standard: "ISO 9001:2015",
    featured: true,
    certificationBody: "BSI (British Standards Institution)",
    fileUrl: "/certificates/ISO 9001.pdf",
    thumbnailUrl: "/certificates/ISO 9001.png",
    pdfSize: "1.2 MB"
  },
  {
    id: 2,
    title: "BSI ISO 14001:2015 Environmental Management System Certificate",
    category: "management",
    region: "global",
    description: "Environmental Management System certification ensuring our operations minimize environmental impact",
    issueDate: "2020-12-30",
    expiryDate: "2024-12-30",
    certificateNumber: "EMS 729670",
    standard: "ISO 14001:2015",
    featured: true,
    certificationBody: "BSI (British Standards Institution)",
    fileUrl: "/certificates/ISO 14001.pdf",
    thumbnailUrl: "/certificates/ISO 14001.png",
    pdfSize: "1.1 MB"
  },
  {
    id: 3,
    title: "BSI ISO 45001:2018 Occupational Health and Safety Management System Certificate",
    category: "management",
    region: "global",
    description: "Occupational Health and Safety Management System certification ensuring a safe workplace for all employees",
    issueDate: "2021-01-15",
    expiryDate: "2024-12-30",
    certificateNumber: "OHS 729672",
    standard: "ISO 45001:2018",
    featured: true,
    certificationBody: "BSI (British Standards Institution)",
    fileUrl: "/certificates/ISO 45001.pdf",
    thumbnailUrl: "/certificates/ISO 45001.png",
    pdfSize: "950 KB"
  },
  {
    id: 4,
    title: "WRAS Approved Material Certificate - Ordinary Portland Cement",
    category: "management",
    region: "europe",
    description: "Water Regulations Advisory Scheme certification for Ordinary Portland Cement used in our products",
    issueDate: "2022-03-10",
    expiryDate: "2025-03-10",
    certificationBody: "WRAS (Water Regulations Advisory Scheme)",
    fileUrl: "/certificates/WRAS-OPC.pdf",
    thumbnailUrl: "/certificates/WRAS-OPC.png",
    pdfSize: "1.0 MB"
  },

  // Product Certifications - Kitemark (2)
  {
    id: 5,
    title: "BSI Kitemark Certificate for EN 545 Compliance",
    category: "product",
    region: "europe",
    description: "BSI Kitemark certification confirming our DI pipes, fittings and flanged pipes comply with EN 545 standard for water pipelines",
    issueDate: "2022-02-15",
    expiryDate: "2025-02-15",
    certificateNumber: "KM 793696",
    standard: "EN 545:2010",
    featured: true,
    certificationBody: "BSI (British Standards Institution)",
    fileUrl: "/certificates/KM 793696 - 001 EN 545..pdf",
    thumbnailUrl: "/certificates/KM 793696 - 001 EN 545.png",
    pdfSize: "1.3 MB"
  },
  {
    id: 6,
    title: "BSI Kitemark Certificate for ISO 2531 Compliance",
    category: "product",
    region: "global",
    description: "BSI Kitemark certification confirming our DI pipes, fittings and flanged pipes comply with ISO 2531 international standard",
    issueDate: "2022-02-15",
    expiryDate: "2025-02-15",
    certificateNumber: "KM 793698",
    standard: "ISO 2531:2009",
    featured: true,
    certificationBody: "BSI (British Standards Institution)",
    fileUrl: "/certificates/KM 793698 - 001 ISO 2531..pdf",
    thumbnailUrl: "/certificates/KM 793698 - 001 ISO 2531.png",
    pdfSize: "1.2 MB"
  },


  // DI Pipe Certificates (4)
  {
    id: 7,
    title: "Bureau Veritas Product Certificate 1053_001_REV7",
    category: "pipes",
    region: "global",
    description: "Comprehensive certification verifying compliance with multiple international standards for ductile iron pipes",
    certificateNumber: "1053_001_REV7_ENG",
    standard: "EN 545:2010, EN 598:2007+A1:2009, ISO 2531:2009, ISO 7186:2011",
    certificationBody: "Bureau Veritas",
    fileUrl: "/certificates/1053_001_REV7_ENG-signed.pdf",
    thumbnailUrl: "/certificates/1053_001_REV7_ENG-signed.png",
    pdfSize: "2.5 MB",
    featured: true
  },
  {
    id: 8,
    title: "Bureau Veritas Product Certificate 975_001_REV8",
    category: "pipes",
    region: "global",
    description: "Product certificate for DI pipes conforming to international standards",
    certificateNumber: "975_001_REV8_ENG",
    certificationBody: "Bureau Veritas",
    fileUrl: "/certificates/975_001_REV8_ENG-signed.pdf",
    thumbnailUrl: "/certificates/975_001_REV8_ENG-signed.png",
    pdfSize: "1.4 MB"
  },
  {
    id: 9,
    title: "Bureau Veritas Product Certificate 975_002_REV8",
    category: "pipes",
    region: "global",
    description: "Product certificate for DI pipes conforming to international standards",
    certificateNumber: "975_002_REV8_ENG",
    certificationBody: "Bureau Veritas",
    fileUrl: "/certificates/975_002_REV8_ENG-signed.pdf",
    thumbnailUrl: "/certificates/975_002_REV8_ENG-signed.png",
    pdfSize: "1.3 MB"
  },
  {
    id: 10,
    title: "SASO Quality Mark Certificate for Ductile Iron Pipes",
    category: "pipes",
    region: "middleeast",
    description: "Saudi Standards, Metrology and Quality Organization certification for our Ductile Iron Pipes",
    issueDate: "2022-05-10",
    expiryDate: "2025-05-10",
    standard: "SASO 1020, SASO 1014, SASO 1016/1017",
    certificationBody: "SASO (Saudi Standards, Metrology and Quality Organization)",
    fileUrl: "/certificates/Rashmi_SASO_Certificate.pdf",
    thumbnailUrl: "/certificates/Rashmi_SASO_Certificate.png",
    pdfSize: "1.7 MB",
    featured: true
  },
  // Laboratory Certification (1)
  {
    id: 11,
    title: "Technical Certificate TC-15394",
    category: "laboratory",
    region: "global",
    description: "Technical certification for testing and quality assurance procedures",
    certificateNumber: "TC-15394",
    certificationBody: "Technical Certification Body",
    fileUrl: "/certificates/Certificate TC-15394.pdf.pdf",
    thumbnailUrl: "/certificates/Certificate TC-15394.png",
    pdfSize: "1.1 MB"
  },

  // Approval Certificate (1)
  {
    id: 12,
    title: "Official Endorsement Certificate",
    category: "approval",
    region: "global",
    description: "Official endorsement certificate validating our quality standards",
    certificationBody: "Certification Authority",
    fileUrl: "/certificates/17) Endorsement- 19.pdf",
    thumbnailUrl: "/certificates/17) Endorsement- 19.png",
    pdfSize: "950 KB"
  },



  // DI Fitting & Flanging Unit Certificates (5)
  {
    id: 13,
    title: "BIS License for Ductile Iron Fittings Manufacturing Plant",
    category: "fittings",
    region: "asia",
    description: "Bureau of Indian Standards license for the production of DI fittings",
    certificationBody: "BIS (Bureau of Indian Standards)",
    fileUrl: "/certificates/DI Fittings/BIS License-Fitting plant.pdf",
    thumbnailUrl: "/certificates/DI Fittings/BIS License-Fitting plant-01.jpg",
    pdfSize: "1.6 MB"
  },
  {
    id: 14,
    title: "BIS License for Flanging Unit Operations",
    category: "fittings",
    region: "asia",
    description: "Bureau of Indian Standards license for the production of flanged pipes",
    certificationBody: "BIS (Bureau of Indian Standards)",
    fileUrl: "/certificates/DI Fittings/BIS License copy- Flanging unit.pdf",
    thumbnailUrl: "/certificates/DI Fittings/BIS License copy- Flanging unit-01.jpg",
    pdfSize: "1.5 MB"
  },
  {
    id: 15,
    title: "Bureau Veritas DI Fittings Certificate 1319_001_REV0",
    category: "fittings",
    region: "global",
    description: "Product certificate for DI fittings conforming to international standards",
    certificateNumber: "1319_001_REV0_ENG",
    certificationBody: "Bureau Veritas",
    fileUrl: "/certificates/DI Fittings/1319_001_REV0_ENG-signed.pdf",
    thumbnailUrl: "/certificates/DI Fittings/1319_001_REV0_ENG-signed-01.jpg",
    pdfSize: "1.3 MB"
  },
  {
    id: 16,
    title: "Bureau Veritas DI Fittings Certificate 1318_002_REV0",
    category: "fittings",
    region: "global",
    description: "Product certificate for DI fittings conforming to international standards",
    certificateNumber: "1318_002_REV0_ENG",
    certificationBody: "Bureau Veritas",
    fileUrl: "/certificates/DI Fittings/1318_002_REV0_ENG-signed.pdf",
    thumbnailUrl: "/certificates/DI Fittings/1318_002_REV0_ENG-signed-01.jpg",
    pdfSize: "1.2 MB"
  },
  {
    id: 17,
    title: "Bureau Veritas DI Fittings Certificate 1318_001_REV0",
    category: "fittings",
    region: "global",
    description: "Product certificate for DI fittings conforming to international standards",
    certificateNumber: "1318_001_REV0_ENG",
    certificationBody: "Bureau Veritas",
    fileUrl: "/certificates/DI Fittings/1318_001_REV0_ENG-signed.pdf",
    thumbnailUrl: "/certificates/DI Fittings/1318_001_REV0_ENG-signed-01.jpg",
    pdfSize: "1.2 MB"
  },

];

// Combined data for unified display
// Keep the specifications part as is, but replace the certifications part
const allCertificateData: Certificate[] = [
  // Removed specifications mapping as they have no real images
  ...certifications.map(cert => ({ // Use the newly verified certifications array
    ...cert
  })),
];

// Certificate data loaded successfully

// Add custom animations for better performance
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  })
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, 
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }),
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<Certificate | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle image loading errors
  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  // Handle certificate selection for slide-in panel
  const handleCertificateSelect = (certificate: Certificate) => {
    setSelectedItem(certificate);
    setIsDetailPanelOpen(true);
  };

  // Close detail panel
  const closeDetailPanel = () => {
    setIsDetailPanelOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Wait for animation to complete
  };


  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  // Add better touch handling for mobile
  useEffect(() => {
    // Improve touch behavior on mobile devices
    const preventDefaultOnCards = (e: TouchEvent) => {
      // Don't prevent default on inputs and modals
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLButtonElement ||
        (e.target instanceof HTMLElement && 
          (e.target.closest('[role="dialog"]') || 
           e.target.closest('a[href]')))
      ) {
        return;
      }
      
      // Allow scrolling on scrollable containers
      if (
        e.target instanceof HTMLElement && 
        (e.target.scrollHeight > e.target.clientHeight ||
         e.target.closest('.overflow-auto, .overflow-y-auto'))
      ) {
        return;
      }
    };
    
    document.addEventListener('touchstart', preventDefaultOnCards, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', preventDefaultOnCards);
    };
  }, []);
  
  // Filter certificates based on category, region and search term
  const filteredItems = allCertificateData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesRegion = selectedRegion === "all" || item.region === selectedRegion;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesRegion && matchesSearch;
  });

  // Debug logging removed - issue resolved

  // Handle modal close
  const closeModal = () => {
    setSelectedItem(null);
  };

  // Close modal when clicking outside
  // const handleModalClick = (e: React.MouseEvent) => {
  //   if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
  //     closeModal();
  //   }
  // };
  
  // Item icon based on category
  const getItemIcon = (category: string) => {
    switch (category) {
      case 'management': return <Award className="text-blue-600" />;
      case 'product': return <Shield className="text-green-600" />;
      case 'laboratory': return <FileText className="text-purple-600" />;
      case 'pipes': return <Award className="text-amber-600" />;
      case 'fittings': return <Award className="text-indigo-600" />;
      case 'approval': return <Globe className="text-green-500" />;
      default: return <Award className="text-rashmi-red" />;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Certifications & Standards | Rashmi Metaliks</title>
        <meta name="description" content="Explore our international certifications, approvals, and standards that demonstrate Rashmi Metaliks' commitment to quality and excellence in ductile iron pipe manufacturing." />
        <link rel="canonical" href="https://www.rashmimetaliks.com/certifications" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-foreground transition-colors">
                  <Home size={14} className="inline mr-1" />
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span>Certifications & Standards</span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-display font-bold mb-6"
              >
                <span className="text-rashmi-red">Certifications</span> & Standards
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground text-lg max-w-3xl mb-8"
              >
                Rashmi Metaliks Limited is committed to maintaining the highest quality standards. 
                Our products comply with numerous international specifications and have received 
                certifications and approvals from organizations worldwide.
              </motion.p>
              
              {/* Search and Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8"
              >
                <div className="relative md:col-span-5">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <motion.input
                    type="text"
                    placeholder="Search certifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 py-2.5 pr-4 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 transition-all"
                    whileFocus={{ boxShadow: "0 0 0 2px rgba(220, 38, 38, 0.1)" }}
                    initial={false}
                    animate={
                      searchTerm ? { borderColor: "rgba(220, 38, 38, 0.5)" } : {}
                    }
                  />
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground p-1 rounded-full hover:bg-muted/50"
                      onClick={() => setSearchTerm('')}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </motion.button>
                  )}
                </div>
                
                <div className="relative md:col-span-4">
                  <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none pl-10 py-2.5 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 transition-all"
                    aria-label="Filter by certificate category"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowLeft size={14} className="rotate-90 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="relative md:col-span-3">
                  <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full appearance-none pl-10 py-2.5 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 transition-all"
                    aria-label="Filter by region"
                  >
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowLeft size={14} className="rotate-90 text-muted-foreground" />
                  </div>
                </div>
              </motion.div>
              
              {/* View toggle with improved accessibility */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-between items-center mb-6"
              >
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredItems.length}</span> items found
                  {(searchTerm || selectedCategory !== 'all' || selectedRegion !== 'all') && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-3 text-xs px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 inline-flex items-center"
                      onClick={() => {setSearchTerm(''); setSelectedCategory('all'); setSelectedRegion('all');}}
                      aria-label="Clear all filters"
                    >
                      Clear filters <X size={12} className="ml-1" />
                    </motion.button>
                  )}
                </div>
                
                <div className="flex space-x-2" role="radiogroup" aria-label="View mode selection">
                  <motion.button 
                    onClick={() => setViewMode('grid')}
                    whileHover={{ backgroundColor: viewMode === 'grid' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-rashmi-red/10 text-rashmi-red' : 'text-muted-foreground hover:bg-muted/60'}`}
                    aria-label="Switch to grid view"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </motion.button>
                  <motion.button 
                    onClick={() => setViewMode('list')}
                    whileHover={{ backgroundColor: viewMode === 'list' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-rashmi-red/10 text-rashmi-red' : 'text-muted-foreground hover:bg-muted/60'}`}
                    aria-label="Switch to list view"
                    aria-pressed={viewMode === 'list'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Certificates */}
        {selectedCategory === "all" && searchTerm === "" && selectedRegion === "all" && (
          <motion.section 
            className="py-12 bg-gradient-to-b from-muted/50 to-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <motion.h2 
                  className="text-2xl md:text-3xl font-display font-bold mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Featured <span className="text-rashmi-red">Certifications</span>
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {certifications
                    .filter(cert => cert.featured)
                    .map((cert, index) => (
                      <motion.div
                        key={cert.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={shouldReduceMotion ? {} : "hover"}
                        className="bg-white dark:bg-gray-800 border border-border dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group relative"
                        style={{
                          transform: "perspective(1000px) rotateY(0deg)",
                          transformStyle: "preserve-3d",
                          transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)"
                        }}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedItem(cert)}
                        onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedItem(cert)}
                        aria-label={`View details of ${cert.title}`}
                      >
                        {/* Certificate envelope flap with subtle gradient */}
                        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-rashmi-red/10 dark:from-rashmi-red/20 to-transparent z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-rashmi-red/5 dark:after:bg-rashmi-red/10"></div>
                        
                        {/* Stamp-like element with improved design for featured items */}
                        {cert.featured && (
                          <motion.div 
                            className="absolute top-4 right-4 w-16 h-16 rounded-full bg-rashmi-red/5 dark:bg-rashmi-red/10 border border-rashmi-red/20 dark:border-rashmi-red/30 flex items-center justify-center z-20 shadow-sm"
                            style={{ transformOrigin: "center center" }}
                            initial={{ rotate: 12 }}
                            whileHover={shouldReduceMotion ? {} : { rotate: 0, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <motion.div className="text-rashmi-red dark:text-rashmi-red/90 text-center">
                              <Award className="mx-auto" size={20} />
                              <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5 block">Featured</span>
                            </motion.div>
                          </motion.div>
                        )}
                        
                        {cert.thumbnailUrl && !imageErrors.has(cert.thumbnailUrl) ? (
                          <div className="h-60 overflow-hidden bg-gradient-to-b from-muted/30 dark:from-gray-700/30 to-white dark:to-gray-800 relative w-full p-0">
                            <img
                              src={cert.thumbnailUrl}
                              alt={`${cert.title} thumbnail`}
                              className="w-full h-full object-scale-down mx-auto"
                              style={{ maxWidth: "100%" }}
                              onError={() => handleImageError(cert.thumbnailUrl!)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        ) : (
                          <div className="h-60 bg-gradient-to-b from-muted/30 dark:from-gray-700/30 to-white dark:to-gray-800 flex items-center justify-center">
                            <motion.div 
                              className="w-24 h-24 rounded-full bg-muted/20 dark:bg-gray-700/50 flex items-center justify-center"
                              whileHover={shouldReduceMotion ? {} : { rotate: 5, scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              {getItemIcon(cert.category)}
                            </motion.div>
                          </div>
                        )}
                        
                        {/* Card fold line with improved subtle styling */}
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/70 dark:via-gray-600/70 to-transparent"></div>
                        
                        <div className="p-6 relative">
                          <div className="flex items-start mb-4">
                            <div className="h-12 w-12 rounded-full bg-muted dark:bg-gray-700 flex items-center justify-center mr-3">
                              {getItemIcon(cert.category)}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white leading-tight min-h-[3rem] w-full">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground dark:text-gray-300 mb-4 line-clamp-3">{cert.description}</p>
                          
                          {/* Certificate metadata with improved layout */}
                          <div className="space-y-2 mb-4">
                            {cert.certificationBody && (
                              <div className="text-sm text-muted-foreground dark:text-gray-400 flex items-center">
                                <span className="w-3 h-[1px] bg-muted-foreground/30 dark:bg-gray-500/50 mr-2"></span>
                                Issued by <span className="font-semibold ml-1 text-gray-700 dark:text-gray-300">{cert.certificationBody}</span>
                              </div>
                            )}
                            
                            {cert.standard && (
                              <div className="text-sm text-muted-foreground dark:text-gray-400 flex items-center">
                                <span className="w-3 h-[1px] bg-muted-foreground/30 dark:bg-gray-500/50 mr-2"></span>
                                Standard: <span className="font-semibold ml-1 text-gray-700 dark:text-gray-300">{cert.standard}</span>
                              </div>
                            )}
                            
                            {cert.issueDate && (
                              <div className="text-sm text-muted-foreground dark:text-gray-400 flex items-center">
                                <span className="w-3 h-[1px] bg-muted-foreground/30 dark:bg-gray-500/50 mr-2"></span>
                                Issued: <span className="font-semibold ml-1 text-gray-700 dark:text-gray-300">{new Date(cert.issueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                          
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(cert);
                            }}
                            className="inline-flex items-center text-base font-medium text-rashmi-red dark:text-rashmi-red/90 hover:text-rashmi-red/80 dark:hover:text-rashmi-red/70"
                            whileHover={shouldReduceMotion ? {} : { x: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Eye size={18} className="mr-1" />
                            View Details
                          </motion.button>
                          
                          {/* Download and View buttons */}
                          {cert.fileUrl && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30 dark:border-gray-700/50">
                              <a 
                                href={cert.fileUrl}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-md bg-muted/50 dark:bg-gray-700/70 hover:bg-muted dark:hover:bg-gray-700 transition-colors"
                                title={`Download ${cert.title} certificate`}
                              >
                                <Download size={14} className="mr-1.5" />
                                Download
                                {cert.pdfSize && <span className="ml-1 text-muted-foreground dark:text-gray-400">({cert.pdfSize})</span>}
                              </a>
                              
                              <a 
                                href={cert.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-md bg-muted/50 dark:bg-gray-700/70 hover:bg-muted dark:hover:bg-gray-700 transition-colors"
                                title={`View ${cert.title} certificate in browser`}
                              >
                                <ExternalLink size={14} className="mr-1.5" />
                                View in Browser
                              </a>
                            </div>
                          )}
                          
                          {/* Bottom decorative edge */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rashmi-red/20 dark:via-rashmi-red/30 to-transparent"></div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
        
        {/* All Certificates and Standards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <Search size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('all'); setSelectedRegion('all');}}
                    className="px-4 py-2 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={shouldReduceMotion ? {} : "hover"}
                      className="group cursor-pointer p-2"
                      role="button"
                      tabIndex={0}
                      onClick={() => handleCertificateSelect(item)}
                      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleCertificateSelect(item)}
                      aria-label={`View details of ${item.title}`}
                      style={{
                        minHeight: '450px',
                        display: 'block',
                        visibility: 'visible'
                      }}
                    >
                      {/* Envelope Container - Fixed sizing */}
                      <div className="relative w-full max-w-md mx-auto">

                        {/* Envelope Base - Ensure visibility with inline styles */}
                        <div
                          className="relative rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-visible min-h-[420px] w-full"
                          style={{
                            background: 'linear-gradient(to bottom right, #ef4444, #dc2626)',
                            minHeight: '420px',
                            width: '100%'
                          }}
                        >

                          {/* Envelope Flaps */}
                          <div className="absolute inset-0">
                            {/* Left flap */}
                            <div
                              className="absolute top-0 left-0 w-1/2 h-full transform origin-top-left rotate-0 transition-transform group-hover:rotate-1 shadow-inner"
                              style={{
                                background: 'linear-gradient(to bottom right, #f87171, #ef4444)'
                              }}
                            ></div>
                            {/* Right flap */}
                            <div
                              className="absolute top-0 right-0 w-1/2 h-full transform origin-top-right rotate-0 transition-transform group-hover:-rotate-1 shadow-inner"
                              style={{
                                background: 'linear-gradient(to bottom left, #f87171, #ef4444)'
                              }}
                            ></div>
                            {/* Bottom flap */}
                            <div
                              className="absolute bottom-0 left-0 right-0 h-1/3 shadow-lg"
                              style={{
                                background: 'linear-gradient(to top, #dc2626, #ef4444)'
                              }}
                            ></div>
                            {/* Envelope seam lines */}
                            <div
                              className="absolute top-0 left-1/2 w-px h-full transform -translate-x-1/2"
                              style={{ backgroundColor: 'rgba(185, 28, 28, 0.3)' }}
                            ></div>
                            <div
                              className="absolute bottom-1/3 left-0 right-0 h-px"
                              style={{ backgroundColor: 'rgba(185, 28, 28, 0.3)' }}
                            ></div>
                          </div>

                          {/* Envelope Opening */}
                          <div
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-3 rounded-b-sm shadow-inner"
                            style={{
                              background: 'linear-gradient(to bottom, #b91c1c, #991b1b)'
                            }}
                          ></div>

                          {/* Featured Badge - Wax Seal Style */}
                          {item.featured && (
                            <motion.div
                              className="absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center z-30 shadow-lg border-3 border-yellow-300"
                              style={{
                                background: 'linear-gradient(to bottom right, #facc15, #eab308)',
                                color: '#b91c1c',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.2)'
                              }}
                              initial={{ rotate: 12, scale: 0.9 }}
                              whileHover={shouldReduceMotion ? {} : { rotate: 0, scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              <Award size={16} className="drop-shadow-sm" />
                            </motion.div>
                          )}

                          {/* Certificate Document Emerging from Envelope - Fixed positioning */}
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">

                            {/* Certificate Paper */}
                            <motion.div
                              className="relative"
                              initial={{ y: 10, opacity: 0.9 }}
                              animate={{ y: 0, opacity: 1 }}
                              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              {/* Certificate Document - Ensure visibility */}
                              {item.thumbnailUrl && !imageErrors.has(item.thumbnailUrl) ? (
                                <div className="w-52 h-64 bg-white border-2 border-gray-300 rounded-sm shadow-xl relative overflow-hidden transform rotate-1 group-hover:rotate-0 transition-transform duration-300"
                                  style={{
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                    minWidth: '208px',
                                    minHeight: '256px'
                                  }}
                                >

                                  {/* Certificate Image - High Resolution */}
                                  <img
                                    src={item.thumbnailUrl}
                                    alt={`${item.title} thumbnail`}
                                    className="w-full h-full object-contain p-2"
                                    loading="lazy"
                                    onError={() => handleImageError(item.thumbnailUrl!)}
                                  />

                                  {/* Subtle paper shadow overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none"></div>

                                  {/* Certificate type indicator */}
                                  <div
                                    className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center shadow-sm text-xs font-bold"
                                    style={{ backgroundColor: '#ef4444' }}
                                  >
                                    {item.category.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                              ) : (
                                <div className="w-52 h-64 bg-white border-2 border-gray-300 rounded-sm shadow-xl relative overflow-hidden transform rotate-1 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center"
                                  style={{
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                    minWidth: '208px',
                                    minHeight: '256px'
                                  }}
                                >

                                  {/* Fallback content */}
                                  <div className="text-center z-10">
                                    <File className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                                    <div className="text-sm text-gray-500 px-2 font-medium">Certificate</div>
                                    <div className="text-xs text-gray-400 px-2 mt-1">Preview not available</div>
                                  </div>

                                  {/* Certificate type indicator */}
                                  <div
                                    className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center shadow-sm text-xs font-bold"
                                    style={{ backgroundColor: '#ef4444' }}
                                  >
                                    {item.category.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </div>

                          {/* Certificate Title and Info - Ensure visibility */}
                          <div className="absolute bottom-4 left-0 right-0 text-center px-4 z-20">
                            <div
                              className="backdrop-blur-sm rounded-lg p-3 mx-2"
                              style={{ backgroundColor: 'rgba(127, 29, 29, 0.8)' }}
                            >
                              <h3 className="text-sm font-bold text-white mb-1 line-clamp-2 leading-tight">
                                {item.title}
                              </h3>

                              {/* Certificate Body */}
                              {item.certificationBody && (
                                <p className="text-xs text-red-100 mb-1 line-clamp-1">
                                  Issued by {item.certificationBody}
                                </p>
                              )}

                              {/* Certificate Number */}
                              {item.certificateNumber && (
                                <p
                                  className="text-xs font-mono px-2 py-1 rounded text-center border"
                                  style={{
                                    color: '#fecaca',
                                    backgroundColor: 'rgba(153, 27, 27, 0.6)',
                                    borderColor: 'rgba(185, 28, 28, 0.5)'
                                  }}
                                >
                                  {item.certificateNumber}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* View Details Button */}
                          <motion.div
                            className="absolute bottom-2 right-2 px-3 py-1 bg-white/95 dark:bg-gray-800/95 border rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm text-xs font-medium"
                            style={{
                              borderColor: '#fca5a5',
                              color: '#dc2626'
                            }}
                            whileHover={shouldReduceMotion ? {} : { scale: 1.05, x: 2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Eye size={12} className="mr-1" />
                            View Details
                          </motion.div>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-border dark:divide-gray-700">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      custom={index}
                      variants={fadeInUpVariants}
                      initial="hidden"
                      animate="visible"
                      className="py-5 px-4 hover:bg-muted/30 dark:hover:bg-gray-800/60 rounded-md transition-colors group relative"
                      onClick={() => setSelectedItem(item)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedItem(item)}
                      aria-label={`View details of ${item.title}`}
                    >
                      {/* Subtle envelope edge indicator */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-rashmi-red/0 via-rashmi-red/20 dark:via-rashmi-red/30 to-rashmi-red/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex items-start">
                        <div className="h-14 w-14 rounded-full bg-muted/30 dark:bg-gray-700/50 flex items-center justify-center mr-5 flex-shrink-0">
                          {getItemIcon(item.category)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
                              {item.title}
                              {item.featured && (
                                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] uppercase font-bold tracking-wider bg-rashmi-red/10 dark:bg-rashmi-red/20 text-rashmi-red dark:text-rashmi-red/90">
                                  Featured
                                </span>
                              )}
                            </h3>
                          </div>
                          
                          <div className="text-xs text-muted-foreground/80 dark:text-gray-400 mt-1 mb-2">
                            <span className="inline-flex items-center">
                              {item.category === 'management' ? 'Management System' :
                               item.category === 'product' ? 'Product Certification' :
                               item.category === 'laboratory' ? 'Laboratory Accreditation' :
                               item.category === 'pipes' ? 'DI Pipe Certificate' :
                               item.category === 'fittings' ? 'DI Fitting Certificate' :
                               item.category === 'specification' ? 'Specification' :
                               item.category === 'approval' ? 'Approval' : 'Certificate'}
                            </span>
                            {item.region && (
                              <span className="mx-2 opacity-50">•</span>
                            )}
                            {item.region && (
                              <span className="capitalize">{item.region}</span>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground dark:text-gray-300 mt-1">{item.description}</p>
                          
                          <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground dark:text-gray-400">
                            {item.certificationBody && (
                              <div className="flex items-center">
                                <Award className="mr-1.5 text-muted-foreground/50 dark:text-gray-500" size={12} />
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{item.certificationBody}</span>
                              </div>
                            )}
                            
                            {item.standard && (
                              <div className="flex items-center">
                                <ClipboardCheck className="mr-1.5 text-muted-foreground/50 dark:text-gray-500" size={12} />
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{item.standard}</span>
                              </div>
                            )}
                            
                            {item.issueDate && (
                              <div className="flex items-center">
                                <Calendar className="mr-1.5 text-muted-foreground/50 dark:text-gray-500" size={12} />
                                <span>Issued: <span className="font-semibold text-gray-700 dark:text-gray-300">{new Date(item.issueDate).toLocaleDateString()}</span></span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            className="flex items-center text-sm font-medium text-rashmi-red dark:text-rashmi-red/90 hover:text-rashmi-red/80 dark:hover:text-rashmi-red/70"
                            whileHover={shouldReduceMotion ? {} : { x: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Eye size={16} className="mr-1" />
                            Details
                          </motion.button>
                          
                          {/* Download and View buttons */}
                          {item.fileUrl && (
                            <div className="flex gap-2 flex-wrap justify-end">
                              <a 
                                href={item.fileUrl}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-md bg-muted/50 dark:bg-gray-700/70 hover:bg-muted dark:hover:bg-gray-700 transition-colors"
                                title={`Download ${item.title} certificate`}
                              >
                                <Download size={12} className="mr-1" />
                                Download
                              </a>
                              
                              <a 
                                href={item.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-md bg-muted/50 dark:bg-gray-700/70 hover:bg-muted dark:hover:bg-gray-700 transition-colors"
                                title={`View ${item.title} certificate in browser`}
                              >
                                <ExternalLink size={12} className="mr-1" />
                                View
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Approval Countries */}
        <motion.section 
          className="py-16 bg-muted/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  International <span className="text-rashmi-red">Approvals</span>
                </h2>
                <p className="text-muted-foreground">Our products are approved by regulatory authorities across multiple countries</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvals.map((country, index) => (
                  <motion.div
                    key={country.country}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-all p-6 group relative"
                  >
                    {/* Regional pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(120,120,120,0.2),transparent_80%)]"></div>
                    
                    {country.region === 'middleeast' && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full"></div>
                    )}
                    {country.region === 'asia' && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full"></div>
                    )}
                    {country.region === 'europe' && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-bl-full"></div>
                    )}
                    {country.region === 'africa' && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-500/5 to-transparent rounded-bl-full"></div>
                    )}
                    {country.region === 'global' && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-full"></div>
                    )}
                    
                    <div className="flex items-center mb-4 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        className="mr-3"
                      >
                        <Globe className={`
                          ${country.region === 'middleeast' ? 'text-amber-500' : 
                           country.region === 'asia' ? 'text-blue-500' : 
                           country.region === 'europe' ? 'text-indigo-500' : 
                           country.region === 'africa' ? 'text-green-500' : 
                           country.region === 'global' ? 'text-purple-500' : 'text-rashmi-red'}
                        `} size={22} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold">{country.country}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{country.region}</p>
                      </div>
                    </div>
                    
                    <div className="border-l-2 border-muted/50 pl-4 ml-2">
                      <h4 className="text-sm font-medium mb-2">Approving Agencies:</h4>
                      <ul className="space-y-2 text-sm">
                        {country.agencies.map((agency, agencyIndex) => (
                          <motion.li 
                            key={agencyIndex} 
                            className="flex"
                            initial={{ opacity: 0, x: -5 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 + (agencyIndex * 0.05) }}
                          >
                            <Check size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{agency}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Certificate Detail Slide-in Panel */}
        <AnimatePresence>
          {isDetailPanelOpen && selectedItem && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={closeDetailPanel}
              />

              {/* Slide-in Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
              >
                {/* Panel Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-700 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-amber-600 dark:text-amber-300" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">{selectedItem.title}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedItem.category === 'management' ? 'Management System Certificate' :
                           selectedItem.category === 'product' ? 'Product Certificate' :
                           selectedItem.category === 'pipes' ? 'DI Pipe Certificate' :
                           selectedItem.category === 'fittings' ? 'DI Fitting Certificate' :
                           selectedItem.category === 'laboratory' ? 'Laboratory Certificate' :
                           selectedItem.category === 'approval' ? 'Approval Certificate' : 'Certificate'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeDetailPanel}
                      className="w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Panel Content */}
                <div className="p-6 space-y-6">
                
                <div className="p-6 relative">
                  {/* Certificate header with decorative elements */}
                  <div className="mb-6 text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-14 w-14 rounded-full bg-muted/20 dark:bg-gray-700 flex items-center justify-center">
                        {getItemIcon(selectedItem.category)}
                      </div>
                    </div>
                    <div className="text-sm text-center uppercase tracking-wider font-semibold text-muted-foreground dark:text-gray-400 mb-1">
                      {selectedItem.category === 'management' ? 'Management System Certification' :
                       selectedItem.category === 'product' ? 'Product Certification' :
                       selectedItem.category === 'laboratory' ? 'Laboratory Accreditation' :
                       selectedItem.category === 'pipes' ? 'DI Pipe Certificate' :
                       selectedItem.category === 'fittings' ? 'DI Fitting & Flanging Certificate' :
                       selectedItem.category === 'specification' ? 'Specification' :
                       selectedItem.category === 'approval' ? 'Approval' : 'Certificate'}
                    </div>
                    {selectedItem.certificationBody && (
                      <div className="text-xs text-muted-foreground dark:text-gray-400">
                        Issued by <span className="font-semibold">{selectedItem.certificationBody}</span>
                      </div>
                    )}
                    
                    {/* Decorative line */}
                    <div className="w-full flex items-center justify-center my-4">
                      <div className="flex-1 h-[1px] bg-muted dark:bg-gray-700"></div>
                      <div className="mx-4">
                      </div>
                      <div className="flex-1 h-[1px] bg-muted dark:bg-gray-700"></div>
                    </div>
                  </div>
                  
                  {/* Certificate Thumbnail/Preview - Centered with frame */}
                  {selectedItem.thumbnailUrl && !imageErrors.has(selectedItem.thumbnailUrl) && (
                    <div className="mb-6 flex justify-center">
                      <div className="relative p-2 bg-white border border-muted rounded-sm shadow-sm">
                        <img
                          src={selectedItem.thumbnailUrl}
                          alt={`${selectedItem.title} Certificate`}
                          className="max-h-64 object-contain"
                          onError={() => handleImageError(selectedItem.thumbnailUrl!)}
                        />
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rashmi-red/20"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-rashmi-red/20"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-rashmi-red/20"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rashmi-red/20"></div>
                        
                        {selectedItem.fileUrl && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <a 
                              href={selectedItem.fileUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 bg-white rounded-full"
                            >
                              <Eye size={24} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="bg-muted/10 p-4 rounded-md border border-muted/20">
                      <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
                      <p className="text-muted-foreground">{selectedItem.description}</p>
                    </div>
                    
                    {/* Certificate Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {selectedItem.certificateNumber && (
                        <div className="p-3 bg-white border border-muted/20 rounded-md">
                          <h4 className="text-xs font-medium text-muted-foreground mb-1">Certificate Number</h4>
                          <p className="text-sm font-semibold">{selectedItem.certificateNumber}</p>
                        </div>
                      )}
                      
                      {selectedItem.standard && (
                        <div className="p-3 bg-white border border-muted/20 rounded-md">
                          <h4 className="text-xs font-medium text-muted-foreground mb-1">Standard Reference</h4>
                          <p className="text-sm font-semibold">{selectedItem.standard}</p>
                        </div>
                      )}
                      
                      {selectedItem.issueDate && (
                        <div className="p-3 bg-white border border-muted/20 rounded-md">
                          <h4 className="text-xs font-medium text-muted-foreground mb-1">Issue Date</h4>
                          <p className="text-sm font-semibold">{new Date(selectedItem.issueDate).toLocaleDateString()}</p>
                        </div>
                      )}
                      
                      {selectedItem.expiryDate && (
                        <div className="p-3 bg-white border border-muted/20 rounded-md">
                          <h4 className="text-xs font-medium text-muted-foreground mb-1">Expiry Date</h4>
                          <p className="text-sm font-semibold">{new Date(selectedItem.expiryDate).toLocaleDateString()}</p>
                        </div>
                      )}
                      
                      {selectedItem.region && (
                        <div className="p-3 bg-white border border-muted/20 rounded-md">
                          <h4 className="text-xs font-medium text-muted-foreground mb-1">Region</h4>
                          <p className="text-sm font-semibold capitalize">{selectedItem.region}</p>
                        </div>
                      )}
                    </div>
                    
                    {selectedItem.countries && selectedItem.countries.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Applicable Countries</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.countries.map(country => (
                            <span key={country} className="text-xs px-2 py-1 rounded-full bg-muted">
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedItem.fileUrl && (
                      <div className="pt-4 flex flex-wrap gap-3 justify-center">
                        <a 
                          href={selectedItem.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-md bg-rashmi-red text-white hover:bg-rashmi-red/90 transition-colors"
                        >
                          <Download size={16} className="mr-2" />
                          Download Certificate
                          {selectedItem.pdfSize && <span className="ml-2 text-xs">({selectedItem.pdfSize})</span>}
                        </a>
                        
                        <a 
                          href={selectedItem.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-md border border-border hover:bg-muted/30 transition-colors"
                        >
                          <Eye size={16} className="mr-2" />
                          View in Browser
                        </a>
                      </div>
                    )}
                    
                    {/* Download Actions */}
                    {selectedItem.fileUrl && (
                      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <a
                          href={selectedItem.fileUrl}
                          download
                          className="flex items-center justify-center px-6 py-3 text-white rounded-lg transition-colors"
                          style={{
                            backgroundColor: '#dc2626',
                          }}
                          onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#b91c1c'}
                          onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#dc2626'}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                          {selectedItem.pdfSize && <span className="ml-2 text-sm opacity-90">({selectedItem.pdfSize})</span>}
                        </a>
                        <a
                          href={selectedItem.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View in Browser
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default Certifications;

