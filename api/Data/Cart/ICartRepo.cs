using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.Cart
{
    public interface ICartRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<CartModel>> GetCartListAsync();
        Task<IEnumerable<CartModel>> GetCartListByIdAsync(int id);
        Task CreateCartAsync(CartModel cartModel);
        Task UpdateCartAsync(CartModel cartModel);
        Task DeleteCartAsync(int id);
    }
}