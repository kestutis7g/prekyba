using System.ComponentModel.DataAnnotations;
namespace ShopAPI.Model
{
    public class OrderModel
    {
        [Key]
        public int Number { get; set; }
        public string Date { get; set; }
        public double Sum { get; set; }
        public double Discount { get; set; }
        public string Comment { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
    }
}