import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent,LoginComponent,RegisterComponent } from './_components';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ErrorInterceptor,JwtInterceptor } from "./_helpers";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExtendDicPremadeComponent } from './_components/extend-dic-premade/extend-dic-premade.component';
import { MinimenuComponent } from './_components/minimenu/minimenu.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtendDicMapComponent } from './_components/extend-dic-map/extend-dic-map.component';
export function tokenGetter() {
    return localStorage.getItem("user")["access_token"];
    
}

export const COMPONENTS : any[] = [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ExtendDicPremadeComponent,
    MinimenuComponent,
    AppComponent,
    ExtendDicMapComponent,
];

export const MODULES : any[] = [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatDialogModule,
        BrowserAnimationsModule
   
];

export const PROVIDERS : any[] = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];