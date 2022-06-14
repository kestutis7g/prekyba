using Microsoft.EntityFrameworkCore;
using ShopAPI.Model;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ShopAPI.Context
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> opt) : base(opt)
        {

        }

        public DbSet<ItemModel> Items => Set<ItemModel>();
        public DbSet<CartModel> Carts => Set<CartModel>();
        public DbSet<UserModel> Users => Set<UserModel>();
        public DbSet<OrderModel> Order => Set<OrderModel>();
        public DbSet<ItemBalanceModel> ItemBalance => Set<ItemBalanceModel>();
        public DbSet<OrderItemModel> OrderItem => Set<OrderItemModel>();
        public DbSet<RouteModel> Route => Set<RouteModel>();
        public DbSet<AddressModel> Address => Set<AddressModel>();

        #region Required
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(System.Reflection.Assembly.GetExecutingAssembly());

        }
        #endregion
    }
}