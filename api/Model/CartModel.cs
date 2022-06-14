using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class CartModel : BaseEntity
    {
        public Guid UserId { get; set; }

        public UserModel User { get; set; }

        public Guid ItemId { get; set; }

        public ItemModel Item { get; set; }

        public int Quantity { get; set; }
    }
}