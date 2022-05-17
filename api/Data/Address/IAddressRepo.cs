using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.Address
{
    public interface IAddressRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<AddressModel>> GetAddressListAsync();
        Task<AddressModel> GetAddressByIdAsync(int id);
        Task CreateAddressAsync(AddressModel addressModel);
        Task UpdateAddressAsync(AddressModel addressModel);
        Task DeleteAddressAsync(int id);
    }
}