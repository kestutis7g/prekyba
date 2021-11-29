using Microsoft.EntityFrameworkCore;
using ShopAPI.Model;

namespace ShopAPI.Context
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> opt) : base(opt)
        {

        }

        public DbSet<ItemModel> Items { get; set; }
    }
}