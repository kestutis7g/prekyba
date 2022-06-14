using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Context;

namespace ShopAPI.Data.OrderItem
{
    public class SqlOrderItemRepo : IOrderItemRepo
    {
        public SqlOrderItemRepo(ShopContext context)
        {
            _context = context;
        }
        private readonly ShopContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<OrderItemModel>> GetOrderItemListAsync()
        {
            var orderItemList = _context.OrderItem.ToList();

            return await Task.FromResult(orderItemList);
        }

        public async Task<List<OrderItemModel>> GetOrderItemListByOrderNumberAsync(Guid orderNumber)
        {
            var orderItemListByOrderNumber = _context.OrderItem.Where(x => x.OrderId == orderNumber).ToList();

            return await Task.FromResult(orderItemListByOrderNumber);
        }

        public async Task CreateOrderItemAsync(OrderItemModel orderItemModel)
        {
            await _context.OrderItem.AddAsync(orderItemModel);
        }

        public async Task UpdateOrderItemAsync(OrderItemModel orderItemModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteOrderItemAsync(Guid id)
        {
            OrderItemModel orderItem = await _context.OrderItem.FirstOrDefaultAsync(x => x.Id == id);
            if (orderItem is null)
            {
                throw new ArgumentException(nameof(orderItem));
            }
            await Task.FromResult(_context.OrderItem.Remove(orderItem));

        }

    }
}