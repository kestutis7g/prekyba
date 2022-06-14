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
        public async Task<ActionResult<OrderModel>> GetOrderByNumberAsync([FromRoute] Guid number)
        {
            var orderFromRepo = await _repository.GetOrderByNumberAsync(number);
            if (orderFromRepo is null)
            {
                return NotFound();
            }
            return Ok(orderFromRepo);
        }

        // GET api/order/{userId}
        [HttpGet("list/{userId}")]
        public async Task<ActionResult<List<OrderModel>>> GetOrderListByUserIdAsync([FromRoute] Guid userId)
        {
            var orderFromRepo = await _repository.GetOrderListByUserIdAsync(userId);
            if (orderFromRepo is null)
            {
                return NotFound();
            }
            return Ok(orderFromRepo);
        }

        // POST api/order
        [HttpPost]
        public async Task<ActionResult<OrderModel>> CreateOrderAsync([FromBody] OrderModel orderModel)
        {
            await _repository.CreateOrderAsync(orderModel);

            await _repository.SaveChangesAsync();

            return Ok(orderModel);
        }

        // PUT api/order
        [HttpPut]
        public async Task<ActionResult> UpdateOrderAsync([FromBody] OrderModel orderModel)
        {
            var model = await _repository.GetOrderByNumberAsync(orderModel.Id.Value);

            model.Date = !String.IsNullOrEmpty(orderModel.Date) ? orderModel.Date : model.Date;
            model.Sum = orderModel.Sum != null ? orderModel.Sum : model.Sum;
            model.Discount = orderModel.Discount != null ? orderModel.Discount : model.Discount;
            model.Comment = !String.IsNullOrEmpty(orderModel.Comment) ? orderModel.Comment : model.Comment;
            model.Status = !String.IsNullOrEmpty(orderModel.Status) ? orderModel.Status : model.Status;
            model.UserId = orderModel.UserId != null ? orderModel.UserId : model.UserId;

            await _repository.UpdateOrderAsync(model);

            await _repository.SaveChangesAsync();

            return NoContent();
        }


        // Delete api/order/{number}
        [HttpDelete("{number}")]
        public async Task<ActionResult> DeleteOrderByIdAsync([FromRoute] Guid number)
        {
            await _repository.DeleteOrderAsync(number);

            await _repository.SaveChangesAsync();
            return NoContent();
        }

    }
}