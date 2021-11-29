using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Context;

namespace ShopAPI.Data.Item
{
    public class SqlItemRepo : IItemRepo
    {
        public SqlItemRepo(ShopContext context)
        {
            _context = context;
        }
        private readonly ShopContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ItemModel>> GetItemListAsync()
        {
            var itemList = _context.Items.ToList();

            return await Task.FromResult(itemList);
        }
        public async Task<ItemModel> GetItemByIdAsync(int id)
        {
            ItemModel item = (ItemModel)_context.Items.FirstOrDefault(x => x.Id == id);

            return await Task.FromResult(item);
        }

        public async Task CreateItemAsync(ItemModel itemModel)
        {
            _context.Items.AddAsync(itemModel);
        }

        public async Task UpdateItemAsync(ItemModel itemModel)
        {
            //nothing to see here
        }

        public async Task DeleteItemAsync(ItemModel item)
        {
            if (item is null)
            {
                throw new ArgumentException(nameof(item));
            }
            _context.Items.Remove(item);

        }

    }
}