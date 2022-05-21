using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.ItemBalance;
using ShopAPI.Data.Item;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemBalanceController : ControllerBase
    {
        public ItemBalanceController(IItemBalanceRepo repository, IItemRepo itemRepository)
        {
            _repository = repository;
            _itemRepository = itemRepository;
        }


        public readonly IItemBalanceRepo _repository;
        public readonly IItemRepo _itemRepository;


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


        // PUT api/itemBalance
        [HttpPut("daily")]
        public async Task<ActionResult> DailyItemBalanceAsync()
        {
            var itemList = await _itemRepository.GetItemListAsync();

            DateTime time = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 12, 0, 0);
            string date = DateTime.Now.ToString("yyyy-MM-dd");

            List<ItemBalanceModel> todaysItemBalance = await _repository.GetItemBalanceListByDateAsync(date);


            if (todaysItemBalance.Count == 0)
            {
                foreach (var item in itemList)
                {
                    ItemBalanceModel balance = new ItemBalanceModel();
                    balance.Id = 0;
                    balance.Amount = item.Quantity;
                    balance.Date = date;
                    balance.ItemId = item.Id;

                    await _repository.CreateItemBalanceAsync(balance);
                    await _repository.SaveChangesAsync();

                }
            }
            else
            {
                Console.WriteLine("Sendien irasas jau sukurtas");
                return NoContent();
            }



            //await _repository.UpdateItemBalanceAsync(itemBalanceModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

    }
}