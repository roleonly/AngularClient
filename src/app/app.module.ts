import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { COMPONENTS,MODULES,PROVIDERS } from "./app.imports";
import { ExtendDicPremadeComponent } from './_components/extend-dic-premade/extend-dic-premade.component';
import { MinimenuComponent } from './_components/minimenu/minimenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RastertiffComponent } from './_components/rastertiff/rastertiff.component';
import { RasterComponent } from './_components/raster/raster.component';
import { RasterpngComponent } from './_components/rasterpng/rasterpng.component';





@NgModule({
  declarations: [
    
    COMPONENTS,
         RastertiffComponent,
         RasterComponent,
         RasterpngComponent
    
  ],
  imports: [
    MODULES,
    BrowserAnimationsModule
  ],
  providers: [
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
