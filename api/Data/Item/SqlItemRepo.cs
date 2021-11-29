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

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public async Task<IEnumerable<ItemModel>> GetItemListAsync()
        {
            var itemList = _context.Items.ToList();

            return itemList;
        }
        public async Task<ItemModel> GetItemByIdAsync(int id)
        {
            var item = _context.Items.FirstOrDefault(x => x.Id == id);

            return item;
        }

        public async Task CreateItemAsync(ItemModel itemModel)
        {
            _context.Items.Add(itemModel);
        }

        public async Task UpdateItemAsync(ItemModel itemModel)
        {
            //nothing to see here
        }
    }
}