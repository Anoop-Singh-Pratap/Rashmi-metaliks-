import React, { useState, useCallback, useEffect, ChangeEvent, DragEvent, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import {
  Upload, Check, FileText, Building, User, Phone, Mail, Briefcase, CheckCircle, Globe, X, AlertCircle, Loader2, ChevronRight, ArrowRight, TrendingUp, Handshake, ShieldCheck, Award, Plus
} from 'lucide-react'; // Added more icons for variety
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// --- Constants and Types ---

interface VendorFormData {
  name: string;
  designation: string;
  companyName: string;
  firmType: string;
  vendorType: string; // domestic or global
  country: string;
  website?: string;
  contactNo: string;
  email: string;
  category: string;
  productDescription: string;
  majorClients?: string;
  turnover: string;
  turnoverCurrency: string; // 'INR' or 'USD'
  terms: boolean;
}

const firmTypes = [
  { id: 'manufacturer', label: 'MANUFACTURER/OEM' },
  { id: 'dealer', label: 'DEALER/TRADER' },
  { id: 'oem-distributor', label: 'OEM AUTHORISED DISTRIBUTER' },
  { id: 'service', label: 'SERVICE COMPANY' },
  { id: 'consultant', label: 'CONSULTANT/AGENCY' },
];

const categories = [
  { id: 'stationary-computer', label: 'Stationary, Computer & Computer Accessories' },
  { id: 'cloth-textiles', label: 'Cloth, Textiles' },
  { id: 'rubber-pvc-belts', label: 'Rubber, PVC, Conveyor Belts, V Belts, Tyre' },
  { id: 'safety-fire-service', label: 'Safety Items & Fire Service' },
  { id: 'paint-abrasive-hardware', label: 'Paint, Abrasive, Hardware' },
  { id: 'pipe-building-material', label: 'Pipe, Pipe Fitting, Building Material & Sanitary' },
  { id: 'packing-materials', label: 'Packing Materials' },
  { id: 'chemicals', label: 'Chemicals' },
  { id: 'gases', label: 'Gases' },
  { id: 'petroleum-lubricants', label: 'Petrol, Oils, Lubricant & HSD' },
  { id: 'refractory-basic-mcb', label: 'Refractory - Basic, MCB' },
  { id: 'refractory-castables', label: 'Refractory - Castables & other Bricks' },
  { id: 'raw-materials', label: 'Raw Materials' },
  { id: 'instrumentation-electronics', label: 'Instrumentation & Electronics items' },
  { id: 'bearings-cutting-tools', label: 'Bearings, cutting tools' },
  { id: 'fastener-nut-bolts', label: 'Fastener, Nut & Bolts' },
  { id: 'tools-lifting-equipment', label: 'Tools & Tackles & Lifting Equipment' },
  { id: 'electrical-spares', label: 'Electrical Spares' },
  { id: 'cable-winding-wires', label: 'Cable, Cabling Accessories & Winding Wires' },
  { id: 'electrical-consumables', label: 'Electrical Consumables' },
  { id: 'motors-spares', label: 'Motors & Motor Spares' },
  { id: 'electrical-welding-equipment', label: 'Electrical Equ & Welding Equ' },
  { id: 'fluxes-electrodes', label: 'Fluxes & Electrodes' },
  { id: 'rolls-roll-chocks', label: 'Rolls & Roll Chocks' },
  { id: 'minor-raw-materials', label: 'Minor Raw Materials, Ferron Alloys' },
  { id: 'amc-civil', label: 'AMC-Civil' },
  { id: 'amc-electrical', label: 'AMC-electrical' },
  { id: 'amc-mechanical', label: 'AMC-Mechanical' },
  { id: 'amc-others', label: 'AMC-others (IT, rent, HR related, Mrk related etc)' },
  { id: 'material-handling-rental', label: 'Material Handling equip Rental' },
  { id: 'logistics', label: 'Logistics (sea, CHAs)' }
];

// Countries data for the dropdown
const sortableCountries = [
  { code: "in", name: "India", countryCode: "+91" },
  { code: "ae", name: "United Arab Emirates", countryCode: "+971" },
  { code: "au", name: "Australia", countryCode: "+61" },
  { code: "bg", name: "Bangladesh", countryCode: "+880" },
  { code: "bt", name: "Bhutan", countryCode: "+975" },
  { code: "ca", name: "Canada", countryCode: "+1" },
  { code: "cn", name: "China", countryCode: "+86" },
  { code: "de", name: "Germany", countryCode: "+49" },
  { code: "fr", name: "France", countryCode: "+33" },
  { code: "gb", name: "United Kingdom", countryCode: "+44" },
  { code: "id", name: "Indonesia", countryCode: "+62" },
  { code: "it", name: "Italy", countryCode: "+39" },
  { code: "jp", name: "Japan", countryCode: "+81" },
  { code: "kr", name: "South Korea", countryCode: "+82" },
  { code: "lk", name: "Sri Lanka", countryCode: "+94" },
  { code: "my", name: "Malaysia", countryCode: "+60" },
  { code: "np", name: "Nepal", countryCode: "+977" },
  { code: "nz", name: "New Zealand", countryCode: "+64" },
  { code: "qa", name: "Qatar", countryCode: "+974" },
  { code: "ru", name: "Russia", countryCode: "+7" },
  { code: "sa", name: "Saudi Arabia", countryCode: "+966" },
  { code: "sg", name: "Singapore", countryCode: "+65" },
  { code: "th", name: "Thailand", countryCode: "+66" },
  { code: "us", name: "United States", countryCode: "+1" },
  { code: "za", name: "South Africa", countryCode: "+27" },
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

// Add "Others" at the end, after sorting
const countries = [
  ...sortableCountries,
  { code: "others", name: "Others", countryCode: "" },
];

// Updated allowed file types to only include PDF and Word documents
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// --- Enhanced Helper Components ---

interface FormFieldProps {
  id: keyof VendorFormData | string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  className?: string; // Allow passing additional classes
}

// Enhanced FormField with optional className
const FormField: React.FC<FormFieldProps> = ({ id, label, required, children, error, className }) => (
  <div className={cn("space-y-2", className)}>
    <Label htmlFor={id as string} className="text-sm font-medium text-muted-foreground/90">
      {label} {required && <span className="text-rashmi-red">*</span>}
    </Label>
    {children}
    {error && <p className="text-xs text-destructive flex items-center gap-1 pt-1"><AlertCircle size={13} /> {error}</p>}
  </div>
);

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
  description?: string; // Optional description
}

// Enhanced SectionHeader with optional description and refined styling
const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title, description }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
       <span className="p-2 bg-rashmi-red/10 rounded-full mr-3">
         <Icon className="h-5 w-5 text-rashmi-red" />
       </span>
       <h3 className="text-xl font-semibold text-foreground tracking-tight">
        {title}
      </h3>
    </div>
    {description && <p className="text-sm text-muted-foreground ml-12 -mt-1">{description}</p>}
    <div className="mt-3 ml-12 h-[1px] bg-gradient-to-r from-rashmi-red/30 via-border to-transparent w-2/3"></div>
  </div>
);

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const shimmerVariants: Variants = {
    initial: { backgroundPosition: '200% 0' },
    animate: {
        backgroundPosition: '-200% 0',
        transition: {
            duration: 1.5, // Faster shimmer
            repeat: Infinity,
            ease: "linear"
        }
    }
}

// --- Main Component ---

const VendorRegistration = () => {
  // State variables
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [customCountry, setCustomCountry] = useState('');
  const [customCountryCode, setCustomCountryCode] = useState('');

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset, watch, setValue } = useForm<VendorFormData>({
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      name: '',
      designation: '',
      companyName: '',
      firmType: '',
      vendorType: 'domestic',
      country: 'in',
      website: '',
      contactNo: '+91 ', // Default for domestic vendors
      email: '',
      category: '',
      productDescription: '',
      majorClients: '',
      turnover: '',
      turnoverCurrency: 'INR', // Default to INR
      terms: false,
    }
  });

  const heroControls = useAnimation();
  const formControls = useAnimation(); // Controls for the overall form section entry

  // Trigger animations when component mounts
  useEffect(() => {
    heroControls.start("visible");
    formControls.start("visible"); // Start form section animation
  }, [heroControls, formControls]);

  // Clear all files
  const clearAllFiles = () => {
    setFiles([]);
    setFileNames([]);
    setFilePreviews([]);
    setFileTypes([]);
    setFileErrors([]);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // Clear a specific file by index
  const clearFile = (index?: number, e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (index !== undefined) {
      // Revoke object URL if it exists
      if (filePreviews[index] && filePreviews[index].startsWith('blob:')) {
        URL.revokeObjectURL(filePreviews[index]);
      }

      // Remove the file at the specified index
      setFiles(prev => prev.filter((_, i) => i !== index));
      setFileNames(prev => prev.filter((_, i) => i !== index));
      setFilePreviews(prev => prev.filter((_, i) => i !== index));
      setFileTypes(prev => prev.filter((_, i) => i !== index));
      setFileErrors(prev => prev.filter((_, i) => i !== index));
    } else {
      // Clear all files if no index is provided
      // Revoke all object URLs first
      filePreviews.forEach(preview => {
        if (preview && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
      clearAllFiles();
    }
  };

  const handleFileValidation = (selectedFile: File): boolean => {
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      return false;
    }
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      return false;
    }
    return true;
  };

  // Update the processFiles function to create object URLs for PDFs
  const processFiles = (selectedFiles: FileList) => {
    // Check if adding these files would exceed the limit
    if (files.length + selectedFiles.length > 3) {
      setFileErrors(prev => [...prev, `Maximum 3 files allowed. You can select ${3 - files.length} more.`]);
      return;
    }

    // Process each file
    Array.from(selectedFiles).forEach(file => {
      if (!handleFileValidation(file)) {
        const errorMessage = file.size > MAX_FILE_SIZE_BYTES
          ? `File "${file.name}" is too large (Max ${MAX_FILE_SIZE_MB}MB).`
          : `File "${file.name}" has an invalid format. Only PDF and Word documents (DOC/DOCX) are allowed.`;

        setFileErrors(prev => [...prev, errorMessage]);
        return;
      }

      // Valid file, add it to our states
      setFiles(prev => [...prev, file]);
      setFileNames(prev => [...prev, file.name]);
      setFileTypes(prev => [...prev, file.type]);
      setFileErrors(prev => [...prev]);

      const newIndex = files.length;

      // Create preview based on file type
      if (file.type.startsWith('image/')) {
        // For images, use FileReader for preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews(prev => {
            const updated = [...prev];
            updated[newIndex] = reader.result as string;
            return updated;
          });
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        // For PDFs, create object URL for browser's native PDF viewer
        const objectUrl = URL.createObjectURL(file);
        setFilePreviews(prev => {
          const updated = [...prev];
          updated[newIndex] = objectUrl;
          return updated;
        });
      } else {
        // For Word docs, just set an empty preview string
        setFilePreviews(prev => {
          const updated = [...prev];
          updated[newIndex] = '';
          return updated;
        });
      }
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [files.length]);

  // Update the form submission function to handle multiple files
  const onSubmit: SubmitHandler<VendorFormData> = async (data) => {
    try {
      // Start progress bar
      setUploadProgress(20);

      // Prepare form data
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
          if(typeof value === 'boolean') {
              formData.append(key, String(value));
          } else if(value !== undefined && value !== null && value !== '') {
              formData.append(key, value);
          }
      });

      // Change to use a SINGLE field name for all files instead of dynamic names
      files.forEach((file) => {
        formData.append('supportingDocuments', file);
      });

      // Debug log form data
      console.log('Form Data Contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value}`);
      }

      // Send data to backend
      const response = await fetch('/api/vendors', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(80);

      // More robust error handling
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        setUploadProgress(100);

        // Smoothly scroll to top before showing success state
        await new Promise<void>((resolve) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Wait for scroll to complete before showing success state
          setTimeout(() => {
            setIsSubmitted(true);
            reset();
            clearAllFiles();
            resolve();
          }, 500); // Give time for scroll to finish
        });
      } else {
        throw new Error(responseData.message || 'Failed to submit vendor registration');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFileErrors(prev => [...prev,
        error instanceof Error
          ? `Submission failed: ${error.message}`
          : 'Submission failed. Please check your connection and try again.'
      ]);
    } finally {
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Variables for form display
  const selectedCountry = countries.find(c => c.code === watch('country'));
  const isOtherCountry = watch('country') === 'others';
  const isDomesticVendor = watch('vendorType') === 'domestic';
  const countryCode = isDomesticVendor ? '+91' : (isOtherCountry ? customCountryCode : (selectedCountry ? selectedCountry.countryCode : ''));
  const shouldShowCountryCodeBadge = (watch('vendorType') === 'global' || watch('country') === 'others') && countryCode && !isDomesticVendor;
  const contactPlaceholder = isDomesticVendor ? 'XXXXXXXXXX' : (shouldShowCountryCodeBadge ? '123456789' : (countryCode ? `${countryCode} 123456789` : '+__ 123456789'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-50 to-blue-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950/30">
      <Helmet>
        <title>Vendor Registration | Partner with Rashmi Metaliks | Supplier Portal</title>
        <meta name="description" content="Register as a vendor with Rashmi Metaliks, the world's 2nd largest DI pipe manufacturer. Submit your company profile to join our supplier network and explore business opportunities." />
      </Helmet>

      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rashmi-red via-red-600 to-orange-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center text-white">
          <motion.div
            initial="hidden"
            animate={heroControls}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Vendor Registration
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 opacity-90"
            >
              Partner with Rashmi Metaliks - Submit your vendor profile to join our supplier network
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          animate={formControls}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {isSubmitted ? (
            // Success State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="bg-green-50 dark:bg-green-950/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">Registration Successful!</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your interest in partnering with Rashmi Metaliks. Our procurement team will review your submission and contact you within 5-7 business days.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-rashmi-red hover:bg-rashmi-red/90"
              >
                Submit Another Registration
              </Button>
            </motion.div>
          ) : (
            // Form Content
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Vendor Registration Form
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Please fill out all required fields to register as a vendor with Rashmi Metaliks
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Progress Bar */}
                  {uploadProgress > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Upload Progress</span>
                        <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {/* Personal Information Section */}
                  <motion.div variants={fadeInUp}>
                    <SectionHeader
                      icon={User}
                      title="Personal Information"
                      description="Your contact details and designation"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField id="name" label="Full Name" required error={errors.name?.message}>
                        <Input
                          {...register('name', {
                            required: 'Full name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' }
                          })}
                          placeholder="Enter your full name"
                          className="h-12"
                        />
                      </FormField>

                      <FormField id="designation" label="Designation" required error={errors.designation?.message}>
                        <Input
                          {...register('designation', {
                            required: 'Designation is required',
                            minLength: { value: 2, message: 'Designation must be at least 2 characters' }
                          })}
                          placeholder="e.g., Sales Manager, Director"
                          className="h-12"
                        />
                      </FormField>
                    </div>
                  </motion.div>

                  {/* Company Information Section */}
                  <motion.div variants={fadeInUp}>
                    <SectionHeader
                      icon={Building}
                      title="Company Information"
                      description="Details about your organization"
                    />
                    <div className="space-y-6">
                      <FormField id="companyName" label="Company Name" required error={errors.companyName?.message}>
                        <Input
                          {...register('companyName', {
                            required: 'Company name is required',
                            minLength: { value: 2, message: 'Company name must be at least 2 characters' }
                          })}
                          placeholder="Enter your company name"
                          className="h-12"
                        />
                      </FormField>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField id="firmType" label="Firm Type" required error={errors.firmType?.message}>
                          <Controller
                            name="firmType"
                            control={control}
                            rules={{ required: 'Please select a firm type' }}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select firm type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {firmTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </FormField>

                        <FormField id="vendorType" label="Vendor Type" required>
                          <Controller
                            name="vendorType"
                            control={control}
                            render={({ field }) => (
                              <div className="flex items-center space-x-6 h-12">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="domestic"
                                    value="domestic"
                                    checked={field.value === 'domestic'}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                      setValue('country', 'in');
                                      setValue('contactNo', '+91 ');
                                      setValue('turnoverCurrency', 'INR');
                                    }}
                                    className="w-4 h-4 text-rashmi-red"
                                  />
                                  <Label htmlFor="domestic" className="text-sm font-medium">
                                    Domestic
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="global"
                                    value="global"
                                    checked={field.value === 'global'}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                      setValue('turnoverCurrency', 'USD');
                                    }}
                                    className="w-4 h-4 text-rashmi-red"
                                  />
                                  <Label htmlFor="global" className="text-sm font-medium">
                                    Global
                                  </Label>
                                </div>
                              </div>
                            )}
                          />
                        </FormField>
                      </div>

                      {/* Country Selection - Only show for global vendors */}
                      {!isDomesticVendor && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormField id="country" label="Country" required error={errors.country?.message}>
                            <Controller
                              name="country"
                              control={control}
                              rules={{ required: 'Please select a country' }}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {countries.map((country) => (
                                      <SelectItem key={country.code} value={country.code}>
                                        {country.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FormField>

                          {/* Custom Country Input - Only show when "Others" is selected */}
                          {isOtherCountry && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                              <div>
                                <Label htmlFor="customCountry" className="text-sm font-medium text-muted-foreground/90">
                                  Country Name <span className="text-rashmi-red">*</span>
                                </Label>
                                <Input
                                  id="customCountry"
                                  value={customCountry}
                                  onChange={(e) => setCustomCountry(e.target.value)}
                                  placeholder="Enter country name"
                                  className="h-12 mt-2"
                                />
                              </div>
                              <div>
                                <Label htmlFor="customCountryCode" className="text-sm font-medium text-muted-foreground/90">
                                  Country Code <span className="text-rashmi-red">*</span>
                                </Label>
                                <Input
                                  id="customCountryCode"
                                  value={customCountryCode}
                                  onChange={(e) => setCustomCountryCode(e.target.value)}
                                  placeholder="e.g., +1, +44"
                                  className="h-12 mt-2"
                                />
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}

                      <FormField id="website" label="Website" error={errors.website?.message}>
                        <Input
                          {...register('website', {
                            pattern: {
                              value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                              message: 'Please enter a valid website URL'
                            }
                          })}
                          placeholder="https://www.yourcompany.com"
                          className="h-12"
                        />
                      </FormField>
                    </div>
                  </motion.div>

                  {/* Contact Information Section */}
                  <motion.div variants={fadeInUp}>
                    <SectionHeader
                      icon={Phone}
                      title="Contact Information"
                      description="How we can reach you"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField id="contactNo" label="Contact Number" required error={errors.contactNo?.message}>
                        <div className="relative">
                          {shouldShowCountryCodeBadge && (
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-muted px-2 py-1 rounded text-xs font-medium z-10">
                              {countryCode}
                            </span>
                          )}
                          <Input
                            {...register('contactNo', {
                              required: 'Contact number is required',
                              pattern: {
                                value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
                                message: 'Please enter a valid contact number'
                              }
                            })}
                            placeholder={contactPlaceholder}
                            className={cn("h-12", shouldShowCountryCodeBadge && "pl-16")}
                          />
                        </div>
                      </FormField>

                      <FormField id="email" label="Email Address" required error={errors.email?.message}>
                        <Input
                          {...register('email', {
                            required: 'Email address is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Please enter a valid email address'
                            }
                          })}
                          type="email"
                          placeholder="your.email@company.com"
                          className="h-12"
                        />
                      </FormField>
                    </div>
                  </motion.div>

                  {/* Business Details Section */}
                  <motion.div variants={fadeInUp}>
                    <SectionHeader
                      icon={Briefcase}
                      title="Business Details"
                      description="Information about your products and services"
                    />
                    <div className="space-y-6">
                      <FormField id="category" label="Product/Service Category" required error={errors.category?.message}>
                        <Controller
                          name="category"
                          control={control}
                          rules={{ required: 'Please select a category' }}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select your primary category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </FormField>

                      <FormField id="productDescription" label="Product/Service Description" required error={errors.productDescription?.message}>
                        <Textarea
                          {...register('productDescription', {
                            required: 'Product description is required',
                            minLength: { value: 20, message: 'Description must be at least 20 characters' }
                          })}
                          placeholder="Describe your products or services in detail..."
                          className="min-h-[120px] resize-none"
                        />
                      </FormField>

                      <FormField id="majorClients" label="Major Clients" error={errors.majorClients?.message}>
                        <Textarea
                          {...register('majorClients')}
                          placeholder="List your major clients (optional)"
                          className="min-h-[80px] resize-none"
                        />
                      </FormField>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField id="turnover" label="Annual Turnover" required error={errors.turnover?.message}>
                          <Input
                            {...register('turnover', {
                              required: 'Annual turnover is required',
                              pattern: {
                                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                message: 'Please enter a valid amount'
                              }
                            })}
                            placeholder="Enter amount (numbers only)"
                            className="h-12"
                          />
                        </FormField>

                        <FormField id="turnoverCurrency" label="Currency" required>
                          <Controller
                            name="turnoverCurrency"
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="INR">INR (Indian Rupee)</SelectItem>
                                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </FormField>
                      </div>
                    </div>
                  </motion.div>

                  {/* File Upload Section */}
                  <motion.div variants={fadeInUp}>
                    <SectionHeader
                      icon={Upload}
                      title="Supporting Documents"
                      description="Upload company profile, certificates, or other relevant documents (Max 3 files, 10MB each)"
                    />

                    <div className="space-y-4">
                      {/* File Upload Area */}
                      <div
                        className={cn(
                          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                          isDragging
                            ? "border-rashmi-red bg-rashmi-red/5"
                            : "border-muted-foreground/25 hover:border-rashmi-red/50 hover:bg-rashmi-red/5"
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleFileDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {isDragging ? 'Drop files here' : 'Upload Documents'}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Drag and drop files here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supported formats: PDF, DOC, DOCX • Max 3 files • 10MB each
                        </p>
                      </div>

                      {/* File List */}
                      {files.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Uploaded Files ({files.length}/3)</h4>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => clearFile()}
                              className="text-destructive hover:text-destructive"
                            >
                              Clear All
                            </Button>
                          </div>
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium text-sm">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => clearFile(index, e)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* File Errors */}
                      {fileErrors.length > 0 && (
                        <div className="space-y-2">
                          {fileErrors.map((error, index) => (
                            <div key={index} className="flex items-center gap-2 text-destructive text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {error}
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setFileErrors([])}
                            className="mt-2"
                          >
                            Clear Errors
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Terms and Conditions */}
                  <motion.div variants={fadeInUp}>
                    <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                      <Controller
                        name="terms"
                        control={control}
                        rules={{ required: 'You must accept the terms and conditions' }}
                        render={({ field }) => (
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        )}
                      />
                      <div className="flex-1">
                        <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                          I agree to the terms and conditions and privacy policy
                        </Label>
                        {errors.terms && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle size={13} /> {errors.terms.message}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          By submitting this form, you agree to our terms of service and acknowledge that your information will be processed according to our privacy policy.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={fadeInUp} className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-semibold bg-rashmi-red hover:bg-rashmi-red/90 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting Registration...
                        </>
                      ) : (
                        <>
                          Submit Registration
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VendorRegistration;
