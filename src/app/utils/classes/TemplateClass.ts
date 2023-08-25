import { data } from 'src/app/models/data.model';
import { PerformanceView } from './PerformanceViewComponent ';

export class TemplateClass {
  constructor() {}



  public GetControlNodeTemplateGlobal(contentDetails: data , enablePerformanceview: boolean) {
    const performanceView = new PerformanceView();
    var styles = performanceView.PerformanceviewDetails(contentDetails , enablePerformanceview );
    
    return (
      "<div class='bow-tie-control-card-content rounded' "+ styles +">" +
        "<div class='bow-tie-control-card-header' "+ styles +">" +
          "<h4>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-control-card-body' >" +
          "<p>" +
              contentDetails.htmlTemplate +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  public GetOtherTemplateGlobal(contentDetails: data) {
    return (
      "<div class='Bow-tie-Other-card-content rounded'>" +
        "<div class='Bow-tie-Other-card-header'>" +
          "<h4>" +
             (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='Bow-tie-Other-card-body'>" +
          "<p>" +
             contentDetails.htmlTemplate +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  public GetConsequencesTemplateGlobal(contentDetails: data) {
    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
        "<div class='bow-tie-cause-card-header'>" +
          "<h4>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-cause-card-body'>" +
          "<p>" +
              contentDetails.htmlTemplate +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  public GetCauseTemplateGlobal(contentDetails: data) {
    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
        "<div class='bow-tie-cause-card-header'>" +
          "<h4>" +
              (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-cause-card-body' >" +
          "<p>" +
              contentDetails.htmlTemplate +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }
 
  public GetRiskNodeTemplateGlobal(contentDetails: data) {
    return (
      "<div class='bow-tie-risk-card-content rounded'>" +
          "<div class='bow-tie-risk-card-header-top' >" +
            "<p class='bow-tie-risk-card-header-top-text'>" +
                (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
            "</p>" +
          "</div>" +
          "<div class='bow-tie-risk-card-header'>" +
            "<p class='bow-tie-risk-card-header-text'>"+
              contentDetails.RiskData.RiskCode+ 
              "-"+
              contentDetails.htmlTemplate+
            "</p>" +
          "</div>" +
          "<div class='bow-tie-risk-card-body'>" +
            "<div class='row'>" +
              "<div class='column'>" +
                "<p><b>Inherent Rating</b></p>" +
                "<p class='bow-tie-risk-rating-details'>" +
                  "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/Extream.png' >" +
                  "<span class='bow-tie-risk-rating-details-text'>"+
                    contentDetails.RiskData.InherentRiskRating+
                  "</span>" +
                "</p>" +
              "</div>" +
              "<div class='column'>" +
                "<p><b>Revised Rating</b></p>" +
                "<p class='bow-tie-risk-rating-details'>" +
                  "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/Low.png'>" +
                  "<span class='bow-tie-risk-rating-details-text'>"+
                    contentDetails.RiskData.ResidualRiskRating+
                  "</span>" +
                "</p>" +
              "</div>" +
            "</div>" +
            "<div class='row'>" +
              "<div class='column'>" +
                "<p><b>Future Rating</b></p>" +
                "<p  class='bow-tie-risk-rating-details'>" +
                  "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/High.png' >" +
                  "<span class='bow-tie-risk-rating-details-text'>"+
                   contentDetails.RiskData.TargetRiskRatinng+
                  "</span>" +
                "</p>" +
              "</div>" +
              "<div class='column'>" +
                "<p><b>Risk Appetite</b></p>" +
                "<p class='bow-tie-risk-rating-details'>" +
                  "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/WithinAppetite.png' >" +
                  "<span class='bow-tie-risk-rating-details-text'>"+
                    contentDetails.RiskData.AppetiteRating+
                  "</span>" +
                "</p>" +
              "</div>" +
          "</div>" +
        
          "<div class='bow-tie-risk-card-footer'>" +
            "<div class='row'>" +
              "<div class='bow-tie-risk-footer-details'>" +
                "<p><b>Risk Category</b></p>"+
                "<p>"+
                 contentDetails.RiskData.Category+
                "</p>" +
              "</div>" +
            "<div class='bow-tie-risk-footer-details'>" +
              "<p><b>Responsible Manager</b></p>" +
              "<p class='bow-tie-risk-rating-details'>" +
                "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/image.png' >" +
                "<span class='bow-tie-risk-rating-details-text'>"+
                contentDetails.RiskData.ResponsibleManager+
                "</span>" +
              "</p>" +
            "</div>" +
          "</div>" +
      "</div>"
    );
  }

 

  public GetControlNodeTemplateGlobalExpand(contentDetails: data , enablePerformanceview: boolean) {

    const performanceView = new PerformanceView();
    var styles = performanceView.PerformanceviewDetails(contentDetails , enablePerformanceview );
   
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-control-card-header' "+ styles +">" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' "+ styles +">" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p class='bow-tie-control-type-details' >" +
      "<span class='bow-tie-control-type'>" +
      "Control Type" +
      "</span>" +
      "<p class='bow-tie-control-type-text'>" +
      "<b>Preventive</b>" +
      "</p>" +
      "</p>" +
      "<p class='bow-tie-control-owner'>Control Owner</p>" +
      "<p class='bow-tie-control-owner-details'>" +
      "<img class ='bow-tie-control-owner-image'src='../assets/bow-tie/icon/image.png'>" +
      "<span class=bow-tie-control-owner-name'><b>"+
      contentDetails.ControlData.ControlOwner +
      "</b></span>" +
      "</p>" +
      "<p class='bow-tie-control-owner-rating'>" +
      "Control Owner Rating" +
      "<p class='bow-tie-control-owner-rating-details'>" +
      "<img class='bow-tie-control-owner-rating-icon' src='../assets/bow-tie/icon/WithinAppetite.png' >" +
      "<span class='bow-tie-control-owner-rating-name'>"+
      "<b>"+ 
      contentDetails.ControlData.ControlOwnerRating+
      "</b>"+
      "</span>" +
      "</div>" +
      "</div>"
    );
  
}

  public GetRiskActionTreatmentExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded''>" +
        "<div class='bow-tie-extra-card-header''>" +
          "<h4>" +
              (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-extra-card-body'>" +
          "<p>" +
              contentDetails.htmlTemplate +
          "</p>" +
          "<p style='display: flex; align-items: left; line-height: 1;'>" +
            "<span style='margin-right: 10px;'>" +
              'Due Date' +
            "</span>" +
            "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
              "<b>11March,2020</b>" +
            "</p>" +
          "</p>" +
          "<p style='margin-top: -10px;' >Owner</p>" +
          "<p style='display: flex; align-items: center; line-height: 1; margin-bottom: 30px; '>" +
            "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
            "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Talia Gisbon</b></span>" +
          "</p>" +
          "<p style='display: flex; align-items: left; line-height: 1; margin-top: -10px;'>" +
            'Complete' +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  public GetLinkRiskNodeTemplateGlobal(contentDetails: data) {
    return (
      "<div class='bow-tie-risk-card-content-expand rounded' >" +
        "<div class='bow-tie-risk-card-header-top-expand' >" +
          "<p class='bow-tie-risk-card-header-top-text-expand'>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</p>" +
        "</div>" +
        "<div class='bow-tie-extra-card-body' >" +
          "<p>" +
            contentDetails.htmlTemplate +
          "</p>" +
          "<div class='bow-tie-risk-card-body-expand'>" +
          "<div class='row' style='display: flex;'>" +
            "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
              "<p><b>Inherent Rating</b></p>" +
              "<p style='display: flex; align-items: center; line-height: 1;'>" +
                "<img src='../assets/bow-tie/icon/Extream.png' style='width: 50px; height: 50px;'>" +
                "<span style='position: relative; top: -2px; margin-left: 5px;'>Extreme</span>" +
              "</p>" +
            "</div>" +
            "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
              "<p><b>Revised Rating</b></p>" +
              "<p style='display: flex; align-items: center; line-height: 1;'>" +
                "<img src='../assets/bow-tie/icon/Low.png' style='width: 50px; height: 50px;'>" +
                "<span style='position: relative; top: -2px; margin-left: 5px;'>Low</span>" +
              "</p>" +
            "</div>" +
          "</div>" +
          "<div class='row' style='display: flex;'>" +
          "<div class='column' style='background-color: white; width: 50%; padding-left: 15px;'>" +
            "<p><b>Future Rating</b></p>" +
            "<p style='display: flex; align-items: center; line-height: 1;'>" +
              "<img src='../assets/bow-tie/icon/High.png' style='width: 50px; height: 50px;'>" +
              "<span style='position: relative; top: -2px; margin-left: 5px;'>High</span>" +
            "</p>" +
          "</div>" +
          "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
            "<p><b>Risk Appetite</b></p>" +
            "<p style='display: flex; align-items: center; line-height: 1;'>" +
              "<img src='../assets/bow-tie/icon/WithinAppetite.png' style='width: 50px; height: 50px;'>" +
              "<span style='position: relative; top: -2px; margin-left: 5px;'>Within Appetite</span>" +
            "</p>" +
          "</div>" +
        "</div>" +
        "<div class='bow-tie-risk-card-footer-expand'>" +
          "<div class='row' style='display: flex;'>" +
          "<div style='background-color: light gray; width: 50%; padding-left: 15px;'>" +
            "<p><b>Risk Category</b></p><p>customer/<br>Reliability</p>" +
          "</div>" +
          "<div style='background-color: light gray; width:50%; padding-left: 15px;'>" +
            "<p><b>Responsible Manager</b></p>" +
            "<p style='display: flex; align-items: center; line-height: 1;'>" +
              "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px;'>" +
              "<span style='position: relative; top: -2px; margin-left: 5px;'>Talia Gisbon</span>" +
            "</p>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  public GetIncidentExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
        "<div class='bow-tie-extra-card-header' >" +
          "<h4>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-extra-card-body'>" +
          "<p>" +
             contentDetails.htmlTemplate +
          "</p>" +
          "<p class='bow-tie-incident-expand-reportedby' >Reported By</p>" +
          "<p class='bow-tie-risk-rating-details'>" +
            "<img class='bow-tie-control-owner-image'src='../assets/bow-tie/icon/image.png' >" +
            "<span class='bow-tie-control-owner-name'><b>Clarke Chan</b></span>" +
          "</p>" +
          "<p class='bow-tie-incident-expand-responsible-officer'>Responsible Officer</p>" +
          "<p class='bow-tie-incident-expand-responsible-officer-details'>" +
            "<img class='bow-tie-incident-expand-responsible-officer-image' src='../assets/bow-tie/icon/image.png'>" +
            "<span class='bow-tie-incident-expand-responsible-officer-name'>"+
              "<b>"+
                contentDetails.IncidentData.ResponsiblePerson+
              "</b>"+
            "</span>" +
          "</p>" +
          "<p class='bow-tie-incident-expand-reported-date-time'>" +
            'Reported Date/Time' +
            "<p class='bow-tie-incident-expand-reported-date'>" +
              "<b>"+
                contentDetails.IncidentData.ReportedDate+
              "</b>" +
            "</p>" +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  public GetComplianceObligationExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
        "<div class='bow-tie-extra-card-header'>" +
          "<h4>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-extra-card-body'>" +
          "<p>" +
            contentDetails.htmlTemplate +
          "</p>" +
          "<p style='margin-top: 10px;' >Obligation Owner</p>" +
          "<p style='display: flex; align-items: center; line-height: 1; margin-bottom: 20px; '>" +
            "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
            "<span style= 'position: relative; top: -2px; margin-left: 5px;'><b>Joe Smith</b></span>" +
            "<p style='display: flex; align-items: left; line-height: 1;'>" +
            "<span style='margin-right: 10px;'>" +
              'compliance Status' +
            "</span>" +
            "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
              "<b>Pending Review</b>" +
            "</p>" +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  public GetKPIExpand(contentDetails: data) {
    var HASH = ""
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
        "<div class='bow-tie-extra-card-header' >" +
          "<h4>" +
              (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-extra-card-body' >" +
          "<p>" +
              contentDetails.htmlTemplate +
          "</p>" +
          "<div class='bow-tie-kpi'>" +
            "<div class='bow-tie-unit-flex'>" +
              "<span class='bow-tie-unit-text'>" +
                "<b>Unit</b>" +
              "</span>" +
              "<span class='bow-tie-unit-symbol'>\\"+
                contentDetails.KPIData.Unit +
              "</span>"+
            "</div>" +
          "</div>" +
          "<div class='bow-tie-unit-details' >" +
            "<div class='bow-tie-actual-flex'>" +
              "<span class='bow-tie-actual-text'>" +
                "<b>Actual</b>" +
              "</span>" +
              "<span class='bow-tie-actual-value'>10</span>" +
            "</div>" +
              "<div class='bow-tie-target-flex'>" +
                "<span class='bow-tie-target-text'>" +
                  "<b>Target</b>" +
                "</span>" +
                "<span class='bow-tie-target-value'>12</span>" +
              "</div>" +
          "</div>" +
          "<div class='bow-tie-performance-flex'>" +
            "<span class='bow-tie-performance-text' >Performance</span>" +
            "<img class='bow-tie-performance-icon'src='../assets/bow-tie/icon/WithinAppetite.png' >" +
            "<span class='bow-tie-performance-rating'>On Track</span>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  public GetAuditExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-extra-card-header' >" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body'>" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: 35px;'>" +
      "<span style='margin-right: 10px;'>" +
      'Audit Date' +
      "</span>" +
      "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
      "<b>22  October,2021</b>" +
      "</p>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetHierarchyExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded'>" +
      "<div class='bow-tie-extra-card-header'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' >" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: 35px;'>" +
      "<span style='margin-right: 10px;'>" +
      'Hierarchy Name:' +
      "</span>" +
      "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
      "<b>path:</b>" +
      "</p>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetAuthorityDocumentExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-extra-card-header'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body'>" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: 35px;'>" +
      "<span style='margin-right: 10px;'>" +
      'Type:' +
      "</span>" +
      "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
      "<b>Responsible Ofiicer:</b>" +
      "</p>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetPolicyExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-extra-card-header' >" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body'>" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: 35px;'>" +
      "<span style='margin-right: 10px;'>" +
      'Type:' +
      "</span>" +
      "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
      "<b>Responsible Ofiicer:</b>" +
      "</p>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetAuditRecommendationsExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-extra-card-header'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body'>" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: 35px;'>" +
      "<span style='margin-right: 10px;'>" +
      'Name of the audit recommendation:' +
      "</span>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetAuditFindingExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-extra-card-header' >" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' >" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: 35px;'>" +
      "<span style='margin-right: 10px;'>" +
      'Name of the audit finding:' +
      "</span>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }
}
