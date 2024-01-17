import { DiagramNodeData } from 'src/app/models/data.model';
import {
  PerformanceView,
  PerformanceViewKpi,
} from './PerformanceViewComponent ';
import {
  PerformanceStyleGeneral,
  PerformanceStyleKPI,
} from 'src/app/models/PerformanceStyle.model';

export class TemplateClass {
  constructor() { }

  public GetControlNodeTemplateGlobal(
    contentDetails: DiagramNodeData,
    enablePerformanceview: boolean
  ) {
    var stylesForPerformanceView: PerformanceStyleGeneral;
    var perfomanceViewGeneralBodyStyle = null;
    var perfomanceViewGeneralHeaderStyle = null;
    if (enablePerformanceview) {
      const performanceView = new PerformanceView();
      stylesForPerformanceView = performanceView.PerformanceviewDetails(
        contentDetails,
        enablePerformanceview
      );

      perfomanceViewGeneralBodyStyle = stylesForPerformanceView.boadyStyle;
      perfomanceViewGeneralHeaderStyle = stylesForPerformanceView.headerStyle;
    }

    return (
      "<div class='bow-tie-control-card-content rounded' " +
      perfomanceViewGeneralBodyStyle +
      '>' +
      "<div class='bow-tie-control-card-header' " +
      perfomanceViewGeneralHeaderStyle +
      '>' +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-control-card-body' " +
      perfomanceViewGeneralBodyStyle +
      ' >' +
      "<p class='bow-tie-htmlTemplate'  " +
      perfomanceViewGeneralBodyStyle +
      '>\\' +
      contentDetails.htmlTemplate.replace(/#/g, '\\#') +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetBottomCollapesTemplateGlobal(contentDetails: DiagramNodeData,enablePerformanceview: boolean) {

    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    let truncatedHtmlTemplate
     if(contentDetails.Header == "Audit Recommendation" || contentDetails.Header == "Audit Finding" ){
      const maxCharacters = 100;      
       // Truncate the htmlTemplate if it exceeds the maximum number of characters
     truncatedHtmlTemplate = contentDetails.htmlTemplate.length > maxCharacters
      ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
      : contentDetails.htmlTemplate;
     }
     else{
      truncatedHtmlTemplate = contentDetails.htmlTemplate
     }
    enablePerformanceview;
    var perfomanceViewKPIBodyStyle = null;
    var perfomanceViewKPIHeaderStyle = null;
    if (contentDetails.KpiData && contentDetails.KpiData.Performance != undefined) {
      var stylesForPerformanceViewKPI: PerformanceStyleKPI;
      if (enablePerformanceview) {
        const performanceViewKpi = new PerformanceViewKpi();
        stylesForPerformanceViewKPI =
          performanceViewKpi.PerformanceviewDetailsKpi(
            contentDetails,
            enablePerformanceview
          );

        perfomanceViewKPIBodyStyle = stylesForPerformanceViewKPI.boadyStyleKPI;
        perfomanceViewKPIHeaderStyle =
          stylesForPerformanceViewKPI.headerStyleKPI;
      }
    }

    return (
      "<div class='Bow-tie-BottomCollapes-card-content rounded'" +
      perfomanceViewKPIBodyStyle +
      '>' +
      "<div class='Bow-tie-BottomCollapes-card-header'" +
      perfomanceViewKPIHeaderStyle +
      '>' +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='Bow-tie-BottomCollapes-card-body'" +
      perfomanceViewKPIBodyStyle +
      '>' +
      "<p class='bow-tie-htmlTemplate'" +
      perfomanceViewKPIBodyStyle +
      '>\\' +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetConsequencesTemplateGlobal(contentDetails: DiagramNodeData) {
    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
      "<div class='bow-tie-cause-card-header'>" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body'>\\" +
      '<p>' +
      contentDetails.htmlTemplate.replace(/#/g, '\\#') +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetCauseTemplateGlobal(contentDetails: DiagramNodeData) {
    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
      "<div class='bow-tie-cause-card-header'>" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body' >\\" +
      '<p>' +
      contentDetails.htmlTemplate.replace(/#/g, '\\#') +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetRiskNodeTemplateGlobal(contentDetails: DiagramNodeData) {

    
    contentDetails.RiskData.InherentRiskRatingImg = contentDetails.RiskData.InherentRiskRating == '' || contentDetails.RiskData.InherentRiskRating === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;": contentDetails.RiskData.InherentRiskRatingImg.changingThisBreaksApplicationSecurity;
    contentDetails.RiskData.AppetiteRatingImg =
      contentDetails.RiskData.AppetiteRating == '' ||
        contentDetails.RiskData.AppetiteRating === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;"
        : contentDetails.RiskData.AppetiteRatingImg
          .changingThisBreaksApplicationSecurity;
    contentDetails.RiskData.ResidualRiskRatingImg =
      contentDetails.RiskData.ResidualRiskRating == '' ||
        contentDetails.RiskData.ResidualRiskRating === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;"
        : contentDetails.RiskData.ResidualRiskRatingImg
          .changingThisBreaksApplicationSecurity;
    contentDetails.RiskData.TargetRiskRatingImg =
      contentDetails.RiskData.TargetRiskRating == '' ||
        contentDetails.RiskData.TargetRiskRating === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;"
        : contentDetails.RiskData.TargetRiskRatingImg
          .changingThisBreaksApplicationSecurity;

    contentDetails.RiskData.InherentRiskRating =
      contentDetails.RiskData.InherentRiskRating == '' ||
        contentDetails.RiskData.InherentRiskRating === undefined
        ? 'N/A'
        : contentDetails.RiskData.InherentRiskRating;
    contentDetails.RiskData.AppetiteRating =
      contentDetails.RiskData.AppetiteRating == '' ||
        contentDetails.RiskData.AppetiteRating === undefined
        ? 'N/A'
        : contentDetails.RiskData.AppetiteRating;
    contentDetails.RiskData.ResidualRiskRating =
      contentDetails.RiskData.ResidualRiskRating == '' ||
        contentDetails.RiskData.ResidualRiskRating === undefined
        ? 'N/A'
        : contentDetails.RiskData.ResidualRiskRating;
    contentDetails.RiskData.TargetRiskRating =
      contentDetails.RiskData.TargetRiskRating == '' ||
        contentDetails.RiskData.TargetRiskRating === undefined
        ? 'N/A'
        : contentDetails.RiskData.TargetRiskRating;

    return (
      "<div class='bow-tie-risk-card-content rounded'>" +
      "<div class='bow-tie-risk-card-header-top' >" +
      "<p class='bow-tie-risk-card-header-top-text'>" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-risk-card-header'>" +
      "<p class='bow-tie-risk-card-header-text'>\\" +
      contentDetails.RiskData.RiskCode +
      '-' +
      contentDetails.htmlTemplate.replace(/#/g, '\\#') +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-risk-card-body'>" +
      "<div class='row'>" +
      "<div class='column'>" +
      "<p class ='ratings'> Inherent Rating </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.RiskData.InherentRiskRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.RiskData.InherentRiskRating +
      '</span>' +
      '</p>' +
      '</div>' +
      "<div class='column'>" +
      "<p class ='ratings'> Revised Rating  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.RiskData.ResidualRiskRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.RiskData.ResidualRiskRating +
      '</span>' +
      '</p>' +
      '</div>' +
      '</div>' +
      "<div class='row'>" +
      "<div class='column'>" +
      "<p class ='ratings'>Future Rating</p>" +
      "<p  class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.RiskData.TargetRiskRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.RiskData.TargetRiskRating +
      '</span>' +
      '</p>' +
      '</div>' +
      "<div class='column'>" +
      "<p class ='ratings'> Risk Appetite  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.RiskData.AppetiteRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.RiskData.AppetiteRating +
      '</span>' +
      '</p>' +
      '</div>' +
      '</div>' +
      "<div class='bow-tie-risk-card-footer'>" +
      "<div class='row'>" +
      "<div class='bow-tie-risk-footer-details'>" +
      "<p class ='ratings'>Risk Category</p>" +
      "<p class= 'bow-tie-risk-category'>" +
      contentDetails.RiskData.Category +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-risk-footer-details-responsible'>" +
      "<p class='bow-tie-risk-responsible-manager'> Responsible Manager  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.RiskData.profileImageUrl
        .changingThisBreaksApplicationSecurity
        .changingThisBreaksApplicationSecurity +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.RiskData.ResponsibleManager +
      '</span>' +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  public GetControlNodeTemplateGlobalExpand(
    contentDetails: DiagramNodeData,
    enablePerformanceview: boolean
  ) {

    contentDetails.ControlData.ControlOwnerRatingImage = contentDetails.ControlData.ControlOwnerRatingImage == '' 
    || contentDetails.ControlData.ControlOwnerRatingImage === undefined
    ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;":
     contentDetails.ControlData.ControlOwnerRatingImage.changingThisBreaksApplicationSecurity;

     
    var stylesForPerformanceView: PerformanceStyleGeneral;

    var perfomanceViewGeneralBodyStyle = null;
    var perfomanceViewGeneralHeaderStyle = null;

    if (enablePerformanceview) {
      const performanceView = new PerformanceView();
      stylesForPerformanceView = performanceView.PerformanceviewDetails(
        contentDetails,
        enablePerformanceview
      );
      perfomanceViewGeneralBodyStyle = stylesForPerformanceView.boadyStyle;
      perfomanceViewGeneralHeaderStyle = stylesForPerformanceView.headerStyle;
    }

    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;

    return (
      "<div class='bow-tie-expand-card-content rounded'" +
      perfomanceViewGeneralBodyStyle +
      ' >' +
      "<div class='bow-tie-control-card-header' " +
      perfomanceViewGeneralHeaderStyle +
      ' >' +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body' " +
      perfomanceViewGeneralBodyStyle +
      '>' +
      "<p class='bow-tie-htmlTemplate'  " +
      perfomanceViewGeneralBodyStyle +
      '>\\' +
      truncatedHtmlTemplate +
      '</p>' +
      "<p class='bow-tie-control-type-details'>" +
        "<span class='bow-tie-type-name' " +
        perfomanceViewGeneralBodyStyle +
        '>' +
          'Control Type' +
        '</span>' +
        "<p class='bow-tie-type-text' " +
          perfomanceViewGeneralBodyStyle +
          '>' +
          contentDetails.ControlData.ControlType +
        '</p>' +
      '</p>' +
      "<p class='bow-tie-control-owner' " +
      perfomanceViewGeneralBodyStyle +
      '>Control Owner</p>' +
      "<p class='bow-tie-control-owner-details' " +
      perfomanceViewGeneralBodyStyle +
      '>' +
      "<img class ='bow-tie-owner-image'" +
      "src='" +
      contentDetails.ControlData.ControlOwnerImageUrl
        .changingThisBreaksApplicationSecurity +
      "'" +
      "<span class='bow-tie-owner-name'>" +
      contentDetails.ControlData.ControlOwner +
      '</span>' +
      '</p>' +
      "<p class='bow-tie-control-owner-rating' " +
      perfomanceViewGeneralBodyStyle +
      '>' +
      'Control Owner Rating' +
      "<p class='bow-tie-control-owner-rating-details' " +
      perfomanceViewGeneralBodyStyle +
      '>' +
      "<img class='bow-tie-control-owner-rating-icon'" +
      "src='" +
      contentDetails.ControlData.ControlOwnerRatingImage +
      "'" +
      "<span class='bow-tie-control-owner-rating-name'>" +
      contentDetails.ControlData.ControlOwnerRating +
      '</span>' +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetLinkRiskNodeTemplateGlobal(contentDetails: DiagramNodeData) {
    contentDetails.LinkedRiskData.InherentRiskRatingImg =
      contentDetails.LinkedRiskData.InherentRiskRating == '' ||
        contentDetails.LinkedRiskData.InherentRiskRating === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;"
        : contentDetails.LinkedRiskData.InherentRiskRatingImg
          .changingThisBreaksApplicationSecurity;
    contentDetails.LinkedRiskData.AppetiteRatingImg =
      contentDetails.LinkedRiskData.AppetiteRating == '' ||
        contentDetails.LinkedRiskData.AppetiteRating === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;"
        : contentDetails.LinkedRiskData.AppetiteRatingImg
          .changingThisBreaksApplicationSecurity;
    contentDetails.LinkedRiskData.ResidualRiskRatingImg =
      contentDetails.LinkedRiskData.ResidualRiskRating == '' ||
        contentDetails.LinkedRiskData.ResidualRiskRating === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;"
        : contentDetails.LinkedRiskData.ResidualRiskRatingImg
          .changingThisBreaksApplicationSecurity;
    contentDetails.LinkedRiskData.TargetRiskRatingImg =
      contentDetails.LinkedRiskData.TargetRiskRating == '' ||
        contentDetails.LinkedRiskData.TargetRiskRating === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 50px; height: 50px;"
        : contentDetails.LinkedRiskData.TargetRiskRatingImg
          .changingThisBreaksApplicationSecurity;

    contentDetails.LinkedRiskData.InherentRiskRating =
      contentDetails.LinkedRiskData.InherentRiskRating == '' ||
        contentDetails.LinkedRiskData.InherentRiskRating === undefined
        ? 'N/A'
        : contentDetails.LinkedRiskData.InherentRiskRating;
    contentDetails.LinkedRiskData.AppetiteRating =
      contentDetails.LinkedRiskData.AppetiteRating == '' ||
        contentDetails.LinkedRiskData.AppetiteRating === undefined
        ? 'N/A'
        : contentDetails.LinkedRiskData.AppetiteRating;
    contentDetails.LinkedRiskData.ResidualRiskRating =
      contentDetails.LinkedRiskData.ResidualRiskRating == '' ||
        contentDetails.LinkedRiskData.ResidualRiskRating === undefined
        ? 'N/A'
        : contentDetails.LinkedRiskData.ResidualRiskRating;
    contentDetails.LinkedRiskData.TargetRiskRating =
      contentDetails.LinkedRiskData.TargetRiskRating == '' ||
        contentDetails.LinkedRiskData.TargetRiskRating === undefined
        ? 'N/A'
        : contentDetails.LinkedRiskData.TargetRiskRating;

    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;
    return (
      "<div class='bow-tie-risk-card-content-expand rounded' >" +
      "<div class='bow-tie-risk-card-header-top-expand' >" +
      "<p class='bow-tie-risk-card-header-top-text'>" +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-risk-card-header-expand'>" +
      "<p class='bow-tie-risk-card-header-text-expand'>\\" +
      contentDetails.LinkedRiskData.RiskCode +
      '-' +
      truncatedHtmlTemplate +
      '   </p> ' +
      '</div>' +
      "<div class='bow-tie-risk-card-body-expand'>" +
      "<div class='row'>" +
      "<div class='column'>" +
      "<p class='ratings'> Inherent Rating  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.LinkedRiskData.InherentRiskRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.LinkedRiskData.InherentRiskRating +
      '</span>' +
      '</p>' +
      '</div>' +
      "<div class='column'>" +
      "<p class='ratings'> Revised Rating  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.LinkedRiskData.ResidualRiskRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.LinkedRiskData.ResidualRiskRating +
      '</span>' +
      '</p>' +
      '</div>' +
      '</div>' +
      "<div class='row'>" +
      "<div class='column'>" +
      "<p class='ratings'> Future Rating  </p>" +
      "<p  class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.LinkedRiskData.TargetRiskRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.LinkedRiskData.TargetRiskRating +
      '</span>' +
      '</p>' +
      '</div>' +
      "<div class='column'>" +
      "<p class='ratings'> Risk Appetite  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.LinkedRiskData.AppetiteRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.LinkedRiskData.AppetiteRating +
      '</span>' +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      "<div class='bow-tie-risk-card-footer-expand'>" +
      "<div class='row'>" +
      "<div class='bow-tie-risk-footer-details'>" +
      "<p class='ratings'> Risk Category  </p>" +
      "<p class= 'bow-tie-risk-category'>" +
      contentDetails.LinkedRiskData.Category +
      '</p>' +
      '</div>' +
      "<div class='bow-tie-risk-footer-details-responsible'>" +
      "<p class='ratings'> Responsible Manager  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.LinkedRiskData.profileImageUrl
        .changingThisBreaksApplicationSecurity +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.LinkedRiskData.ResponsibleManager +
      '</span>' +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  public GetRiskActionTreatmentExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;
    // Calculate the percentage completion
    const completePercentage = contentDetails.TreatmentData.TreatmentPercentageComplete;

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '<p>' +
      "<p class='bow-tie-expand-reported-date-time' style='margin-top: 10px;'>" +
      "Due Date" +
      "<p class='bow-tie-expand-reported-date'>" +
      contentDetails.TreatmentData.TreatmentEndDate +
      "</p>" +
      "</p>" +
      "<p class='bow-tie-expand-responsible-officer-incident'>Owner</p>" +
      "<p class='bow-tie-expand-responsible-officer-details'>" +
      "<img class='bow-tie-expand-responsible-officer-image'" +
      "src='" +
      contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic.changingThisBreaksApplicationSecurity.changingThisBreaksApplicationSecurity +
      "'" +
      "<span class='bow-tie-expand-responsible-officer-name'>" +
      contentDetails.TreatmentData.TreatmentResponsibleOfficer +
      "</span>" +
      "</p>" +
      "<p class='bow-tie-text-values'>" +
      "Complete" +
      "<div class='bow-tie-treatment-complete'>" +
        `<span class='progress' style='display: inline-block;'>` +
          `<div class='progress-bar' role='progressbar' style='width: ${completePercentage}%;' aria-valuenow='${completePercentage}'></div>` +
        `</span>` +
        "<span class = 'bow-tie-treatment-complete-value'>" + `${completePercentage}%` + "</span>" +
      "</div>" +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  public GetIncidentExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;
    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '<p>' +
      "<p class='bow-tie-expand-reportedby' >Reported By</p>" +
      "<p class='bow-tie-responsible-officer'>" +
      "<img class='bow-tie-owner-image'" +
      "src='" +
      contentDetails.IncidentData.ReportedOfficerImageUrl
        .changingThisBreaksApplicationSecurity +
      "'" +
      "<span class='bow-tie-owner-name'>" +
      contentDetails.IncidentData.ReportedOfficerName +
      '</span>' +
      '</p>' +
      "<p class='bow-tie-expand-responsible-officer'>Responsible Officer</p>" +
      "<p class='bow-tie-expand-responsible-officer-details'>" +
      "<img class='bow-tie-expand-responsible-officer-image'" +
      "src='" +
      contentDetails.IncidentData.ResponsibleManagerProfilePic
        .changingThisBreaksApplicationSecurity
        .changingThisBreaksApplicationSecurity +
      "'" +
      "<span class='bow-tie-expand-responsible-officer-name'>" +
      contentDetails.IncidentData.ResponsiblePerson +
      '</span>' +
      '</p>' +
      "<p class='bow-tie-expand-reported-date-time'>" +
      'Reported Date/Time' +
      "<p class='bow-tie-expand-reported-date'>" +
      contentDetails.IncidentData.ReportedDate +
      '</p>' +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetComplianceObligationExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;
    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header'>" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body'>" +
      "<p class='bow-tie-htmlTemplate'>'\\" +
      truncatedHtmlTemplate +
      '<p>' +
      "<p class='bow-tie-expand-reportedby' >Obligation Owner</p>" +
      "<p class='bow-tie-responsible-officer'>" +
      "<img class='bow-tie-owner-image'" +
      "src='" +
      contentDetails.ComplianceData.ROImage
        .changingThisBreaksApplicationSecurity +
      "'" +
      "<span class='bow-tie-owner-name'>" +
      contentDetails.ComplianceData.ResponsibleOfficer +
      '  ' +
      '</span>' +
      '</p>' +
      "<p class='bow-tie-compliance-status'>" +
      'Compliance Status' +
      "<p class='bow-tie-expand-reported-date'>" +
      contentDetails.ComplianceData?.ReviewStatus +
      '  ' +
      '</p>' +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetKPIExpand(
    contentDetails: DiagramNodeData,
    enablePerformanceview: boolean
  ) {
    var stylesForPerformanceView: PerformanceStyleKPI;
    var perfomanceViewKPIBodyStyle = null;
    var perfomanceViewKPIHeaderStyle = null;

    if (enablePerformanceview) {
      const performanceViewKpi = new PerformanceViewKpi();
      stylesForPerformanceView = performanceViewKpi.PerformanceviewDetailsKpi(
        contentDetails,
        enablePerformanceview
      );
      perfomanceViewKPIBodyStyle = stylesForPerformanceView.boadyStyleKPI;
      perfomanceViewKPIHeaderStyle = stylesForPerformanceView.headerStyleKPI;


    }

    contentDetails.KpiData.Actual != null ? contentDetails.KpiData.Actual : 0;
    contentDetails.KpiData.Target != null ? contentDetails.KpiData.Target : 0;

    var currentIndicator: string;

    if (contentDetails.KpiData.Performance === 'N/A') {
      currentIndicator = 'na-badge';
    } else if (contentDetails.KpiData.Performance === 'On Track') {
      currentIndicator = 'onTrack-badge';
    } else if (contentDetails.KpiData.Performance === 'Off Track') {
      currentIndicator = 'offTrack-badge';
    } else if (contentDetails.KpiData.Performance === 'Monitor') {
      currentIndicator = 'monitor-badge';
    } else {
      currentIndicator = 'na-badge';
    }

    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;
    return (
      "<div class='bow-tie-expand-card-content rounded' " +
      perfomanceViewKPIBodyStyle +
      '>' +
      "<div class='bow-tie-expand-card-header' " +
      perfomanceViewKPIHeaderStyle +
      '>' +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body'" +
      perfomanceViewKPIBodyStyle +
      ' >' +
      "<p class='bow-tie-htmlTemplate' " +
      perfomanceViewKPIBodyStyle +
      '>\\' +
      truncatedHtmlTemplate +
      ' </p>' +
      "<div class='bow-tie-performance-flex'>" +        
        `<span id='performanceIndicator' class='performanceIndicator-badge ${currentIndicator}'></span>` +
        `<span class="bow-tie-performance-rating">${contentDetails.KpiData.Performance ?? 'NotAvailable'
        }</span>` +
      '</div>' +
      "<div class='bow-tie-kpi'>" +
          "<div class='bow-tie-unit-flex'>" +
            "<span class='bow-tie-unit-text'" +
              perfomanceViewKPIBodyStyle +
              '>' +
              ' Unit  ' +
            '</span>' +
            "<span class='bow-tie-unit-symbol'>\\" +
            contentDetails.KpiData.Unit +
            '</span>' +
          '</div>' +
        '</div>' +
        "<div class='bow-tie-unit-details' >" +
          "<div class='bow-tie-actual-flex'>" +
            "<span class='bow-tie-actual-text'" +
              perfomanceViewKPIBodyStyle +
            '>' +
            ' Actual  ' +
            '</span>' +
            "<span class='bow-tie-actual-value'>" +
            contentDetails.KpiData.Actual +
            '</span>' +
          '</div>' +
          "<div class='bow-tie-target-flex'>" +
            "<span class='bow-tie-target-text'" +
              perfomanceViewKPIBodyStyle +
            '>' +
            ' Target  ' +
            '</span>' +
            "<span class='bow-tie-target-value'>" +
              contentDetails.KpiData.Target +
            '</span>' +
          '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  public GetAuditExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;
    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '</p>' +
      "<p class='bow-tie-expand-reported-date-time'>" +
      'Audit Date' +
      "<p class='bow-tie-expand-reported-date'>" +
      contentDetails.AuditData.AuditDate +
      '  ' +
      '</p>' +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetHierarchyExpand(contentDetails: DiagramNodeData) {   
    return (
      "<div class='bow-tie-expand-card-content rounded'>" +
        "<div class='bow-tie-expand-card-header'>" +
          '<span>' +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          '</span>' +
        '</div>' +
        "<div class='bow-tie-expand-card-body' >" +
          "<p class='bow-tie-htmlTemplate'>" +
            contentDetails.HierarchyData.expandedString +
          '</p>' +
        '</div>' +
      '</div>'
    );
  }

  public GetAuthorityDocumentExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;
    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
        "<div class='bow-tie-expand-card-header'>" +
          '<span>' +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          '</span>' +
        '</div>' +
        "<div class='bow-tie-expand-card-body'>" +
          "<p class='bow-tie-htmlTemplate'>\\" +
            truncatedHtmlTemplate +
          '<p>' +
            "<p class='bow-tie-authority-document-type' " +
            '>' +
              'Type' +
              "<p class='bow-tie-expand-authority-document-type-text' " +
              '>' +
              contentDetails.AuthorityDocumentData.AuthorityDocumentType +
            '</p>' +
          '</p>' +
          "<p class='bow-tie-authority-expand-responsible-officer'>Responsible Officer</p>" +
          "<p class='bow-tie-expand-responsible-officer-details'>" +
            "<img class='bow-tie-expand-responsible-officer-image'" +
            "src='" +
            contentDetails.AuthorityDocumentData.ROImage
              .changingThisBreaksApplicationSecurity +
            "'" +
            "<span class='bow-tie-expand-responsible-officer-name'>" +
             contentDetails.AuthorityDocumentData.ResponsibleOfficer +
              '  ' +
            '</span>' +
          '</p>' +
        '</div>' +
      '</div>'
    );
  }

  public GetPolicyExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;
    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '</p>' +
      '<p>' +
          "<p class='bow-tie-authority-document-type' " +
          '>' +
            'Type' +
            "<p class='bow-tie-expand-authority-document-type-text' " +
            '>' +
            contentDetails.PolicyData.IncidentTypeName +
          '</p>' +
        '</p>' +
        "<p class='bow-tie-authority-expand-responsible-officer'>Responsible Officer</p>" +
        "<p class='bow-tie-expand-responsible-officer-details'>" +
          "<img class='bow-tie-expand-responsible-officer-image'" +
          "src='" +
          contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic
            .changingThisBreaksApplicationSecurity.changingThisBreaksApplicationSecurity +
          "'" +
          "<span class='bow-tie-expand-responsible-officer-name'>" +
            contentDetails.PolicyData.ResponsiblePerson+
            '  ' +
          '</span>' +
        '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetAuditRecommendationsExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
   
    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header'>" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      contentDetails.htmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetAuditFindingExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 80;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    
    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body' >" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      contentDetails.htmlTemplate  +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }




  public AddTemplatesToNode(dataItem,templatesObj,isExpand,isPerformanceView,isKpIview,isRiskView,renderElement) 
  {
    switch (dataItem.Header) {
      case 'Risk':
        templatesObj.riskTemplate = this.GetRiskNodeTemplateGlobal(dataItem);
        sessionStorage.setItem('riskTemplate', templatesObj.riskTemplate);
        break;
      case 'Control':
        templatesObj.controlTemplate = this.GetControlNodeTemplateGlobal(dataItem, isPerformanceView);
        templatesObj.controlTemplateExpand = this.GetControlNodeTemplateGlobalExpand(dataItem, isPerformanceView);
        sessionStorage.setItem('controlTemplate', templatesObj.controlTemplate);
        sessionStorage.setItem('controlExpandTemplate', templatesObj.controlTemplateExpand);
        break;
      case 'Cause':
        templatesObj.causeTemplate = this.GetCauseTemplateGlobal(dataItem);
        sessionStorage.setItem('causeTemplate', templatesObj.causeTemplate);
        break;
      case 'Consequence':
        templatesObj.consequencesTemplate = this.GetConsequencesTemplateGlobal(dataItem);
        sessionStorage.setItem('consequencesTemplate', templatesObj.consequencesTemplate);
        break;
      case 'Incident':
        templatesObj.incidentTemplateExpnad = this.GetIncidentExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('Incident', templatesObj.incidentTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      case 'KPI':
        templatesObj.kpiTemplateExpnad = this.GetKPIExpand(dataItem, isPerformanceView);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('KPI', templatesObj.kpiTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      case 'Linked Risk':
        templatesObj.linkRiskTemplate = this.GetLinkRiskNodeTemplateGlobal(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('Linked Risk', templatesObj.linkRiskTemplate);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      case 'Treatment':
        templatesObj.riskActionTemplateExpand = this.GetRiskActionTreatmentExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('Treatment', templatesObj.riskActionTemplateExpand);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      case 'Obligation':
        templatesObj.complianceTemplateExpnad = this.GetComplianceObligationExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('Obligation', templatesObj.complianceTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      case 'Authority Document':
        templatesObj.authorityDocumentTemplateExpnad = this.GetAuthorityDocumentExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('Authority Document', templatesObj.authorityDocumentTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
      case 'Audit':
        templatesObj.auditTemplateExpnad = this.GetAuditExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
        sessionStorage.setItem('Audit', templatesObj.auditTemplateExpnad);
        sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
        break;
        case "Hierarchy":
          templatesObj.hierarchyTemplate = this.GetHierarchyExpand(dataItem);
          templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
          sessionStorage.setItem('Hierarchy', templatesObj.hierarchyTemplate);
          sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
          break;
        case "Audit Recommendation":
          templatesObj.auditRecommendationTemplate = this.GetAuditRecommendationsExpand(dataItem);
          templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
          sessionStorage.setItem('Audit Recommendation', templatesObj.auditRecommendationTemplate);
          sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
          break;
        case "Audit Finding":
          templatesObj.auditFindingTemplate = this.GetAuditFindingExpand(dataItem);
          templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
          sessionStorage.setItem('Audit Finding', templatesObj.auditFindingTemplate);
          sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
          break;
        case "Policy":
          templatesObj.PolicyTemplate = this.GetPolicyExpand(dataItem);
          templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);
          sessionStorage.setItem('Policy', templatesObj.PolicyTemplate);
          sessionStorage.setItem('otherTemplate', templatesObj.bottomTemplate);
          break;
      default:
    }

    if (isRiskView) {
      isKpIview = false;
      if (isExpand) {
        if (dataItem.Header === 'Linked Risk') {
          var linkRiskBottomTemp = kendo.template(templatesObj.linkRiskTemplate);
          renderElement.html(linkRiskBottomTemp(dataItem));
        }
      } else {
        if (dataItem.Header === 'Linked Risk') {
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
          if (dataItem.Header === 'Linked Risk') {
            var linkRiskBottomTemp = kendo.template(templatesObj.linkRiskTemplate);
            renderElement.html(linkRiskBottomTemp(dataItem));
          } else if (dataItem.Header === 'Treatment') {
            var riskActionExpandTemp = kendo.template(templatesObj.riskActionTemplateExpand);
            renderElement.html(riskActionExpandTemp(dataItem));
          } else if (dataItem.Header === 'Incident') {
            var incidentExpandTemp = kendo.template(templatesObj.incidentTemplateExpnad);
            renderElement.html(incidentExpandTemp(dataItem));
          } else if (dataItem.Header === 'KPI') {
            var KPIExpandTemp = kendo.template(templatesObj.kpiTemplateExpnad);
            renderElement.html(KPIExpandTemp(dataItem));
          } else if (dataItem.Header === 'Obligation') {
            var complianceExpandTemp = kendo.template(templatesObj.complianceTemplateExpnad);
            renderElement.html(complianceExpandTemp(dataItem));
          } else if (dataItem.Header === 'Authority Document') {
            var authorityDocumentExpandTemp = kendo.template(templatesObj.authorityDocumentTemplateExpnad);
            renderElement.html(authorityDocumentExpandTemp(dataItem));
          } else if (dataItem.Header === 'Audit') {
            var auditDocumentExpandTemp = kendo.template(templatesObj.auditTemplateExpnad);
            renderElement.html(auditDocumentExpandTemp(dataItem));
          }else if (dataItem.Header === 'Hierarchy') {
            var HierarchyExpandTemp = kendo.template(templatesObj.hierarchyTemplate);
            renderElement.html(HierarchyExpandTemp(dataItem));
          }else if (dataItem.Header === 'Audit Recommendation') {
            var AuditRecommendationExpandTemp = kendo.template(templatesObj.auditRecommendationTemplate);
            renderElement.html(AuditRecommendationExpandTemp(dataItem));
          }else if (dataItem.Header === 'Audit Finding') {
            var AuditFindingExpandTemp = kendo.template(templatesObj.auditFindingTemplate);
            renderElement.html(AuditFindingExpandTemp(dataItem));
          }else if (dataItem.Header === 'Policy') {
            var PolicyyExpandTemp = kendo.template(templatesObj.PolicyTemplate);
            renderElement.html(PolicyyExpandTemp(dataItem));
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
          var consequencesTemp = kendo.template(
            templatesObj.consequencesTemplate
          );
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






}
