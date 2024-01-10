import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  updateContactRequest: Contact = {
    id: '',
    username: '',
    mail: '',
    phoneNo: '',
    skillset: '',
    hobby: '', 
  };
  constructor(
    private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.contactService.getContact(id).subscribe({
            next: (contact) => {
              this.updateContactRequest = contact;
            },
          });
        }
      },
    });
  }
  updateContact() {
    this.contactService
      .updateContact(this.updateContactRequest.id, this.updateContactRequest)
      .subscribe({
        next: (response) => {
          this.router.navigate(['contacts']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
