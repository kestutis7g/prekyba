using System.ComponentModel.DataAnnotations;
namespace ShopAPI.Model
{
    public class OrderModel
    {
        [Key]
        public int number { get; set; }
        public string date { get; set; }
        public double sum { get; set; }
        public double discount { get; set; }
        public string comment { get; set; }
        public string status { get; set; }
        public int userId { get; set; }
    }
}