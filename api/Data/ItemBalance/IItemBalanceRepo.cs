using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.ItemBalance
{
    public interface IItemBalanceRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<ItemBalanceModel>> GetItemBalanceListAsync();
        Task<List<ItemBalanceModel>> GetItemBalanceListByItemIdAsync(int itemId);
        Task<List<ItemBalanceModel>> GetItemBalanceListByDateAsync(string date);
        Task CreateItemBalanceAsync(ItemBalanceModel itemBalanceModel);
        Task UpdateItemBalanceAsync(ItemBalanceModel itemBalanceModel);
        Task DeleteItemBalanceAsync(int id);
    }
}