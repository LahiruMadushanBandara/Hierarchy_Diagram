
export interface DiagramNodeData {
  Id: number;
  Type: number;
  ParentNodeId?: number;
  LinkedControlIds?: number[];
  Title: string;
  Header: string;
  Rating: string;
  htmlTemplate: string;
  RiskData?: RiskData;
  ControlData?: ControlData;
  IncidentData?: IncidentData;
  KPIData?: KPIData;
  LinkedRiskData?: LinkedRiskData;
  TreatmentData?: TreatmentData;
  AuditData?: Audit;
  HierarchyData?: Hierarchy;
  AuditRecommendationData?: AuditRecommendation;
  AuditFindingData?: AuditFinding;
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
  IsEnableRiskAppetite: boolean;
}

interface ControlData {
  ControlTitle: string;
  ControlOwner: string;
  ControlOwnerRating: string;
  ControlAuthorizer: string;
  ControlAuthorizerRating: string;
  Active: boolean;
  ControlOwnerRatingImage: any;
  IsLinkedToCauseOrConsequence: boolean;
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
  PerformanceImg: string;
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
}

interface TreatmentData {
  DueDate: string;
  Owner: string;
  CompleteValue: number;
}

interface Audit {
  AuditId: number;
  AuditTitle: string;
  AuditDate: string;
}

interface Hierarchy {
  isPermitted: boolean;
  nodeId: string;
  expandHierarchyView: string;
  collapseHierarchyView: string;
}

interface AuditRecommendation {
  AuditNo?: string;
  AuditFindingNo?: string;
  AuditRecommendationCode?: string;
  AuditRecommendationTitle?: string
  RecommendationId?: string;
  AuditRiskRatingDescription?: string;
  ResponsiblePerson?: string;
}


interface AuditFinding {
  AuditFindingId?: string;
  AuditFindingNo?: string;
  FindingBackground?: string;
  AuditNo?: string;
  AuditTitle?: string;
  AuditYear?: string;
  AuditRiskRatingDescription?: string;
  Active?: boolean;
}

interface Policy {
  LinkageId?: number;
  PolicyId?: number;
  Title?: string;
  Code?: string;
  IncidentTypeName: string;
  ResponsiblePerson: string;
  IsActive?: boolean;
  PolicyResponsibleOfficerProfilePic: any;

}