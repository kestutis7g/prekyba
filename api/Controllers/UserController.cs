using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Data.User;
using ShopAPI.Model;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public UserController(IUserRepo repository)
        {
            _repository = repository;
        }

        public readonly IUserRepo _repository;

        // GET api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUserListAsync()
        {
            var userList = await _repository.GetUserListAsync();
            if (userList is null)
            {
                return NotFound();
            }
            return Ok(userList);
        }

        /*
        // GET api/user/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserByIdAsync([FromRoute] int id)
        {
            var userFromRepo = await _repository.GetUserByIdAsync(id);
            if (userFromRepo is null)
            {
                return NotFound();
            }
            return Ok(userFromRepo);
        }*/

        // GET api/user/{login}
        [HttpGet("{login}")]
        public async Task<ActionResult<UserModel>> GetUserByLoginAsync([FromRoute] string login)
        {
            var userFromRepo = await _repository.GetUserByLoginAsync(login);
            if (userFromRepo is null)
            {
                return NotFound();
            }
            return Ok(userFromRepo);
        }

        // POST api/user
        [HttpPost]
        public async Task<ActionResult> CreateUserAsync([FromBody] UserModel userModel)
        {
            await _repository.CreateUserAsync(userModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/user
        [HttpPut]
        public async Task<ActionResult> UpdateUserAsync([FromBody] UserModel userModel)
        {
            await _repository.UpdateUserAsync(userModel);

            await _repository.SaveChangesAsync();

            return NoContent();
        }


        // Delete api/user/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserByIdAsync([FromRoute] int id)
        {
            await _repository.DeleteUserAsync(id);

            await _repository.SaveChangesAsync();
            return NoContent();
        }

    }
}