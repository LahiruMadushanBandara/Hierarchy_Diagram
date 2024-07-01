import { DiagramNodeData } from 'src/app/models/data.model';
import { NodeHeaderTypes } from '../Enums/node-headers';

export class TemplateClass {
  constructor() {}

  public processTitleTemplate(template: any) {
    const maxCharacters = 100;
    // Replace # with \#
    template = template.replace(/#/g, '\\#');

    // Truncate the htmlTemplate if it exceeds the maximum number of characters
    const truncatedTemplate =
      template.length > maxCharacters
        ? template.substring(0, maxCharacters) + '...'
        : template;

    return truncatedTemplate;
  }
  public HandleNullImages(dataValue:any, imageValue:any) {
    return dataValue == '' ||
      dataValue === undefined ||
      imageValue == '' ||
      imageValue === undefined
      ? "assets/images/noimage.png' style='border-radius: 0px; width: 35px; height: 35px;"
      : imageValue.changingThisBreaksApplicationSecurity;
  }

  public HandleNullValues(dataValue:any) {
    return dataValue == '' || dataValue === undefined ? 'N/A' : dataValue;
  }

  public GetControlNodeTemplateGlobal(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );
    return (
      "<div class='bow-tie-control-card-content rounded' " +
      '>' +
      "<div class='bow-tie-control-card-header' " +
      '>' +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-control-card-body' " +
      ' >' +
      "<p class='bow-tie-htmlTemplate'  " +
      '>\\' +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetBottomCollapesTemplateGlobal(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    return (
      "<div class='Bow-tie-BottomCollapes-card-content rounded'" +
      '>' +
      "<div class='Bow-tie-BottomCollapes-card-header'" +
      '>' +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='Bow-tie-BottomCollapes-card-body'" +
      '>' +
      "<p class='bow-tie-htmlTemplate'" +
      '>\\' +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetConsequencesTemplateGlobal(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
      "<div class='bow-tie-consequences-card-header'>" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body'>\\" +
      "<p class='bow-tie-htmlTemplate'" +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetCauseTemplateGlobal(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    return (
      "<div class='bow-tie-cause-card-content rounded'>" +
      "<div class='bow-tie-cause-card-header'>" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-cause-card-body' >\\" +
      "<p class='bow-tie-htmlTemplate'" +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetRiskNodeTemplateGlobal(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    contentDetails.RiskData.InherentRiskRatingImg = this.HandleNullImages(
      contentDetails.RiskData.InherentRiskRating,
      contentDetails.RiskData.InherentRiskRatingImg
    );
    contentDetails.RiskData.AppetiteRatingImg = this.HandleNullImages(
      contentDetails.RiskData.AppetiteRating,
      contentDetails.RiskData.AppetiteRatingImg
    );
    contentDetails.RiskData.ResidualRiskRatingImg = this.HandleNullImages(
      contentDetails.RiskData.ResidualRiskRating,
      contentDetails.RiskData.ResidualRiskRatingImg
    );
    contentDetails.RiskData.TargetRiskRatingImg = this.HandleNullImages(
      contentDetails.RiskData.TargetRiskRating,
      contentDetails.RiskData.TargetRiskRatingImg
    );

    contentDetails.RiskData.InherentRiskRating = this.HandleNullValues(
      contentDetails.RiskData.InherentRiskRating
    );
    contentDetails.RiskData.AppetiteRating = this.HandleNullValues(
      contentDetails.RiskData.AppetiteRating
    );
    contentDetails.RiskData.ResidualRiskRating = this.HandleNullValues(
      contentDetails.RiskData.ResidualRiskRating
    );
    contentDetails.RiskData.TargetRiskRating = this.HandleNullValues(
      contentDetails.RiskData.TargetRiskRating
    );

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
      '<br>' +
      contentDetails.RiskData.AppetiteRiskRatingScore +
      '</p>' +
      '</p>' +
      '</div>';

    riskAppetite =
      contentDetails.RiskData.IsEnableRiskAppetite == 'true'
        ? riskAppetite
        : '';

    return (
      "<div class='bow-tie-risk-card-content rounded'>" +
      "<div class='bow-tie-risk-card-header-top' >" +
      "<p class='bow-tie-risk-card-header-top-text'>" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
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
      '<br>' +
      contentDetails.RiskData.InherentRiskRatingScore +
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
      '<br>' +
      contentDetails.RiskData.ResidualRiskRatingScore +
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
      '<br>' +
      contentDetails.RiskData.TargetRiskRatingScore +
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

  public GetControlNodeTemplateGlobalExpand(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    contentDetails.ControlData.ControlOwnerRatingImage = this.HandleNullImages(
      contentDetails.ControlData.ControlOwnerRating,
      contentDetails.ControlData.ControlOwnerRatingImage
    );
    contentDetails.ControlData.ControlOwnerRating = this.HandleNullValues(
      contentDetails.ControlData.ControlOwnerRating
    );

    contentDetails.ControlData.ControlOwnerImageUrl = this.HandleNullImages(
      contentDetails.ControlData.ControlOwner,
      contentDetails.ControlData.ControlOwnerImageUrl
    );

    contentDetails.ControlData.ControlOwner = this.HandleNullValues(
      contentDetails.ControlData.ControlOwner
    );

    contentDetails.ControlData.ControlType = this.HandleNullValues(
      contentDetails.ControlData.ControlType
    );

    return (
      "<div class='bow-tie-expand-card-content rounded'" +
      ' >' +
      "<div class='bow-tie-control-card-header' " +
      ' >' +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-control-expand-card-body' " +
      '>' +
      "<p class='bow-tie-htmlTemplate'  " +
      '>\\' +
      truncatedHtmlTemplate +
      '</p>' +
      "<p class='bow-tie-control-type-details'>" +
      "<span class='bow-tie-type-name' " +
      '>' +
      'Control Type' +
      '</span>' +
      "<p class='bow-tie-type-text' " +
      '>' +
      contentDetails.ControlData.ControlType +
      '</p>' +
      '</p>' +
      "<p class='bow-tie-control-owner' " +
      '>Control Owner</p>' +
      "<p class='bow-tie-control-owner-details' " +
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
      '>' +
      'Control Owner Rating' +
      "<p class='bow-tie-control-owner-rating-details' " +
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
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    contentDetails.LinkedRiskData.InherentRiskRatingImg = this.HandleNullImages(
      contentDetails.LinkedRiskData.InherentRiskRating,
      contentDetails.LinkedRiskData.InherentRiskRatingImg
    );
    contentDetails.LinkedRiskData.AppetiteRatingImg = this.HandleNullImages(
      contentDetails.LinkedRiskData.AppetiteRating,
      contentDetails.LinkedRiskData.AppetiteRatingImg
    );
    contentDetails.LinkedRiskData.ResidualRiskRatingImg = this.HandleNullImages(
      contentDetails.LinkedRiskData.ResidualRiskRating,
      contentDetails.LinkedRiskData.ResidualRiskRatingImg
    );
    contentDetails.LinkedRiskData.TargetRiskRatingImg = this.HandleNullImages(
      contentDetails.LinkedRiskData.TargetRiskRating,
      contentDetails.LinkedRiskData.TargetRiskRatingImg
    );

    contentDetails.LinkedRiskData.InherentRiskRating = this.HandleNullValues(
      contentDetails.LinkedRiskData.InherentRiskRating
    );
    contentDetails.LinkedRiskData.AppetiteRating = this.HandleNullValues(
      contentDetails.LinkedRiskData.AppetiteRating
    );
    contentDetails.LinkedRiskData.ResidualRiskRating = this.HandleNullValues(
      contentDetails.LinkedRiskData.ResidualRiskRating
    );
    contentDetails.LinkedRiskData.TargetRiskRating = this.HandleNullValues(
      contentDetails.LinkedRiskData.TargetRiskRating
    );

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

    riskAppetite =
      contentDetails.LinkedRiskData.IsEnableRiskAppetite == 'true'
        ? riskAppetite
        : '';

    return (
      "<div class='bow-tie-risk-card-content-expand rounded' >" +
      "<div class='bow-tie-risk-card-header-top-expand' >" +
      "<p class='bow-tie-risk-card-header-top-text'>" +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
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
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic =
      this.HandleNullImages(
        contentDetails.TreatmentData.TreatmentResponsibleOfficer,
        contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic
      ).changingThisBreaksApplicationSecurity;

    contentDetails.TreatmentData.TreatmentResponsibleOfficer =
      this.HandleNullValues(
        contentDetails.TreatmentData.TreatmentResponsibleOfficer
      );

    // Calculate the percentage completion
    const completePercentage =
      contentDetails.TreatmentData.TreatmentPercentageComplete;

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body-Action'>" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '<p>' +
      "<p class='bow-tie-expand-reported-date-time' style='margin-top: 10px; '>" +
      'Due Date' +
      "<p class='bow-tie-expand-reported-date' style='margin-bottom: 10px ' >" +
      contentDetails.TreatmentData.TreatmentEndDate +
      '</p>' +
      '</p>' +
      "<p class='bow-tie-expand-responsible-officer-incident'>Owner</p>" +
      "<p class='bow-tie-expand-responsible-officer-details'>" +
      "<img class='bow-tie-expand-responsible-officer-image'" +
      "src='" +
      contentDetails.TreatmentData.TreatmentResponsibleOfficerProfilePic +
      "'" +
      "<span class='bow-tie-expand-responsible-officer-name'>" +
      contentDetails.TreatmentData.TreatmentResponsibleOfficer +
      '</span>' +
      '</p>' +
      "<p class='bow-tie-text-values'>" +
      'Complete' +
      "<div class='bow-tie-treatment-complete'>" +
      `<span class='progress' style='display: inline-block;'>` +
      `<div class='progress-bar' role='progressbar' style='width: ${completePercentage}%;' aria-valuenow='${completePercentage}'></div>` +
      `</span>` +
      "<span class = 'bow-tie-treatment-complete-value'>" +
      `${completePercentage}%` +
      '</span>' +
      '</div>' +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetIncidentExpand(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );
    contentDetails.IncidentData.ReportedOfficerImageUrl = this.HandleNullImages(
      contentDetails.IncidentData.ReportedOfficerName,
      contentDetails.IncidentData.ReportedOfficerImageUrl
    );

    contentDetails.IncidentData.ReportedOfficerName = this.HandleNullValues(
      contentDetails.IncidentData.ReportedOfficerName
    );

    contentDetails.IncidentData.ResponsibleManagerProfilePic =
      this.HandleNullImages(
        contentDetails.IncidentData.ResponsiblePerson,
        contentDetails.IncidentData.ResponsibleManagerProfilePic
      ).changingThisBreaksApplicationSecurity;

    contentDetails.IncidentData.ResponsiblePerson = this.HandleNullValues(
      contentDetails.IncidentData.ResponsiblePerson
    );

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
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
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );
    contentDetails.ComplianceData.ROImage = this.HandleNullImages(
      contentDetails.ComplianceData.ResponsibleOfficer,
      contentDetails.ComplianceData.ROImage
    );

    contentDetails.ComplianceData.ResponsibleOfficer = this.HandleNullValues(
      contentDetails.ComplianceData.ResponsibleOfficer
    );

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header'>" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
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
      contentDetails.ComplianceData.ROImage +
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

  public GetKPIExpand(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

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

    return (
      "<div class='bow-tie-expand-card-content rounded' " +
      '>' +
      "<div class='bow-tie-expand-card-header' " +
      '>' +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body-KPI'" +
      ' >' +
      "<p class='bow-tie-htmlTemplate' " +
      '>\\' +
      truncatedHtmlTemplate +
      ' </p>' +
      "<div class='bow-tie-performance-flex'>" +
      `<span id='performanceIndicator' class='performanceIndicator-badge ${currentIndicator}'></span>` +
      `<span class="bow-tie-performance-rating">${
        contentDetails.KpiData.Performance ?? 'NotAvailable'
      }</span>` +
      '</div>' +
      "<div class='bow-tie-kpi'>" +
      "<div class='bow-tie-unit-flex'>" +
      "<span class='bow-tie-unit-text'" +
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
      '>' +
      ' Actual  ' +
      '</span>' +
      "<span class='bow-tie-actual-value'>" +
      contentDetails.KpiData.Actual +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-target-flex'>" +
      "<span class='bow-tie-target-text'" +
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
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
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
    var truncatedHierarchyData = this.processTitleTemplate(
      contentDetails.HierarchyData.hierarchyString
    );

    return (
      "<div class='bow-tie-expand-card-content rounded'>" +
      "<div class='bow-tie-expand-card-header'>" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body-Hierarchy' >" +
      "<p class='bow-tie-htmlTemplate'>" +
      truncatedHierarchyData +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetAuthorityDocumentExpand(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    contentDetails.AuthorityDocumentData.ROImage = this.HandleNullImages(
      contentDetails.AuthorityDocumentData.ResponsibleOfficer,
      contentDetails.AuthorityDocumentData.ROImage
    );

    contentDetails.AuthorityDocumentData.ResponsibleOfficer =
      this.HandleNullValues(
        contentDetails.AuthorityDocumentData.ResponsibleOfficer
      );

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header'>" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
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
      contentDetails.AuthorityDocumentData.ROImage +
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
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );
    contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic =
      this.HandleNullImages(
        contentDetails.PolicyData.ResponsiblePerson,
        contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic
      ).changingThisBreaksApplicationSecurity;

    contentDetails.PolicyData.ResponsiblePerson = this.HandleNullValues(
      contentDetails.PolicyData.ResponsiblePerson
    );

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
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
      contentDetails.PolicyData.PolicyResponsibleOfficerProfilePic +
      "'" +
      "<span class='bow-tie-expand-responsible-officer-name'>" +
      contentDetails.PolicyData.ResponsiblePerson +
      '  ' +
      '</span>' +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public GetAuditRecommendationsExpand(contentDetails: DiagramNodeData) {
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header'>" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
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
    var truncatedHtmlTemplate = this.processTitleTemplate(
      contentDetails.htmlTemplate
    );

    return (
      "<div class='bow-tie-expand-card-content rounded' >" +
      "<div class='bow-tie-expand-card-header' >" +
      '<span>' +
      (contentDetails.HeaderDisplayName === undefined
        ? contentDetails.Header
        : contentDetails.HeaderDisplayName) +
      '</span>' +
      '</div>' +
      "<div class='bow-tie-expand-card-body-AuditFinding' >" +
      "<p class='bow-tie-htmlTemplate'>\\" +
      truncatedHtmlTemplate +
      '</p>' +
      '</div>' +
      '</div>'
    );
  }

  public AddTemplatesToNode(
    dataItem: any,
    templatesObj: any,
    isExpand: boolean,
    renderElement: any
  ) {
    switch (dataItem.Header) {
      case NodeHeaderTypes.Risk:
        templatesObj.riskTemplate = this.GetRiskNodeTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Control:
        templatesObj.controlTemplate =
          this.GetControlNodeTemplateGlobal(dataItem);
        templatesObj.controlTemplateExpand =
          this.GetControlNodeTemplateGlobalExpand(dataItem);
        break;
      case NodeHeaderTypes.Cause:
        templatesObj.causeTemplate = this.GetCauseTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Consequence:
        templatesObj.consequencesTemplate =
          this.GetConsequencesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Incident:
        templatesObj.incidentTemplateExpnad = this.GetIncidentExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Kpi:
        templatesObj.kpiTemplateExpnad = this.GetKPIExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Linked_Risk:
        templatesObj.linkRiskTemplate =
          this.GetLinkRiskNodeTemplateGlobal(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Treatment:
        templatesObj.riskActionTemplateExpand =
          this.GetRiskActionTreatmentExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Obligation:
        templatesObj.complianceTemplateExpnad =
          this.GetComplianceObligationExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Authority_Document:
        templatesObj.authorityDocumentTemplateExpnad =
          this.GetAuthorityDocumentExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Audit:
        templatesObj.auditTemplateExpnad = this.GetAuditExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Hierarchy_Linkages:
        templatesObj.hierarchyTemplate = this.GetHierarchyExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Audit_Recommendations:
        templatesObj.auditRecommendationTemplate =
          this.GetAuditRecommendationsExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Audit_Finding:
        templatesObj.auditFindingTemplate =
          this.GetAuditFindingExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      case NodeHeaderTypes.Policy:
        templatesObj.PolicyTemplate = this.GetPolicyExpand(dataItem);
        templatesObj.bottomTemplate =
          this.GetBottomCollapesTemplateGlobal(dataItem);
        break;
      default:
    }

    if (isExpand) {
      if (dataItem.Header === NodeHeaderTypes.Risk) {
        var riskNodeTemp = kendo.template(templatesObj.riskTemplate);
        renderElement.html(riskNodeTemp(dataItem));
      } else if (dataItem.Header === NodeHeaderTypes.Control) {
        var controlNodeExpandTemp = kendo.template(
          templatesObj.controlTemplateExpand
        );
        renderElement.html(controlNodeExpandTemp(dataItem));
      } else if (dataItem.Header === NodeHeaderTypes.Consequence) {
        var consequencesTemp = kendo.template(
          templatesObj.consequencesTemplate
        );
        renderElement.html(consequencesTemp(dataItem));
      } else if (dataItem.Header === NodeHeaderTypes.Cause) {
        var causeTemp = kendo.template(templatesObj.causeTemplate);
        renderElement.html(causeTemp(dataItem));
      } else {
        if (dataItem.Header === NodeHeaderTypes.Linked_Risk) {
          var linkRiskBottomTemp = kendo.template(
            templatesObj.linkRiskTemplate
          );
          renderElement.html(linkRiskBottomTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Treatment) {
          var riskActionExpandTemp = kendo.template(
            templatesObj.riskActionTemplateExpand
          );
          renderElement.html(riskActionExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Incident) {
          var incidentExpandTemp = kendo.template(
            templatesObj.incidentTemplateExpnad
          );
          renderElement.html(incidentExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Kpi) {
          var kpiExpandTemp = kendo.template(templatesObj.kpiTemplateExpnad);
          renderElement.html(kpiExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Obligation) {
          var complianceExpandTemp = kendo.template(
            templatesObj.complianceTemplateExpnad
          );
          renderElement.html(complianceExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Authority_Document) {
          var authorityDocumentExpandTemp = kendo.template(
            templatesObj.authorityDocumentTemplateExpnad
          );
          renderElement.html(authorityDocumentExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Audit) {
          var auditDocumentExpandTemp = kendo.template(
            templatesObj.auditTemplateExpnad
          );
          renderElement.html(auditDocumentExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Hierarchy_Linkages) {
          var hierarchyExpandTemp = kendo.template(
            templatesObj.hierarchyTemplate
          );
          renderElement.html(hierarchyExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Audit_Recommendations) {
          var auditRecommendationExpandTemp = kendo.template(
            templatesObj.auditRecommendationTemplate
          );
          renderElement.html(auditRecommendationExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Audit_Finding) {
          var AuditFindingExpandTemp = kendo.template(
            templatesObj.auditFindingTemplate
          );
          renderElement.html(AuditFindingExpandTemp(dataItem));
        } else if (dataItem.Header === NodeHeaderTypes.Policy) {
          var policyyExpandTemp = kendo.template(templatesObj.PolicyTemplate);
          renderElement.html(policyyExpandTemp(dataItem));
        }
      }
    } else {
      if (dataItem.Header === NodeHeaderTypes.Risk) {
        var riskNodeTemp = kendo.template(templatesObj.riskTemplate);
        renderElement.html(riskNodeTemp(dataItem));
      } else if (dataItem.Header === NodeHeaderTypes.Control) {
        var controlNodeTemp = kendo.template(templatesObj.controlTemplate);
        renderElement.html(controlNodeTemp(dataItem));
      } else if (dataItem.Header === NodeHeaderTypes.Consequence) {
        var consequencesTemp = kendo.template(
          templatesObj.consequencesTemplate
        );
        renderElement.html(consequencesTemp(dataItem));
      } else if (dataItem.Header === NodeHeaderTypes.Cause) {
        var causeTemp = kendo.template(templatesObj.causeTemplate);
        renderElement.html(causeTemp(dataItem));
      } else {
        var otherTemp = kendo.template(templatesObj.bottomTemplate);
        renderElement.html(otherTemp(dataItem));
      }
    }
  }
}
