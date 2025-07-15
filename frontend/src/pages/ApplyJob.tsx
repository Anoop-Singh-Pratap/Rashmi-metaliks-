import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, Bookmark, ChevronLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';
import { fetchJobById } from '../services/jobService';
import { submitApplication } from '../services/applicationService';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  resume: File | null;
  coverLetter: string;
  source: string;
  agreeToTerms: boolean;
}

const ApplyJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    resume: null,
    coverLetter: '',
    source: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  // Fetch job details
  useEffect(() => {
    const getJobDetails = async () => {
      if (!id) {
        setError('Job ID is missing');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const jobData = await fetchJobById(id);
        
        if (!jobData) {
          setError('Job not found');
        } else {
          setJob(jobData);
        }
      } catch (err) {
        console.error('Failed to fetch job details:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    getJobDetails();
  }, [id]);
  
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
        const { success, error } = await submitApplication(
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            position: job.title,
            department: job.department,
            experience: formData.experience,
            education: formData.education,
            coverLetter: formData.coverLetter,
            source: formData.source
          },
          formData.resume
        );
        
        if (success) {
          setSubmitStatus('success');
          window.scrollTo(0, 0);
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
  
  // Format posted date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <Loader2 className="animate-spin h-12 w-12 mx-auto text-rashmi-red mb-4" />
              <p className="text-muted-foreground">Loading job details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 flex justify-center items-center min-h-[50vh]">
            <div className="text-center max-w-lg">
              <AlertCircle className="h-16 w-16 mx-auto text-rashmi-red mb-4" />
              <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Link 
                to="/careers" 
                className="inline-flex items-center bg-rashmi-red text-white py-2 px-6 rounded-lg font-medium hover:bg-rashmi-red/90 transition-colors"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to All Jobs
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{job ? `Apply for ${job.title} | Rashmi Group Careers` : 'Apply for Job | Rashmi Group'}</title>
        <meta 
          name="description" 
          content={job ? `Apply for the ${job.title} position at Rashmi Group. Join our team in ${job.location} and help shape the future of steel manufacturing.` : 'Apply for a job at Rashmi Group'} 
        />
      </Helmet>
      <Header />
      <main>
        {/* Job Header */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-rashmi-dark to-background/80 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
              {Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className="border border-rashmi-red/5"></div>
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link to="/careers" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to All Jobs
                </Link>
              </div>
              
              {submitStatus === 'success' ? (
                <div className="bg-card rounded-xl p-8 border border-border shadow-sm text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Application Submitted!</h1>
                  <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    Thank you for your interest in the {job.title} position at Rashmi Group. 
                    We've received your application and will review it shortly.
                    Our HR team will contact you if your qualifications match our requirements.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to="/careers"
                      className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
                    >
                      Browse More Jobs
                    </Link>
                    <Link
                      to="/"
                      className="inline-flex items-center px-6 py-3 bg-card border border-border text-foreground font-medium rounded-lg transition-colors hover:bg-muted"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm mb-8">
                    <div className="p-6 md:p-8">
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{job.title}</h1>
                      
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center text-muted-foreground">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Posted {formatDate(job.posted_date)}</span>
                        </div>
                        <div className="px-3 py-1 bg-rashmi-red/10 text-rashmi-red text-sm rounded-full flex items-center">
                          {job.type}
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                        <div>
                          <h2 className="font-bold text-lg mb-3">Description</h2>
                          <p className="text-muted-foreground mb-6">{job.description}</p>
                          
                          <h2 className="font-bold text-lg mb-3">Requirements</h2>
                          <p className="text-muted-foreground">{job.requirements}</p>
                        </div>
                        
                        <div>
                          <h2 className="font-bold text-lg mb-3">Responsibilities</h2>
                          <ul className="list-disc pl-5 text-muted-foreground">
                            {job.responsibilities.map((item: string, i: number) => (
                              <li key={i} className="mb-2">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Application Form */}
                  <div className="bg-card rounded-xl border border-border shadow-sm">
                    <div className="p-6 border-b border-border">
                      <h2 className="text-xl font-bold flex items-center">
                        Apply for {job.title}
                      </h2>
                      <p className="text-muted-foreground">
                        Please fill out the form below to apply for this position.
                      </p>
                    </div>
                    
                    {submitStatus === 'error' && (
                      <div className="p-4 m-6 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex">
                          <AlertCircle className="text-red-500 h-5 w-5 mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="text-sm font-medium text-red-800">Application submission failed</h3>
                            <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
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
                              } rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50`}
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
                      
                      {/* Experience & Education */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                          Experience & Education
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="experience" className="block mb-1 font-medium">
                              Years of Experience
                            </label>
                            <select
                              id="experience"
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
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
                              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
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
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
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
                                <Bookmark className="text-rashmi-red mb-2" size={28} />
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
                              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                              placeholder="Tell us why you're a good fit for this position..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
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
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
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
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ApplyJob;
