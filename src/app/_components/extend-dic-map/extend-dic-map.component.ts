import { Component, OnInit, ViewChild } from '@angular/core';
import { parcel } from 'src/app/_models';
import { ParcelService } from 'src/app/_services';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extend-dic-map',
  templateUrl: './extend-dic-map.component.html',
  styleUrls: ['./extend-dic-map.component.css']
})
export class ExtendDicMapComponent implements OnInit {

  mapp: mapboxgl.Map;
  displayedColumns = ['name', 'actions'];
  parcels_user: parcel[] = [];
  draw: MapboxDraw;
  ParcelTextField:any;
  labelWarning:any
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<parcel>;

  constructor(
    private _parcelService: ParcelService,
    public dialog: MatDialog,
    private router: Router
  ) { }


  MapBox() {

    this.mapp = new mapboxgl.Map({

      accessToken: environment.mapbox.accessToken,
      container: 'mapp',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.009151, 40.705189],

    });

    this.draw =new MapboxDraw ({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
        combine_features: true,
        uncombine_features: true,

      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.

    });

    this.mapp.addControl(this.draw, 'top-left');
    
  }



  ngOnInit(): void {
    this.ParcelTextField=document.getElementById("parcelText");
    this.labelWarning=document.getElementById("labelWarning");
    this.get_parcels();
    this.MapBox();
  }

  get_parcels() {
    this._parcelService.get_user_parcel().subscribe(
      (data: parcel[]) => {

        this.parcels_user = data;
       
      }
    )


  }

  deleteUserParcel(i: number, id: number, name: string) {
    console.warn("silinecek id=" + id);
    this._parcelService.delete_parcel(id.toString()).subscribe
      (
        (data: parcel) => {
          console.warn("silindi");
          this.parcels_user.splice(i, 1);
          this.table.renderRows();

        }
      )
  }
  bip(id) {
    this._parcelService.get_geometry_parcel(id).subscribe(
      (data: any) => {
        try {
          this.mapp.removeLayer('CityLayer');
          this.mapp.removeSource('CityMAP');
        } catch (e) { }
        this.mapp.addSource('CityMAP', {
          'type': 'geojson',
          'data': data['features'][0]['geometry']
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

      }
    )
  }
  
  
  addUserParcel() {
   let data= this.draw.getAll().features;
    if (data.length==1 && this.ParcelTextField.value!="") 
    {

      let p=new parcel;
      p.name=this.ParcelTextField.value;
      p.type=3;
      p.poly=JSON.stringify(data[0]);
      this._parcelService.add_user_parcel(p).subscribe(
        (data: parcel) => {
          this.router.navigate(['/home']);
        }
      )
    }
   
    else
    {
      this.labelWarning.innerHTML=
      "<p></p><p>1-add a name</p><p>2-add a polygon or combine multiple polygons</p>";
    }

  }
}
