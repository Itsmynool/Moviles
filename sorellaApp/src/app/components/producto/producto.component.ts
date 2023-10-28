import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent  implements OnInit {

  @Input() producto: any;
  @Input() index!: number;


  constructor() { }

  ngOnInit() {}

  guardaStorage(){
    
  }

}
