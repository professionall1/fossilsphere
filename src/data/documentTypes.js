export const documentHierarchy = [
  {
    category: "Civil",
    groups: [
      {
        subCategory: "Suit Drafts",
        documents: [
          "Plaint",
          "Money Suit",
          "Partition Suit",
          "Declaration Suit",
          "Injunction Suit",
          "Specific Performance Suit",
          "Possession Suit",
          "Damages Suit",
          "Mortgage Suit",
          "Recovery Suit",
        ],
      },
      {
        subCategory: "Pleadings",
        documents: [
          "Written Statement",
          "Replication",
          "Rejoinder",
          "Counter Claim",
          "Set-Off",
          "Amendment Pleadings",
        ],
      },
      {
        subCategory: "Interlocutory Application (IA) Drafts",
        documents: [
          "Stay Petition",
          "Temporary Injunction",
          "Delay Condonation",
          "Restoration Petition",
          "Implead Petition",
          "Receiver Petition",
          "Commission Petition",
          "Set Aside Ex Parte Petition",
        ],
      },
      {
        subCategory: "Affidavit Drafts",
        documents: [
          "Supporting Affidavit",
          "Evidence Affidavit",
          "Affidavit of Service",
          "Undertaking Affidavit",
          "Identity Affidavit",
        ],
      },
      {
        subCategory: "Trial / Evidence Drafts",
        documents: [
          "Chief Examination",
          "Cross Examination",
          "Interrogatories",
          "Witness Summons",
          "Memo of Documents",
          "Written Arguments",
        ],
      },
      {
        subCategory: "Execution Drafts",
        documents: [
          "Execution Petition",
          "Attachment Petition",
          "Delivery Petition",
          "Garnishee Petition",
          "Arrest Petition",
        ],
      },
      {
        subCategory: "Appeal / Revision / Review Drafts",
        documents: [
          "First Appeal",
          "Second Appeal",
          "Civil Revision Petition",
          "Review Petition",
          "Special Leave Petition",
        ],
      },
      {
        subCategory: "Judgment Related Drafts",
        documents: [
          "Draft Decree",
          "Compromise Memo",
          "Consent Terms",
          "Settlement Memo",
        ],
      },
      {
        subCategory: "Miscellaneous Drafts",
        documents: [
          "Caveat Petition",
          "Vakalatnama",
          "Memo of Appearance",
          "Withdrawal Memo",
          "Court Fee Memo",
        ],
      },
    ],
  },
  {
    category: "Criminal Court Drafting",
    documents: [
      "Complaint Drafts",
      "Bail Drafts",
      "Discharge Drafts",
      "Quash Petitions",
      "Criminal Appeals",
      "Criminal Revisions",
      "NBW Recall Petitions",
      "Property Return Petitions",
    ],
  },
  {
    category: "Family Court Drafting",
    documents: [
      "Divorce Petition",
      "Mutual Consent Divorce",
      "Maintenance Petition",
      "Custody Petition",
      "Guardianship Petition",
      "Domestic Violence Petition",
      "Adoption Petition",
    ],
  },
  {
    category: "Consumer Court Drafting",
    documents: [
      "Consumer Complaint",
      "Interim Application",
      "Written Version",
      "Consumer Appeal",
      "Execution Petition",
    ],
  },
  {
    category: "Labour / Service Drafting",
    documents: [
      "Industrial Dispute Petition",
      "Reinstatement Petition",
      "Back Wages Claim",
      "CAT Application",
      "Pension Claim",
      "Seniority Dispute",
    ],
  },
  {
    category: "Writ Court Drafting",
    documents: [
      "Writ Petition",
      "Habeas Corpus",
      "Mandamus",
      "Certiorari",
      "Prohibition",
      "Quo Warranto",
      "PIL",
      "Contempt Petition",
      "Writ Appeal",
    ],
  },
  {
    category: "Company / Commercial Drafting",
    documents: [
      "Company Petition",
      "NCLT Petition",
      "Insolvency Petition",
      "Arbitration Petition",
      "Commercial Suit",
      "Oppression & Mismanagement",
      "Winding Up Petition",
    ],
  },
  {
    category: "Property / Revenue Drafting",
    documents: [
      "Title Suit",
      "Mutation Petition",
      "Revenue Appeal",
      "Tenancy Petition",
      "Land Conversion Petition",
      "Occupancy Rights Petition",
    ],
  },
  {
    category: "Special Act Drafting",
    documents: [
      "NI Act Complaints",
      "MACT Claims",
      "RERA Complaints",
      "GST Appeals",
      "NDPS Bail Petitions",
      "POCSO Petitions",
      "SC/ST Act Petitions",
      "NGT Petitions",
    ],
  },
  {
    category: "Property / Conveyancing Drafts",
    documents: [
      "Sale Deed",
      "Gift Deed",
      "Partition Deed",
      "Settlement Deed",
      "Lease/Rent Deed",
      "Mortgage Deed",
      "Release Deed",
      "Rectification Deed",
      "GPA / SPA",
      "Will",
      "Trust Deed",
    ],
  },
  {
    category: "Agreement / Contract Drafting",
    groups: [
      {
        subCategory: "Commercial Agreements",
        documents: [
          "Service Agreement",
          "Consultancy Agreement",
          "Vendor Agreement",
          "Supply Agreement",
          "Franchise Agreement",
          "Agency Agreement",
          "Licensing Agreement",
          "Distribution Agreement",
        ],
      },
      {
        subCategory: "Business Agreements",
        documents: [
          "Partnership Deed",
          "LLP Agreement",
          "Joint Venture Agreement",
          "Shareholders Agreement",
          "Share Transfer Agreement",
        ],
      },
      {
        subCategory: "Employment Agreements",
        documents: [
          "Employment Contract",
          "Appointment Letter",
          "Consultancy Contract",
          "NDA",
          "Non-Compete Agreement",
        ],
      },
      {
        subCategory: "Financial Agreements",
        documents: [
          "Loan Agreement",
          "Guarantee Agreement",
          "Indemnity Bond",
          "Hypothecation Agreement",
          "Pledge Agreement",
        ],
      },
      {
        subCategory: "General Agreements",
        documents: [
          "MoU",
          "Settlement Agreement",
          "Family Settlement",
          "Arbitration Agreement",
          "Compromise Agreement",
        ],
      },
    ],
  },
  {
    category: "Corporate Document Drafting",
    documents: [
      "MOA",
      "AOA",
      "Board Resolution",
      "Incorporation Documents",
      "Compliance Documents",
    ],
  },
  {
    category: "Legal Notice Drafting",
    documents: [
      "Legal Notice",
      "Demand Notice",
      "Recovery Notice",
      "Eviction Notice",
      "Defamation Notice",
      "Consumer Notice",
      "Arbitration Notice",
      "Section 80 CPC Notice",
    ],
  },
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toDocumentType(category, subCategory, name) {
  const displayName = `${name} Draft`;
  const searchText = `${name} ${displayName} ${category} ${subCategory}`.toLowerCase();

  return {
    id: `${slugify(category)}-${subCategory !== category ? `${slugify(subCategory)}-` : ""}${slugify(name)}`,
    name,
    displayName,
    category,
    subCategory,
    searchText,
  };
}

const documentTypes = documentHierarchy.flatMap((section) => {
  if (section.groups) {
    return section.groups.flatMap((group) =>
      group.documents.map((name) => toDocumentType(section.category, group.subCategory, name))
    );
  }

  return section.documents.map((name) => toDocumentType(section.category, section.category, name));
});

export function getCaseTypeOptions() {
  return documentHierarchy.map((section) => ({
    value: section.category,
    label: section.category,
    hasSubCategories: Boolean(section.groups?.length),
  }));
}

export function getCategoryOptions(category) {
  const section = documentHierarchy.find((item) => item.category === category);
  if (!section) return [];

  if (section.groups) {
    return section.groups.map((group) => ({
      value: group.subCategory,
      label: group.subCategory,
    }));
  }

  return [{ value: section.category, label: section.category }];
}

export function getDraftTypeOptions(category, subCategory) {
  return documentTypes.filter(
    (documentType) =>
      documentType.category === category && documentType.subCategory === subCategory
  );
}

export function getDocumentTypeById(id) {
  return documentTypes.find((documentType) => documentType.id === id) || null;
}

export function getDocumentDropdownLabel(documentType) {
  return `${documentType.displayName} (${documentType.subCategory})`;
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getSearchScore(documentType, query) {
  const q = normalize(query);
  if (!q) return 0;

  const name = normalize(documentType.name);
  const displayName = normalize(documentType.displayName);
  const category = normalize(documentType.category);
  const subCategory = normalize(documentType.subCategory);
  const searchText = normalize(documentType.searchText);
  const tokens = searchText.split(/[^a-z0-9]+/).filter(Boolean);

  if (name === q) return 1000;
  if (displayName === q) return 980;
  if (tokens.includes(q)) return 940;
  if (name.startsWith(q)) return 900;
  if (displayName.startsWith(q)) return 880;
  if (subCategory.startsWith(q)) return 780;
  if (category.startsWith(q)) return 740;
  if (name.includes(q)) return 680;
  if (displayName.includes(q)) return 640;
  if (subCategory.includes(q)) return 540;
  if (category.includes(q)) return 500;
  if (searchText.includes(q)) return 420;

  return 0;
}

export function searchDocumentTypes(query, limit = 8) {
  return documentTypes
    .map((documentType, index) => ({
      documentType,
      index,
      score: getSearchScore(documentType, query),
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(result => result.documentType);
}

export default documentTypes;
