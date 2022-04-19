import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { rastertiff,rasterpng} from "../../_models";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RasterService {

  constructor(private http: HttpClient) { }

  get_raster_tiff(rid:number):Observable<rastertiff> {
    const url: string = `${environment.apiUrl}raster/tif/?rid=`;
      let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.get<rastertiff>(url+rid , options);
    
    
    
    
  }
 get_png(rid:number):Observable<rasterpng[]> {
  const url: string = `${environment.apiUrl}raster/png/?rid=`;
    let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  return this.http.get<rasterpng[]>(url+rid, options);
  
  
}

create_png(rid:number):Observable<rasterpng> {
  const url: string = `${environment.apiUrl}raster/png/?rid=`;
    let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  return this.http.post<rasterpng>(url+rid, options);
}
  
delete_png(rid:number) {
  const url: string = `${environment.apiUrl}raster/png/?rid=`;
    let options = { 
    headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    return this.http.delete(url+rid, options);
    
      



}

}

