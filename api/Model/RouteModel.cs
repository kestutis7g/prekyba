using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class RouteModel : BaseEntity
    {
        public Guid OrderId { get; set; }

        public OrderModel Order { get; set; }

        public Guid UserId { get; set; }

        public UserModel User { get; set; }

        public Guid AddressId { get; set; }

        public AddressModel Address { get; set; }

        public string DispatchDate { get; set; }

        public string DeliveryDate { get; set; }
    }
}