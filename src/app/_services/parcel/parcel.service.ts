import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { parcel } from "../../_models";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  constructor(
    private http: HttpClient
  ) { }

  get_user_parcel():Observable<parcel[]> {
    const url: string = `${environment.apiUrl}parcel/parcel/`;
      let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<parcel[]>(url, options);
    
  }

  get_country_parcel():Observable<parcel[]> {
    const url: string = `${environment.apiUrl}parcel/country/`;
      let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<parcel[]>(url, options);
    
  }
  get_city_parcel():Observable<parcel[]> {
    const url: string = `${environment.apiUrl}parcel/city/`;
      let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<parcel[]>(url, options);
    
  }

  get_geometry_parcel(id:string):Observable<parcel> {
    const url: string = `${environment.apiUrl}parcel/geometry/?id=`;
      let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<parcel>(url+id, options);
    
  }
delete_parcel(id:string):Observable<parcel> {
  const url: string = `${environment.apiUrl}parcel/parcel/?id=`;
    let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  return this.http.delete<parcel>(url+id, options);
 

}

add_parcel(id:number):Observable<parcel> {
  const url: string = `${environment.apiUrl}parcel/parcel/?id=`;


  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  return this.http.post<parcel>(url+id,  options);
  
  
}

add_user_parcel(parcel:parcel):Observable<parcel> {
  const url: string = `${environment.apiUrl}parcel/map_parcel/`;
    let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  return this.http.post<parcel>(url, parcel, options);
  


}
}
