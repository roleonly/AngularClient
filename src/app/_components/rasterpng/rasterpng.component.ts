import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { rasterpng } from 'src/app/_models';
import { RasterService } from 'src/app/_services';
import { RasterComponent } from '../raster/raster.component';
@Component({
  selector: 'app-rasterpng',
  templateUrl: './rasterpng.component.html',
  styleUrls: ['./rasterpng.component.css']
})
export class RasterpngComponent implements OnInit {
  @Input() rid: number;
  raster_data:rasterpng[]=[];
  constructor( private _rasterService: RasterService,
    private _rasterComponent:RasterComponent) { }
    

  ngOnInit(): void {

    this.get_raster_png(this.rid);
  }
  get_raster_png(id)
{
  this._rasterService.get_png(id).subscribe(
    (data:rasterpng[])=>{
      this.raster_data=data;
     
    }
  )
}
ngOnChanges(changes: SimpleChanges) {
  //this.get_raster_png(this.rid);
  this.raster_data=[];
  this.ngOnInit();
}

add_to_map(id:number)
{
  console.warn(id)
}

create_dem(id:number)
{
  this._rasterService.create_png(id).subscribe(
    (data:rasterpng)=>{

      console.warn(data);
      
      
      this.ngOnInit();
     
    }
  )


}

deleteDem(id:number)
{
  
  this._rasterService.delete_png(id).subscribe(
    (data:rasterpng)=>{
        
        console.warn(data);
        
        this.raster_data=[];
        this.ngOnInit();
      
      }
  )
}

public putMAP(color_range:string,url:string):void
{
this._rasterComponent.MapBoxAddLayer(color_range, url);

}




}
