using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.ItemBalance;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemBalanceController : ControllerBase
    {
        public ItemBalanceController(IItemBalanceRepo repository)
        {
            _repository = repository;
        }

        public readonly IItemBalanceRepo _repository;

        // GET api/itemBalance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemBalanceModel>>> GetItemBalanceListAsync()
        {
            var itemBalanceList = await _repository.GetItemBalanceListAsync();
            if (itemBalanceList is null)
            {
                return NotFound();
            }
            return Ok(itemBalanceList);
        }

        // GET api/itemBalance/{itemId}
        [HttpGet("list/{itemId}")]
        public async Task<ActionResult<List<ItemBalanceModel>>> GetItemBalanceListByItemIdAsync([FromRoute] int itemId)
        {
            var itemBalanceFromRepo = await _repository.GetItemBalanceListByItemIdAsync(itemId);
            if (itemBalanceFromRepo is null)
            {
                return NotFound();
            }
            return Ok(itemBalanceFromRepo);
        }

        // POST api/itemBalance
        [HttpPost]
        public async Task<ActionResult> CreateItemBalanceAsync([FromBody] ItemBalanceModel itemBalanceModel)
        {
            await _repository.CreateItemBalanceAsync(itemBalanceModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/itemBalance
        [HttpPut]
        public async Task<ActionResult> UpdateItemBalanceAsync([FromBody] ItemBalanceModel itemBalanceModel)
        {
            await _repository.UpdateItemBalanceAsync(itemBalanceModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }


        // Delete api/itemBalance/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItemBalanceByIdAsync([FromRoute] int id)
        {
            await _repository.DeleteItemBalanceAsync(id);

            await _repository.SaveChangesAsync();
            return NoContent();
        }

    }
}