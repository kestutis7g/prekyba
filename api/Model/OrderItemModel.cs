using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class OrderItemModel
    {
        public OrderModel Order { get; set; }
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int OrderNumber { get; set; }
        public int ItemId { get; set; }

    }
}