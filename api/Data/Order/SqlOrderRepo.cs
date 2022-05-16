using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Context;

namespace ShopAPI.Data.Order
{
    public class SqlOrderRepo : IOrderRepo
    {
        public SqlOrderRepo(ShopContext context)
        {
            _context = context;
        }
        private readonly ShopContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<OrderModel>> GetOrderListAsync()
        {
            var orderList = _context.Orders.ToList();

            return await Task.FromResult(orderList);
        }
        
        public async Task<OrderModel> GetOrderByNumberAsync(int number)
        {
            OrderModel order = await _context.Orders.FirstOrDefaultAsync(x => x.number == number);

            return order;
        }

        public async Task<List<OrderModel>> GetOrderByUserIdAsync(int userId)
        {
            List<OrderModel> orderList = new List<OrderModel>();
            var orderListByBuyer = _context.Orders.Where(x => x.userId == userId).ToList();

            //var itemList = await _context.Items.Where(x => x.Id.Contains(itemListByUser));

            return await Task.FromResult(orderList);
        }

        public async Task CreateOrderAsync(OrderModel orderModel)
        {
            await _context.Orders.AddAsync(orderModel);
        }

        public async Task UpdateOrderAsync(OrderModel orderModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteOrderAsync(int number)
        {
            OrderModel order = await _context.Orders.FirstOrDefaultAsync(x => x.number == number);
            if (order is null)
            {
                throw new ArgumentException(nameof(order));
            }
            await Task.FromResult(_context.Orders.Remove(order));

        }

    }
}