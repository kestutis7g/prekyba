using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Context;

namespace ShopAPI.Data.Address
{
    public class SqlAddressRepo : IAddressRepo
    {
        public SqlAddressRepo(ShopContext context)
        {
            _context = context;
        }
        private readonly ShopContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<AddressModel>> GetAddressListAsync()
        {
            var addressList = _context.Address.ToList();

            return await Task.FromResult(addressList);
        }

        public async Task<AddressModel> GetAddressByIdAsync(Guid id)
        {
            AddressModel address = await _context.Address.FirstOrDefaultAsync(x => x.Id == id);

            return address;
        }

        public async Task CreateAddressAsync(AddressModel addressModel)
        {
            await _context.Address.AddAsync(addressModel);
        }

        public async Task UpdateAddressAsync(AddressModel addressModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteAddressAsync(Guid id)
        {
            AddressModel address = await _context.Address.FirstOrDefaultAsync(x => x.Id == id);
            if (address is null)
            {
                throw new ArgumentException(nameof(address));
            }
            await Task.FromResult(_context.Address.Remove(address));

        }

    }
}