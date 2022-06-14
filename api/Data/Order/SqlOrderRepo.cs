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
            var orderList = _context.Order.ToList();

            return await Task.FromResult(orderList);
        }

        public async Task<OrderModel> GetOrderByNumberAsync(Guid number)
        {
            OrderModel order = await _context.Order.FirstOrDefaultAsync(x => x.Id == number);

            return order;
        }

        public async Task<List<OrderModel>> GetOrderListByUserIdAsync(Guid userId)
        {
            var orderListByBuyer = _context.Order.Where(x => x.UserId == userId).ToList();

            return await Task.FromResult(orderListByBuyer);
        }

        public async Task CreateOrderAsync(OrderModel orderModel)
        {
            await _context.Order.AddAsync(orderModel);
        }

        public async Task UpdateOrderAsync(OrderModel orderModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteOrderAsync(Guid number)
        {
            OrderModel order = await _context.Order.FirstOrDefaultAsync(x => x.Id == number);
            if (order is null)
            {
                throw new ArgumentException(nameof(order));
            }
            await Task.FromResult(_context.Order.Remove(order));

        }

    }
}