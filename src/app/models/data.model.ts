
export interface data {

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

}



interface RiskData {

  RiskCode: string;

  ResponsibleManager: string;

  Category: string;

  InherentRiskRating: string;

  ResidualRiskRating: string;

  TargetRiskRatinng: string;

  AppetiteRating: string;

}



interface ControlData {

  ControlTitle: string;

  ControlOwner: string;

  ControlOwnerRating: string;

  ControlAuthorizer: string;

  ControlAuthorizerRating: string;

  Active: boolean;
  
  IsLinkedToCauseOrConsequence: boolean;

}



interface IncidentData {

  LinkageId: number;

  IncidentId: number;

  IncidentTitle: string;

  IncidentCode: string;

  IncidentType: string;

  ReportedDate: string;

  ResponsiblePerson: string;

  ImageType: string;

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

  PerformanceImg: string;

  TrendImg: string;


}