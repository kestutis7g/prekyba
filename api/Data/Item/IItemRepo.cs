using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.Item
{
    public interface IItemRepo
    {
        bool SaveChanges();
        Task<IEnumerable<ItemModel>> GetItemListAsync();
        Task<ItemModel> GetItemByIdAsync(int id);
        Task CreateItemAsync(ItemModel itemModel);
        Task UpdateItemAsync(ItemModel itemModel);

    }
}