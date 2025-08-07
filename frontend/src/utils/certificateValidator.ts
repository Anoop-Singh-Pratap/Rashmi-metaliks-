/**
 * Certificate file validation utility
 * Helps validate that certificate files exist and are properly mapped
 */

export interface CertificateFile {
  id: string;
  name: string;
  imageFile: string;
  pdfFile: string;
  category: 'main' | 'di-fittings';
}

// Certificate file mappings based on actual files in the directories
export const certificateFiles: CertificateFile[] = [
  // Main certificates directory
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    imageFile: '/certificates/ISO 9001.png',
    pdfFile: '/certificates/ISO 9001.pdf',
    category: 'main'
  },
  {
    id: 'iso-14001',
    name: 'ISO 14001:2015',
    imageFile: '/certificates/ISO 14001.png',
    pdfFile: '/certificates/ISO 14001.pdf',
    category: 'main'
  },
  {
    id: 'iso-45001',
    name: 'ISO 45001:2018',
    imageFile: '/certificates/ISO 45001.png',
    pdfFile: '/certificates/ISO 45001.pdf',
    category: 'main'
  },
  {
    id: 'wras-opc',
    name: 'WRAS OPC Certificate',
    imageFile: '/certificates/WRAS-OPC.png',
    pdfFile: '/certificates/WRAS-OPC.pdf',
    category: 'main'
  },
  {
    id: 'kitemark-en545',
    name: 'BSI Kitemark EN 545',
    imageFile: '/certificates/KM 793696 - 001 EN 545.png',
    pdfFile: '/certificates/KM 793696 - 001 EN 545..pdf',
    category: 'main'
  },
  {
    id: 'kitemark-iso2531',
    name: 'BSI Kitemark ISO 2531',
    imageFile: '/certificates/KM 793698 - 001 ISO 2531.png',
    pdfFile: '/certificates/KM 793698 - 001 ISO 2531..pdf',
    category: 'main'
  },
  {
    id: 'saso-certificate',
    name: 'SASO Certificate',
    imageFile: '/certificates/Rashmi_SASO_Certificate.png',
    pdfFile: '/certificates/Rashmi_SASO_Certificate.pdf',
    category: 'main'
  },
  {
    id: 'bureau-veritas-1053',
    name: 'Bureau Veritas 1053_001_REV7',
    imageFile: '/certificates/1053_001_REV7_ENG-signed.png',
    pdfFile: '/certificates/1053_001_REV7_ENG-signed.pdf',
    category: 'main'
  },
  {
    id: 'bureau-veritas-975-001',
    name: 'Bureau Veritas 975_001_REV8',
    imageFile: '/certificates/975_001_REV8_ENG-signed.png',
    pdfFile: '/certificates/975_001_REV8_ENG-signed.pdf',
    category: 'main'
  },
  {
    id: 'bureau-veritas-975-002',
    name: 'Bureau Veritas 975_002_REV8',
    imageFile: '/certificates/975_002_REV8_ENG-signed.png',
    pdfFile: '/certificates/975_002_REV8_ENG-signed.pdf',
    category: 'main'
  },
  {
    id: 'tc-certificate',
    name: 'TC-15394 Certificate',
    imageFile: '/certificates/Certificate TC-15394.png',
    pdfFile: '/certificates/Certificate TC-15394.pdf.pdf',
    category: 'main'
  },
  {
    id: 'endorsement',
    name: 'Endorsement Certificate',
    imageFile: '/certificates/17) Endorsement- 19.png',
    pdfFile: '/certificates/17) Endorsement- 19.pdf',
    category: 'main'
  },
  
  // DI Fittings certificates
  {
    id: 'bis-fitting-plant',
    name: 'BIS License for Fitting Plant',
    imageFile: '/certificates/DI Fittings/BIS License-Fitting plant-01.jpg',
    pdfFile: '/certificates/DI Fittings/BIS License-Fitting plant.pdf',
    category: 'di-fittings'
  },
  {
    id: 'bis-flanging-unit',
    name: 'BIS License for Flanging Unit',
    imageFile: '/certificates/DI Fittings/BIS License copy- Flanging unit-01.jpg',
    pdfFile: '/certificates/DI Fittings/BIS License copy- Flanging unit.pdf',
    category: 'di-fittings'
  },
  {
    id: 'bureau-veritas-1319',
    name: 'Bureau Veritas DI Fittings 1319_001_REV0',
    imageFile: '/certificates/DI Fittings/1319_001_REV0_ENG-signed-01.jpg',
    pdfFile: '/certificates/DI Fittings/1319_001_REV0_ENG-signed.pdf',
    category: 'di-fittings'
  },
  {
    id: 'bureau-veritas-1318-002',
    name: 'Bureau Veritas DI Fittings 1318_002_REV0',
    imageFile: '/certificates/DI Fittings/1318_002_REV0_ENG-signed-01.jpg',
    pdfFile: '/certificates/DI Fittings/1318_002_REV0_ENG-signed.pdf',
    category: 'di-fittings'
  },
  {
    id: 'bureau-veritas-1318-001',
    name: 'Bureau Veritas DI Fittings 1318_001_REV0',
    imageFile: '/certificates/DI Fittings/1318_001_REV0_ENG-signed-01.jpg',
    pdfFile: '/certificates/DI Fittings/1318_001_REV0_ENG-signed.pdf',
    category: 'di-fittings'
  }
];

/**
 * Validates that a certificate file mapping is correct
 */
export const validateCertificateFile = async (cert: CertificateFile): Promise<boolean> => {
  try {
    // Check if image file exists
    const imageResponse = await fetch(cert.imageFile, { method: 'HEAD' });
    if (!imageResponse.ok) {
      console.warn(`Certificate image not found: ${cert.imageFile}`);
      return false;
    }

    // Check if PDF file exists
    const pdfResponse = await fetch(cert.pdfFile, { method: 'HEAD' });
    if (!pdfResponse.ok) {
      console.warn(`Certificate PDF not found: ${cert.pdfFile}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error validating certificate ${cert.id}:`, error);
    return false;
  }
};

/**
 * Validates all certificate files
 */
export const validateAllCertificates = async (): Promise<{
  valid: CertificateFile[];
  invalid: CertificateFile[];
}> => {
  const results = await Promise.all(
    certificateFiles.map(async (cert) => ({
      cert,
      isValid: await validateCertificateFile(cert)
    }))
  );

  const valid = results.filter(r => r.isValid).map(r => r.cert);
  const invalid = results.filter(r => !r.isValid).map(r => r.cert);

  console.log(`Certificate validation complete: ${valid.length} valid, ${invalid.length} invalid`);
  
  return { valid, invalid };
};

/**
 * Gets certificate file info by ID
 */
export const getCertificateById = (id: string): CertificateFile | undefined => {
  return certificateFiles.find(cert => cert.id === id);
};

/**
 * Gets certificates by category
 */
export const getCertificatesByCategory = (category: 'main' | 'di-fittings'): CertificateFile[] => {
  return certificateFiles.filter(cert => cert.category === category);
};
