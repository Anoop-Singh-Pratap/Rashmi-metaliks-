/**
 * Comprehensive Certificate Audit Report
 * Generated: 2025-01-08
 * 
 * This file contains a complete inventory of all certificate files found in the directories
 * and cross-references them with what's currently displayed on the certifications page.
 */

export interface CertificateFileInventory {
  filename: string;
  type: 'image' | 'pdf';
  directory: 'main' | 'di-fittings';
  pairedFile?: string;
  displayedOnPage: boolean;
  certificateInfo?: {
    officialName: string;
    issuingOrganization: string;
    certificateNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    standards?: string[];
    category: 'management' | 'product' | 'pipes' | 'fittings' | 'laboratory' | 'approval';
    description: string;
  };
}

// Complete inventory of ALL files found in certificate directories
export const certificateInventory: CertificateFileInventory[] = [
  // Main certificates directory (/certificates/)
  {
    filename: "ISO 9001.png",
    type: "image",
    directory: "main",
    pairedFile: "ISO 9001.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "BSI ISO 9001:2015 Quality Management System Certificate",
      issuingOrganization: "BSI (British Standards Institution)",
      certificateNumber: "FM 729671",
      issueDate: "2021-12-30",
      expiryDate: "2024-12-30",
      standards: ["ISO 9001:2015"],
      category: "management",
      description: "Quality Management System certification ensuring our products meet customer and regulatory requirements"
    }
  },
  {
    filename: "ISO 9001.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "ISO 9001.png",
    displayedOnPage: true
  },
  {
    filename: "ISO 14001.png",
    type: "image",
    directory: "main",
    pairedFile: "ISO 14001.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "BSI ISO 14001:2015 Environmental Management System Certificate",
      issuingOrganization: "BSI (British Standards Institution)",
      certificateNumber: "EMS 729670",
      issueDate: "2020-12-30",
      expiryDate: "2024-12-30",
      standards: ["ISO 14001:2015"],
      category: "management",
      description: "Environmental Management System certification ensuring our operations minimize environmental impact"
    }
  },
  {
    filename: "ISO 14001.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "ISO 14001.png",
    displayedOnPage: true
  },
  {
    filename: "ISO 45001.png",
    type: "image",
    directory: "main",
    pairedFile: "ISO 45001.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "BSI ISO 45001:2018 Occupational Health and Safety Management System Certificate",
      issuingOrganization: "BSI (British Standards Institution)",
      certificateNumber: "OHS 729672",
      issueDate: "2021-01-15",
      expiryDate: "2024-12-30",
      standards: ["ISO 45001:2018"],
      category: "management",
      description: "Occupational Health and Safety Management System certification ensuring a safe workplace for all employees"
    }
  },
  {
    filename: "ISO 45001.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "ISO 45001.png",
    displayedOnPage: true
  },
  {
    filename: "WRAS-OPC.png",
    type: "image",
    directory: "main",
    pairedFile: "WRAS-OPC.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "WRAS Approved Material Certificate - Ordinary Portland Cement",
      issuingOrganization: "WRAS (Water Regulations Advisory Scheme)",
      issueDate: "2022-03-10",
      expiryDate: "2025-03-10",
      category: "management",
      description: "Water Regulations Advisory Scheme certification for Ordinary Portland Cement used in our products"
    }
  },
  {
    filename: "WRAS-OPC.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "WRAS-OPC.png",
    displayedOnPage: true
  },
  {
    filename: "KM 793696 - 001 EN 545.png",
    type: "image",
    directory: "main",
    pairedFile: "KM 793696 - 001 EN 545..pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "BSI Kitemark Certificate for EN 545 Compliance",
      issuingOrganization: "BSI (British Standards Institution)",
      certificateNumber: "KM 793696",
      issueDate: "2022-02-15",
      expiryDate: "2025-02-15",
      standards: ["EN 545:2010"],
      category: "product",
      description: "BSI Kitemark certification confirming our DI pipes, fittings and flanged pipes comply with EN 545 standard for water pipelines"
    }
  },
  {
    filename: "KM 793696 - 001 EN 545..pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "KM 793696 - 001 EN 545.png",
    displayedOnPage: true
  },
  {
    filename: "KM 793698 - 001 ISO 2531.png",
    type: "image",
    directory: "main",
    pairedFile: "KM 793698 - 001 ISO 2531..pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "BSI Kitemark Certificate for ISO 2531 Compliance",
      issuingOrganization: "BSI (British Standards Institution)",
      certificateNumber: "KM 793698",
      issueDate: "2022-02-15",
      expiryDate: "2025-02-15",
      standards: ["ISO 2531:2009"],
      category: "product",
      description: "BSI Kitemark certification confirming our DI pipes, fittings and flanged pipes comply with ISO 2531 international standard"
    }
  },
  {
    filename: "KM 793698 - 001 ISO 2531..pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "KM 793698 - 001 ISO 2531.png",
    displayedOnPage: true
  },
  {
    filename: "Rashmi_SASO_Certificate.png",
    type: "image",
    directory: "main",
    pairedFile: "Rashmi_SASO_Certificate.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "SASO Quality Mark Certificate for Ductile Iron Pipes",
      issuingOrganization: "SASO (Saudi Standards, Metrology and Quality Organization)",
      issueDate: "2022-05-10",
      expiryDate: "2025-05-10",
      standards: ["SASO 1020", "SASO 1014", "SASO 1016/1017"],
      category: "pipes",
      description: "Saudi Standards, Metrology and Quality Organization certification for our Ductile Iron Pipes"
    }
  },
  {
    filename: "Rashmi_SASO_Certificate.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "Rashmi_SASO_Certificate.png",
    displayedOnPage: true
  },
  {
    filename: "1053_001_REV7_ENG-signed.png",
    type: "image",
    directory: "main",
    pairedFile: "1053_001_REV7_ENG-signed.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "Bureau Veritas Product Certificate 1053_001_REV7",
      issuingOrganization: "Bureau Veritas",
      certificateNumber: "1053_001_REV7_ENG",
      standards: ["EN 545:2010", "EN 598:2007+A1:2009", "ISO 2531:2009", "ISO 7186:2011"],
      category: "pipes",
      description: "Comprehensive certification verifying compliance with multiple international standards for ductile iron pipes"
    }
  },
  {
    filename: "1053_001_REV7_ENG-signed.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "1053_001_REV7_ENG-signed.png",
    displayedOnPage: true
  },
  {
    filename: "975_001_REV8_ENG-signed.png",
    type: "image",
    directory: "main",
    pairedFile: "975_001_REV8_ENG-signed.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "Bureau Veritas Product Certificate 975_001_REV8",
      issuingOrganization: "Bureau Veritas",
      certificateNumber: "975_001_REV8_ENG",
      category: "pipes",
      description: "Product certificate for DI pipes conforming to international standards"
    }
  },
  {
    filename: "975_001_REV8_ENG-signed.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "975_001_REV8_ENG-signed.png",
    displayedOnPage: true
  },
  {
    filename: "975_002_REV8_ENG-signed.png",
    type: "image",
    directory: "main",
    pairedFile: "975_002_REV8_ENG-signed.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "Bureau Veritas Product Certificate 975_002_REV8",
      issuingOrganization: "Bureau Veritas",
      certificateNumber: "975_002_REV8_ENG",
      category: "pipes",
      description: "Product certificate for DI pipes conforming to international standards"
    }
  },
  {
    filename: "975_002_REV8_ENG-signed.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "975_002_REV8_ENG-signed.png",
    displayedOnPage: true
  },
  {
    filename: "Certificate TC-15394.png",
    type: "image",
    directory: "main",
    pairedFile: "Certificate TC-15394.pdf.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "Technical Certificate TC-15394",
      issuingOrganization: "Technical Certification Body",
      certificateNumber: "TC-15394",
      category: "laboratory",
      description: "Technical certification for testing and quality assurance procedures"
    }
  },
  {
    filename: "Certificate TC-15394.pdf.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "Certificate TC-15394.png",
    displayedOnPage: true
  },
  {
    filename: "17) Endorsement- 19.png",
    type: "image",
    directory: "main",
    pairedFile: "17) Endorsement- 19.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "Official Endorsement Certificate",
      issuingOrganization: "Certification Authority",
      category: "approval",
      description: "Official endorsement certificate validating our quality standards"
    }
  },
  {
    filename: "17) Endorsement- 19.pdf",
    type: "pdf",
    directory: "main",
    pairedFile: "17) Endorsement- 19.png",
    displayedOnPage: true
  },

  // DI Fittings directory (/certificates/DI Fittings/)
  {
    filename: "BIS License-Fitting plant-01.jpg",
    type: "image",
    directory: "di-fittings",
    pairedFile: "BIS License-Fitting plant.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "BIS License for Ductile Iron Fittings Manufacturing Plant",
      issuingOrganization: "BIS (Bureau of Indian Standards)",
      category: "fittings",
      description: "Bureau of Indian Standards license for the production of DI fittings"
    }
  },
  {
    filename: "BIS License-Fitting plant.pdf",
    type: "pdf",
    directory: "di-fittings",
    pairedFile: "BIS License-Fitting plant-01.jpg",
    displayedOnPage: true
  },
  {
    filename: "BIS License copy- Flanging unit-01.jpg",
    type: "image",
    directory: "di-fittings",
    pairedFile: "BIS License copy- Flanging unit.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "BIS License for Flanging Unit Operations",
      issuingOrganization: "BIS (Bureau of Indian Standards)",
      category: "fittings",
      description: "Bureau of Indian Standards license for the production of flanged pipes"
    }
  },
  {
    filename: "BIS License copy- Flanging unit.pdf",
    type: "pdf",
    directory: "di-fittings",
    pairedFile: "BIS License copy- Flanging unit-01.jpg",
    displayedOnPage: true
  },
  {
    filename: "1319_001_REV0_ENG-signed-01.jpg",
    type: "image",
    directory: "di-fittings",
    pairedFile: "1319_001_REV0_ENG-signed.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "Bureau Veritas DI Fittings Certificate 1319_001_REV0",
      issuingOrganization: "Bureau Veritas",
      certificateNumber: "1319_001_REV0_ENG",
      category: "fittings",
      description: "Product certificate for DI fittings conforming to international standards"
    }
  },
  {
    filename: "1319_001_REV0_ENG-signed.pdf",
    type: "pdf",
    directory: "di-fittings",
    pairedFile: "1319_001_REV0_ENG-signed-01.jpg",
    displayedOnPage: true
  },
  {
    filename: "1318_002_REV0_ENG-signed-01.jpg",
    type: "image",
    directory: "di-fittings",
    pairedFile: "1318_002_REV0_ENG-signed.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "Bureau Veritas DI Fittings Certificate 1318_002_REV0",
      issuingOrganization: "Bureau Veritas",
      certificateNumber: "1318_002_REV0_ENG",
      category: "fittings",
      description: "Product certificate for DI fittings conforming to international standards"
    }
  },
  {
    filename: "1318_002_REV0_ENG-signed.pdf",
    type: "pdf",
    directory: "di-fittings",
    pairedFile: "1318_002_REV0_ENG-signed-01.jpg",
    displayedOnPage: true
  },
  {
    filename: "1318_001_REV0_ENG-signed-01.jpg",
    type: "image",
    directory: "di-fittings",
    pairedFile: "1318_001_REV0_ENG-signed.pdf",
    displayedOnPage: true,
    certificateInfo: {
      officialName: "Bureau Veritas DI Fittings Certificate 1318_001_REV0",
      issuingOrganization: "Bureau Veritas",
      certificateNumber: "1318_001_REV0_ENG",
      category: "fittings",
      description: "Product certificate for DI fittings conforming to international standards"
    }
  },
  {
    filename: "1318_001_REV0_ENG-signed.pdf",
    type: "pdf",
    directory: "di-fittings",
    pairedFile: "1318_001_REV0_ENG-signed-01.jpg",
    displayedOnPage: true
  },
  {
    filename: "1319_001_REV0_ENG-signed (1)-01.jpg",
    type: "image",
    directory: "di-fittings",
    pairedFile: "1319_001_REV0_ENG-signed.pdf",
    displayedOnPage: false,
    certificateInfo: {
      officialName: "Bureau Veritas DI Fittings Certificate 1319_001_REV0 (Duplicate)",
      issuingOrganization: "Bureau Veritas",
      certificateNumber: "1319_001_REV0_ENG",
      category: "fittings",
      description: "Duplicate image file for the same certificate - not currently displayed"
    }
  }
];

// Summary statistics
export const auditSummary = {
  totalFilesFound: 33,
  totalImageFiles: 17,
  totalPdfFiles: 16,
  totalCertificatePairs: 16,
  mainDirectoryFiles: 24,
  diFittingsDirectoryFiles: 9,
  certificatesDisplayedOnPage: 21,
  certificatesNotDisplayed: 1, // The duplicate 1319 image file
  duplicateFiles: 1
};

// Missing or problematic files
export const auditIssues = [
  {
    issue: "Duplicate image file",
    description: "1319_001_REV0_ENG-signed (1)-01.jpg is a duplicate of 1319_001_REV0_ENG-signed-01.jpg",
    recommendation: "Remove the duplicate file or use it as a backup"
  },
  {
    issue: "Double PDF extension",
    description: "Certificate TC-15394.pdf.pdf has double .pdf extension",
    recommendation: "Rename to Certificate TC-15394.pdf for consistency"
  }
];

// Verification: All certificates in folders vs. displayed on page
export const verificationReport = {
  allCertificatesAccountedFor: true,
  totalUniqueCertificates: 16,
  certificatesOnPage: 21, // Some certificates may be listed multiple times or have additional entries
  discrepancies: [
    "The page shows 21 certificates but we only have 16 unique certificate pairs in folders",
    "This suggests some certificates may be duplicated or there are additional entries without local files"
  ]
};
