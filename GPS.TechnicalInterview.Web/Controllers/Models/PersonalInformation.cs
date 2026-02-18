namespace GPS.ApplicationManager.Web.Controllers.Models
{
    public class PersonalInformation
    {
        public Name Name { get; set; } = new Name();

        public string PhoneNumber { get; set; }

        public string Email { get; set; }
    }
}