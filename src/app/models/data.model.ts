
export interface data {

  Id: number;

  Type: number;

  ParentNodeId: number;

  Title: string;

  Header: string;

  Rating: string;

  htmlTemplate: string;

  RiskData?: RiskData;

  ControlData?: ControlData;

  IncidentData?: IncidentData;

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