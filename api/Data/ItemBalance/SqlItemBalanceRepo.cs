using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Context;

namespace ShopAPI.Data.ItemBalance
{
    public class SqlItemBalanceRepo : IItemBalanceRepo
    {
        public SqlItemBalanceRepo(ShopContext context)
        {
            _context = context;
        }
        private readonly ShopContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ItemBalanceModel>> GetItemBalanceListAsync()
        {
            var itemBalanceList = _context.ItemBalance.ToList();

            return await Task.FromResult(itemBalanceList);
        }

        public async Task<List<ItemBalanceModel>> GetItemBalanceListByItemIdAsync(int itemId)
        {
            var itemBalanceListByItemId = _context.ItemBalance.Where(x => x.ItemId == itemId).ToList();

            return await Task.FromResult(itemBalanceListByItemId);
        }
        public async Task<List<ItemBalanceModel>> GetItemBalanceListByDateAsync(string date)
        {
            var itemBalanceListByDate = _context.ItemBalance.Where(x => x.Date == date).ToList();

            return await Task.FromResult(itemBalanceListByDate);
        }

        public async Task CreateItemBalanceAsync(ItemBalanceModel itemBalanceModel)
        {
            await _context.ItemBalance.AddAsync(itemBalanceModel);
        }

        public async Task UpdateItemBalanceAsync(ItemBalanceModel itemBalanceModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteItemBalanceAsync(int id)
        {
            ItemBalanceModel itemBalance = await _context.ItemBalance.FirstOrDefaultAsync(x => x.Id == id);
            if (itemBalance is null)
            {
                throw new ArgumentException(nameof(itemBalance));
            }
            await Task.FromResult(_context.ItemBalance.Remove(itemBalance));

        }

    }
}