import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Home, Search, Filter, Microscope, Beaker, FileCheck, Ruler, Settings,
    Wrench, Award, ZoomIn, CheckCircle2, Trophy, BarChart4, FlaskConical,
    PercentCircle, BadgeCheck, ShieldCheck, Clipboard, ArrowRight, Pipette
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generateFAQSchema, generateBreadcrumbSchema } from '../lib/schema';

// --- REVISED & DETAILED QUALITY PROCESSES ---
const qualityProcesses = [
  {
    id: 1,
    title: "Design Department & Pattern Shop",
    category: "pre-production",
    description: "Precision design using CAD/CAM and 3D modeling. Creating accurate patterns in our dedicated shop for flawless casting foundations.",
    equipments: [
      "CAD/CAM Software Integration",
      "3D Modeling & Simulation Tools",
      "Dedicated Pattern Shop Facility",
      "Digital Prototyping & Verification",
      "Material Flow Simulation"
    ],
    imageUrl: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/wfpkbm4zgptwhef9dkve"
  },
  {
    id: 2,
    title: "Sand Testing",
    category: "pre-production",
    description: "Comprehensive analysis of molding sand properties (permeability, strength, moisture, grain size) to ensure optimal casting conditions and surface finish.",
    equipments: [
      "Digital Permeability Meter",
      "Universal Sand Strength Machine",
      "Digital Compactability Tester",
      "AFS Sieve Shaker & Grain Fineness Tester",
      "Rapid Moisture Analyzer",
      "Mould Hardness Tester"
    ],
    imageUrl: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/sl4ukstefebluhe1z8lz"
  },
  {
    id: 3,
    title: "Physical Testing & Analysis",
    category: "quality-control",
    description: "In-depth material analysis verifying chemical composition, mechanical properties (tensile, hardness, impact), and microstructure against stringent international standards.",
    equipments: [
      "Optical Emission Spectrometer (OES)",
      "Universal Testing Machine (UTM) - Tensile, Yield, Elongation",
      "Metallurgical Microscope with Image Analyzer",
      "Brinell & Rockwell Hardness Testing Machines",
      "Charpy Impact Testing Machine",
    ],
    imageUrl: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/d7mk2qxrhaaliiuwtze7"
  },
   {
    id: 4,
    title: "In-Process Quality Inspection",
    category: "quality-control",
    description: "Continuous monitoring during production, covering chemical, physical, coating properties, and critical parameters at defined checkpoints.",
    equipments: [ // Labeled as "Checks & Procedures" in the card
      "Carbon Equivalent Calculation & Control",
      "Molten Metal Chemical Analysis (Spectro)",
      "Microstructure Analysis (In-process samples)",
      "Pouring Temperature Control & Recording",
      "Wall Thickness Ultrasonic Testing (UT)",
      "Ring Test for Ductility Confirmation",
      "Zinc Coating Mass Measurement (Gravimetric/XRF)",
      "Cement Lining Thickness Check (Digital Gauge)",
      "Bitumen Coating Thickness Check (Elcometer)",
    ],
    imageUrl: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/bwchafmk5927dyxqhzku"
  },
  {
    id: 5,
    title: "Finishing Facility",
    category: "production",
    description: "Advanced surface preparation including automated shot blasting and meticulous fettling to ensure superior coating adhesion and product finish.",
    equipments: [
      "Automated Shot Blasting Machines",
      "Manual & Robotic Fettling Stations",
      "Surface Roughness Testers",
      "Dust Collection & Control Systems",
      "Visual Inspection Booths",
    ],
    imageUrl: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/m3vkybjfhnnsyobpyfhs"
  },
  {
    id: 6,
    title: "Machining Facility / Machine Shop",
    category: "production",
    description: "High-precision CNC machining, drilling, and multi-drilling operations for fittings, flanges, and custom pipe end preparations.",
    equipments: [
      "CNC Machining Centers",
      "Vertical Machining Centers (VMC)",
      "Horizontal Machining Centers (HMC)",
      "Radial & Multi-Spindle Drilling Machines",
      "Precision Gauges & Tooling",
    ],
    imageUrl: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/im0p8f9zyrtkj7nrwl2h"
  },
  {
    id: 7,
    title: "Final Inspection & Dimensional Control",
    category: "quality-control",
    description: "Comprehensive final verification of all dimensions, mechanical properties, coating integrity, and hydrostatic pressure resistance before dispatch.",
    equipments: [
      "Digital Calipers & Micrometers",
      "Height Gauges & Profile Projectors",
      "Custom Go/No-Go Gauges",
      "Coordinate Measuring Machine (CMM)",
      "Spigot Outer Diameter & Socket Inner Diameter Checks",
      "Final Mechanical Property Verification (Tensile, Hardness)",
      "Final Impact Resistance Test Verification",
      "Hydrostatic Pressure Testing Machine (Pipes)",
      "Hydrostatic Pressure Testing (Fittings)",
      "Final Visual & Packing Inspection"
    ],
    imageUrl: "https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/fittings%20pics/lqyi4adxz9xfysrxmid9"
  }
];


// Process categories
const categories = [
    { value: "all", label: "All Processes" },
    { value: "pre-production", label: "Pre-Production" },
    { value: "production", label: "Production" },
    { value: "quality-control", label: "Quality Control" },
];

// Quality metrics data
const qualityMetrics = [
    { label: "Quality Checkpoints", value: "150+", icon: CheckCircle2, color: "text-green-500" }, // Adjusted value
    { label: "Intl. Standards Met", value: "12+", icon: BadgeCheck, color: "text-blue-500" }, // Adjusted value
    { label: "Dedicated QC Personnel", value: "80+", icon: ShieldCheck, color: "text-yellow-500" }, // Adjusted value
    { label: "Annual Quality Audits", value: "24+", icon: Clipboard, color: "text-purple-500" } // Adjusted value
];

// Laboratory equipment showcase
const laboratoryEquipment = [
    { name: "Spectrometer", description: "High-precision elemental analysis for accurate material composition testing", icon: FlaskConical },
    { name: "Universal Testing Machine", description: "Measures tensile strength, compression, and other mechanical properties", icon: BarChart4 },
    { name: "Metallurgical Microscope", description: "Advanced optical system for microstructure analysis and quality verification", icon: Microscope },
    { name: "Hardness Testing Equipment", description: "Precision instruments for measuring material hardness across various scales", icon: Ruler }
];

// FAQ data
const faqItems = [
    { question: "What quality standards does Rashmi Metaliks follow?", answer: "Rashmi Metaliks adheres to the highest international standards including ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, and product-specific standards like EN 545, ISO 2531, AWWA C151/A21.51, IS 8329 and more, ensuring consistent quality and compliance across all our products." },
    { question: "How does Rashmi Metaliks ensure product quality?", answer: "We maintain quality through a comprehensive multi-stage quality control process integrating detailed checks from raw material analysis (Sand, Scrap) through in-process monitoring (Chemical, Physical, Dimensional) to final product verification including hydrostatic testing and dimensional control. Our dedicated QC team uses calibrated, state-of-the-art equipment at each critical stage." },
    { question: "What testing procedures are conducted on DI pipes?", answer: "Our DI pipes undergo rigorous testing including: Spectrometric chemical analysis, mechanical tests (tensile strength, yield strength, elongation, hardness, impact), detailed dimensional checks (OD, ID, thickness), hydrostatic pressure tests (up to 50 bar or higher), coating tests (thickness, adhesion), microstructure analysis, and visual inspections to ensure full compliance with relevant standards (e.g., ISO 2531, EN 545, IS 8329)." },
    { question: "Does Rashmi Metaliks have third-party certifications?", answer: "Yes, Rashmi Metaliks products are certified by numerous reputable third-party organizations globally. We hold certifications from bodies like BIS (India), BSI (UK), API (USA), DVGW (Germany), WRAS (UK), FM Approvals (USA), UL (USA), and many others, validating our quality systems and product compliance against international benchmarks." } // Updated answer
];

// --- UPDATED QUALITY ICONS MAPPING ---
const QualityIcons = {
  "Design Department & Pattern Shop": Settings,
  "Sand Testing": Beaker,
  "Physical Testing & Analysis": Microscope,
  "In-Process Quality Inspection": FileCheck,
  "Finishing Facility": Wrench,
  "Machining Facility / Machine Shop": Settings, // Re-using settings icon for consistency
  "Final Inspection & Dimensional Control": Ruler
};

const QualityAssurance = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProcess, setSelectedProcess] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter processes based on category and search term
    const filteredProcesses = qualityProcesses.filter(process => {
        const matchesCategory = selectedCategory === "all" || process.category === selectedCategory;
        const matchesSearch = process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              process.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              process.equipments.some(eq => eq.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Generate schema
    const faqSchema = generateFAQSchema(faqItems);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Quality Assurance", url: "/quality-assurance" }
    ]);

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-foreground">
            <SEO
                title="Quality Assurance | Premium Testing & Standards | Rashmi Metaliks"
                description="Explore Rashmi Metaliks' comprehensive quality assurance system, ensuring superior DI Pipes and Fittings through rigorous testing, advanced labs, and adherence to global standards."
                keywords="quality assurance, quality control, DI pipe testing, ISO 9001, EN 545, ISO 2531, material testing, Rashmi Metaliks quality, manufacturing standards, quality inspection, hydrostatic testing" // Enhanced Keywords
                canonicalUrl="/quality-assurance"
                ogType="website"
                ogImage="https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/Rashmi%20Metaliks/d7mk2qxrhaaliiuwtze7" // Updated OG image to product image
                schema={[faqSchema, breadcrumbSchema]}
            />

            <Header />

            {/* --- Hero Section --- */}
            <section className="relative pt-36 pb-24 overflow-hidden min-h-[70vh] flex items-center justify-center">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                     <motion.video
                        autoPlay muted loop playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: "center center" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.95 }}
                        transition={{ duration: 1.5 }}
                    >
                        {/* Updated to a high-quality video showing quality testing processes */}
                        <source src="https://res.cloudinary.com/dada5hjp3/video/upload/v1744694427/GettyImages-1348822324_ku1g3c" type="video/mp4" />
                        Your browser does not support the video tag.
                    </motion.video>
                    {/* Overlay with enhanced gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Breadcrumb */}
                        <div className="flex items-center justify-center text-sm text-white mb-6 font-medium drop-shadow-sm">
                            <Link to="/" className="hover:text-rashmi-red transition-colors">
                                <Home size={14} className="inline mr-1" />
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white/90">Quality Assurance</span>
                        </div>

                         {/* Text Block with enhanced responsive backdrop */}
                         <div className="bg-background/70 dark:bg-gray-900/70 backdrop-blur-md rounded-xl p-8 shadow-lg border border-border/20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-6" // Reduced bottom margin
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground drop-shadow-md">
                                    Uncompromising <span className="text-rashmi-red">Quality</span>
                                </h1>
                                <div className="w-24 h-1.5 bg-rashmi-red mx-auto mb-6"></div> {/* Centered divider */}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="prose prose-lg max-w-none text-center" // Centered text
                            >
                                <p className="text-foreground/90 leading-relaxed font-medium drop-shadow-sm mb-4">
                                    At Rashmi Metaliks, quality isn't just a department; it's ingrained in our DNA. We employ a holistic quality assurance framework across every production stage, ensuring our Ductile Iron products consistently meet and exceed the most demanding international standards.
                                </p>
                                <p className="text-foreground/90 leading-relaxed font-medium drop-shadow-sm">
                                    Our <strong>ISO 9001:2015</strong> certified system, advanced testing labs, and skilled professionals guarantee products renowned for durability, reliability, and performance.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Quality Metrics Section with Enhanced Visual Appeal --- */}
             <section className="py-16 bg-muted/20">
                 <div className="container mx-auto px-4">
                     <motion.div
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.3 }}
                         transition={{ staggerChildren: 0.1 }}
                         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                     >
                         {qualityMetrics.map((metric) => (
                             <motion.div
                                 key={metric.label}
                                 variants={{
                                     hidden: { opacity: 0, y: 20 },
                                     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                 }}
                                 whileHover={{ y: -6, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
                                 className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center shadow-sm transition-all duration-300"
                             >
                                 <div className={`rounded-full p-4 ${metric.color.replace('text-', 'bg-').replace('500', '100')} mb-4 shadow-inner`}>
                                     <metric.icon className={`h-9 w-9 ${metric.color}`} />
                                 </div>
                                 <div className="text-4xl font-bold mb-1 text-rashmi-red">{metric.value}</div>
                                 <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                             </motion.div>
                         ))}
                     </motion.div>
                 </div>
             </section>


            {/* --- Search and Filter Section --- */}
             <section className="py-12 bg-background sticky top-0 z-40 shadow-sm border-b border-border">
                 <div className="container mx-auto px-4">
                     <motion.div
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5 }}
                         className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto"
                     >
                         <div className="relative flex-1">
                             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                             <input
                                 type="text"
                                 placeholder="Search quality processes (e.g., Spectrometer, Finishing)"
                                 value={searchTerm}
                                 onChange={(e) => setSearchTerm(e.target.value)}
                                 className="w-full pl-12 pr-4 py-3 rounded-md border border-border bg-input focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 focus:border-transparent transition-colors"
                             />
                         </div>

                         <div className="relative min-w-[220px]">
                             <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                             <select
                                 value={selectedCategory}
                                 onChange={(e) => setSelectedCategory(e.target.value)}
                                 className="w-full pl-12 pr-10 py-3 rounded-md border border-border bg-input focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 focus:border-transparent appearance-none transition-colors cursor-pointer"
                             >
                                 {categories.map((category) => (
                                     <option key={category.value} value={category.value}>
                                         {category.label}
                                     </option>
                                 ))}
                             </select>
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                 <svg className="fill-current h-4 w-4 text-muted-foreground" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                             </div>
                         </div>
                     </motion.div>
                 </div>
             </section>

            {/* --- IMPROVISED Quality Process Timeline Section --- */}
            <section className="py-24 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto mb-20 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
                        >
                            Our Meticulous Quality <span className="text-rashmi-red">Journey</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-muted-foreground text-lg max-w-3xl mx-auto"
                        >
                            Follow our comprehensive quality assurance process, ensuring excellence from raw material to the final, certified product.
                        </motion.p>
                    </div>

                    {/* Enhanced Timeline View */}
                    <div className="relative max-w-6xl mx-auto">
                        {/* Timeline center line - Thicker with Gradient */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true, margin: "-150px" }} // Adjust margin for earlier trigger
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-rashmi-red/20 via-rashmi-red to-rashmi-red/20 rounded-full z-0"
                        ></motion.div>

                        {/* Process steps */}
                        {filteredProcesses.map((process, index) => {
                            const isEven = index % 2 === 0;
                            const Icon = QualityIcons[process.title as keyof typeof QualityIcons] || Award;
                            const categoryDisplay = process.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

                            return (
                                <motion.div
                                    key={process.id}
                                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-10%" }} // Trigger animation sooner
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className={`flex items-start mb-20 md:mb-32 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Stage number on timeline - Enhanced */}
                                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.15 }}
                                            className="w-14 h-14 rounded-full bg-rashmi-red flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background ring-rashmi-red/50" // Added ring
                                        >
                                            {index + 1}
                                        </motion.div>
                                    </div>

                                    {/* Timeline connecting line - Refined */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "calc(15% + 1.5rem)"}} // Adjusted width calculation
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        style={{
                                            position: 'absolute',
                                            top: 'calc(50% - 1px)', // Centered vertically
                                            height: '3px',
                                            left: isEven ? 'auto' : '50%',
                                            right: isEven ? '50%' : 'auto',
                                            // Smoother gradient connection
                                            background: `linear-gradient(${isEven ? 'to left' : 'to right'}, transparent, #E53935 80%)`
                                        }}
                                        className="hidden md:block z-10 rounded-full"
                                    ></motion.div>

                                    {/* Content card container */}
                                    <div className={`w-full md:w-[40%] z-20 ${isEven ? 'md:mr-[10%]' : 'md:ml-[10%]'}`}>
                                        {/* Category & Mobile Stage Indicator */}
                                        <div className="mb-3 flex items-center justify-between md:justify-start">
                                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm border ${
                                                process.category === 'pre-production' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                                process.category === 'production' ? 'bg-green-100 text-green-800 border-green-200' :
                                                'bg-purple-100 text-purple-800 border-purple-200'
                                            }`}>
                                                {categoryDisplay}
                                            </span>
                                             {/* Mobile Stage Indicator */}
                                            <span className="md:hidden ml-2 px-3 py-1 text-xs font-medium rounded-full bg-rashmi-red/10 text-rashmi-red border border-rashmi-red/20">
                                                Stage {index + 1}
                                            </span>
                                        </div>

                                        {/* Main Card - Enhanced Hover */}
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -5, boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.15), 0 8px 15px -8px rgba(0,0,0,0.1)" }}
                                            className="bg-card border border-border rounded-lg overflow-hidden shadow-md transition-all duration-300 relative group" // Added group for potential future use
                                        >
                                            {/* Card Header with Image & Gradient */}
                                            <div className="h-52 overflow-hidden relative">
                                                {/* Added Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.4 }}
                                                    className="absolute inset-0 bg-cover bg-center z-0"
                                                    style={{ backgroundImage: `url(${process.imageUrl || 'https://via.placeholder.com/600x400/cccccc/969696?text=Process+Image'})` }} // Placeholder added
                                                ></motion.div>
                                                 {/* Stage number overlay on image (optional) */}
                                                 <div className="absolute top-4 right-4 z-20 bg-rashmi-red/80 text-white text-xs font-bold px-2.5 py-1 rounded-full hidden md:block backdrop-blur-sm">
                                                    STAGE {index + 1}
                                                </div>
                                            </div>

                                            {/* Card Content - Increased Padding */}
                                            <div className="p-6 md:p-8">
                                                <div className="flex items-start mb-4">
                                                    {/* Prominent Icon */}
                                                    <div className="bg-rashmi-red/10 border border-rashmi-red/20 w-14 h-14 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 shadow-sm">
                                                        <Icon className="text-rashmi-red" size={26} />
                                                    </div>
                                                    <h3 className="text-xl lg:text-2xl font-bold mt-1">{process.title}</h3>
                                                </div>

                                                <p className="text-muted-foreground mb-6 text-base leading-relaxed">{process.description}</p>

                                                {/* Equipment/Checks Section */}
                                                <div className="space-y-4">
                                                    <div className="font-semibold text-sm flex items-center gap-2 text-foreground/80">
                                                        <span className="w-5 h-0.5 bg-rashmi-red/60 rounded-full"></span>
                                                        {/* Dynamic Label */}
                                                        {process.title === "In-Process Quality Inspection" ? "Key Checks & Procedures" : "Key Equipment & Techniques"}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {process.equipments.slice(0, 4).map((item) => ( // Show 4 items initially
                                                            <span
                                                                key={item}
                                                                className="inline-block px-3 py-1.5 text-xs bg-muted border border-border/50 rounded-full hover:bg-muted/80 transition-colors font-medium"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                        {process.equipments.length > 4 && (
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                onClick={() => setSelectedProcess(selectedProcess === process.id ? null : process.id)}
                                                                className="inline-flex items-center px-3 py-1.5 text-xs bg-rashmi-red/10 text-rashmi-red rounded-full cursor-pointer hover:bg-rashmi-red/20 transition-colors font-semibold border border-rashmi-red/20"
                                                            >
                                                                +{process.equipments.length - 4} More
                                                                <ZoomIn size={13} className="ml-1.5" />
                                                            </motion.button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Expanded List Section - Enhanced */}
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{
                                                        height: selectedProcess === process.id ? 'auto' : 0,
                                                        opacity: selectedProcess === process.id ? 1 : 0,
                                                        marginTop: selectedProcess === process.id ? '1.5rem' : '0rem', // Add margin when open
                                                    }}
                                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    {selectedProcess === process.id && (
                                                        <div className="pt-5 border-t border-border mt-5 bg-muted/30 dark:bg-background/30 p-5 rounded-md">
                                                            <h4 className="font-semibold mb-3 text-base">
                                                                {/* Dynamic Heading */}
                                                                {process.title === "In-Process Quality Inspection" ? "Complete Checks & Procedures List:" : "Complete Equipment & Techniques List:"}
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {process.equipments.map((item, itemIndex) => (
                                                                    // Animated List Items
                                                                    <motion.li
                                                                        key={item}
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ duration: 0.2, delay: itemIndex * 0.05 }}
                                                                        className="flex items-start"
                                                                    >
                                                                        <CheckCircle2 size={15} className="text-green-500 mr-2.5 mt-0.5 flex-shrink-0" />
                                                                        <span className="text-sm text-muted-foreground">{item}</span>
                                                                    </motion.li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Timeline End Cap */}
                        <div className="flex flex-col items-center justify-center relative mt-4 mb-12 pt-8">
                             <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl border-4 border-background dark:border-background z-20"
                            >
                                <CheckCircle2 className="text-white" size={28} />
                            </motion.div>
                            <div className="mt-4 bg-card dark:bg-card border border-green-500/30 rounded-full px-8 py-2.5 text-sm font-semibold shadow-lg text-green-700 dark:text-green-400">
                                Quality Assured & Ready
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Laboratory Equipment Showcase --- */}
             <section className="py-24 bg-background relative overflow-hidden">
                {/* Decorative background elements */}
                 <div className="absolute top-0 left-0 w-64 h-64 bg-rashmi-red/5 rounded-full blur-[100px] opacity-50 -translate-x-1/2"></div>
                 <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[120px] opacity-50 translate-x-1/2"></div>

                 <div className="container mx-auto px-4 relative z-10">
                     <div className="max-w-4xl mx-auto mb-16 text-center">
                         <motion.h2
                             initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                             className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
                         >
                             Our Advanced <span className="text-rashmi-red">Testing Laboratory</span>
                         </motion.h2>
                         <motion.p
                             initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                             className="text-muted-foreground text-lg"
                         >
                             Equipped with cutting-edge technology for precise analysis and uncompromising quality validation.
                         </motion.p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                         {/* Equipment List */}
                         <motion.div
                             initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                             className="space-y-6"
                         >
                             {laboratoryEquipment.map((equipment, index) => (
                                 <motion.div
                                     key={equipment.name}
                                     initial={{ opacity: 0, y: 20 }}
                                     whileInView={{ opacity: 1, y: 0 }}
                                     viewport={{ once: true }}
                                     transition={{ duration: 0.4, delay: index * 0.1 }}
                                     className="flex items-start bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-rashmi-red/30 transition-all duration-300 hover:-translate-y-1.5"
                                 >
                                     <div className="mr-5 mt-1 bg-rashmi-red/10 rounded-lg p-3 h-14 w-14 flex items-center justify-center flex-shrink-0 border border-rashmi-red/20">
                                         <equipment.icon className="text-rashmi-red h-7 w-7" />
                                     </div>
                                     <div>
                                         <h3 className="font-bold text-lg mb-1.5">{equipment.name}</h3>
                                         <p className="text-muted-foreground text-sm leading-relaxed">{equipment.description}</p>
                                     </div>
                                 </motion.div>
                             ))}
                         </motion.div>

                         {/* Image Section */}
                         <motion.div
                            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                         >
                             <div className="rounded-xl overflow-hidden shadow-xl border border-border relative aspect-square md:aspect-[4/3]">
                                 <img
                                     src="https://res.cloudinary.com/dada5hjp3/image/upload/f_auto,q_auto/v1/VLFP_Fittings/otqfxjgx8xbpv10kxlan" 
                                     alt="Rashmi Metaliks Advanced Testing Laboratory"
                                     className="w-full h-full object-cover"
                                     loading="lazy"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                 <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                                     <h3 className="text-white font-bold text-xl md:text-2xl mb-3 drop-shadow-md">Precision & Reliability</h3>
                                     <p className="text-white/90 text-sm md:text-base mb-5 drop-shadow-sm leading-relaxed">Our state-of-the-art lab ensures every product meets the highest benchmarks for quality and performance.</p>
                                     <Link
                                        to="/certifications" // Link to certifications page
                                        className="inline-flex items-center bg-rashmi-red text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-rashmi-red/90 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Explore Certifications
                                        <ArrowRight size={16} className="ml-2" />
                                     </Link>
                                 </div>
                             </div>
                         </motion.div>
                     </div>
                 </div>
             </section>

            {/* --- NEW: Visual Quality Assurance Testing --- */}
            <section className="py-24 bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }} 
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
                        >
                            <span className="text-rashmi-red">Visual</span> Quality Verification
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }} 
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-muted-foreground text-lg"
                        >
                            Our multi-stage visual inspection process ensures every product meets exacting standards for appearance, consistency, and finish quality.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Visual Testing Types */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="bg-rashmi-red/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <ZoomIn className="text-rashmi-red h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Surface Finish Testing</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Detailed analysis of coating uniformity, surface roughness, and visual appearance using high-resolution imaging and calibrated measurement tools.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">Surface roughness profiling</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">Coating thickness verification</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">Visual defect detection</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <Pipette className="text-blue-500 h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Coating Integrity Tests</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Comprehensive evaluation of coating adhesion, uniformity, and resistance properties to ensure long-term protection against corrosion.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">Cross-hatch adhesion testing</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">Impact resistance verification</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">Holiday detection for pinholes</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <FileCheck className="text-purple-500 h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Dimensional Verification</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Precise measurement of critical dimensions and geometrical properties to ensure perfect compatibility and connection reliability.
                            </p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">3D coordinate measurement</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">Laser scanning technology</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2 mt-1 shrink-0" />
                                    <span className="text-sm">High-precision gauging</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    <div className="mt-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-muted-foreground italic max-w-2xl mx-auto">
                                "Our visual quality assurance is backed by advanced imaging technology and trained experts who ensure every product meets the highest aesthetic and functional standards."
                            </p>
                            <div className="w-16 h-1 bg-rashmi-red mx-auto my-6"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="py-24 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
                        >
                            Your Questions <span className="text-rashmi-red">Answered</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-muted-foreground text-lg"
                        >
                            Find answers to common inquiries about our quality assurance practices and standards.
                        </motion.p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-5">
                            {faqItems.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="bg-card border border-border rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <details className="group">
                                        <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-muted/30 transition-colors">
                                            <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                                            {/* Animated Chevron */}
                                            <div className="text-rashmi-red transition-transform duration-300 group-open:rotate-180">
                                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </summary>
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                             <div className="px-6 pb-6 pt-2 border-t border-border">
                                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                             </div>
                                        </motion.div>
                                    </details>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto text-center bg-gradient-to-br from-rashmi-red/90 to-red-800 text-white p-10 md:p-16 rounded-2xl relative shadow-xl overflow-hidden"
                    >
                         {/* Background pattern */}
                         <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('/path/to/subtle-pattern.svg')" }}></div> {/* Optional: Add subtle pattern */}

                         <div className="relative z-10">
                             <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6 shadow-md">
                                 <Trophy className="text-white" size={24} />
                             </div>

                             <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 drop-shadow-md">
                                 Trust Our Certified Excellence
                             </h2>
                             <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto drop-shadow-sm leading-relaxed">
                                 Our unwavering commitment to quality is validated by numerous international certifications and approvals. Explore the standards we meet.
                             </p>

                             <Link
                                 to="/certifications"
                                 className="inline-flex items-center px-8 py-4 bg-white text-rashmi-red font-bold rounded-lg transition-all duration-300 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                             >
                                 View All Certifications
                                 <BadgeCheck className="ml-2.5" size={20} />
                             </Link>
                         </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default QualityAssurance;