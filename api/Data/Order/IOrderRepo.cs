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
        Task<OrderModel> GetOrderByNumberAsync(int number);
        Task<List<OrderModel>> GetOrderByUserIdAsync(int userId);
        Task CreateOrderAsync(OrderModel orderModel);
        Task UpdateOrderAsync(OrderModel orderModel);
        Task DeleteOrderAsync(int number);
    }
}