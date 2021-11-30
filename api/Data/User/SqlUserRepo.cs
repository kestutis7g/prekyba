using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Context;

namespace ShopAPI.Data.User
{
    public class SqlUserRepo : IUserRepo
    {
        public SqlUserRepo(ShopContext context)
        {
            _context = context;
        }
        private readonly ShopContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserModel>> GetUserListAsync()
        {
            var userList = _context.Users.ToList();

            return await Task.FromResult(userList);
        }
        /*
        public async Task<UserModel> GetUserByIdAsync(int id)
        {
            UserModel user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            return user;
        }*/

        public async Task<UserModel> GetUserByLoginAsync(string login)
        {
            UserModel user = await _context.Users.FirstOrDefaultAsync(x => x.Login == login);

            return user;
        }

        public async Task CreateUserAsync(UserModel userModel)
        {
            await _context.Users.AddAsync(userModel);
        }

        public async Task UpdateUserAsync(UserModel userModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteUserAsync(int id)
        {
            UserModel user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user is null)
            {
                throw new ArgumentException(nameof(user));
            }
            await Task.FromResult(_context.Users.Remove(user));

        }

    }
}