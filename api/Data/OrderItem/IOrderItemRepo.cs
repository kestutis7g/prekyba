using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.OrderItem
{
    public interface IOrderItemRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<OrderItemModel>> GetOrderItemListAsync();
        Task<List<OrderItemModel>> GetOrderItemListByOrderNumberAsync(Guid orderNumber);
        Task CreateOrderItemAsync(OrderItemModel orderItemModel);
        Task UpdateOrderItemAsync(OrderItemModel orderItemModel);
        Task DeleteOrderItemAsync(Guid id);
    }
}