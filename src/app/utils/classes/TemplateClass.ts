import { DiagramNodeData } from 'src/app/models/data.model';
import { PerformanceView , PerformanceViewKpi } from './PerformanceViewComponent ';

export class TemplateClass {
  constructor() {}
       


  public GetControlNodeTemplateGlobal(contentDetails: DiagramNodeData , enablePerformanceview: boolean) {
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
  

  public GetOtherTemplateGlobal(contentDetails: DiagramNodeData, enablePerformanceview: boolean) {
    // var styles:string;
    // console.log("contentDetails",contentDetails)

    //  if(contentDetails.KPIData.Performance === 'On Track'){
      
    //   styles = "style='background-color:rgb(0, 185, 85); color: white;  border: none;'";
    // }
    // else if(contentDetails.KPIData.Performance === 'Off Track'){
      
    //   styles = "style='background-color: rgb(255,219,46); color: white;  border: none;'";
    // }
    // else if(contentDetails.KPIData.Performance === 'Monitor'){
      
    //   styles = "style='background-color: rgb(242,130,48); color: white;  border: none;' ";
    // }


    // const performanceViewKpi = new PerformanceViewKpi();
    // var styles = performanceViewKpi.PerformanceviewDetailsKpi(contentDetails , enablePerformanceview );
    return (
      "<div class='Bow-tie-Other-card-content rounded'>" +
        "<div class='Bow-tie-Other-card-header'>" +
          "<h4>" +
             (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='Bow-tie-Other-card-body'>" +
          "<p>\\" +
             contentDetails.htmlTemplate +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  // Function to escape HTML entities
  public htmlEntityDecode(input) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input;
    return textarea.value;
  }
  public GetConsequencesTemplateGlobal(contentDetails: DiagramNodeData) {

     // Extract the content within the <dev> tags
  const htmlTemplate = contentDetails.htmlTemplate;
  const contentWithinDev = htmlTemplate.match(/<dev>(.*?)<\/dev>/);

  let decodedHtmlTemplate = contentWithinDev
  ? this.htmlEntityDecode(contentWithinDev[1])
  : htmlTemplate; 
    return (
 
      "<div class='bow-tie-cause-card-content rounded'>" +
        "<div class='bow-tie-cause-card-header'>" +
          "<h4>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-cause-card-body'>" +
          "<p>" +
          contentDetails.htmlTemplate.replace(/#/g, '\\#') +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  public GetCauseTemplateGlobal(contentDetails: DiagramNodeData) {
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
 
  public GetRiskNodeTemplateGlobal(contentDetails: DiagramNodeData) {

    (contentDetails.RiskData.InherentRiskRating == "" || contentDetails.RiskData.InherentRiskRating == undefined) ? "N/A" : contentDetails.RiskData.InherentRiskRating;
    (contentDetails.RiskData.AppetiteRating == ""|| contentDetails.RiskData.AppetiteRating == undefined) ? "N/A" : contentDetails.RiskData.AppetiteRating;
    (contentDetails.RiskData.ResidualRiskRating  == "" || contentDetails.RiskData.ResidualRiskRating  == undefined) ? "N/A" : contentDetails.RiskData.ResidualRiskRating;
    (contentDetails.RiskData.TargetRiskRating  == "" || contentDetails.RiskData.TargetRiskRating  == undefined) ? "N/A" : contentDetails.RiskData.TargetRiskRating;
   
    return (
      "<div class='bow-tie-risk-card-content rounded'>" +
          "<div class='bow-tie-risk-card-header-top' >" +
            "<p class='bow-tie-risk-card-header-top-text'>" +
            "<h4>" +
                (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
            "</h4>" +
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
                          "<img class='bow-tie-risk-rating-details-image'"+
                            "src='"+ contentDetails.RiskData.InherentRiskRatingImg+"'"+
                  "<span class='bow-tie-risk-rating-details-text'>"+
                    contentDetails.RiskData.InherentRiskRating+
                  "</span>" +
                "</p>" +
              "</div>" +
              "<div class='column'>" +
                "<p><b>Revised Rating</b></p>" +
                "<p class='bow-tie-risk-rating-details'>" +
                      "<img class='bow-tie-risk-rating-details-image'"+
                          "src='"+ contentDetails.RiskData.ResidualRiskRatingImg+"'"+
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
                      "<img class='bow-tie-risk-rating-details-image'"+
                          "src='"+ contentDetails.RiskData.TargetRiskRatingImg+"'"+
                  "<span class='bow-tie-risk-rating-details-text'>"+
                   contentDetails.RiskData.TargetRiskRating+
                  "</span>" +
                "</p>" +
              "</div>" +
              "<div class='column'>" +
                "<p><b>Risk Appetite</b></p>" +
                "<p class='bow-tie-risk-rating-details'>" +
                      "<img class='bow-tie-risk-rating-details-image'"+
                          "src='"+ contentDetails.RiskData.AppetiteRatingImg +"'"+
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
                "<img class='bow-tie-risk-rating-details-image'"+
                            "src='"+ contentDetails.RiskData.profileImageUrl +"'"+
                "<span class='bow-tie-risk-rating-details-text'>"+
                contentDetails.RiskData.ResponsibleManager+
                "</span>" +
              "</p>" +
            "</div>" +
          "</div>" +
      "</div>"
    );
  }

 

  public GetControlNodeTemplateGlobalExpand(contentDetails: DiagramNodeData , enablePerformanceview: boolean) {

    const performanceView = new PerformanceView();
    var styles = performanceView.PerformanceviewDetails(contentDetails , enablePerformanceview );
    // Set the maximum number of characters before truncating
    const maxCharacters = 100;

    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
        contentDetails.htmlTemplate.length > maxCharacters
            ? contentDetails.htmlTemplate.substring(0, maxCharacters) + "..."
            : contentDetails.htmlTemplate;
   
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
        "<div class='bow-tie-control-card-header' "+ styles +">" +
          "<h4>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-extra-card-body' "+ styles +">" +
          "<p>" +
            "<b>" +
            truncatedHtmlTemplate +
  
            "</b>" +
          "</p>" +
          "<p class='bow-tie-control-type-details' >" +
            "<span class='bow-tie-control-type'>" +
              "Control Type" +
            "</span>" +
            "<p class='bow-tie-control-type-text'>" +
            "Preventive " +
            "</p>" +
          "</p>" +
          "<p class='bow-tie-control-owner'>Control Owner</p>" +
          "<p class='bow-tie-control-owner-details'>" +
            "<img class ='bow-tie-control-owner-image'src='theavo_risk/assets/bow-tie/icon/image.png'>" +
            "<span class=bow-tie-control-owner-name'>"+
              contentDetails.ControlData.ControlOwner +
            "</span>" +
          "</p>" +
          "<p class='bow-tie-control-owner-rating'>" +
          "Control Owner Rating" +
          "<p class='bow-tie-control-owner-rating-details'>" +
            "<img class='bow-tie-control-owner-rating-icon'"+
                            "src='"+ contentDetails.ControlData.ControlOwnerRatingImage+"'"+
            "<span class='bow-tie-control-owner-rating-name'>"+
              contentDetails.ControlData.ControlOwnerRating+
            "</span>" +
          "</p>"+
        "</div>" +
      "</div>"
    );
  
}

  public GetRiskActionTreatmentExpand(contentDetails: DiagramNodeData) {
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
            "<img src='theavo_risk/assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
            "<span style='position: relative; top: -2px; margin-left: 5px;'><b>Talia Gisbon</b></span>" +
          "</p>" +
          "<p style='display: flex; align-items: left; line-height: 1; margin-top: -10px;'>" +
            'Complete' +
          "</p>" +
        "</div>" +
      "</div>"
    );
  }

  public GetLinkRiskNodeTemplateGlobal(contentDetails: DiagramNodeData) {
    (contentDetails.LinkedRiskData.InherentRiskRating == "" || contentDetails.LinkedRiskData.InherentRiskRating == undefined) ? "N/A" : contentDetails.LinkedRiskData.InherentRiskRating;
    (contentDetails.LinkedRiskData.AppetiteRating == ""|| contentDetails.LinkedRiskData.AppetiteRating == undefined) ? "N/A" : contentDetails.LinkedRiskData.AppetiteRating;
    (contentDetails.LinkedRiskData.ResidualRiskRating  == "" || contentDetails.LinkedRiskData.ResidualRiskRating  == undefined) ? "N/A" : contentDetails.LinkedRiskData.ResidualRiskRating;
    (contentDetails.LinkedRiskData.TargetRiskRating  == "" || contentDetails.LinkedRiskData.TargetRiskRating  == undefined) ? "N/A" : contentDetails.LinkedRiskData.TargetRiskRating;
     
    return (
      "<div class='bow-tie-risk-card-content-expand rounded' >" +
        "<div class='bow-tie-risk-card-header-top-expand' >" +
          "<h4>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div style='background-color:white;' class='bow-tie-risk-card-header-expand'>" +
           "<p class='bow-tie-risk-card-header-text-expand'> <b>"+
              contentDetails.LinkedRiskData.RiskCode+ 
              "-"+
              contentDetails.htmlTemplate+
            " </b></p> " +
          "</div>" +
          "<div class='bow-tie-risk-card-body-expand'>" +
            "<div class='row'>" +
              "<div class='column'>" +
                "<p><b>Inherent Rating</b></p>" +
                "<p class='bow-tie-risk-rating-details'>" +
                  "<img class='bow-tie-risk-rating-details-image'"+
                            "src='"+ contentDetails.LinkedRiskData.InherentRiskRatingImg+"'"+
                  "<span class='bow-tie-risk-rating-details-text'>"+
                    contentDetails.LinkedRiskData.InherentRiskRating+
                  "</span>" +
                "</p>" +
              "</div>" +
              "<div class='column'>" +
                "<p><b>Revised Rating</b></p>" +
                "<p class='bow-tie-risk-rating-details'>" +
                  "<img class='bow-tie-risk-rating-details-image'"+
                            "src='"+ contentDetails.LinkedRiskData.ResidualRiskRatingImg+"'"+
                  "<span class='bow-tie-risk-rating-details-text'>"+
                    contentDetails.LinkedRiskData.ResidualRiskRating+
                  "</span>" +
                "</p>" +
              "</div>" +
            "</div>" +
            "<div class='row'>" +
              "<div class='column'>" +
                "<p><b>Future Rating</b></p>" +
                "<p  class='bow-tie-risk-rating-details'>" +
                  "<img class='bow-tie-risk-rating-details-image'"+
                            "src='"+ contentDetails.LinkedRiskData.TargetRiskRatingImg+"'"+
                  "<span class='bow-tie-risk-rating-details-text'>"+
                  contentDetails.LinkedRiskData.TargetRiskRating+
                  "</span>" +
                "</p>" +
              "</div>" +
              "<div class='column'>" +
                "<p><b>Risk Appetite</b></p>" +
                "<p class='bow-tie-risk-rating-details'>" +
                  "<img class='bow-tie-risk-rating-details-image'"+
                            "src='"+ contentDetails.LinkedRiskData.AppetiteRatingImg+"'"+
                  "<span class='bow-tie-risk-rating-details-text'>"+
                    contentDetails.LinkedRiskData.AppetiteRating+
                  "</span>" +
                "</p>" +
              "</div>" +
            "</div>" +
          "</div>" +
        
        "<div class='bow-tie-risk-card-footer-expand'>" +
          "<div class='row'>" +
            "<div  class='bow-tie-risk-footer-details'>" +
              "<p><b>Risk Category</b><p>" +
              "<p>"+
                contentDetails.LinkedRiskData.Category +
              "</p>"+
            "</div>" +
            "<div class='bow-tie-risk-footer-details'>" +
              "<p><b>Responsible Manager</b></p>" +
              "<p sclass='bow-tie-risk-rating-details'>" +
                "<img class='bow-tie-risk-rating-details-image' src='theavo_risk/assets/bow-tie/icon/image.png' >" +
                "<span class='bow-tie-risk-rating-details-text'>" +
                  contentDetails.LinkedRiskData.ResponsibleManager +
                "</span>" +
              "</p>" +
            "</div>" +
         "</div>" +
        "</div>" +
      "</div>"
    );
  }

  public GetIncidentExpand(contentDetails: DiagramNodeData) {
    return (
      "<div class='bow-tie-extra-card-content rounded' >" +
        "<div class='bow-tie-extra-card-header' >" +
          "<h4>" +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          "</h4>" +
        "</div>" +
        "<div class='bow-tie-extra-card-body'>" +
          "<p> <b>" +
             contentDetails.htmlTemplate +
          " </b><p>" +
          "<p class='bow-tie-incident-expand-reportedby' >Reported By</p>" +
          "<p class='bow-tie-risk-rating-details'>" +
            "<img class='bow-tie-control-owner-image'src='theavo_risk/assets/bow-tie/icon/image.png' >" +
            "<span class='bow-tie-control-owner-name'><b>Clarke Chan</b></span>" +
          "</p>" +
          "<p class='bow-tie-incident-expand-responsible-officer'>Responsible Officer</p>" +
          "<p class='bow-tie-incident-expand-responsible-officer-details'>" +
          "<img class='bow-tie-incident-expand-responsible-officer-image'"+
              "src='"+ contentDetails.IncidentData.ResponsibleManagerProfilePic  +"'"+
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

  public GetComplianceObligationExpand(contentDetails: DiagramNodeData) {
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
            "<img src='theavo_risk/assets/bow-tie/icon/image.png' style='width: 30px; height: 30px; margin-top: -10px; '>" +
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

  // public escapeHtml(unsafe) {
  //   var HandleSymbols = unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  //   return (HandleSymbols);
  // }



  public GetKPIExpand(contentDetails: DiagramNodeData, enablePerformanceview: boolean) {

    // contentDetails.htmlTemplate = this.escapeHtml(contentDetails.htmlTemplate);
    const performanceViewKpi = new PerformanceViewKpi();
    var styles = performanceViewKpi.PerformanceviewDetailsKpi(contentDetails , enablePerformanceview );

    contentDetails.KPIData.Actual != null  ? contentDetails.KPIData.Actual : 0  ;
    contentDetails.KPIData.Target != null  ? contentDetails.KPIData.Target : 0  ;
    
    var currentIndicator:string;
    // var styles:string;

    if(contentDetails.KPIData.Performance === 'N/A'){
      currentIndicator = 'na-badge';
      
    }
    else if(contentDetails.KPIData.Performance === 'On Track'){
      currentIndicator = 'onTrack-badge';
      // enablePerformanceview? styles = "style='background-color:rgb(0, 185, 85); color: white;  border: none;'":"";
    }
    else if(contentDetails.KPIData.Performance === 'Off Track'){
      currentIndicator = 'offTrack-badge';
      // enablePerformanceview? styles = "style='background-color: rgb(255,219,46); color: white;  border: none;'":"";
    }
    else if(contentDetails.KPIData.Performance === 'Monitor'){
      currentIndicator = 'monitor-badge';
      // enablePerformanceview? styles = "style='background-color: rgb(242,130,48); color: white;  border: none;' ":"";
    }
    else{
      currentIndicator = 'na-badge';
    }
    

    const maxCharacters = 70;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(/#/g, '\\#');
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
        contentDetails.htmlTemplate.length > maxCharacters
            ? contentDetails.htmlTemplate.substring(0, maxCharacters) + "..."
            : contentDetails.htmlTemplate;

    return (
      "<div class='bow-tie-extra-card-content rounded'"+ styles +" >" +
        "<div class='bow-tie-extra-card-header' "+ styles +">" +
        "<span>"+
          (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
        "</span>"+ 
        "</div>" +
        "<div class='bow-tie-extra-card-body' >" +
          "<p class='bow-tie-htmlTemplate'>\\" +
            truncatedHtmlTemplate +
          " </p>" +
          "<div class='bow-tie-kpi'>" +
            "<div class='bow-tie-unit-flex'>" +
              "<span class='bow-tie-unit-text'>" +
                " Unit  " +
              "</span>" +
              "<span class='bow-tie-unit-symbol'>\\"+
             
                contentDetails.KPIData.Unit +
              
              "</span>"+
            "</div>" +
          "</div>" +
          "<div class='bow-tie-unit-details' >" +
            "<div class='bow-tie-actual-flex'>" +
              "<span class='bow-tie-actual-text'>" +
                " Actual  " +
              "</span>" +
              "<span class='bow-tie-actual-value'>"+ 
                contentDetails.KPIData.Actual +
              "</span>" +
            "</div>" +
              "<div class='bow-tie-target-flex'>" +
                "<span class='bow-tie-target-text'>" +
                  " Target  " +
                "</span>" +
                "<span class='bow-tie-target-value'>"+                
                   contentDetails.KPIData.Target  +
                "</span>" +
              "</div>" +
          "</div>" +
          "<div class='bow-tie-performance-flex'>" +
            "<span class='bow-tie-performance-text'>"+ "Performance</span>" +
            `<span id='performanceIndicator' class='performanceIndicator-badge ${currentIndicator}'></span>`+
            `<span class="bow-tie-performance-rating">${contentDetails.KPIData.Performance ?? 'NotAvailable'}</span>`+
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  public GetAuditExpand(contentDetails: DiagramNodeData) {
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

  public GetHierarchyExpand(contentDetails: DiagramNodeData) {
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

  public GetAuthorityDocumentExpand(contentDetails: DiagramNodeData) {
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

  public GetPolicyExpand(contentDetails: DiagramNodeData) {
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

  public GetAuditRecommendationsExpand(contentDetails: DiagramNodeData) {
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

  public GetAuditFindingExpand(contentDetails: DiagramNodeData) {
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

  public AddTemplatesToNode(dataItem, templatesObj, isExpand, isPerformanceView, isKpIview, isRiskView, renderElement) {


    switch (dataItem.Header) {
      case "Risk":
        templatesObj.riskTemplate = this.GetRiskNodeTemplateGlobal(dataItem);
        sessionStorage.setItem('riskTemplate', templatesObj.riskTemplate);
        break;
      case "Control":
        templatesObj.controlTemplate = this.GetControlNodeTemplateGlobal(dataItem, isPerformanceView);
        templatesObj.controlTemplateExpand = this.GetControlNodeTemplateGlobalExpand(dataItem, isPerformanceView);
        sessionStorage.setItem('controlTemplate', templatesObj.controlTemplate);
        sessionStorage.setItem('controlExpandTemplate', templatesObj.controlTemplateExpand);
        break;
      case "Cause":
        templatesObj.causeTemplate = this.GetCauseTemplateGlobal(dataItem);
        sessionStorage.setItem('causeTemplate', templatesObj.causeTemplate);
        break;
      case "Consequence":
        templatesObj.consequencesTemplate = this.GetConsequencesTemplateGlobal(dataItem);
        sessionStorage.setItem('consequencesTemplate', templatesObj.consequencesTemplate);
        break;
      case "Incident":
        templatesObj.incidentTemplateExpnad = this.GetIncidentExpand(dataItem);
        templatesObj.bottomTemplate = this.GetOtherTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('Incident', templatesObj.incidentTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      case "KPI":
        templatesObj.kpiTemplateExpnad = this.GetKPIExpand(dataItem, isPerformanceView);
        templatesObj.bottomTemplate = this.GetOtherTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('KPI', templatesObj.kpiTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate );
        break;

      case "LinkedRisk":
        templatesObj.linkRiskTemplate = this.GetLinkRiskNodeTemplateGlobal(dataItem);
        templatesObj.bottomTemplate = this.GetOtherTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('LinkedRisk', templatesObj.linkRiskTemplate);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      default:
    }

    //get templates from template class

    templatesObj.bottomTemplate = this.GetOtherTemplateGlobal(dataItem, isPerformanceView);

    templatesObj.riskActionTemplateExpand =
      this.GetRiskActionTreatmentExpand(dataItem);
    var complianceTemplateExpnad =
      this.GetComplianceObligationExpand(dataItem);


    // templates are assigned to corresponding variables

    sessionStorage.setItem('riskActionExpand', templatesObj.riskActionTemplateExpand);
    sessionStorage.setItem('complianceExpand', templatesObj.complianceTemplateExpnad);



    if (isRiskView) {
      isKpIview = false;
      if (isExpand) {

        if (dataItem.Header === 'LinkedRisk') {
          var linkRiskBottomTemp = kendo.template(templatesObj.linkRiskTemplate);
          renderElement.html(linkRiskBottomTemp(dataItem));
        }
      } else {
        if (dataItem.Header === 'LinkedRisk') {
          var otherTemp = kendo.template(templatesObj.bottomTemplate);
          renderElement.html(otherTemp(dataItem));
        }
      }

      if (dataItem.Title === 'Risk Node') {
        var riskNodeTemp = kendo.template(templatesObj.riskTemplate);
        renderElement.html(riskNodeTemp(dataItem));
      }
    } else if (isKpIview) {
      isRiskView = false;
      if (isExpand) {

        if (dataItem.Header === 'KPI') {
          var KPIExpandTemp = kendo.template(templatesObj.kpiTemplateExpnad);
          renderElement.html(KPIExpandTemp(dataItem));
        }
      } else {
        if (dataItem.Header === 'KPI') {
          var otherTemp = kendo.template(templatesObj.bottomTemplate);
          renderElement.html(otherTemp(dataItem));
        }
      }

      if (dataItem.Title === 'Risk Node') {
        var riskNodeTemp = kendo.template(templatesObj.riskTemplate);
        renderElement.html(riskNodeTemp(dataItem));
      }
    } else {
      if (isExpand) {

        if (dataItem.Title === 'Risk Node') {
          var riskNodeTemp = kendo.template(templatesObj.riskTemplate);
          renderElement.html(riskNodeTemp(dataItem));
        } else if (dataItem.Title === 'Control Node') {
          var controlNodeExpandTemp = kendo.template(templatesObj.controlTemplateExpand);
          renderElement.html(controlNodeExpandTemp(dataItem));
        } else if (dataItem.Title === 'Consequences Node') {
          var consequencesTemp = kendo.template(templatesObj.consequencesTemplate);
          renderElement.html(consequencesTemp(dataItem));
        } else if (dataItem.Title === 'Cause Node') {
          var causeTemp = kendo.template(templatesObj.causeTemplate);
          renderElement.html(causeTemp(dataItem));
        } else {

          if (dataItem.Header === 'LinkedRisk') {
            var linkRiskBottomTemp = kendo.template(templatesObj.linkRiskTemplate);
            renderElement.html(linkRiskBottomTemp(dataItem));
          } else if (dataItem.Header === 'riskActionExpand') {
            var riskActionExpandTemp = kendo.template(
              templatesObj.riskActionTemplateExpand
            );
            renderElement.html(riskActionExpandTemp(dataItem));
          } else if (dataItem.Header === 'Incident') {
            var incidentExpandTemp = kendo.template(templatesObj.incidentTemplateExpnad);
            renderElement.html(incidentExpandTemp(dataItem));
          } else if (dataItem.Header === 'Compliance') {
            var complianceExpandTemp = kendo.template(
              complianceTemplateExpnad
            );
            renderElement.html(complianceExpandTemp(dataItem));
          } else if (dataItem.Header === 'KPI') {
            var KPIExpandTemp = kendo.template(templatesObj.kpiTemplateExpnad);
            renderElement.html(KPIExpandTemp(dataItem));
          }
        }
      } else {


        if (dataItem.Title === 'Risk Node') {
          var riskNodeTemp = kendo.template(templatesObj.riskTemplate);
          renderElement.html(riskNodeTemp(dataItem));
        } else if (dataItem.Title === 'Control Node') {
          var controlNodeTemp = kendo.template(templatesObj.controlTemplate);
          renderElement.html(controlNodeTemp(dataItem));
        } else if (dataItem.Title === 'Consequences Node') {
          var consequencesTemp = kendo.template(templatesObj.consequencesTemplate);
          renderElement.html(consequencesTemp(dataItem));
        } else if (dataItem.Title === 'Cause Node') {
          var causeTemp = kendo.template(templatesObj.causeTemplate);
          renderElement.html(causeTemp(dataItem));
        } else {
          var otherTemp = kendo.template(templatesObj.bottomTemplate);
          renderElement.html(otherTemp(dataItem));
        }

      }
    }


  }
  
  public RecreateNodesToCentralizedNode(dataItem, templatesObj, isExpand, isPerformanceView, renderElement) {

    switch (dataItem.Header) {

      case "Risk":
        templatesObj.riskTemplate = this.GetRiskNodeTemplateGlobal(dataItem);
        sessionStorage.setItem('riskTemplate', templatesObj.riskTemplate);
        break;
      case "Control":
        templatesObj.controlTemplate = this.GetControlNodeTemplateGlobal(dataItem, isPerformanceView);
        templatesObj.controlTemplateExpand = this.GetControlNodeTemplateGlobalExpand(dataItem, isPerformanceView);
        sessionStorage.setItem('controlTemplate', templatesObj.controlTemplate);
        sessionStorage.setItem('controlExpandTemplate', templatesObj.controlTemplateExpand);
        break;
      case "Cause":
        templatesObj.causeTemplate = this.GetCauseTemplateGlobal(dataItem);
        sessionStorage.setItem('causeTemplate', templatesObj.causeTemplate);
        break;
      case "Consequence":
        templatesObj.consequencesTemplate = this.GetConsequencesTemplateGlobal(dataItem);
        sessionStorage.setItem('consequencesTemplate', templatesObj.consequencesTemplate);
        break;
      case "Incident":
        templatesObj.incidentTemplateExpnad = this.GetIncidentExpand(dataItem);
        templatesObj.bottomTemplate = this.GetOtherTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('Incident', templatesObj.incidentTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      case "KPI":
        templatesObj.kpiTemplateExpnad = this.GetKPIExpand(dataItem, isPerformanceView);
        templatesObj.bottomTemplate = this.GetOtherTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('KPI', templatesObj.kpiTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;

      case "LinkedRisk":
        templatesObj.linkRiskTemplate = this.GetLinkRiskNodeTemplateGlobal(dataItem);
        templatesObj.bottomTemplate = this.GetOtherTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('LinkedRisk', templatesObj.linkRiskTemplate);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      default:
    }





    if (isExpand) {
      if (dataItem.Header === 'Risk') {
        var riskNodeTemp = kendo.template(templatesObj.riskTemplate);
        renderElement.html(riskNodeTemp(dataItem));
      } else if (dataItem.Header === 'Control') {
        var controlNodeExpandTemp = kendo.template(templatesObj.controlTemplateExpand);
        renderElement.html(controlNodeExpandTemp(dataItem));
      } else if (dataItem.Header === 'Consequence') {
        var consequencesTemp = kendo.template(templatesObj.consequencesTemplate);
        renderElement.html(consequencesTemp(dataItem));
      } else if (dataItem.Header === 'Cause') {
        var causeTemp = kendo.template(templatesObj.causeTemplate);
        renderElement.html(causeTemp(dataItem));
      } else {

        if (dataItem.Header === 'LinkedRisk') {
          var linkRiskBottomTemp = kendo.template(templatesObj.linkRiskTemplate);
          renderElement.html(linkRiskBottomTemp(dataItem));
        } else if (dataItem.Header === 'riskActionExpand') {
          var riskActionExpandTemp = kendo.template(
            templatesObj.riskActionTemplateExpand
          );
          renderElement.html(riskActionExpandTemp(dataItem));
        } else if (dataItem.Header === 'Incident') {
          var incidentExpandTemp = kendo.template(templatesObj.incidentTemplateExpnad);
          renderElement.html(incidentExpandTemp(dataItem));
        }
        else if (dataItem.Header === 'KPI') {
          var KPIExpandTemp = kendo.template(templatesObj.kpiTemplateExpnad);
          renderElement.html(KPIExpandTemp(dataItem));
        }
      }
    }
    else {

      if (dataItem.Header === 'Risk') {
        var riskNodeTemp = kendo.template(templatesObj.riskTemplate);
        renderElement.html(riskNodeTemp(dataItem));
      } else if (dataItem.Header === 'Control') {
        var controlNodeTemp = kendo.template(templatesObj.controlTemplate);
        renderElement.html(controlNodeTemp(dataItem));
      } else if (dataItem.Header === 'Consequence') {
        var consequencesTemp = kendo.template(templatesObj.consequencesTemplate);
        renderElement.html(consequencesTemp(dataItem));
      } else if (dataItem.Header === 'Cause') {
        var causeTemp = kendo.template(templatesObj.causeTemplate);
        renderElement.html(causeTemp(dataItem));
      } else {
        var otherTemp = kendo.template(templatesObj.bottomTemplate);
        renderElement.html(otherTemp(dataItem));
      }

    }

   

  }
  // NodeSampleData:data[] = [
  //   {
  //     "Id": 0,
  //     "Type": 1,
  //     "ParentNodeId": 0,
  //     "Title": "Risk Node",
  //     "Header": "Risk",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>test_SH</dev>",
  //     "RiskData": {
  //       "RiskCode": "OR-81",
  //       "ResponsibleManager": "Anita Raymond2",
  //       "Category": "customer/Reliability",
  //       "ResidualRiskRating": "Low",
  //       "TargetRiskRating": "High",
  //       "InherentRiskRating": "Extreme",
  //       "AppetiteRating": "Within Appetite",
  //       "InherentRiskRatingImg":""
  //     }
  //   },

  //   {
  //     "Id": 1776,
  //     "Type": 3,
  //     "ParentNodeId": 0,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Electrical Test and Tag </dev>",
  //     "ControlData": {
  //       "ControlTitle": "Electrical Test and Tag ",
  //       "ControlOwner": "Owen Drummond",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 1777,
  //     "Type": 3,
  //     "ParentNodeId": 1776,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Mechanical aids</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Mechanical aids",
  //       "ControlOwner": "Owen Drummond",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 1778,
  //     "Type": 3,
  //     "ParentNodeId": 1777,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Emergency procedure drills</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Emergency procedure drills",
  //       "ControlOwner": "Chris Lonergan",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 1779,
  //     "Type": 3,
  //     "ParentNodeId": 1778,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>VINAH reporting guidelines</dev>",
  //     "ControlData": {

  //       "ControlTitle": "VINAH reporting guidelines",
  //       "ControlOwner": "Anne Lawrence",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 6,
  //     "Type": 3,
  //     "ParentNodeId": 1779,
  //     "Title": "Consequences Node",
  //     "Header": "Consequence",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Risk to reputation as a result of media coverage and adverse</dev>",
  //     "LinkedControlIds": [1779,1778,1777,1776,2775]
  //   },
  
  //   {
  //     "Id": 2775,
  //     "Type": 3,
  //     "ParentNodeId": 0,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Falls risk assessment 2775</dev>",
  //     "ControlData": {
  //       "ControlTitle": "Falls risk assessment",
  //       "ControlOwner": "Anita Raymond2",
  //       "ControlOwnerRating": "Strongest",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 2776,
  //     "Type": 3,
  //     "ParentNodeId": 2775,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Cleaning practices</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Cleaning practices",
  //       "ControlOwner": "Michelle Brady",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 2777,
  //     "Type": 3,
  //     "ParentNodeId": 2776,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Drugs and poisons legislation - DPCS </dev>",
  //     "ControlData": {

  //       "ControlTitle": "Drugs and poisons legislation - DPCS ",
  //       "ControlOwner": "Louise McMahon",
  //       "ControlOwnerRating": "Strongest",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     },

  //   },
  //   {
  //     "Id": 2778,
  //     "Type": 3,
  //     "ParentNodeId": 2777,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Procurement Framework</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Procurement Framework",
  //       "ControlOwner": "Owen Drummond",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 67,
  //     "Type": 3,
  //     "ParentNodeId": 2778,
  //     "Title": "Consequences Node",
  //     "Header": "Consequence",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Sustainability innovation and quality of care is affected</dev>",
  //     "LinkedControlIds":[2778,2777,2776,2775]
  //   },
   
  //   {
  //     "Id": 2779,
  //     "Type": 3,
  //     "ParentNodeId": 0,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Uniform and dress code protocol</dev>",
  //     "ControlData": {
  //       "ControlTitle": "Uniform and dress code protocol",
  //       "ControlOwner": "Lee Cochrane",
  //       "ControlOwnerRating": "Moderate",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": false          
        
  //     }
  //   },
    
  //   {
  //     "Id": 2780,
  //     "Type": 3,
  //     "ParentNodeId": 2779,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Hospital Pool Vehicles Protocol</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Hospital Pool Vehicles Protocol",
  //       "ControlOwner": "Michael Glaubitz",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": false
  //     }
  //   },
  //   {
  //     "Id": 2781,
  //     "Type": 3,
  //     "ParentNodeId": 2780,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Emergency Procedures Training</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Emergency Procedures Training",
  //       "ControlOwner": "Chris Lonergan",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": false
  //     }
  //   },
  //   {
  //     "Id": 2782,
  //     "Type": 3,
  //     "ParentNodeId": 2781,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Occupational Violence and Aggression Prevention Protocol</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Occupational Violence and Aggression Prevention Protocol",
  //       "ControlOwner": "Chris Lonergan",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": false
  //     }
  //   },
  //   {
  //     "Id": 2783,
  //     "Type": 2,
  //     "ParentNodeId": 2782,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Continual improvement of electronic discharge summaries</dev>",
  //     "ControlData": {
  //       "ControlTitle": "Continual improvement of electronic discharge summaries",
  //       "ControlOwner": "Adrian Shearer",
  //       "ControlOwnerRating": "Weak",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
   
  //   {
  //     "Id": 2784,
  //     "Type": 2,
  //     "ParentNodeId": 2783,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Development of internal process for the psychological support for patients, staff and families during the time period of the commission.</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Development of internal process for the psychological support for patients, staff and families during the time period of the commission.",
  //       "ControlOwner": "Sebastian Romano",
  //       "ControlOwnerRating": "Moderate",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 2785,
  //     "Type": 2,
  //     "ParentNodeId": 2784,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Senior mental health management forum utilised to monitor Weighted Occupancy Target (WOTs) for bed based services against performance.</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Senior mental health management forum utilised to monitor Weighted Occupancy Target (WOTs) for bed based services against performance.",
  //       "ControlOwner": "Sebastian Romano",
  //       "ControlOwnerRating": "Moderate",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 2786,
  //     "Type": 2,
  //     "ParentNodeId": 2785,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Falls Prevention and Management Policy</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Falls Prevention and Management Policy",
  //       "ControlOwner": "Glenn Boulton",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 165,
  //     "Type": 2,
  //     "ParentNodeId": 2786,
  //     "Title": "Cause Node",
  //     "Header": "Cause",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Adverse findings against LRH as a result of the Mental Healt</dev>",
  //     "LinkedControlIds":[2786,2785,2784,2783]

  //   },
   
    
  //   {
  //     "Id": 2787,
  //     "Type": 2,
  //     "ParentNodeId": 2786,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Uniform and dress code protocol</dev>",
  //     "ControlData": {
  //       "ControlTitle": "Uniform and dress code protocol",
  //       "ControlOwner": "Lee Cochrane",
  //       "ControlOwnerRating": "Moderate",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
   
  //   {
  //     "Id": 2788,
  //     "Type": 2,
  //     "ParentNodeId": 2787,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Hospital Pool Vehicles Protocol</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Hospital Pool Vehicles Protocol",
  //       "ControlOwner": "Michael Glaubitz",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 2789,
  //     "Type": 2,
  //     "ParentNodeId": 2788,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Emergency Procedures Training</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Emergency Procedures Training",
  //       "ControlOwner": "Chris Lonergan",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 2790,
  //     "Type": 2,
  //     "ParentNodeId": 2789,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Occupational Violence and Aggression Prevention Protocol</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Occupational Violence and Aggression Prevention Protocol",
  //       "ControlOwner": "Chris Lonergan",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },

  //   {
  //     "Id": 2791,
  //     "Type": 2,
  //     "ParentNodeId": 2790,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Occupational Violence and Aggression  Protocol</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Occupational Violence and Aggression  Protocol",
  //       "ControlOwner": "Chris Lonergan",
  //       "ControlOwnerRating": "Strong",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": true
  //     }
  //   },
  //   {
  //     "Id": 58,
  //     "Type": 2,
  //     "ParentNodeId": 2791,
  //     "Title": "Cause Node",
  //     "Header": "Cause",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Media coverage of adverse findings against LRH as a resulto</dev>",
  //     "LinkedControlIds":[2790,2789,2788,2787,2791]
  //   },

  //   {
  //     "Id": 644,
  //     "Type": 2,
  //     "ParentNodeId": 0,
  //     "Title": "Cause Node",
  //     "Header": "Cause",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Risk to reputation as a result of media coverage and adverse</dev>",
  //     "LinkedControlIds": [0]
  //   },

  //   {
  //     "Id": 1775,
  //     "Type": 3,
  //     "ParentNodeId": 0,
  //     "Title": "Control Node",
  //     "Header": "Control",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Development of communication strategy to manage internal and external stakeholders.</dev>",
  //     "ControlData": {

  //       "ControlTitle": "Development of communication strategy to manage internal and external stakeholders.",
  //       "ControlOwner": "Sebastian Romano",
  //       "ControlOwnerRating": "Moderate",
  //       "ControlAuthorizer": "",
  //       "ControlAuthorizerRating": "",
  //       "Active": true,
  //       "IsLinkedToCauseOrConsequence": false
  //     }
  //   },

  //   {
  //     "Id": 1,
  //     "Type": 4,
  //     "ParentNodeId": 0,
  //     "Title": "Other Node",
  //     "Header": "Incident",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>IMS - 1</dev>",
  //     "IncidentData": {
  //       "LinkageId": 2,
  //       "IncidentId": 1,
  //       "IncidentTitle": "IMS - 1",
  //       "IncidentCode": "",
  //       "IncidentType": "Test",
  //       "ReportedDate": "Mar 30 2020  9:55PM",
  //       "ResponsiblePerson": "Near Miss",
  //       "ImageType": ""
  //     }
  //   },
  //   {
  //     "Id": 2,
  //     "Type": 4,
  //     "ParentNodeId": 0,
  //     "Title": "Other Node",
  //     "Header": "Incident",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>IMS - 2</dev>",
  //     "IncidentData": {
  //       "LinkageId": 3,
  //       "IncidentId": 2,
  //       "IncidentTitle": "IMS - 2",
  //       "IncidentCode": "",
  //       "IncidentType": "test",
  //       "ReportedDate": "Oct 26 2020  7:04PM",
  //       "ResponsiblePerson": "Hazard",
  //       "ImageType": ""
  //     }
  //   },

  //   {
  //     "Id": 12,
  //     "Type": 4,
  //     "ParentNodeId": 0,
  //     "Title": "Other Node",
  //     "Header": "Kpi",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>% reduction in non-clinically indicated surgery</dev>",
  //     "KpiData":{
  //       "RiskLinkId":2078,
  //       "KpiIntId":12,
  //       "KpiGuidId":"543baf2f-14ea-478e-966a-fb16c4c574a1",
  //       "KPITitle":"% reduction in non-clinically indicated surgery",
  //       "Unit":"#",
  //       "ReportingPeriod":"Month",
  //       "Actual":0.00,
  //       "Target":0.00,
  //       "PerformanceImg":"N/A",
  //       "TrendImg":"Not Applicable"
  //     }
  //   },


  //   {
  //     "Id": 202,
  //     "Type": 4,
  //     "ParentNodeId": 0,
  //     "Title": "Other Node",
  //     "Header": "Kpi",
  //     "Rating": "",
  //     "htmlTemplate": "<dev>Time spent on non-billable projects</dev>",
  //     "KpiData":{
  //       "RiskLinkId":2077,
  //       "KpiIntId":202,
  //       "KpiGuidId":"1d6cfec3-2b88-4dba-bb24-40f08d54352e",
  //       "KPITitle":"Time spent on non-billable projects",
  //       "Unit":"%",
  //       "ReportingPeriod":"Month",
  //       "Actual":0.0,
  //       "Target":0.0,
  //       "PerformanceImg":"N/A",
  //       "TrendImg":"Not Applicable"
  //     }
  //   }

  // ];
}




// class Templates
// {
//   RiskTemplate:string;
//   ControlTemplate:string;
//   ControlTemplateExpand:string;
//   CauseTemplate:string;
//   ConsequenceTemplate:string;
//   BottomNodeTemplates:string;
//   kpiTemplateExpnad:string;
//   IncidentTemplateExpnad:string;
//   ComplianceTemplateExpnad:string;
//   LinkedRiskTemplate: string;
//   RiskActionTemplateExpand:string;
// }
