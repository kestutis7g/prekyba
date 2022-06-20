using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.User
{
    public interface IUserRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<UserModel>> GetUserListAsync();
        Task<UserModel> GetUserByIdAsync(Guid id);
        Task<UserModel> GetUserByLoginAsync(string login);
        Task CreateUserAsync(UserModel userModel);
        Task UpdateUserAsync(UserModel userModel);
        Task DeleteUserAsync(Guid id);
    }
}