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

        public DbSet<ItemModel> Items { get; set; }
        public DbSet<CartModel> Carts { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<OrderModel> Order { get; set; }
        public DbSet<ItemBalanceModel> ItemBalance { get; set; }
        public DbSet<OrderItemModel> OrderItem { get; set; }
        public DbSet<RouteModel> Route { get; set; }
        public DbSet<AddressModel> Address { get; set; }

        #region Required
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CartModel>()
                .HasOne(x => x.Item)
                .WithMany()
                .HasForeignKey(x => x.ItemId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
        #endregion
    }
}