using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.Item;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        public ItemController(IItemRepo repository)
        {
            _repository = repository;
        }

        public readonly IItemRepo _repository;

        // GET api/item
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemModel>>> GetItemListAsync()
        {
            var itemList = await _repository.GetItemListAsync();
            if (itemList is null)
            {
                return NotFound();
            }
            return Ok(itemList);
        }


        // GET api/item/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemModel>> GetItemByIdAsync([FromRoute] int id)
        {
            var itemFromRepo = await _repository.GetItemByIdAsync(id);
            if (itemFromRepo is null)
            {
                return NotFound();
            }
            return Ok(itemFromRepo);
        }

        // POST api/item
        [HttpPost]
        public async Task<ActionResult> CreateItemAsync([FromBody] ItemModel itemModel)
        {
            await _repository.CreateItemAsync(itemModel);

            _repository.SaveChanges();

            return NoContent();
        }

        // PUT api/item
        [HttpPut]
        public async Task<ActionResult> UpdateItemAsync([FromBody] ItemModel itemModel)
        {
            await _repository.UpdateItemAsync(itemModel);

            _repository.SaveChanges();

            return NoContent();
        }

        // Delete api/item/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItemByIdAsync([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid item id");

            using (ShopContext dbContext = new ShopContext())
            {
                dbContext.Employees.Remove(dbContext.Employees.FirstOrDefault(e => e.ID == id));
                dbContext.SaveChanges();
            }

            return Ok();
        }
    }
}