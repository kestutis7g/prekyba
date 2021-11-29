using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class ItemModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Quantity { get; set; }
        public double Discount { get; set; }
        public string Type { get; set; }

    }
}