import { Component, Input, OnInit } from '@angular/core';
import { Chef } from 'src/app/core/models/chef.model';

@Component({
  selector: 'app-chef-card',
  templateUrl: './chef-card.component.html',
  styleUrls: ['./chef-card.component.css']
})
export class ChefCardComponent implements OnInit {

  @Input() Chef: Chef

  constructor() { }

  ngOnInit(): void {
  }

}
