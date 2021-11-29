using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class ItemModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public int Discount { get; set; }
        public string Type { get; set; }

    }
}