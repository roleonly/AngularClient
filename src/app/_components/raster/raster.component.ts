import { Component, OnInit, ViewChild } from '@angular/core';
import { parcel, rastertiff } from 'src/app/_models';
import { RasterService, ParcelService } from 'src/app/_services';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-raster',
  templateUrl: './raster.component.html',
  styleUrls: ['./raster.component.css']

})
export class RasterComponent implements OnInit {
  mapp: mapboxgl.Map;
  displayedColumns = ['name', 'actions'];
  parcels_user: parcel[] = [];
  selected_parcel_id: number;
  selected_parcel_name: string;
  tif: rastertiff;
  colors:any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<parcel>;
  constructor(
    private _rasterservice: RasterService,
    public dialog: MatDialog,
    private _parcelService: ParcelService,

  ) { }

  MapBox() {

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
  get_parcels() {
    this._parcelService.get_user_parcel().subscribe(
      (data: parcel[]) => {

        this.parcels_user = data;

      }
    )
  }
  refresh() { }


  add_raster(i: number, id: number, name: string) {


    this.selected_parcel_id = id;
    this.selected_parcel_name = name;

    this.bip(id)

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
        let coordinate = (data.features[0].geometry.coordinates[0][0]);


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



get_colors(color:string)
{
  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
let lines=color.split('\n');
for (let index = 0; index < lines.length; index++) {
  lines[index]=lines[index].trim();
  //delete last element 
 
}
lines.pop()
lines.pop()
let list1:string[]=[];

for (let index = 0; index < lines.length; index++) 
  {let liness=lines[index].split(' ');
  
  list1.push(liness[0])
  let a=rgbToHex(parseInt(liness[1]),parseInt(liness[2]),parseInt(liness[3]))
  
  list1.push(a);

}
const newArr = [];
while(list1.length) newArr.push(list1.splice(0,2));

console.warn(this.colors)
return (newArr);

}
  public MapBoxAddLayer(color_range: string, url: string) {

    this._rasterservice.get_raster_tiff(this.selected_parcel_id).subscribe(
      (data: rastertiff) => {
        this.tif = data;
        this.colors=this.get_colors(color_range);
        console.warn(this.colors);
        //add legend to mapbox
        

        let coordinates = [


          [this.tif.longitude, this.tif.latitude],
          [this.tif.longitude + (this.tif.width * this.tif.scale), this.tif.latitude],
          [this.tif.longitude + (this.tif.width * this.tif.scale), this.tif.latitude - (this.tif.height * this.tif.scale)],
          [this.tif.longitude, this.tif.latitude - (this.tif.height * this.tif.scale)]

        ]


        try{
        this.mapp.removeLayer('radar-layer');
        this.mapp.removeSource('radar');
        }catch(e){}
        this.mapp.addSource('radar', {
          'type': 'image',
          'url': url,
          'coordinates': coordinates

        }
        ).addLayer({
          id: 'radar-layer',
          'type': 'raster',
          'source': 'radar',

          'paint': {
            'raster-fade-duration': 0

          }
        });

        console.warn(this.mapp.getSource('radar-layer'));

      }

    )













  }


}

