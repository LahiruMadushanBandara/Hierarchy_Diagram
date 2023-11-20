import { DiagramNodeData } from "src/app/models/data.model";

export class PerformanceView {
 
  constructor() {}

  public PerformanceviewDetails(contentDetails: DiagramNodeData , enablePerformanceview: boolean){

    enum PerformanceViewStyle {

      strong = "style='background-color: rgb(242,130,48); color: black;' ",
      Moderate = "style='background-color: rgb(255,219,46); color: black;'",
      Weak = "style='background-color:rgb(0, 185, 85); color: black;'",
      Strongest = "style='background-color: rgb(215,43,63); color: black;'",
      LargelyIneffective= "style='background-color: rgb(215,43,63); color: black;'",
      PartiallyEffective = "style='background-color: rgb(242,130,48); color: black;' ",
      SubstantiallyEffective = "style='background-color: rgb(255,219,46); color: black;'",
      FullyEffective = "style='background-color:rgb(0, 185, 85); color: black;'",
      // OnTrack = "style='background-color: rgb(242,130,48); color: white;  border: none;' ",
      // OffTrack = "style='background-color: rgb(255,219,46); color: white;  border: none;'",
      // Monitor = "style='background-color:rgb(0, 185, 85); color: white;  border: none;'",
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
      // var KPIratings = contentDetails.KPIData.Performance ;

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
      // if(KPIratings == kpiRating.OnTrack )
      // {
      //   var styles = PerformanceViewStyle.OnTrack;
      // }
      // else  if(KPIratings == kpiRating.OffTrack )
      // {
      //   var styles = PerformanceViewStyle.OffTrack;
      // }
      // else  if(KPIratings == kpiRating.Monitor )
      // {
      //   var styles = PerformanceViewStyle.Monitor;
      // }
     
      }
    else{
     
      }

    
      return styles;
     
  }   
  
  // public PerformanceviewDetailsKpi(contentDetails: DiagramNodeData , enablePerformanceview: boolean){

  //   enum PerformanceViewStyle {

  //     OnTrack = "style='background-color: rgb(242,130,48); color: white;  border: none;' ",
  //     OffTrack = "style='background-color: rgb(255,219,46); color: white;  border: none;'",
  //     Monitor = "style='background-color:rgb(0, 185, 85); color: white;  border: none;'",
  //   } 

  //   enum kpiRating{
  //     OnTrack = 'On Track',
  //     OffTrack = 'Off Track',
  //     Monitor = 'Monitor'
  //   }


    
  //   if(enablePerformanceview==true){
      
  //     var KPIratings = contentDetails.KPIData.Performance ;

  //     if(KPIratings == kpiRating.OnTrack )
  //     {
  //       var styles = PerformanceViewStyle.OnTrack;
  //     }
  //     else  if(KPIratings == kpiRating.OffTrack )
  //     {
  //       var styles = PerformanceViewStyle.OffTrack;
  //     }
  //     else  if(KPIratings == kpiRating.Monitor )
  //     {
  //       var styles = PerformanceViewStyle.Monitor;
  //     }
     
  //     }
      
      
  //   else{
     
  //     }

  //     return styles;
  // }
}


export class PerformanceViewKpi {
   
  constructor() {}

 
  
  public PerformanceviewDetailsKpi(contentDetails: DiagramNodeData , enablePerformanceview: boolean){

    enum PerformanceViewStyle {

      OnTrack = "style='background-color: rgb(242,130,48); color: white;  border: none;' ",
      OffTrack = "style='background-color: rgb(255,219,46); color: white;  border: none;'",
      Monitor = "style='background-color:rgb(0, 185, 85); color: white;  border: none;'",
    } 

    enum kpiRating{
      OnTrack = 'On Track',
      OffTrack = 'Off Track',
      Monitor = 'Monitor'
    }


    
    if(enablePerformanceview==true){
      
      var KPIratings = contentDetails.KpiData.Performance ;

      if(KPIratings == kpiRating.OnTrack )
      {
        var styles = PerformanceViewStyle.OnTrack;
      }
      else  if(KPIratings == kpiRating.OffTrack )
      {
        var styles = PerformanceViewStyle.OffTrack;
      }
      else  if(KPIratings == kpiRating.Monitor )
      {
        var styles = PerformanceViewStyle.Monitor;
      }
     
      }
      
      
    else{
     
      }

      return styles;
  }
}