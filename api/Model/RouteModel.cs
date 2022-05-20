using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class RouteModel
    {
        public OrderModel Order { get; set; }
        [Key]
        public int Id { get; set; }
        public string DispatchDate { get; set; }
        public string DeliveryDate { get; set; }
        public int OrderNumber { get; set; }
        public int AddressId { get; set; }
        public int UserId { get; set; }

    }
}