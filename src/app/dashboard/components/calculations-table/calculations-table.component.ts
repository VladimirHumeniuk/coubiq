import { Component, OnInit } from '@angular/core';
import { CalculationsService } from './../../services/calculations.service';

@Component({
  selector: 'app-calculations-table',
  templateUrl: './calculations-table.component.html',
  styleUrls: ['./calculations-table.component.scss']
})
export class CalculationsTableComponent implements OnInit {

  constructor(
    public calculationService: CalculationsService
  ) {  }

  ngOnInit() {  }

}
