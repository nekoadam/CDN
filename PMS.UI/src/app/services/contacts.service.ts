import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  baseApiUrl: string = "https://localhost:7296";

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseApiUrl + '/api/contacts');
  }

  addContact(newContact: Contact): Observable<Contact> {
    newContact.id  = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Contact>(this.baseApiUrl + '/api/Contacts', newContact);
  }
  
  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(this.baseApiUrl + '/api/contacts/' + id);
  }
  
  updateContact(id: string, updateContactRequest: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.baseApiUrl + '/api/contacts/' + id, updateContactRequest);
  }
  
  deleteContact(id: string): Observable<Contact> {
    return this.http.delete<Contact>(this.baseApiUrl + '/api/contacts/' + id);
  }
  
}
