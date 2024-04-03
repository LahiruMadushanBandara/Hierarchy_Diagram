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

    const maxCharacters = 100;
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
      truncatedHtmlTemplate+
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
    const maxCharacters = 100;  
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;


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
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    const maxCharacters = 100;  
    const truncatedHtmlTemplate =
    contentDetails.htmlTemplate.length > maxCharacters
      ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
      : contentDetails.htmlTemplate;

    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
      "<div class='bow-tie-cause-card-header'>" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body'>\\" +
      '<p>' +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetCauseTemplateGlobal(contentDetails: DiagramNodeData) {
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    const maxCharacters = 100;  
    const truncatedHtmlTemplate =
    contentDetails.htmlTemplate.length > maxCharacters
      ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
      : contentDetails.htmlTemplate;
    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
      "<div class='bow-tie-cause-card-header'>" +
      '<span>' +
      (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body' >\\" +
      '<p>' +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetRiskNodeTemplateGlobal(contentDetails: DiagramNodeData) { 
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
    const maxCharacters = 100;  
    const truncatedHtmlTemplate =
    contentDetails.htmlTemplate.length > maxCharacters
      ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
      : contentDetails.htmlTemplate;

    contentDetails.RiskData.InherentRiskRatingImg =
      contentDetails.RiskData.InherentRiskRating == '' || contentDetails.RiskData.InherentRiskRating === undefined ||
      contentDetails.RiskData.InherentRiskRatingImg == '' || contentDetails.RiskData.InherentRiskRatingImg === undefined
      ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
      : contentDetails.RiskData.InherentRiskRatingImg.changingThisBreaksApplicationSecurity;

    contentDetails.RiskData.AppetiteRatingImg =
      contentDetails.RiskData.AppetiteRating == '' || contentDetails.RiskData.AppetiteRating === undefined ||
      contentDetails.RiskData.AppetiteRatingImg == '' || contentDetails.RiskData.AppetiteRatingImg === undefined
      ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
      : contentDetails.RiskData.AppetiteRatingImg.changingThisBreaksApplicationSecurity;

    contentDetails.RiskData.ResidualRiskRatingImg =
      contentDetails.RiskData.ResidualRiskRating == '' || contentDetails.RiskData.ResidualRiskRating === undefined ||
      contentDetails.RiskData.ResidualRiskRatingImg == '' || contentDetails.RiskData.ResidualRiskRatingImg === undefined
      ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
      : contentDetails.RiskData.ResidualRiskRatingImg.changingThisBreaksApplicationSecurity;

    contentDetails.RiskData.TargetRiskRatingImg =
      contentDetails.RiskData.TargetRiskRating == '' || contentDetails.RiskData.TargetRiskRating === undefined ||
      contentDetails.RiskData.TargetRiskRatingImg == '' || contentDetails.RiskData.TargetRiskRatingImg === undefined
      ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
      : contentDetails.RiskData.TargetRiskRatingImg.changingThisBreaksApplicationSecurity;

    contentDetails.RiskData.InherentRiskRating = contentDetails.RiskData.InherentRiskRating == '' || contentDetails.RiskData.InherentRiskRating === undefined
      ? 'N/A' : contentDetails.RiskData.InherentRiskRating;

    contentDetails.RiskData.AppetiteRating = contentDetails.RiskData.AppetiteRating == '' || contentDetails.RiskData.AppetiteRating === undefined
      ? 'N/A' : contentDetails.RiskData.AppetiteRating;

    contentDetails.RiskData.ResidualRiskRating = contentDetails.RiskData.ResidualRiskRating == '' || contentDetails.RiskData.ResidualRiskRating === undefined
      ? 'N/A' : contentDetails.RiskData.ResidualRiskRating;

    contentDetails.RiskData.TargetRiskRating = contentDetails.RiskData.TargetRiskRating == '' || contentDetails.RiskData.TargetRiskRating === undefined
      ? 'N/A' : contentDetails.RiskData.TargetRiskRating;


    var riskAppetite =
      "<div class='column'>" +
      "<p class ='ratings'> Risk Appetite  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.RiskData.AppetiteRatingImg +
      "'" +
      "<p class='bow-tie-risk-rating-details-text' >" +
      contentDetails.RiskData.AppetiteRating +
      '<br>' + contentDetails.RiskData.AppetiteRiskRatingScore +
      '</p>' +
      '</p>' +
      '</div>';

    riskAppetite = contentDetails.RiskData.IsEnableRiskAppetite == "true"
      ? riskAppetite
      : "";
    
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
        ' ' +
        truncatedHtmlTemplate +
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
                "< class='bow-tie-risk-rating-details-text'>" +
                contentDetails.RiskData.InherentRiskRating +
                '<br>' + contentDetails.RiskData.InherentRiskRatingScore +
                '</p>' +
              '</p>' +
            '</div>' +
            "<div class='column'>" +
              "<p class ='ratings'> Revised Rating  </p>" +
              "<p class='bow-tie-risk-rating-details'>" +
                "<img class='bow-tie-risk-rating-details-image'" +
                "src='" +
                contentDetails.RiskData.ResidualRiskRatingImg +
                "'" +
                "<p class='bow-tie-risk-rating-details-text'>" +
                contentDetails.RiskData.ResidualRiskRating +
                '<br>' + contentDetails.RiskData.ResidualRiskRatingScore +
                '</p>' +
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
              "<p class='bow-tie-risk-rating-details-text'>" +
              contentDetails.RiskData.TargetRiskRating +
              '<br>' + contentDetails.RiskData.TargetRiskRatingScore +
              '</p>' +
              '</p>' +
            '</div>' +
              riskAppetite +
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
                "<p class='bow-tie-risk-rating-details-text'>" +
                  contentDetails.RiskData.ResponsibleManager +
                '</p>' +
                '</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
      
    );
  }

  public GetControlNodeTemplateGlobalExpand(
    contentDetails: DiagramNodeData,
    enablePerformanceview: boolean
  ) {

    contentDetails.ControlData.ControlOwnerRatingImage = 
      contentDetails.ControlData.ControlOwnerRatingImage == '' || contentDetails.ControlData.ControlOwnerRatingImage === undefined ||
      contentDetails.ControlData.ControlOwnerRating == '' || contentDetails.ControlData.ControlOwnerRating === undefined
      ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;":
      contentDetails.ControlData.ControlOwnerRatingImage.changingThisBreaksApplicationSecurity;

    contentDetails.ControlData.ControlOwnerRating = contentDetails.ControlData.ControlOwnerRating == '' || contentDetails.ControlData.ControlOwnerRating === undefined
      ? 'N/A' : contentDetails.ControlData.ControlOwnerRating;

    contentDetails.ControlData.ControlOwnerImageUrl = 
      contentDetails.ControlData.ControlOwnerImageUrl == '' || contentDetails.ControlData.ControlOwnerImageUrl === undefined ||
      contentDetails.ControlData.ControlOwner == '' || contentDetails.ControlData.ControlOwner === undefined
      ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;":
      contentDetails.ControlData.ControlOwnerImageUrl.changingThisBreaksApplicationSecurity;

    contentDetails.ControlData.ControlOwner = contentDetails.ControlData.ControlOwner == '' || contentDetails.ControlData.ControlOwner === undefined
      ? 'N/A' : contentDetails.ControlData.ControlOwner;

      


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

    const maxCharacters = 100;
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
        "<div class='bow-tie-control-expand-card-body' " +
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
          contentDetails.ControlData.ControlOwnerImageUrl +        
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
      contentDetails.LinkedRiskData.InherentRiskRating == '' || contentDetails.LinkedRiskData.InherentRiskRating === undefined ||
      contentDetails.LinkedRiskData.InherentRiskRatingImg == '' || contentDetails.LinkedRiskData.InherentRiskRatingImg === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.LinkedRiskData.InherentRiskRatingImg.changingThisBreaksApplicationSecurity;

    contentDetails.LinkedRiskData.AppetiteRatingImg = 
      contentDetails.LinkedRiskData.AppetiteRating == '' || contentDetails.LinkedRiskData.AppetiteRating === undefined ||
      contentDetails.LinkedRiskData.AppetiteRatingImg == '' || contentDetails.LinkedRiskData.AppetiteRatingImg === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.LinkedRiskData.AppetiteRatingImg.changingThisBreaksApplicationSecurity;
        
    contentDetails.LinkedRiskData.ResidualRiskRatingImg = 
      contentDetails.LinkedRiskData.ResidualRiskRating == '' || contentDetails.LinkedRiskData.ResidualRiskRating === undefined ||
      contentDetails.LinkedRiskData.ResidualRiskRatingImg == '' || contentDetails.LinkedRiskData.ResidualRiskRatingImg === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.LinkedRiskData.ResidualRiskRatingImg.changingThisBreaksApplicationSecurity;

    contentDetails.LinkedRiskData.TargetRiskRatingImg = 
      contentDetails.LinkedRiskData.TargetRiskRating == '' || contentDetails.LinkedRiskData.TargetRiskRating === undefined ||
      contentDetails.LinkedRiskData.TargetRiskRatingImg == '' || contentDetails.LinkedRiskData.TargetRiskRatingImg === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.LinkedRiskData.TargetRiskRatingImg.changingThisBreaksApplicationSecurity;

    contentDetails.LinkedRiskData.InherentRiskRating = contentDetails.LinkedRiskData.InherentRiskRating == '' || contentDetails.LinkedRiskData.InherentRiskRating === undefined
      ? 'N/A' : contentDetails.LinkedRiskData.InherentRiskRating;
    contentDetails.LinkedRiskData.AppetiteRating = contentDetails.LinkedRiskData.AppetiteRating == '' || contentDetails.LinkedRiskData.AppetiteRating === undefined
      ? 'N/A' : contentDetails.LinkedRiskData.AppetiteRating;
    contentDetails.LinkedRiskData.ResidualRiskRating = contentDetails.LinkedRiskData.ResidualRiskRating == '' || contentDetails.LinkedRiskData.ResidualRiskRating === undefined
      ? 'N/A' : contentDetails.LinkedRiskData.ResidualRiskRating;
    contentDetails.LinkedRiskData.TargetRiskRating = contentDetails.LinkedRiskData.TargetRiskRating == '' || contentDetails.LinkedRiskData.TargetRiskRating === undefined
      ? 'N/A' : contentDetails.LinkedRiskData.TargetRiskRating;

    const maxCharacters = 100;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(/#/g,'\\#');

    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedHtmlTemplate =
      contentDetails.htmlTemplate.length > maxCharacters
        ? contentDetails.htmlTemplate.substring(0, maxCharacters) + '...'
        : contentDetails.htmlTemplate;



    var riskAppetite =
      "<div class='column'>" +
      "<p class ='ratings'> Risk Appetite  </p>" +
      "<p class='bow-tie-risk-rating-details'>" +
      "<img class='bow-tie-risk-rating-details-image'" +
      "src='" +
      contentDetails.LinkedRiskData.AppetiteRatingImg +
      "'" +
      "<span class='bow-tie-risk-rating-details-text'>" +
      contentDetails.LinkedRiskData.AppetiteRating +
      '</span>' +
      '</p>' +
      '</div>';

    riskAppetite = contentDetails.LinkedRiskData.IsEnableRiskAppetite == "true"
      ? riskAppetite
      : "";


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
          "<div class='row-expand'>" +
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
          "<div class='row-expand'>" +
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
              riskAppetite +
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
          "<div class='bow-tie-risk-Expand-footer-details-responsible'>" +
            "<p class='bow-tie-risk-responsible-manager'> Responsible Manager  </p>" +
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

    contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic =
      contentDetails.TreatmentData.TreatmentResponsibleOfficer == '' || contentDetails.TreatmentData.TreatmentResponsibleOfficer === undefined ||
      contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic == '' || contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic.changingThisBreaksApplicationSecurity.changingThisBreaksApplicationSecurity;

    contentDetails.TreatmentData.TreatmentResponsibleOfficer = contentDetails.TreatmentData.TreatmentResponsibleOfficer == '' || contentDetails.TreatmentData.TreatmentResponsibleOfficer === undefined
      ? 'N/A' : contentDetails.TreatmentData.TreatmentResponsibleOfficer;

    
    const maxCharacters = 100;
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
      "<div class='bow-tie-expand-card-body-Action'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '<p>' +
      "<p class='bow-tie-expand-reported-date-time' style='margin-top: 10px; '>" +
      "Due Date" +
      "<p class='bow-tie-expand-reported-date' style='margin-bottom: 10px ' >" +
      contentDetails.TreatmentData.TreatmentEndDate +
      "</p>" +
      "</p>" +
      "<p class='bow-tie-expand-responsible-officer-incident'>Owner</p>" +
      "<p class='bow-tie-expand-responsible-officer-details'>" +
      "<img class='bow-tie-expand-responsible-officer-image'" +
      "src='" +
      contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic+
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

    contentDetails.IncidentData.ReportedOfficerImageUrl =
      contentDetails.IncidentData.ReportedOfficerName == '' || contentDetails.IncidentData.ReportedOfficerName === undefined ||
      contentDetails.IncidentData.ReportedOfficerImageUrl == '' || contentDetails.IncidentData.ReportedOfficerImageUrl === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.IncidentData.ReportedOfficerImageUrl.changingThisBreaksApplicationSecurity;

    contentDetails.IncidentData.ReportedOfficerName = contentDetails.IncidentData.ReportedOfficerName == '' || contentDetails.IncidentData.ReportedOfficerName === undefined
      ? 'N/A' : contentDetails.IncidentData.ReportedOfficerName;

    contentDetails.IncidentData.ResponsibleManagerProfilePic =
      contentDetails.IncidentData.ResponsiblePerson == '' || contentDetails.IncidentData.ResponsiblePerson === undefined ||
      contentDetails.IncidentData.ResponsibleManagerProfilePic == '' || contentDetails.IncidentData.ResponsibleManagerProfilePic === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.IncidentData.ResponsibleManagerProfilePic.changingThisBreaksApplicationSecurity.changingThisBreaksApplicationSecurity;

    contentDetails.IncidentData.ResponsiblePerson = contentDetails.IncidentData.ResponsiblePerson == '' || contentDetails.IncidentData.ResponsiblePerson === undefined
      ? 'N/A' : contentDetails.IncidentData.ResponsiblePerson;

    const maxCharacters = 100;
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
      "<div class='bow-tie-expand-card-body-Incident'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '<p>' +
      "<p class='bow-tie-expand-reportedby' >Reported By</p>" +
      "<p class='bow-tie-responsible-officer'>" +
      "<img class='bow-tie-owner-image'" +
      "src='" +
      contentDetails.IncidentData.ReportedOfficerImageUrl +        
      "'" +
      "<span class='bow-tie-owner-name'>" +
      contentDetails.IncidentData.ReportedOfficerName +
      '</span>' +
      '</p>' +
      "<p class='bow-tie-expand-responsible-officer'>Responsible Officer</p>" +
      "<p class='bow-tie-expand-responsible-officer-details'>" +
      "<img class='bow-tie-expand-responsible-officer-image'" +
      "src='" +
      contentDetails.IncidentData.ResponsibleManagerProfilePic +
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

    contentDetails.ComplianceData.ROImage =
      contentDetails.ComplianceData.ResponsibleOfficer == '' || contentDetails.ComplianceData.ResponsibleOfficer === undefined ||
      contentDetails.ComplianceData.ROImage == '' || contentDetails.ComplianceData.ROImage === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.ComplianceData.ROImage.changingThisBreaksApplicationSecurity;

    contentDetails.ComplianceData.ResponsibleOfficer = contentDetails.ComplianceData.ResponsibleOfficer == '' || contentDetails.ComplianceData.ResponsibleOfficer === undefined
      ? 'N/A' : contentDetails.ComplianceData.ResponsibleOfficer;

    const maxCharacters = 100;
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
      "<div class='bow-tie-expand-card-body-Obligation'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '<p>' +
      "<p class='bow-tie-expand-reportedby' >Obligation Owner</p>" +
      "<p class='bow-tie-responsible-officer'>" +
      "<img class='bow-tie-owner-image'" +
      "src='" +
      contentDetails.ComplianceData.ROImage+
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

    const maxCharacters = 100;
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
      "<div class='bow-tie-expand-card-body-KPI'" +
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
    const maxCharacters = 100;
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
      "<div class='bow-tie-expand-card-body-Audit'>" +
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
    const maxCharacters = 150;
    const truncatedHierarchyData =
    contentDetails.HierarchyData.expandedString.length > maxCharacters
      ? contentDetails.HierarchyData.expandedString.substring(0, maxCharacters) + '...'
      : contentDetails.HierarchyData.expandedString;
    return (
      "<div class='bow-tie-expand-card-content rounded'>" +
        "<div class='bow-tie-expand-card-header'>" +
          '<span>' +
            (contentDetails.Header === undefined ? 'Title' : contentDetails.Header) +
          '</span>' +
        '</div>' +
        "<div class='bow-tie-expand-card-body-Hierarchy' >" +
          "<p class='bow-tie-htmlTemplate'>" +
          truncatedHierarchyData+
          '</p>' +
        '</div>' +
      '</div>'
    );
  }

  public GetAuthorityDocumentExpand(contentDetails: DiagramNodeData) {

    contentDetails.AuthorityDocumentData.ROImage =
      contentDetails.AuthorityDocumentData.ResponsibleOfficer == '' || contentDetails.AuthorityDocumentData.ResponsibleOfficer === undefined ||
      contentDetails.AuthorityDocumentData.ROImage == '' || contentDetails.AuthorityDocumentData.ROImage === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.AuthorityDocumentData.ROImage.changingThisBreaksApplicationSecurity;

    contentDetails.AuthorityDocumentData.ResponsibleOfficer = contentDetails.AuthorityDocumentData.ResponsibleOfficer == '' || contentDetails.AuthorityDocumentData.ResponsibleOfficer === undefined
      ? 'N/A' : contentDetails.AuthorityDocumentData.ResponsibleOfficer;

    const maxCharacters = 100;
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
        "<div class='bow-tie-expand-card-body-AuthorityDocument'>" +
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
            contentDetails.AuthorityDocumentData.ROImage+
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

    contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic =
      contentDetails.PolicyData.ResponsiblePerson == '' || contentDetails.PolicyData.ResponsiblePerson === undefined ||
      contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic == '' || contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic === undefined
        ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
        : contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic.changingThisBreaksApplicationSecurity.changingThisBreaksApplicationSecurity;

      contentDetails.PolicyData.ResponsiblePerson = contentDetails.PolicyData.ResponsiblePerson == '' || contentDetails.PolicyData.ResponsiblePerson === undefined
      ? 'N/A' : contentDetails.PolicyData.ResponsiblePerson;

    const maxCharacters = 100;
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
      "<div class='bow-tie-expand-card-body-Policy'>" +
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
          contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic+
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
    const maxCharacters = 100;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
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
      "<div class='bow-tie-expand-card-body-AuditRecommendations'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetAuditFindingExpand(contentDetails: DiagramNodeData) {
    const maxCharacters = 100;
    contentDetails.htmlTemplate = contentDetails.htmlTemplate.replace(
      /#/g,
      '\\#'
    );
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
      "<div class='bow-tie-expand-card-body-AuditFinding' >" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate  +
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
        break;
      case 'Cause':
        templatesObj.causeTemplate = this.GetCauseTemplateGlobal(dataItem);        
        break;
      case 'Consequence':
        templatesObj.consequencesTemplate = this.GetConsequencesTemplateGlobal(dataItem);        
        break;
      case 'Incident':
        templatesObj.incidentTemplateExpnad = this.GetIncidentExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);        
        break;
      case 'KPI':
        templatesObj.kpiTemplateExpnad = this.GetKPIExpand(dataItem, isPerformanceView);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);        
        break;
      case 'Linked Risk':
        templatesObj.linkRiskTemplate = this.GetLinkRiskNodeTemplateGlobal(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);        
        break;
      case 'Action':
        templatesObj.riskActionTemplateExpand = this.GetRiskActionTreatmentExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);        
        break;
      case 'Obligation':
        templatesObj.complianceTemplateExpnad = this.GetComplianceObligationExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);        
        break;
      case 'Authority Document':
        templatesObj.authorityDocumentTemplateExpnad = this.GetAuthorityDocumentExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);        
        break;
      case 'Audit':
        templatesObj.auditTemplateExpnad = this.GetAuditExpand(dataItem);
        templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);        
        break;
        case "Hierarchy Linkages":
          templatesObj.hierarchyTemplate = this.GetHierarchyExpand(dataItem);
          templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);          
          break;
        case "Audit Recommendation":
          templatesObj.auditRecommendationTemplate = this.GetAuditRecommendationsExpand(dataItem);
          templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);          
          break;
        case "Audit Finding":
          templatesObj.auditFindingTemplate = this.GetAuditFindingExpand(dataItem);
          templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);          
          break;
        case "Policy":
          templatesObj.PolicyTemplate = this.GetPolicyExpand(dataItem);
          templatesObj.bottomTemplate = this.GetBottomCollapesTemplateGlobal(dataItem, isPerformanceView);          
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
          } else if (dataItem.Header === 'Action') {
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
          }else if (dataItem.Header === 'Hierarchy Linkages') {
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
