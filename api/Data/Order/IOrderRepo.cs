using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.Order
{
    public interface IOrderRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<OrderModel>> GetOrderListAsync();
        Task<OrderModel> GetOrderByNumberAsync(Guid number);
        Task<List<OrderModel>> GetOrderListByUserIdAsync(Guid userId);
        Task CreateOrderAsync(OrderModel orderModel);
        Task UpdateOrderAsync(OrderModel orderModel);
        Task DeleteOrderAsync(Guid number);
    }
}