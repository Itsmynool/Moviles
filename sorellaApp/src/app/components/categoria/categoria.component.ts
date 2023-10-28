import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  @Input() categoria : any;
  @Input() index!: any;

  constructor() {}

  ngOnInit() {}
}

