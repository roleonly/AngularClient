import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { rastertiff } from 'src/app/_models';
import { RasterService } from 'src/app/_services';
@Component({
  selector: 'app-rastertiff',
  templateUrl: './rastertiff.component.html',
  styleUrls: ['./rastertiff.component.css']
})
export class RastertiffComponent implements OnInit {
  @Input() rid: number;
  @Input() rastername:string="";
  raster_data:rastertiff={
    id:0,
    latitude:0,
    longitude:0,
    URL:"",
    elevation_min:0,
    elevation_max:0,
    width:0,
    height:0,
    scale:0,
  };
  constructor(
    private _rasterService: RasterService,
  ) { }
  

  ngOnInit(): void {
this.get_raster_tiff(this.rid);

  }

  get_raster_tiff(id)
{
  this._rasterService.get_raster_tiff(id).subscribe(
    (data:rastertiff)=>{
      this.raster_data=data;
    }
  )
}
ngOnChanges(changes: SimpleChanges) {
  this.get_raster_tiff(this.rid);
}

}
