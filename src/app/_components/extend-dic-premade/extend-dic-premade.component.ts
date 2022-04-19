import { Component, OnInit, ViewChild } from '@angular/core';
import { parcel } from 'src/app/_models';
import { ParcelService } from 'src/app/_services';

import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-extend-dic-premade',
  templateUrl: './extend-dic-premade.component.html',
  styleUrls: ['./extend-dic-premade.component.css']
})
export class ExtendDicPremadeComponent implements OnInit {

  mapp:mapboxgl.Map;
  displayedColumns = [ 'name','actions'];
  parcels_user:parcel[]=[];
  parcels_city:parcel[]=[];
  parcels_country:parcel[]=[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<parcel>;

  constructor(
    private _parcelService: ParcelService,
    public dialog: MatDialog,
    
  ) { }
  
  MapBox(){
   
    this.mapp = new mapboxgl.Map({
    accessToken: environment.mapbox.accessToken,
    container: 'mapp',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.009151, 40.705189],
  
    });
    
  }
  ngOnInit(): void {
    this.get_parcels();
    this.MapBox();

  }
  
  get_parcels()
  {
    this._parcelService.get_user_parcel().subscribe(
      (data:parcel[])=>{
        
       this.parcels_user=data;
       console.warn(this.parcels_user);
      }
    )
    this._parcelService.get_city_parcel().subscribe(
      (data:parcel[])=>{
        this.parcels_city=data;
        console.warn(this.parcels_city);
      }
    )
    this._parcelService.get_country_parcel().subscribe(
      (data:parcel[])=>{
        this.parcels_country=data;
       

        console.warn(this.parcels_country);
      }
    )

  }

  deleteUserParcel(i:number ,id:number,name:string)
  {
    console.warn ("silinecek id="+id);
    this._parcelService.delete_parcel(id.toString()).subscribe
    ( 
      (data:parcel)=>{
        console.warn("silindi");
        this.parcels_user.splice(i,1);
        this.table.renderRows();
        
      }
    )
  }
 refresh(){}

 bip(id)  {
   this._parcelService.get_geometry_parcel(id).subscribe(
      (data:any)=>{ 
        try{
          this.mapp.removeLayer('CityLayer');
          this.mapp.removeSource('CityMAP');
          }catch(e){}
          this.mapp.addSource('CityMAP', {
            'type': 'geojson',
            'data':data['features'][0]['geometry']
          });
          this.mapp.addLayer({
            'id': 'CityLayer',
            'type': 'fill',
            'source': 'CityMAP',
            'paint': {
            'fill-color': 'red',
            'fill-opacity': 0.5
            },
          });
          
          let coordinate=(data.features[0].geometry.coordinates[0][0]);
          
          
          let bounds = new mapboxgl.LngLatBounds(
            coordinate[0],
            coordinate[1]
            );
            for (const coord of coordinate) {
              bounds.extend(coord);
              }

              this.mapp.fitBounds(bounds, {
                padding: 20
                });

      });


         

 }
    





 AddtoUserParcel(i:number ,id:number,name:string)
 {
  
        this._parcelService.add_parcel(id).subscribe(
          (data2:parcel)=>{
            let data=JSON.stringify(data2);
            console.warn("eklendi");
            console.warn("aaaaaaaa+"+data['id']);
            this.parcels_user.push(
              
              data2);
                        
            this.table.renderRows();
          }
        )

 }

}




