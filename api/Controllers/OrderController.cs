using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.Order;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        public OrderController(IOrderRepo repository)
        {
            _repository = repository;
        }

        public readonly IOrderRepo _repository;

        // GET api/order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderModel>>> GetOrderListAsync()
        {
            var orderList = await _repository.GetOrderListAsync();
            if (orderList is null)
            {
                return NotFound();
            }
            return Ok(orderList);
        }
        // GET api/order/{number}
        [HttpGet("{number}")]
        public async Task<ActionResult<OrderModel>> GetOrderByNumberAsync([FromRoute] int number)
        {
            var orderFromRepo = await _repository.GetOrderByNumberAsync(number);
            if (orderFromRepo is null)
            {
                return NotFound();
            }
            return Ok(orderFromRepo);
        }

        // GET api/order/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<OrderModel>>> GetOrderByUserIdAsync([FromRoute] int userId)
        {
            var orderFromRepo = await _repository.GetOrderByUserIdAsync(userId);
            if (orderFromRepo is null)
            {
                return NotFound();
            }
            return Ok(orderFromRepo);
        }

        // POST api/order
        [HttpPost]
        public async Task<ActionResult> CreateOrderAsync([FromBody] OrderModel orderModel)
        {
            await _repository.CreateOrderAsync(orderModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/order
        [HttpPut]
        public async Task<ActionResult> UpdateOrderAsync([FromBody] OrderModel orderModel)
        {
            await _repository.UpdateOrderAsync(orderModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }


        // Delete api/order/{number}
        [HttpDelete("{number}")]
        public async Task<ActionResult> DeleteOrderByIdAsync([FromRoute] int number)
        {
            await _repository.DeleteOrderAsync(number);

            await _repository.SaveChangesAsync();
            return NoContent();
        }

    }
}