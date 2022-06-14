using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class OrderItemModel : BaseEntity
    {
        public int Quantity { get; set; }

        public Guid OrderId { get; set; }

        public OrderModel Order { get; set; }

        public Guid ItemId { get; set; }

        public ItemModel Item { get; set; }
    }
}