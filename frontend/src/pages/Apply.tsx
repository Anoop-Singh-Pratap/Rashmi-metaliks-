import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Briefcase, Upload, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';
import { submitApplication } from '../services/applicationService';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  experience: string;
  education: string;
  resume: File | null;
  coverLetter: string;
  source: string;
  agreeToTerms: boolean;
}

const Apply = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    experience: '',
    education: '',
    resume: null,
    coverLetter: '',
    source: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [applicationId, setApplicationId] = useState<string>('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = ['application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, resume: 'Only PDF files are accepted' });
        return;
      }
      
      if (file.size > maxSize) {
        setErrors({ ...errors, resume: 'File size should be less than 5MB' });
        return;
      }
      
      setFormData({ ...formData, resume: file });
      setErrors({ ...errors, resume: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;
    
    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
      isValid = false;
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
      isValid = false;
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      setErrorMessage('');
      
      try {
        const { success, error, applicationId } = await submitApplication(
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            position: formData.position,
            department: formData.department,
            experience: formData.experience,
            education: formData.education,
            coverLetter: formData.coverLetter,
            source: formData.source
          },
          formData.resume
        );
        
        if (success) {
          setSubmitStatus('success');
          
          // Store the application ID for display
          if (applicationId) {
            setApplicationId(applicationId);
          }
          
          // Reset form after successful submission
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            position: '',
            department: '',
            experience: '',
            education: '',
            resume: null,
            coverLetter: '',
            source: '',
            agreeToTerms: false
          });
          
          // Reset form element for file input
          const fileInput = document.getElementById('resume') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
          
          // Scroll to top of page to show success message
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setSubmitStatus('error');
          setErrorMessage(error || 'An error occurred while submitting your application.');
        }
      } catch (error) {
        setSubmitStatus('error');
        setErrorMessage('An unexpected error occurred. Please try again later.');
        console.error('Application submission error:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Apply for a Job | Rashmi Group Careers</title>
        <meta name="description" content="Apply for current job openings at Rashmi Group. Submit your resume and join our team of professionals in the steel manufacturing industry." />
        <meta name="keywords" content="job application, Rashmi Group jobs, apply now, steel industry careers" />
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-rashmi-dark to-background/80 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
              {Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className="border border-rashmi-red/5"></div>
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Apply for a <span className="text-rashmi-red">Position</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                Join the Rashmi Group team and be part of a global leader in steel manufacturing. 
                Complete the form below to apply for one of our current openings.
              </p>
            </div>
          </div>
        </section>
        
        {/* Application Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-md border border-border overflow-hidden">
              <div className="p-6 bg-muted border-b border-border">
                <h2 className="text-2xl font-bold flex items-center">
                  <Briefcase className="mr-2 text-rashmi-red" />
                  Job Application Form
                </h2>
                <p className="text-muted-foreground">
                  Fill out all required fields marked with an asterisk (*)
                </p>
              </div>
              
              {submitStatus === 'success' ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                  
                  {applicationId && (
                    <div className="bg-muted/40 rounded-lg p-4 mb-4 inline-block">
                      <p className="text-sm text-muted-foreground">Your Application Reference ID</p>
                      <p className="text-xl font-semibold">{applicationId}</p>
                    </div>
                  )}
                  
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in joining Rashmi Group. We've received your application and will review it shortly.
                    Our HR team will contact you if your qualifications match our requirements.
                    {applicationId && (
                      <span className="block mt-2 text-sm">
                        Please save your reference ID for any future correspondence regarding this application.
                        A confirmation email has also been sent to your email address.
                      </span>
                    )}
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-3 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
                  >
                    Apply for Another Position
                  </button>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Application Submission Failed</h3>
                  <p className="text-red-600 mb-6">{errorMessage}</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block mb-1 font-medium">
                          First Name <span className="text-rashmi-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            errors.firstName ? 'border-red-500' : 'border-border'
                          } rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-rashmi-red/50`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block mb-1 font-medium">
                          Last Name <span className="text-rashmi-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            errors.lastName ? 'border-red-500' : 'border-border'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-rashmi-red/50`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-1 font-medium">
                          Email <span className="text-rashmi-red">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            errors.email ? 'border-red-500' : 'border-border'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-rashmi-red/50`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block mb-1 font-medium">
                          Phone <span className="text-rashmi-red">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            errors.phone ? 'border-red-500' : 'border-border'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-rashmi-red/50`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Job Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                      Job Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="position" className="block mb-1 font-medium">
                          Position Applying For <span className="text-rashmi-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            errors.position ? 'border-red-500' : 'border-border'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-rashmi-red/50`}
                        />
                        {errors.position && (
                          <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="department" className="block mb-1 font-medium">
                          Department
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        >
                          <option value="">Select Department</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Quality">Quality</option>
                          <option value="Sales">Sales</option>
                          <option value="R&D">R&D</option>
                          <option value="Finance">Finance</option>
                          <option value="HR">HR</option>
                          <option value="IT">IT</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="experience" className="block mb-1 font-medium">
                          Years of Experience
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        >
                          <option value="">Select Experience</option>
                          <option value="0-1 years">0-1 years</option>
                          <option value="1-3 years">1-3 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5-10 years">5-10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="education" className="block mb-1 font-medium">
                          Highest Education
                        </label>
                        <select
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        >
                          <option value="">Select Education</option>
                          <option value="High School">High School</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Bachelor's">Bachelor's Degree</option>
                          <option value="Master's">Master's Degree</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Resume and Cover Letter */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                      Resume & Cover Letter
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="resume" className="block mb-1 font-medium">
                          Resume (PDF only) <span className="text-rashmi-red">*</span>
                        </label>
                        <div className={`border ${
                          errors.resume ? 'border-red-500' : 'border-border'
                        } rounded-lg p-4 flex items-center justify-center`}>
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="resume"
                            className="w-full flex flex-col items-center justify-center cursor-pointer"
                          >
                            <Upload className="text-rashmi-red mb-2" size={32} />
                            <span className="text-center text-muted-foreground">
                              {formData.resume ? formData.resume.name : 'Click to upload your resume (PDF, max 5MB)'}
                            </span>
                          </label>
                        </div>
                        {errors.resume && (
                          <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="coverLetter" className="block mb-1 font-medium">
                          Cover Letter
                        </label>
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                          placeholder="Tell us why you're a good fit for this position..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                      Additional Information
                    </h3>
                    <div>
                      <label htmlFor="source" className="block mb-1 font-medium">
                        How did you hear about us?
                      </label>
                      <select
                        id="source"
                        name="source"
                        value={formData.source}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                      >
                        <option value="">Select Option</option>
                        <option value="Company Website">Company Website</option>
                        <option value="Job Portal">Job Portal</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Referral">Employee Referral</option>
                        <option value="Campus">Campus Recruitment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Terms and Submission */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreeToTerms"
                          name="agreeToTerms"
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 accent-rashmi-red"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreeToTerms" className="text-muted-foreground">
                          I agree that my submitted data is being collected and stored. I have read and accepted the <a href="#" className="text-rashmi-red hover:underline">Privacy Policy</a> and <a href="#" className="text-rashmi-red hover:underline">Terms of Service</a>. <span className="text-rashmi-red">*</span>
                        </label>
                        {errors.agreeToTerms && (
                          <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors ${
                          submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-rashmi-red/90'
                        }`}
                      >
                        {submitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Apply; 