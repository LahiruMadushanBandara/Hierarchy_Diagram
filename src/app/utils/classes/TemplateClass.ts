import { data } from "src/app/models/data.model";

export class TemplateClass {
  constructor() { }

  public GetControlNodeTemplateGlobal(contentDetails: data) {
    return (
      "<div class='bow-tie-control-card-content rounded'>" +
      "<div class='bow-tie-control-card-header'>" +
      '<h4>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='bow-tie-control-card-body'>" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }
  
  
  

  public GetOtherTemplateGlobal(contentDetails: data) {
    return (
      "<div class='Bow-tie-Other-card-content rounded'>" +
      "<div class='Bow-tie-Other-card-header'>" +
      '<h4>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='Bow-tie-Other-card-body'>" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetConsequencesTemplateGlobal(contentDetails: data) {
    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
      "<div class='bow-tie-cause-card-header'>" +
      '<h4>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body'>" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }


  public GetCauseTemplateGlobal(contentDetails: data) {
    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
      "<div class='bow-tie-cause-card-header'>" +
      '<h4>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body' >" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetRiskNodeTemplateGlobal(contentDetails: data) {
    return (
      "<div class='bow-tie-risk-card-content rounded'>" +
      "<div class='bow-tie-risk-card-header-top' >" +
      "<p class='bow-tie-risk-card-header-top-text'>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-risk-card-header'>" +
      "<p class='bow-tie-risk-card-header-text'>SR15-Protective and Cyber Security Ratings</p>" +
      '</div>' +
      "<div class='bow-tie-risk-card-body'>" +
      "<div class='row'>" +
      "<div class='column'>" +
      '<p><b>Inherent Rating</b></p>' +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/Extream.png' >" +
      "<span class='bow-tie-risk-rating-details-text'>Extreme</span>" +
      '</p>' +
      '</div>' +
      "<div class='column'>" +
      '<p><b>Revised Rating</b></p>' +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/Low.png'>" +
      "<span class='bow-tie-risk-rating-details-text'>Low</span>" +
      '</p>' +
      '</div>' +
      '</div>' +
      "<div class='row'>" +
      "<div class='column'>" +
      '<p><b>Future Rating</b></p>' +
      "<p  class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/High.png' >" +
      "<span class='bow-tie-risk-rating-details-text'>High</span>" +
      '</p>' +
      '</div>' +
      "<div class='column'>" +
      '<p><b>Risk Appetite</b></p>' +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/WithinAppetite.png' >" +
      "<span class='bow-tie-risk-rating-details-text'>Within Appetite</span>" +
      '</p>' +
      '</div>' +
      '</div>' +
      "<div class='bow-tie-risk-card-footer'>" +
      "<div class='row'>" +
      "<div class='bow-tie-risk-footer-details'>" +
      '<p><b>Risk Category</b></p><p>customer/<br>Reliability</p>' +
      '</div>' +
      "<div class='bow-tie-risk-footer-details'>" +
      '<p><b>Responsible Manager</b></p>' +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image' src='../assets/bow-tie/icon/image.png' >" +
      "<span class='bow-tie-risk-rating-details-text'>Talia Gisbon</span>" +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  public GetControlNodeTemplateGlobalExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-control-card-header'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body'>" +
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
      "<span class=bow-tie-control-owner-name'><b>Talia Gisbon</b></span>" +
      '</p>' +
      "<p class='bow-tie-control-owner-rating'>" +
      "Control Owner Rating" +
      "<p class='bow-tie-control-owner-rating-details'>" +
      "<img class='bow-tie-control-owner-rating-icon' src='../assets/bow-tie/icon/WithinAppetite.png' >" +
      "<span class='bow-tie-control-owner-rating-name'>"+
      "<b>"+
      contentDetails.ControlData + 
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
      "Due Date" +
      "</span>" +
      "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
      "<b>11March,2020</b>" +
      "</p>" +
      "</p>" +
      "<p style='margin-top: -10px;' >Owner</p>" +
      "<p style='display: flex; align-items: center; line-height: 1; margin-bottom: 30px; '>" +
      "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Talia Gisbon</b></span>" +
      '</p>' +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: -10px;'>" +
      "Complete" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetRiskNodeTemplateGlobalExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-risk-card-content-expand rounded' >" +
      "<div class='bow-tie-risk-card-header-top-expand' >" +
      "<p class='bow-tie-risk-card-header-top-text-expand'>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-extra-card-body' >" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<div class='bow-tie-risk-card-body-expand'>" +
      "<div class='row' style='display: flex;'>" +
      "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
      '<p><b>Inherent Rating</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/bow-tie/icon/Extream.png' style='width: 50px; height: 50px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>Extreme</span>" +
      '</p>' +
      '</div>' +
      "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
      '<p><b>Revised Rating</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/bow-tie/icon/Low.png' style='width: 50px; height: 50px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>Low</span>" +
      '</p>' +
      '</div>' +
      '</div>' +
      "<div class='row' style='display: flex;'>" +
      "<div class='column' style='background-color: white; width: 50%; padding-left: 15px;'>" +
      '<p><b>Future Rating</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/bow-tie/icon/High.png' style='width: 50px; height: 50px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>High</span>" +
      '</p>' +
      '</div>' +
      "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
      '<p><b>Risk Appetite</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/bow-tie/icon/WithinAppetite.png' style='width: 50px; height: 50px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>Within Appetite</span>" +
      '</p>' +
      '</div>' +
      '</div>' +

      "<div class='bow-tie-risk-card-footer-expand'>" +
      "<div class='row' style='display: flex;'>" +
      "<div style='background-color: light gray; width: 50%; padding-left: 15px;'>" +
      '<p><b>Risk Category</b></p><p>customer/<br>Reliability</p>' +
      '</div>' +
      "<div style='background-color: light gray; width:50%; padding-left: 15px;'>" +
      '<p><b>Responsible Manager</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>Talia Gisbon</span>" +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  public GetIncidentExpand(contentDetails: data) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-extra-card-header' style=>" +
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
      '</p>' +
      "<p class='bow-tie-incident-expand-responsible-officer'>Responsible Officer</p>" +
      "<p class='bow-tie-incident-expand-responsible-officer-details'>" +
      "<img class='bow-tie-incident-expand-responsible-officer-image' src='../assets/bow-tie/icon/image.png'>" +
      "<span class='bow-tie-incident-expand-responsible-officer-name'><b>Joe Smith</b></span>" +
      '</p>' +
      "<p class='bow-tie-incident-expand-reported-date-time'>" +
       "Reported Date/Time" +
       "</span>" +
       "<p class='bow-tie-incident-expand-reported-date'>" +
       "<b>26 Nov, 2020 01:48 PM</b>" +
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
    
      '</p>' + 
      "<p style='margin-top: 10px;' >Obligation Owner</p>" +
      "<p style='display: flex; align-items: center; line-height: 1; margin-bottom: 20px; '>" +
      "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
      "<span style= 'position: relative; top: -2px; margin-left: 5px;'><b>Joe Smith</b></span>"+
      "<p style='display: flex; align-items: left; line-height: 1;'>" +
       "<span style='margin-right: 10px;'>" +
       "compliance Status" +
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
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
      "<div class='bow-tie-extra-card-header' >" +
      "<h4 style='text-align: center;'>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='bow-tie-extra-card-body' >" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
  
      "<div style='display: flex; align-items: center; justify-content: center; margin-bottom: 2px; margin-top: -18px;'>" +
      "<div style='display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 5px;'>" +
      "<span style='margin-right: 10px; font-size: 15px; color: black;'>" +
      '<b>Unit</b>' +
      '</span>' +
      "<span style='font-size: 36px; color: blue;'>%</span>" +
      '</div>' +
      '</div>' +
  
      "<div style='display: flex; align-items: center; justify-content: space-between; '>" +
      "<div style='display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 20px;'>" +
      "<span style='margin-right: 10px; font-size: 15px; color: black;'>" +
      '<b>Actual</b>' +
      '</span>' +
      "<span style='margin-right: 10px; font-size: 36px; color: blue;'>10</span>" +
      '</div>' +

      "<div style='width: 50px;'></div>" +
  
      "<div style='display: flex; flex-direction: column; align-items: flex-end; margin-bottom: 20px;'>" +
      "<span style='margin-right: 10px; font-size: 15px; color: black;'>" +
      '<b>Target</b>' +
      '</span>' +
      "<span style='font-size: 36px; color: blue;'>12</span>" +
      '</div>' +
      '</div>' +
  
      "<div style='display: flex; align-items: center; justify-content: center; margin-top: 5px;'>" +
      "<span style='position: relative; margin-right: 25px; font-size: 18px;'>Performance</span>" +
      "<img src='../assets/bow-tie/icon/WithinAppetite.png' style='width: 20px; height: 20px;  '>" +
      "<span style='position: relative; margin-left: 5px; font-size: 18px;'>On Track</span>" +
      '</div>' +
      '</div>' +
      '</div>'
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
       "Audit Date" +
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
       "Hierarchy Name:" +
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
       "Type:" +
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
       "Type:" +
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
       "Name of the audit recommendation:" +
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
       "Name of the audit finding:" +
       "</span>" +
       
      "</p>" +
      "</div>" +
      "</div>"
    );
  }


  



}
