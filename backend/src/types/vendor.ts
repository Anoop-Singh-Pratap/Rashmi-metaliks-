export interface VendorFormData {
  name: string;
  designation: string;
  companyName: string;
  firmType: string;
  vendorType: string;
  country: string;
  customCountry?: string;
  customCountryCode?: string;
  website?: string;
  contactNo: string;
  address?: string;
  email: string;
  category: string;
  productDescription: string;
  majorClients?: string;
  turnover: string;
  turnoverCurrency: string; // 'INR' or 'USD'
  terms: boolean;
  gstNumber?: string; // GST Number (optional)
  referenceId?: string; // Tracking token/reference returned to user
}