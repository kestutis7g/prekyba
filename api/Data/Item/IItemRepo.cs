using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.Item
{
    public interface IItemRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<ItemModel>> GetItemListAsync();
        Task<ItemModel> GetItemByIdAsync(Guid id);
        Task<List<ItemModel>> GetItemListByUserIdAsync(Guid userId);
        Task CreateItemAsync(ItemModel itemModel);
        Task UpdateItemAsync(ItemModel itemModel);
        Task DeleteItemAsync(ItemModel itemModel);
    }
}