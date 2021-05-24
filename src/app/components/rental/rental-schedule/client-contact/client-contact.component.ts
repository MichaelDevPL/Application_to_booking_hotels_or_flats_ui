import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../../../../shared/services/user.service';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserContactDataModel} from '../../../../shared/models/rental/user-contact-data.model';

@Component({
  selector: 'app-client-contact',
  templateUrl: './client-contact.component.html',
  styleUrls: ['./client-contact.component.scss']
})
export class ClientContactComponent implements OnInit {

  @Input() clientId: bigint;
  @Output() closerContact = new EventEmitter<void>();
  public contactData: UserContactDataModel;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.userContactData(this.clientId)
      .subscribe(value => {
        this.contactData = value;
      });
  }

  public close(): void {
    this.closerContact.emit();
  }

  public OnEvent(event: Event): void {
    event.stopPropagation();
  }

}
