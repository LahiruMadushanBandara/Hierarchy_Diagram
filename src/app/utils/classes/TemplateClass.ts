export class TemplateClass {
  constructor() {}

  public GetControlNodeTemplateGlobal(contentDetails: any) {
    return (
      "<div class='control-card-content rounded'style=' border: ; border-radius: 10px;'>" +
      "<div class='control-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<h4>' +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
      '</h4>' +
      '</div>' +
      "<div class='control-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<p>' +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
      '</p>' +
      contentDetails.htmlTemplate +
      '</div>' +
      '</div>'
    );
  }

  public GetConsequencesTemplateGlobal(contentDetails: any) {
    return (
      "<div class='consequences-card-content rounded'style=' border: ; border-radius: 10px 10px 10px 10px;'>" +
      "<div class='consequences-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<h4>' +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
      '</h4>' +
      '</div>' +
      "<div class='consequences-card-body' style='padding: 10px; border-radius: 10px 10px 10px 10px;'>" +
      '<p>' +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
      '</p>' +
      contentDetails.htmlTemplate +
      '</div>' +
      '</div>'
    );
  }

  public GetCauseTemplateGlobal(contentDetails: any) {
    return (
      "<div class='cause-card-content rounded'style=' border: ; border-radius: 10px 10px 10px 10px;'>" +
      "<div class='cause-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
      '<h4>' +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
      '</h4>' +
      '</div>' +
      "<div class='cause-card-body' style='padding: 10px; border-radius: 10px 10px 10px 10px;'>" +
      '<p>' +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
      '</p>' +
      contentDetails.htmlTemplate +
      '</div>' +
      '</div>'
    );
  }

  public GetRiskNodeTemplateGlobal(contentDetails: any) {
    return (
      "<div class='risk-card-content rounded' style='border:none; border-radius: 10px; '>" +
      "<div class='risk-card-header-top' style='border-radius: 10px 10px 0 0;'>" +
      "<p class='risk-card-header-top-text'>" +
      (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
      '</p>' +
      '</div>' +
      "<div class='risk-card-header'>" +
      "<p class='risk-card-header-text'>SR15-Protective and Cyber Security Ratings</p>" +
      '</div>' +
      "<div class='risk-card-body'>" +
      "<div class='row' style='display: flex;'>" +
      "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
      '<p><b>Inherent Rating</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/icon/Extream.png' style='width: 50px; height: 50px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>Extreme</span>" +
      '</p>' +
      '</div>' +
      "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
      '<p><b>Revised Rating</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/icon/Low.png' style='width: 50px; height: 50px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>Low</span>" +
      '</p>' +
      '</div>' +
      '</div>' +
      "<div class='row' style='display: flex;'>" +
      "<div class='column' style='background-color: white; width: 50%; padding-left: 15px;'>" +
      '<p><b>Future Rating</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/icon/High.png' style='width: 50px; height: 50px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>High</span>" +
      '</p>' +
      '</div>' +
      "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
      '<p><b>Risk Appetite</b></p>' +
      "<p style='display: flex; align-items: center; line-height: 1;'>" +
      "<img src='../assets/icon/WithinAppetite.png' style='width: 50px; height: 50px;'>" +
      "<span style='position: relative; top: -2px; margin-left: 5px;'>Within Appetite</span>" +
      '</p>' +
      '</div>' +
      '</div>' +
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
      '</div>' +
      "<div class='risk-card-footer' style='border: border-radius: 0 0 10px 10px;'>" +
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
}
