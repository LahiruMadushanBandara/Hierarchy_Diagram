export class TemplateClass {
  constructor() { }

  public GetControlNodeTemplateGlobal(contentDetails: any) {
    return (
      "<div class='bow-tie-control-card-content rounded'style=' border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-control-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<h4>' +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
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
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
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
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
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
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
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
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
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
      "<img src='https://api.sofascore.app/api/v1/team/197536/image' style='width: 30px; height: 30px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>Talia Gisbon</span>" +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }
  // public GetControlNodeTemplateGlobalExpand(contentDetails: any) {
  //   return (
  //     "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
  //     "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
  //     "<h4>" +
  //     (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
  //     "</h4>" +
  //     "</div>" +
  //     "<div class='bow-tie-extra-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
  //     "<p>" +
  //     contentDetails.htmlTemplate +
  //     "</p>" +
  //     "<p style='display: flex; align-items: left; line-height: 1;'>" +
  //     "<span style='margin-right: 10px;'>" +
  //     "Control Type" +
  //     "</span>" +
  //     "<p style='margin-top: -10px; margin-bottom: 30px;'>" +
  //     "<b>Preventive</b>" +
  //     "</p>" +
  //     "</p>" +
  //     "<p style='margin-top: -10px;' >Control Owner</p>" +
  //     "<p style='display: flex; align-items: center; line-height: 1; margin-bottom: 30px; '>" +
  //     "<img src='https://api.sofascore.app/api/v1/team/197536/image' style='width: 30px; height: 30px; margin-top: -10px; '>" +
  //     "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Talia Gisbon</b></span>" +
  //     '</p>' +
  //     "<p style='display: flex; align-items: left; line-height: 1; margin-top: -10px;'>" +
  //     "Control Owner Rating" +
  //     "<p style='display: flex; align-items: center; line-height: 1; '>" +
  //     "<img src='../assets/bow-tie/icon/WithinAppetite.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
  //     "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Partially Effective</b></span>" +
  //     '</p>' +
  //     "<img src='<image-url>' alt='Additional Image' style='margin-left: auto;'>" +
  //     "</p>" +
  //     "</div>" +
  //     "</div>"
  //   );
  // }


  public GetControlNodeTemplateGlobalExpand(contentDetails: any) {
    return (
      "<div class='bow-tie-extra-card-content rounded' style='border: ; border-radius: 10px;'>" +
      "<div class='bow-tie-extra-card-header' style='padding: 10px; border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      "<h4>" +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
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
      "<img src='https://api.sofascore.app/api/v1/team/197536/image' style='width: 30px; height: 30px; margin-top: -10px; '>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Talia Gisbon</b></span>" +
      '</p>' +
      "<p style='display: flex; align-items: left; line-height: 1; margin-top: -10px;'>" +
      "Complete" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }


  




}



