import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-detail',
  imports: [RouterModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
  constructor(private location: Location) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  goBack() {
    this.location.back();
  }
}
