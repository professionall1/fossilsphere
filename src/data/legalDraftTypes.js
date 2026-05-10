const legalDraftTypes = [
  // LITIGATION - A. Civil - Suit Drafts
  { id: "civil-plaint", label: "Plaint", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-money-suit", label: "Money Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-partition-suit", label: "Partition Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-declaration-suit", label: "Declaration Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-injunction-suit", label: "Injunction Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-specific-performance", label: "Specific Performance Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-possession-suit", label: "Possession Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-damages-suit", label: "Damages Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-mortgage-suit", label: "Mortgage Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  { id: "civil-recovery-suit", label: "Recovery Suit", category: "Civil", subcategory: "Suit Drafts", type: "Litigation" },
  // Civil - Responses
  { id: "civil-written-statement", label: "Written Statement", category: "Civil", subcategory: "Responses", type: "Litigation" },
  { id: "civil-replication", label: "Replication", category: "Civil", subcategory: "Responses", type: "Litigation" },
  { id: "civil-rejoinder", label: "Rejoinder", category: "Civil", subcategory: "Responses", type: "Litigation" },
  { id: "civil-counter-claim", label: "Counter Claim", category: "Civil", subcategory: "Responses", type: "Litigation" },
  { id: "civil-set-off", label: "Set-Off", category: "Civil", subcategory: "Responses", type: "Litigation" },
  // Civil - Applications
  { id: "civil-amendment-pleadings", label: "Amendment Pleadings", category: "Civil", subcategory: "Applications", type: "Litigation" },
  { id: "civil-stay-petition", label: "Stay Petition", category: "Civil", subcategory: "Applications", type: "Litigation" },
  { id: "civil-temporary-injunction", label: "Temporary Injunction", category: "Civil", subcategory: "Applications", type: "Litigation" },
  { id: "civil-delay-condonation", label: "Delay Condonation", category: "Civil", subcategory: "Applications", type: "Litigation" },
  { id: "civil-restoration-petition", label: "Restoration Petition", category: "Civil", subcategory: "Applications", type: "Litigation" },
  { id: "civil-implead-petition", label: "Implead Petition", category: "Civil", subcategory: "Applications", type: "Litigation" },
  { id: "civil-receiver-petition", label: "Receiver Petition", category: "Civil", subcategory: "Applications", type: "Litigation" },
  { id: "civil-commission-petition", label: "Commission Petition", category: "Civil", subcategory: "Applications", type: "Litigation" },
  { id: "civil-set-aside-ex-parte", label: "Set Aside Ex Parte Petition", category: "Civil", subcategory: "Applications", type: "Litigation" },
  // Civil - Affidavits
  { id: "civil-supporting-affidavit", label: "Supporting Affidavit", category: "Civil", subcategory: "Affidavits", type: "Litigation" },
  { id: "civil-evidence-affidavit", label: "Evidence Affidavit", category: "Civil", subcategory: "Affidavits", type: "Litigation" },
  { id: "civil-affidavit-service", label: "Affidavit of Service", category: "Civil", subcategory: "Affidavits", type: "Litigation" },
  { id: "civil-undertaking-affidavit", label: "Undertaking Affidavit", category: "Civil", subcategory: "Affidavits", type: "Litigation" },
  { id: "civil-identity-affidavit", label: "Identity Affidavit", category: "Civil", subcategory: "Affidavits", type: "Litigation" },
  // Civil - Evidence
  { id: "civil-chief-examination", label: "Chief Examination", category: "Civil", subcategory: "Evidence", type: "Litigation" },
  { id: "civil-cross-examination", label: "Cross Examination", category: "Civil", subcategory: "Evidence", type: "Litigation" },
  { id: "civil-interrogatories", label: "Interrogatories", category: "Civil", subcategory: "Evidence", type: "Litigation" },
  { id: "civil-witness-summons", label: "Witness Summons", category: "Civil", subcategory: "Evidence", type: "Litigation" },
  { id: "civil-memo-documents", label: "Memo of Documents", category: "Civil", subcategory: "Evidence", type: "Litigation" },
  { id: "civil-written-arguments", label: "Written Arguments", category: "Civil", subcategory: "Evidence", type: "Litigation" },
  // Civil - Execution
  { id: "civil-execution-petition", label: "Execution Petition", category: "Civil", subcategory: "Execution", type: "Litigation" },
  { id: "civil-attachment-petition", label: "Attachment Petition", category: "Civil", subcategory: "Execution", type: "Litigation" },
  { id: "civil-delivery-petition", label: "Delivery Petition", category: "Civil", subcategory: "Execution", type: "Litigation" },
  { id: "civil-garnishee-petition", label: "Garnishee Petition", category: "Civil", subcategory: "Execution", type: "Litigation" },
  { id: "civil-arrest-petition", label: "Arrest Petition", category: "Civil", subcategory: "Execution", type: "Litigation" },
  // Civil - Appeals
  { id: "civil-first-appeal", label: "First Appeal", category: "Civil", subcategory: "Appeals", type: "Litigation" },
  { id: "civil-second-appeal", label: "Second Appeal", category: "Civil", subcategory: "Appeals", type: "Litigation" },
  { id: "civil-revision-petition", label: "Civil Revision Petition", category: "Civil", subcategory: "Appeals", type: "Litigation" },
  { id: "civil-review-petition", label: "Review Petition", category: "Civil", subcategory: "Appeals", type: "Litigation" },
  { id: "civil-slp", label: "Special Leave Petition", category: "Civil", subcategory: "Appeals", type: "Litigation" },
  // Civil - Miscellaneous
  { id: "civil-draft-decree", label: "Draft Decree", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },
  { id: "civil-compromise-memo", label: "Compromise Memo", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },
  { id: "civil-consent-terms", label: "Consent Terms", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },
  { id: "civil-settlement-memo", label: "Settlement Memo", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },
  { id: "civil-caveat-petition", label: "Caveat Petition", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },
  { id: "civil-vakalatnama", label: "Vakalatnama", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },
  { id: "civil-memo-appearance", label: "Memo of Appearance", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },
  { id: "civil-withdrawal-memo", label: "Withdrawal Memo", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },
  { id: "civil-court-fee-memo", label: "Court Fee Memo", category: "Civil", subcategory: "Miscellaneous", type: "Litigation" },

  // B. Criminal
  { id: "criminal-complaint", label: "Complaint Drafts", category: "Criminal", subcategory: "Complaints", type: "Litigation" },
  { id: "criminal-bail", label: "Bail Drafts", category: "Criminal", subcategory: "Bail", type: "Litigation" },
  { id: "criminal-discharge", label: "Discharge Drafts", category: "Criminal", subcategory: "Discharge", type: "Litigation" },
  { id: "criminal-quash", label: "Quash Petitions", category: "Criminal", subcategory: "Quash", type: "Litigation" },
  { id: "criminal-appeal", label: "Criminal Appeals", category: "Criminal", subcategory: "Appeals", type: "Litigation" },
  { id: "criminal-revision", label: "Criminal Revisions", category: "Criminal", subcategory: "Revisions", type: "Litigation" },
  { id: "criminal-nbw-recall", label: "NBW Recall Petitions", category: "Criminal", subcategory: "NBW", type: "Litigation" },
  { id: "criminal-property-return", label: "Property Return Petitions", category: "Criminal", subcategory: "Property", type: "Litigation" },

  // C. Family
  { id: "family-divorce", label: "Divorce Petition", category: "Family", subcategory: "Divorce", type: "Litigation" },
  { id: "family-mutual-divorce", label: "Mutual Consent Divorce", category: "Family", subcategory: "Divorce", type: "Litigation" },
  { id: "family-maintenance", label: "Maintenance Petition", category: "Family", subcategory: "Maintenance", type: "Litigation" },
  { id: "family-custody", label: "Custody Petition", category: "Family", subcategory: "Custody", type: "Litigation" },
  { id: "family-guardianship", label: "Guardianship Petition", category: "Family", subcategory: "Guardianship", type: "Litigation" },
  { id: "family-domestic-violence", label: "Domestic Violence Petition", category: "Family", subcategory: "DV", type: "Litigation" },
  { id: "family-adoption", label: "Adoption Petition", category: "Family", subcategory: "Adoption", type: "Litigation" },

  // D. Consumer
  { id: "consumer-complaint", label: "Consumer Complaint", category: "Consumer", subcategory: "Complaint", type: "Litigation" },
  { id: "consumer-interim", label: "Interim Application", category: "Consumer", subcategory: "Application", type: "Litigation" },
  { id: "consumer-written-version", label: "Written Version", category: "Consumer", subcategory: "Response", type: "Litigation" },
  { id: "consumer-appeal", label: "Consumer Appeal", category: "Consumer", subcategory: "Appeal", type: "Litigation" },
  { id: "consumer-execution", label: "Execution Petition", category: "Consumer", subcategory: "Execution", type: "Litigation" },

  // E. Labour/Service
  { id: "labour-industrial-dispute", label: "Industrial Dispute Petition", category: "Labour/Service", subcategory: "Disputes", type: "Litigation" },
  { id: "labour-reinstatement", label: "Reinstatement Petition", category: "Labour/Service", subcategory: "Reinstatement", type: "Litigation" },
  { id: "labour-back-wages", label: "Back Wages Claim", category: "Labour/Service", subcategory: "Claims", type: "Litigation" },
  { id: "labour-cat", label: "CAT Application", category: "Labour/Service", subcategory: "Tribunal", type: "Litigation" },
  { id: "labour-pension", label: "Pension Claim", category: "Labour/Service", subcategory: "Pension", type: "Litigation" },
  { id: "labour-seniority", label: "Seniority Dispute", category: "Labour/Service", subcategory: "Seniority", type: "Litigation" },

  // F. Writ
  { id: "writ-petition", label: "Writ Petition", category: "Writ", subcategory: "Writ", type: "Litigation" },
  { id: "writ-habeas-corpus", label: "Habeas Corpus", category: "Writ", subcategory: "Writ", type: "Litigation" },
  { id: "writ-mandamus", label: "Mandamus", category: "Writ", subcategory: "Writ", type: "Litigation" },
  { id: "writ-certiorari", label: "Certiorari", category: "Writ", subcategory: "Writ", type: "Litigation" },
  { id: "writ-prohibition", label: "Prohibition", category: "Writ", subcategory: "Writ", type: "Litigation" },
  { id: "writ-quo-warranto", label: "Quo Warranto", category: "Writ", subcategory: "Writ", type: "Litigation" },
  { id: "writ-pil", label: "PIL", category: "Writ", subcategory: "PIL", type: "Litigation" },
  { id: "writ-contempt", label: "Contempt Petition", category: "Writ", subcategory: "Contempt", type: "Litigation" },
  { id: "writ-appeal", label: "Writ Appeal", category: "Writ", subcategory: "Appeal", type: "Litigation" },

  // G. Company/Commercial
  { id: "company-petition", label: "Company Petition", category: "Company/Commercial", subcategory: "Company", type: "Litigation" },
  { id: "company-nclt", label: "NCLT Petition", category: "Company/Commercial", subcategory: "NCLT", type: "Litigation" },
  { id: "company-insolvency", label: "Insolvency Petition", category: "Company/Commercial", subcategory: "Insolvency", type: "Litigation" },
  { id: "company-arbitration", label: "Arbitration Petition", category: "Company/Commercial", subcategory: "Arbitration", type: "Litigation" },
  { id: "company-commercial-suit", label: "Commercial Suit", category: "Company/Commercial", subcategory: "Commercial", type: "Litigation" },
  { id: "company-oppression", label: "Oppression & Mismanagement", category: "Company/Commercial", subcategory: "Oppression", type: "Litigation" },
  { id: "company-winding-up", label: "Winding Up Petition", category: "Company/Commercial", subcategory: "Winding Up", type: "Litigation" },

  // H. Property/Revenue
  { id: "property-title-suit", label: "Title Suit", category: "Property/Revenue", subcategory: "Title", type: "Litigation" },
  { id: "property-mutation", label: "Mutation Petition", category: "Property/Revenue", subcategory: "Mutation", type: "Litigation" },
  { id: "property-revenue-appeal", label: "Revenue Appeal", category: "Property/Revenue", subcategory: "Revenue", type: "Litigation" },
  { id: "property-tenancy", label: "Tenancy Petition", category: "Property/Revenue", subcategory: "Tenancy", type: "Litigation" },
  { id: "property-land-conversion", label: "Land Conversion Petition", category: "Property/Revenue", subcategory: "Conversion", type: "Litigation" },
  { id: "property-occupancy", label: "Occupancy Rights Petition", category: "Property/Revenue", subcategory: "Occupancy", type: "Litigation" },

  // I. Special Acts
  { id: "special-ni-act", label: "NI Act Complaints", category: "Special Acts", subcategory: "NI Act", type: "Litigation" },
  { id: "special-mact", label: "MACT Claims", category: "Special Acts", subcategory: "MACT", type: "Litigation" },
  { id: "special-rera", label: "RERA Complaints", category: "Special Acts", subcategory: "RERA", type: "Litigation" },
  { id: "special-gst", label: "GST Appeals", category: "Special Acts", subcategory: "GST", type: "Litigation" },
  { id: "special-ndps", label: "NDPS Bail Petitions", category: "Special Acts", subcategory: "NDPS", type: "Litigation" },
  { id: "special-pocso", label: "POCSO Petitions", category: "Special Acts", subcategory: "POCSO", type: "Litigation" },
  { id: "special-sc-st", label: "SC/ST Act Petitions", category: "Special Acts", subcategory: "SC/ST", type: "Litigation" },
  { id: "special-ngt", label: "NGT Petitions", category: "Special Acts", subcategory: "NGT", type: "Litigation" },

  // NON-LITIGATION - Property/Conveyancing
  { id: "nl-sale-deed", label: "Sale Deed", category: "Property/Conveyancing", subcategory: "Deeds", type: "Non-Litigation" },
  { id: "nl-gift-deed", label: "Gift Deed", category: "Property/Conveyancing", subcategory: "Deeds", type: "Non-Litigation" },
  { id: "nl-partition-deed", label: "Partition Deed", category: "Property/Conveyancing", subcategory: "Deeds", type: "Non-Litigation" },
  { id: "nl-settlement-deed", label: "Settlement Deed", category: "Property/Conveyancing", subcategory: "Deeds", type: "Non-Litigation" },
  { id: "nl-lease-rent-deed", label: "Lease/Rent Deed", category: "Property/Conveyancing", subcategory: "Deeds", type: "Non-Litigation" },
  { id: "nl-mortgage-deed", label: "Mortgage Deed", category: "Property/Conveyancing", subcategory: "Deeds", type: "Non-Litigation" },
  { id: "nl-release-deed", label: "Release Deed", category: "Property/Conveyancing", subcategory: "Deeds", type: "Non-Litigation" },
  { id: "nl-rectification-deed", label: "Rectification Deed", category: "Property/Conveyancing", subcategory: "Deeds", type: "Non-Litigation" },
  { id: "nl-gpa-spa", label: "GPA/SPA", category: "Property/Conveyancing", subcategory: "Power of Attorney", type: "Non-Litigation" },
  { id: "nl-will", label: "Will", category: "Property/Conveyancing", subcategory: "Will", type: "Non-Litigation" },
  { id: "nl-trust-deed", label: "Trust Deed", category: "Property/Conveyancing", subcategory: "Trust", type: "Non-Litigation" },

  // Agreements - Service/Business
  { id: "nl-service-agreement", label: "Service Agreement", category: "Agreements", subcategory: "Business", type: "Non-Litigation" },
  { id: "nl-consultancy-agreement", label: "Consultancy Agreement", category: "Agreements", subcategory: "Business", type: "Non-Litigation" },
  { id: "nl-vendor-agreement", label: "Vendor Agreement", category: "Agreements", subcategory: "Business", type: "Non-Litigation" },
  { id: "nl-supply-agreement", label: "Supply Agreement", category: "Agreements", subcategory: "Business", type: "Non-Litigation" },
  { id: "nl-franchise-agreement", label: "Franchise Agreement", category: "Agreements", subcategory: "Business", type: "Non-Litigation" },
  { id: "nl-agency-agreement", label: "Agency Agreement", category: "Agreements", subcategory: "Business", type: "Non-Litigation" },
  { id: "nl-licensing-agreement", label: "Licensing Agreement", category: "Agreements", subcategory: "Business", type: "Non-Litigation" },
  { id: "nl-distribution-agreement", label: "Distribution Agreement", category: "Agreements", subcategory: "Business", type: "Non-Litigation" },
  // Agreements - Partnership/Corporate
  { id: "nl-partnership-deed", label: "Partnership Deed", category: "Agreements", subcategory: "Partnership", type: "Non-Litigation" },
  { id: "nl-llp-agreement", label: "LLP Agreement", category: "Agreements", subcategory: "Partnership", type: "Non-Litigation" },
  { id: "nl-jv-agreement", label: "Joint Venture Agreement", category: "Agreements", subcategory: "Partnership", type: "Non-Litigation" },
  { id: "nl-shareholders-agreement", label: "Shareholders Agreement", category: "Agreements", subcategory: "Corporate", type: "Non-Litigation" },
  { id: "nl-share-transfer", label: "Share Transfer Agreement", category: "Agreements", subcategory: "Corporate", type: "Non-Litigation" },
  // Agreements - Employment
  { id: "nl-employment-contract", label: "Employment Contract", category: "Agreements", subcategory: "Employment", type: "Non-Litigation" },
  { id: "nl-appointment-letter", label: "Appointment Letter", category: "Agreements", subcategory: "Employment", type: "Non-Litigation" },
  { id: "nl-consultancy-contract", label: "Consultancy Contract", category: "Agreements", subcategory: "Employment", type: "Non-Litigation" },
  { id: "nl-nda", label: "NDA", category: "Agreements", subcategory: "Confidentiality", type: "Non-Litigation" },
  { id: "nl-non-compete", label: "Non-Compete Agreement", category: "Agreements", subcategory: "Confidentiality", type: "Non-Litigation" },
  // Agreements - Financial
  { id: "nl-loan-agreement", label: "Loan Agreement", category: "Agreements", subcategory: "Financial", type: "Non-Litigation" },
  { id: "nl-guarantee-agreement", label: "Guarantee Agreement", category: "Agreements", subcategory: "Financial", type: "Non-Litigation" },
  { id: "nl-indemnity-bond", label: "Indemnity Bond", category: "Agreements", subcategory: "Financial", type: "Non-Litigation" },
  { id: "nl-hypothecation", label: "Hypothecation Agreement", category: "Agreements", subcategory: "Financial", type: "Non-Litigation" },
  { id: "nl-pledge-agreement", label: "Pledge Agreement", category: "Agreements", subcategory: "Financial", type: "Non-Litigation" },
  // Agreements - Settlement/Misc
  { id: "nl-mou", label: "MoU", category: "Agreements", subcategory: "General", type: "Non-Litigation" },
  { id: "nl-settlement-agreement", label: "Settlement Agreement", category: "Agreements", subcategory: "Settlement", type: "Non-Litigation" },
  { id: "nl-family-settlement", label: "Family Settlement", category: "Agreements", subcategory: "Settlement", type: "Non-Litigation" },
  { id: "nl-arbitration-agreement", label: "Arbitration Agreement", category: "Agreements", subcategory: "Arbitration", type: "Non-Litigation" },
  { id: "nl-compromise-agreement", label: "Compromise Agreement", category: "Agreements", subcategory: "Settlement", type: "Non-Litigation" },

  // Corporate
  { id: "nl-moa", label: "MOA", category: "Corporate", subcategory: "Incorporation", type: "Non-Litigation" },
  { id: "nl-aoa", label: "AOA", category: "Corporate", subcategory: "Incorporation", type: "Non-Litigation" },
  { id: "nl-board-resolution", label: "Board Resolution", category: "Corporate", subcategory: "Resolutions", type: "Non-Litigation" },
  { id: "nl-incorporation-docs", label: "Incorporation Documents", category: "Corporate", subcategory: "Incorporation", type: "Non-Litigation" },
  { id: "nl-compliance-docs", label: "Compliance Documents", category: "Corporate", subcategory: "Compliance", type: "Non-Litigation" },

  // Legal Notices
  { id: "nl-legal-notice", label: "Legal Notice", category: "Legal Notices", subcategory: "Notice", type: "Non-Litigation" },
  { id: "nl-demand-notice", label: "Demand Notice", category: "Legal Notices", subcategory: "Notice", type: "Non-Litigation" },
  { id: "nl-recovery-notice", label: "Recovery Notice", category: "Legal Notices", subcategory: "Notice", type: "Non-Litigation" },
  { id: "nl-eviction-notice", label: "Eviction Notice", category: "Legal Notices", subcategory: "Notice", type: "Non-Litigation" },
  { id: "nl-defamation-notice", label: "Defamation Notice", category: "Legal Notices", subcategory: "Notice", type: "Non-Litigation" },
  { id: "nl-consumer-notice", label: "Consumer Notice", category: "Legal Notices", subcategory: "Notice", type: "Non-Litigation" },
  { id: "nl-arbitration-notice", label: "Arbitration Notice", category: "Legal Notices", subcategory: "Notice", type: "Non-Litigation" },
  { id: "nl-section-80-notice", label: "Section 80 CPC Notice", category: "Legal Notices", subcategory: "Notice", type: "Non-Litigation" },
];

export default legalDraftTypes;
