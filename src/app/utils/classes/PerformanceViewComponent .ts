import {
  PerformanceStyleGeneral,
  PerformanceStyleKPI,
} from 'src/app/models/PerformanceStyle.model';
import { DiagramNodeData } from 'src/app/models/data.model';

export class PerformanceView {
  constructor() { }

  // public PerformanceviewDetails(
  //   contentDetails: DiagramNodeData,
  //   enablePerformanceview: boolean
  // ) {
  //   enum PerformanceViewStyleForCardBoady {
  //     strong = "style='background-color: rgb(242,130,48); border-right: none !important; border-bottom: none !important;border-left: none !important; color: black;' ",
  //     Moderate = "style='background-color: rgb(255,219,46);border-right: none !important; border-bottom: none !important;border-left: none !important; color: black;'",
  //     Weak = "style='background-color:rgb(0, 185, 85);border-right: none !important; border-bottom: none !important;border-left: none !important; color: black;'",
  //     Strongest = "style='background-color: rgb(215,43,63); border-right: none !important; border-bottom: none !important;border-left: none !important; color: black;'",
  //     LargelyIneffective = "style='background-color: rgb(215,43,63); border-right: none !important; border-bottom: none !important;border-left: none !important; color: black;'",
  //     PartiallyEffective = "style='background-color: rgb(242,130,48);border-right: none !important; border-bottom: none !important;border-left: none !important; color: black;' ",
  //     SubstantiallyEffective = "style='background-color: rgb(255,219,46);border-right: none !important; border-bottom: none !important;border-left: none !important; color: black;'",
  //     FullyEffective = "style='background-color:rgb(0, 185, 85);border-right: none !important; border-bottom: none !important;border-left: none !important; color: black;'",
  //   }

  //   enum PerformanceViewStyleForHeader {
  //     strong = "style='background-color: rgb(242,130,48); border: none!important;color: black;border-radius: 10px 10px 0px 0px !important' ",
  //     Moderate = "style='background-color: rgb(255,219,46);border: none !important;color: black;border-radius: 10px 10px 0px 0px !important '",
  //     Weak = "style='background-color:rgb(0, 185, 85);border: none !important;color: black;border-radius: 10px 10px 0px 0px !important'",
  //     Strongest = "style='background-color: rgb(215,43,63); border: none !important;color: black;border-radius: 10px 10px 0px 0px !important'",
  //     LargelyIneffective = "style='background-color: rgb(215,43,63); border: none !important;color: black;border-radius: 10px 10px 0px 0px !important'",
  //     PartiallyEffective = "style='background-color: rgb(242,130,48);border: none !important;color: black;border-radius: 10px 10px 0px 0px !important' ",
  //     SubstantiallyEffective = "style='background-color: rgb(255,219,46);border: none !important;color: black;border-radius: 10px 10px 0px 0px !important'",
  //     FullyEffective = "style='background-color:rgb(0, 185, 85);border: none !important;color: black;border-radius: 10px 10px 0px 0px !important'",
  //   }

  //   enum controlOwnerRating {
  //     strong = 'Strong',
  //     Moderate = 'Moderate',
  //     Weak = 'Weak',
  //     Strongest = 'Strongest',
  //     LargelyIneffective = 'Largely Ineffective',
  //     SubstantiallyEffective = 'Substantially Effective',
  //     FullyEffective = 'Fully Effective',
  //     PartiallyEffective = 'Partially Effective',
  //   }

  //   let PerformanceViewStyle: PerformanceStyleGeneral = {
  //     headerStyle: null,
  //     boadyStyle: null,
  //   };

  //   if (enablePerformanceview == true) {
  //     debugger;
  //     var ControlOwnerRating = contentDetails?.ControlData?.ControlOwnerRating;

  //     if (
  //       ControlOwnerRating == controlOwnerRating.strong ||
  //       ControlOwnerRating == controlOwnerRating.PartiallyEffective
  //     ) {
  //       PerformanceViewStyle.headerStyle = PerformanceViewStyleForHeader.strong;
  //       PerformanceViewStyle.boadyStyle =
  //         PerformanceViewStyleForCardBoady.strong;
  //     } else if (
  //       ControlOwnerRating == controlOwnerRating.Moderate ||
  //       ControlOwnerRating == controlOwnerRating.SubstantiallyEffective
  //     ) {
  //       PerformanceViewStyle.headerStyle =
  //         PerformanceViewStyleForHeader.Moderate;
  //       PerformanceViewStyle.boadyStyle =
  //         PerformanceViewStyleForCardBoady.Moderate;
  //     } else if (
  //       ControlOwnerRating == controlOwnerRating.Weak ||
  //       ControlOwnerRating == controlOwnerRating.FullyEffective
  //     ) {
  //       PerformanceViewStyle.headerStyle = PerformanceViewStyleForHeader.Weak;
  //       PerformanceViewStyle.boadyStyle = PerformanceViewStyleForCardBoady.Weak;
  //     } else if (
  //       ControlOwnerRating == controlOwnerRating.Strongest ||
  //       ControlOwnerRating == controlOwnerRating.LargelyIneffective
  //     ) {
  //       PerformanceViewStyle.headerStyle =
  //         PerformanceViewStyleForHeader.Strongest;
  //       PerformanceViewStyle.boadyStyle =
  //         PerformanceViewStyleForCardBoady.Strongest;
  //     }
  //   }
  //   return PerformanceViewStyle;
  // }
}

export class PerformanceViewKpi {
  constructor() { }

  public PerformanceviewDetailsKpi(
    contentDetails: DiagramNodeData,
    enablePerformanceview: boolean
  ) {
    enum PerformanceViewStyleForCardBoady {
      Monitor = "style='background-color: rgb(242,130,48);border-right: none !important; border-bottom: none !important;border-left: none !important;' ",
      OffTrack = "style='background-color: rgb(215,43,63);border-right: none !important; border-bottom: none !important;border-left: none !important;'",
      OnTrack = "style='background-color:rgb(0, 185, 85);border-right: none !important; border-bottom: none !important;border-left: none !important;'",
    }
    enum PerformanceViewStyleForHeader {
      Monitor = "style='background-color: rgb(242,130,48);border:none !important;border-radius: 10px 10px 0px 0px !important'",
      OffTrack = "style='background-color: rgb(215,43,63);border:none !important;border-radius: 10px 10px 0px 0px !important'",
      OnTrack = "style='background-color:rgb(0, 185, 85);border:none !important;border-radius: 10px 10px 0px 0px !important'",
    }

    enum kpiRating {
      Monitor = 'Monitor',
      OffTrack = 'Off Track',
      OnTrack = 'On Track',
    }

    let PerformanceViewStyleForKPI: PerformanceStyleKPI = {
      headerStyleKPI: null,
      boadyStyleKPI: null,
    };

    if (enablePerformanceview == true) {
      var KPIratings = contentDetails.KpiData.Performance;

      if (KPIratings == kpiRating.OnTrack) {
        PerformanceViewStyleForKPI.boadyStyleKPI =
          PerformanceViewStyleForCardBoady.OnTrack;
        PerformanceViewStyleForKPI.headerStyleKPI =
          PerformanceViewStyleForHeader.OnTrack;
      } else if (KPIratings == kpiRating.OffTrack) {
        PerformanceViewStyleForKPI.boadyStyleKPI =
          PerformanceViewStyleForCardBoady.OffTrack;
        PerformanceViewStyleForKPI.headerStyleKPI =
          PerformanceViewStyleForHeader.OffTrack;
      } else if (KPIratings == kpiRating.Monitor) {
        PerformanceViewStyleForKPI.boadyStyleKPI =
          PerformanceViewStyleForCardBoady.Monitor;
        PerformanceViewStyleForKPI.headerStyleKPI =
          PerformanceViewStyleForHeader.Monitor;
      }
    }
    return PerformanceViewStyleForKPI;
  }
}
