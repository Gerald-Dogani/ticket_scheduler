import { Component, OnInit } from '@angular/core';
import {Ticket} from "@shared/models/ticket.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tickets: Ticket[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
