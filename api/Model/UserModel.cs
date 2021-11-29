using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Type { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

    }
}