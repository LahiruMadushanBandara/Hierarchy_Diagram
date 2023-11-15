import { DiagramNodeData } from "src/app/models/data.model";

export class PerformanceView {
 
  constructor() {}

  public PerformanceviewDetails(contentDetails: DiagramNodeData , enablePerformanceview: boolean){

    enum PerformanceViewStyle {

      strong = "style='background-color: rgb(242,130,48); color: white;  border: none;' ",
      Moderate = "style='background-color: rgb(255,219,46); color: white;  border: none;'",
      Weak = "style='background-color:rgb(0, 185, 85); color: white;  border: none;'",
      Strongest = "style='background-color: rgb(155,10,10); color: white;  border: none;'",
      LargelyIneffective= "style='background-color: rgb(155,10,10); color: white;  border: none;'",
      PartiallyEffective = "style='background-color: rgb(242,130,48); color: white;  border: none;' ",
      SubstantiallyEffective = "style='background-color: rgb(255,219,46); color: white;  border: none;'",
      FullyEffective = "style='background-color:rgb(0, 185, 85); color: white;  border: none;'",
      OnTrack = "style='background-color: rgb(242,130,48); color: white;  border: none;' ",
      OffTrack = "style='background-color: rgb(255,219,46); color: white;  border: none;'",
      Monitor = "style='background-color:rgb(0, 185, 85); color: white;  border: none;'",
    } 

    enum controlOwnerRating {

      strong = "Strong",
      Moderate = "Moderate",
      Weak =  "Weak",
      Strongest = "Strongest",
      LargelyIneffective = "Largely Ineffective",
      SubstantiallyEffective = "Substantially Effective",
      FullyEffective = "Fully Effective",
      PartiallyEffective = "Partially Effective"     
    } 

    enum kpiRating{
      OnTrack = 'On Track',
      OffTrack = 'Off Track',
      Monitor = 'Monitor'
    }

    // var KpiRatings = contentDetails.KpiData.Performance;

    if(enablePerformanceview==true){
      
      var ControlOwnerRating = contentDetails.ControlData.ControlOwnerRating;
     
  

      if(ControlOwnerRating == controlOwnerRating.strong || ControlOwnerRating == controlOwnerRating.PartiallyEffective){
        var styles = PerformanceViewStyle.strong;
      }
      else if(ControlOwnerRating == controlOwnerRating.Moderate || ControlOwnerRating == controlOwnerRating.SubstantiallyEffective){
        var styles = PerformanceViewStyle.Moderate;
      }
      else if(ControlOwnerRating == controlOwnerRating.Weak || ControlOwnerRating == controlOwnerRating.FullyEffective){
        var styles = PerformanceViewStyle.Weak;
      }
      else if(ControlOwnerRating == controlOwnerRating.Strongest || ControlOwnerRating == controlOwnerRating.LargelyIneffective){
        var styles = PerformanceViewStyle.Strongest;
      }
      // if(KpiRatings == kpiRating.OnTrack )
      // {
      //   var styles = PerformanceViewStyle.OnTrack;
      // }
      // else  if(KpiRatings == kpiRating.OffTrack )
      // {
      //   var styles = PerformanceViewStyle.OffTrack;
      // }
      // else  if(KpiRatings == kpiRating.Monitor )
      // {
      //   var styles = PerformanceViewStyle.Monitor;
      // }
      }
    else{
     
      }

    
      return styles;
     
  }                                                                                                                                                                                                                                                           

}