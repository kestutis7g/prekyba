using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.Address;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        public AddressController(IAddressRepo repository)
        {
            _repository = repository;
        }

        public readonly IAddressRepo _repository;

        // GET api/address
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressModel>>> GetAddressListAsync()
        {
            var addressList = await _repository.GetAddressListAsync();
            if (addressList is null)
            {
                return NotFound();
            }
            return Ok(addressList);
        }

        // GET api/address/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<List<AddressModel>>> GetAddressByIdAsync([FromRoute] Guid id)
        {
            var addressFromRepo = await _repository.GetAddressByIdAsync(id);
            if (addressFromRepo is null)
            {
                return NotFound();
            }
            return Ok(addressFromRepo);
        }

        // POST api/address
        [HttpPost]
        public async Task<ActionResult<AddressModel>> CreateAddressAsync([FromBody] AddressModel addressModel)
        {
            await _repository.CreateAddressAsync(addressModel);

            await _repository.SaveChangesAsync();

            return Ok(addressModel);
        }

        // PUT api/address
        [HttpPut]
        public async Task<ActionResult> UpdateAddressAsync([FromBody] AddressModel addressModel)
        {
            await _repository.UpdateAddressAsync(addressModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }


        // Delete api/address/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAddressByIdAsync([FromRoute] Guid id)
        {
            await _repository.DeleteAddressAsync(id);

            await _repository.SaveChangesAsync();
            return NoContent();
        }

    }
}