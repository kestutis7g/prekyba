using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class AddressModel : BaseEntity
    {
        public string City { get; set; }
        public string Street { get; set; }
        public int Building { get; set; }
        public int Apartment { get; set; }
        public int ZipCode { get; set; }
    }
}