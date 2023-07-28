export class TemplateClass {
  constructor() { }

  public GetControlNodeTemplateGlobal(contentDetails: any) {
    return (
      "<div class='bow-tie-control-card-content rounded'style=' border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-control-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<h4>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='bow-tie-control-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetOtherTemplateGlobal(contentDetails: any) {
    return (
      "<div class='Bow-tie-Other-card-content rounded'style=' border: ; border-radius: 10px 10px 10px 10px;'>" +
      "<div class='Bow-tie-Other-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<h4>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='Bow-tie-Other-card-body' style='padding: 10px; border-radius: 10px 10px 10px 10px;'>" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetConsequencesTemplateGlobal(contentDetails: any) {
    return (
      "<div class='bow-tie-cause-card-content rounded'style=' border: ; border-radius: 10px 10px 10px 10px;'>" +
      "<div class='bow-tie-cause-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<h4>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body' style='padding: 10px; border-radius: 10px 10px 10px 10px;'>" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }
  public GetCauseTemplateGlobal(contentDetails: any) {
    return (
      "<div class='bow-tie-cause-card-content rounded'style=' border: ; border-radius: 10px 10px 10px 10px;'>" +
      "<div class='bow-tie-cause-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<h4>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body' style='padding: 10px; border-radius: 10px 10px 10px 10px;'>" +
      '<p>' +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetRiskNodeTemplateGlobal(contentDetails: any) {
    return (
      "<div class='bow-tie-risk-card-content rounded' style='border:none; border-radius: 10px; '>" +
      "<div class='bow-tie-risk-card-header-top' style='border-radius: 10px 10px 0 0;'>" +
      "<p class='bow-tie-risk-card-header-top-text'>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-risk-card-header'>" +
      "<p class='bow-tie-risk-card-header-text'>SR15-Protective and Cyber Security Ratings</p>" +
      '</div>' +
      "<div class='bow-tie-risk-card-body'>" +
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
      "<div class='bow-tie-risk-card-footer' style='border: border-radius: 0 0 10px 10px;'>" +
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
  public GetControlNodeTemplateGlobalExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-control-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p style='display: flex; align-items: left; line-height: 1;'>" +
      "<span style='margin-right: 10px;'>" +
      "Control Type" +
      "</span>" +
      "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
      "<b>Preventive</b>" +
      "</p>" +
      "</p>" +
      "<p style='margin-top: -10px;' >Control Owner</p>" +
      "<p style='display: flex; align-items: center; line-height: 1; margin-bottom: 30px; '>" +
      "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Talia Gisbon</b></span>" +
      '</p>' +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: -10px;'>" +
      "Control Owner Rating" +
      "<p style='display: flex; align-items: center; line-height: 1; '>" +
      "<img src='../assets/bow-tie/icon/WithinAppetite.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>"+
      "<b>"+
      contentDetails.Rating +
      "</b>"+
      "</span>" +
      '</p>' +
      "<img src='<image-url>' alt='Additional Image' style='margin-left: auto;'>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetRiskActionTreatmentExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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

  public GetRiskNodeTemplateGlobalExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-risk-card-content-expand rounded' style='border:none; border-radius: 10px; '>" +
      "<div class='bow-tie-risk-card-header-top-expand' style='border-radius: 10px 10px 0 0;'>" +
      "<p class='bow-tie-risk-card-header-top-text-expand'>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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

      "<div class='bow-tie-risk-card-footer-expand' style='border: border-radius: 0 0 10px 10px;'>" +
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

  public GetIncidentExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<p>" +
      contentDetails.htmlTemplate +
      "</p>" +
      "<p style='margin-top:30px;' >Reported By</p>" +
      "<p style='display: flex; align-items: center; line-height: 1;   '>" +
      "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Clarke Chan</b></span>" +
      '</p>' +
      "<p style='margin-top: 10px;' >Responsible Officer</p>" +
      "<p style='display: flex; align-items: center; line-height: 1; margin-bottom: 20px; '>" +
      "<img src='../assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Joe Smith</b></span>" +
      '</p>' +
      "<p style='display: flex; align-items: left; '>" +
       "<span style='margin-right: 10px;'>" +
       "Reported Date/Time" +
       "</span>" +
       "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
       "<b>26 Nov, 2020 01:48 PM</b>" +
       "</p>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetComplianceObligationExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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

  public GetKPIExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4 style='text-align: center;'>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</h4>' +
      '</div>' +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9); display: flex; flex-direction: column; align-items: center;  margin-top: -18px;'>" +
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
  
   public GetAuditExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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


  public GetHierarchyExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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



  public GetAuthorityDocumentExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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



  public GetPolicyExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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


  public GetAuditRecommendationsExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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


  public GetAuditFindingExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      "</h4>" +
      "</div>" +
      "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
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