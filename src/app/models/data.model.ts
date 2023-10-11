
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
  KpiData?: KPIData;
  LinkedRiskData?: LinkedRiskData;
}

interface RiskData {
  RiskCode: string;
  ResponsibleManager: string;
  Category: string;
  InherentRiskRating: string;
  ResidualRiskRating: string;
  TargetRiskRating: string;
  AppetiteRating: string;
  InherentRiskRatingImg:any;
  ResidualRiskRatingImg:any;
  TargetRiskRatingImg:any;
  AppetiteRatingImg:any;
  profileImageUrl:any;
}

interface ControlData {
  ControlTitle: string;
  ControlOwner: string;
  ControlOwnerRating: string;
  ControlAuthorizer: string;
  ControlAuthorizerRating: string;
  Active: boolean;
  ControlOwnerRatingImage:any;
  IsLinkedToCauseOrConsequence: boolean;
  ControlOwnerImageUrl: any;
}

interface IncidentData {
  LinkageId: number;
  IncidentId: number;
  IncidentCode: string;
  IncidentTitle: string;
  ReportedDate: string;
  IncidentType: string;
  ResponsiblePerson: string;
  ByteImage:string;
  ImageType: string;
  ResponsibleManagerProfilePic:any;
  ReportedOfficerImageUrl: any;
  ReportedOfficerName:string;
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
  InherentRiskRatingImg:any;
  ResidualRiskRatingImg:any;
  TargetRiskRatingImg:any;
  AppetiteRatingImg:any;
  profileImageUrl:any;
}