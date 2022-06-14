using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.OrderItem;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemController : ControllerBase
    {
        public OrderItemController(IOrderItemRepo repository)
        {
            _repository = repository;
        }

        public readonly IOrderItemRepo _repository;

        // GET api/orderItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItemModel>>> GetOrderItemListAsync()
        {
            var orderItemList = await _repository.GetOrderItemListAsync();
            if (orderItemList is null)
            {
                return NotFound();
            }
            return Ok(orderItemList);
        }

        // GET api/orderItem/{orderNumber}
        [HttpGet("list/{orderNumber}")]
        public async Task<ActionResult<List<OrderItemModel>>> GetOrderItemListByOrderNumberAsync([FromRoute] Guid orderNumber)
        {
            var orderItemFromRepo = await _repository.GetOrderItemListByOrderNumberAsync(orderNumber);
            if (orderItemFromRepo is null)
            {
                return NotFound();
            }
            return Ok(orderItemFromRepo);
        }

        // POST api/orderItem
        [HttpPost]
        public async Task<ActionResult> CreateOrderItemAsync([FromBody] OrderItemModel orderItemModel)
        {
            await _repository.CreateOrderItemAsync(orderItemModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/orderItem
        [HttpPut]
        public async Task<ActionResult> UpdateOrderItemAsync([FromBody] OrderItemModel orderItemModel)
        {
            await _repository.UpdateOrderItemAsync(orderItemModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }


        // Delete api/orderItem/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrderItemByIdAsync([FromRoute] Guid id)
        {
            await _repository.DeleteOrderItemAsync(id);

            await _repository.SaveChangesAsync();
            return NoContent();
        }

    }
}