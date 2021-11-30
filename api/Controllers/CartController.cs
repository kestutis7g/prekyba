using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.Cart;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        public CartController(ICartRepo repository)
        {
            _repository = repository;
        }

        public readonly ICartRepo _repository;

        // GET api/cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartModel>>> GetCartListAsync()
        {
            var cartList = await _repository.GetCartListAsync();
            if (cartList is null)
            {
                return NotFound();
            }
            return Ok(cartList);
        }


        // GET api/cart/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<CartModel>>> GetCartListByIdAsync([FromRoute] int id)
        {
            var cartFromRepo = await _repository.GetCartListByIdAsync(id);
            if (cartFromRepo is null)
            {
                return NotFound();
            }
            return Ok(cartFromRepo);
        }

        // POST api/cart
        [HttpPost]
        public async Task<ActionResult> CreateCartAsync([FromBody] CartModel cartModel)
        {
            await _repository.CreateCartAsync(cartModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/cart
        [HttpPut]
        public async Task<ActionResult> UpdateCartAsync([FromBody] CartModel cartModel)
        {
            await _repository.UpdateCartAsync(cartModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // Delete api/cart/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCartByIdAsync([FromRoute] int id)
        {

            await _repository.DeleteCartAsync(id);

            await _repository.SaveChangesAsync();
            return NoContent();
        }
    }
}