import { Component, OnInit } from '@angular/core';
import { DBCatcherService } from 'src/app/services/dbcatcher.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private dbCatcher: DBCatcherService) { }

  ngOnInit(): void {
  }

}
