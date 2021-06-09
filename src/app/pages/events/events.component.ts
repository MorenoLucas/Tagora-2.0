import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  public user$: Observable<any> = this.userService.afAuth.user;
  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await console.log(this.userService.getCurrentUser());
  }
}
