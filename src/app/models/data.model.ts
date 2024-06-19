
export interface DiagramNodeData {
  Id: number;
  Type: number;
  ParentNodeId?: number;
  LinkedControlIds?: number[];
  Title: string;
  Header: string;
  Rating: string;
  htmlTemplate: string;
  HeaderDisplayName: string;
  RiskData?: RiskData;
  ControlData?: ControlData;
  IncidentData?: IncidentData;
  KpiData?: KPIData;
  LinkedRiskData?: LinkedRiskData;
  AuthorityDocumentData?: AuthorityDocument;
  ComplianceData?: Compliance;
  AuditData?: Audit;
  TreatmentData?: Treatment;
  HierarchyData?: Hierarchy;
  AuditRecommendationData?: AuditRecommendation;
  AuditFindingData?: AuditFinding;
  RiskAppetiteStatusData?: RiskAppetiteStatus;
  PolicyData?: Policy;
}

interface RiskData {
  RiskCode: string;
  ResponsibleManager: string;
  Category: string;
  InherentRiskRating: string;
  ResidualRiskRating: string;
  TargetRiskRating: string;
  AppetiteRating: string;
  InherentRiskRatingImg: any;
  ResidualRiskRatingImg: any;
  TargetRiskRatingImg: any;
  AppetiteRatingImg: any;
  profileImageUrl: any;
  IsEnableRiskAppetite: string;
  InherentRiskRatingScore: number;
  ResidualRiskRatingScore: number;
  TargetRiskRatingScore: number;
  AppetiteRiskRatingScore: number;
}

interface ControlData {
  ControlTitle: string;
  ControlOwner: string;
  ControlOwnerRating: string;
  ControlAuthorizer: string;
  ControlAuthorizerRating: string;
  Active: boolean;
  ControlOwnerRatingTypeId: number;
  ControlOwnerRatingImage: any;
  IsLinkedToCauseOrConsequence: boolean;
  ControlOwnerImageUrl: any;
  ControlType?: string;
}

interface IncidentData {
  LinkageId: number;
  IncidentId: number;
  IncidentCode: string;
  IncidentTitle: string;
  ReportedDate: string;
  IncidentType: string;
  ResponsiblePerson: string;
  ByteImage: string;
  ImageType: string;
  ResponsibleManagerProfilePic: any;
  ReportedOfficerImageUrl: any;
  ReportedOfficerName: string;
}

interface KPIData {
  RiskLinkId: number;
  KpiIntId: number;
  KpiGuidId: string;
  KPITitle: string;
  Unit: string;
  ReportingPeriod: string;
  Actual: number;
  Target: number;
  Performance: string;
  TrendImg: string;
}

interface LinkedRiskData {
  RiskCode: string;
  ResponsibleManager: string;
  Category: string;
  InherentRiskRating: string;
  ResidualRiskRating: string;
  TargetRiskRating: string;
  AppetiteRating: string;
  InherentRiskRatingImg: any;
  ResidualRiskRatingImg: any;
  TargetRiskRatingImg: any;
  AppetiteRatingImg: any;
  profileImageUrl: any;
  IsEnableRiskAppetite: string;
}
interface AuthorityDocument {
  AuthorityDocumentId: number;
  Title: string;
  Code: string;
  ResponsibleOfficer: string;
  IsActive: boolean;
  ROImage: any;
  AuthorityDocumentType: string;
}

interface Compliance {
  ComplianceId: number;
  Title: string;
  Code: string;
  ResponsibleOfficer: string;
  ROImage: any;
  ReviewStatus?: string;
}
interface Audit {
  AuditId: number;
  AuditTitle: string;
  AuditDate: string;
}

interface Treatment {
  TreatmentId: number;
  TreatmentEndDate: string;
  TreatmentResponsibleOfficer: string;
  TreatmentPercentageComplete: number;
  TreatmentResponsibleOfficerProfilePic: any;
}

interface Hierarchy {
  isPermitted: boolean;
  nodeId: string;
  hierarchyString: string;
}


interface AuditRecommendation {
  AuditNo: string;
  AuditFindingNo: string;
  AuditRecommendationCode: string;
  AuditRecommendationTitle: string
  RecommendationId: string;
  AuditRiskRatingDescription: string;
  ResponsiblePerson: string;
}


interface AuditFinding {
  AuditFindingId: string;
  AuditFindingNo: string;
  FindingBackground: string;
  AuditNo: string;
  AuditTitle: string;
  AuditYear: string;
  AuditRiskRatingDescription: string;
  Active: boolean;
}

interface RiskAppetiteStatus {
  RiskAppetiteIsEnable: boolean;
}

interface Policy {
  LinkageId: number;
  PolicyId: number;
  Title: string;
  Code: string;
  IncidentTypeName: string;
  ResponsiblePerson: string;
  IsActive: boolean;
  PolicyResponsibleOfficerProfilePic: any;

}
export interface HierarchyString {
  nodeId: string;
  nodeName: string;
  nodeParentData: any;
  hierarchyString: string;
}