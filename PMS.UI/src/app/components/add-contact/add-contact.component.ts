import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent {
  newContact: Contact = {
    id: '',
    username: '',
    mail: '',
    phoneNo: '',
    skillset: '',
    hobby: '', 
  };
 
  constructor(
    private contactService: ContactsService,
    private router: Router
  ) {}

  addContact() {
    this.contactService.addContact(this.newContact).subscribe({
      next: (contact) => {
        this.router.navigate(['contacts']);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
