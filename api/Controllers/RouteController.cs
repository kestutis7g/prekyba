using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.Route;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RouteController : ControllerBase
    {
        public RouteController(IRouteRepo repository)
        {
            _repository = repository;
        }

        public readonly IRouteRepo _repository;

        // GET api/route
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RouteModel>>> GetRouteListAsync()
        {
            var routeList = await _repository.GetRouteListAsync();
            if (routeList is null)
            {
                return NotFound();
            }
            return Ok(routeList);
        }

        // GET api/route/{orderNumber}
        [HttpGet("{orderNumber}")]
        public async Task<ActionResult<RouteModel>> GetRouteByOrderNumberAsync([FromRoute] Guid orderNumber)
        {
            var routeFromRepo = await _repository.GetRouteByOrderNumberAsync(orderNumber);
            if (routeFromRepo is null)
            {
                return NotFound();
            }
            return Ok(routeFromRepo);
        }

        // POST api/route
        [HttpPost]
        public async Task<ActionResult> CreateRouteAsync([FromBody] RouteModel routeModel)
        {
            await _repository.CreateRouteAsync(routeModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/route
        [HttpPut]
        public async Task<ActionResult> UpdateRouteAsync([FromBody] RouteModel routeModel)
        {
            await _repository.UpdateRouteAsync(routeModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }


        // Delete api/route/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRouteByIdAsync([FromRoute] Guid id)
        {
            await _repository.DeleteRouteAsync(id);

            await _repository.SaveChangesAsync();
            return NoContent();
        }

    }
}