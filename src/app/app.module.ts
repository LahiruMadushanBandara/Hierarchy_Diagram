import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import '@progress/kendo-ui';
import { CardComponent } from './card/card.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartPureComponent } from './chart-pure/chart-pure.component';
import { CentralNodeComponent } from './central-node/central-node.component';
import { ChildNodeComponent } from './child-node/child-node.component';


  
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    CardComponent,
    ChartPureComponent,
    CentralNodeComponent,
    ChildNodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
