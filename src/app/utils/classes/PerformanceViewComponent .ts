import { data } from "src/app/models/data.model";

export class PerformanceView {
 
  constructor() {}

  public PerformanceviewDetails(contentDetails: data , enablePerformanceview: boolean){

    enum PerfoemanceViewStyle {

      strong = "style='background-color: rgb(242,130,48); color: black;' ",
      Moderate = "style='background-color: rgb(255,219,46); color: black;'",
      Weak = "style='background-color:rgb(0, 185, 85); color: black;'",
      Strongest = "style='background-color: rgb(215,43,63); color: white;'"

    } 

    enum controlOwnerRating {

      strong = "Strong",
      Moderate = "Moderate",
      Weak =  "Weak",
      Strongest = "Strongest",
     

    } 


    if(enablePerformanceview==true){
      
      var ControlOwnerRating = contentDetails.ControlData.ControlOwnerRating  ;
  

      if(ControlOwnerRating == controlOwnerRating.strong){
        var styles = PerfoemanceViewStyle.strong;
      }
      else if(ControlOwnerRating == controlOwnerRating.Moderate){
        var styles = PerfoemanceViewStyle.Moderate;
      }
      else if(ControlOwnerRating == controlOwnerRating.Weak){
        var styles = PerfoemanceViewStyle.Weak;
      }
      else if(ControlOwnerRating == controlOwnerRating.Strongest){
        var styles = PerfoemanceViewStyle.Strongest;
      }
     
      }
    else{
     
      }

    
      return styles;
     
  }                                                                                                                                                                                                                                                           

}