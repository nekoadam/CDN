using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMS.API.Data;
using PMS.API.Models;

namespace PMS.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly PMSDbContext _pmsDbContext;

        public ContactsController(PMSDbContext pmsDbContext)
        {
            this._pmsDbContext = pmsDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await _pmsDbContext.Contacts.ToListAsync();

            return Ok(contacts);
        }

        [HttpPost]
        public async Task<IActionResult> AddContact([FromBody] Contact contact)
        {
            contact.Id = Guid.NewGuid();

            await _pmsDbContext.Contacts.AddAsync(contact);
            await _pmsDbContext.SaveChangesAsync();

            return Ok(contact);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetContact(Guid id)
        {
            var contact = await _pmsDbContext.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if(contact == null)
                return NotFound();

            return Ok(contact);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, Contact updateContactRequest)
        {
            var contact = await _pmsDbContext.Contacts.FindAsync(id);

            if (contact == null)
                return NotFound();

            contact.Username = updateContactRequest.Username;
            contact.Mail = updateContactRequest.Mail;
            contact.PhoneNo = updateContactRequest.PhoneNo;
            contact.Skillset = updateContactRequest.Skillset;
            contact.Hobby = updateContactRequest.Hobby;

            await _pmsDbContext.SaveChangesAsync();

            return Ok(contact);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            var contact = await _pmsDbContext.Contacts.FindAsync(id);

            if (contact == null)
                return NotFound();

            _pmsDbContext.Contacts.Remove(contact);
            await _pmsDbContext.SaveChangesAsync();

            return Ok(contact);
        }
    }
}
