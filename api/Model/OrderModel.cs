using System.ComponentModel.DataAnnotations;
namespace ShopAPI.Model
{
    public class OrderModel : BaseEntity
    {
        public string Date { get; set; }
        public double? Sum { get; set; }
        public double? Discount { get; set; }
        public string Comment { get; set; }
        public string Status { get; set; }
        public Guid? UserId { get; set; }
        public UserModel User { get; set; }
    }
}