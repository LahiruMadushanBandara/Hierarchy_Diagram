import { DiagramNodeData } from "src/app/models/data.model";

export class PerformanceView {
 
  constructor() {}

  public PerformanceviewDetails(contentDetails: DiagramNodeData , enablePerformanceview: boolean){

    enum PerfoemanceViewStyle {

      strong = "style='background-color: rgb(242,130,48); color: black;' ",
      Moderate = "style='background-color: rgb(255,219,46); color: black;'",
      Weak = "style='background-color:rgb(0, 185, 85); color: black;'",
      Strongest = "style='background-color: rgb(155,10,10); color: white;'",
      LargelyIneffective= "style='background-color: rgb(155,10,10); color: white;'",
      PartiallyEffective = "style='background-color: rgb(242,130,48); color: black;' ",
      SubstantiallyEffective = "style='background-color: rgb(255,219,46); color: black;'",
      FullyEffective = "style='background-color:rgb(0, 185, 85); color: black;'",
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


    if(enablePerformanceview==true){
      
      var ControlOwnerRating = contentDetails.ControlData.ControlOwnerRating  ;
  

      if(ControlOwnerRating == controlOwnerRating.strong || ControlOwnerRating == controlOwnerRating.PartiallyEffective){
        var styles = PerfoemanceViewStyle.strong;
      }
      else if(ControlOwnerRating == controlOwnerRating.Moderate || ControlOwnerRating == controlOwnerRating.SubstantiallyEffective){
        var styles = PerfoemanceViewStyle.Moderate;
      }
      else if(ControlOwnerRating == controlOwnerRating.Weak || ControlOwnerRating == controlOwnerRating.FullyEffective){
        var styles = PerfoemanceViewStyle.Weak;
      }
      else if(ControlOwnerRating == controlOwnerRating.Strongest || ControlOwnerRating == controlOwnerRating.LargelyIneffective){
        var styles = PerfoemanceViewStyle.Strongest;
      }
      
     
      }
    else{
     
      }

    
      return styles;
     
  }                                                                                                                                                                                                                                                           

}