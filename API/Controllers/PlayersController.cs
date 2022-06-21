using Application.Players;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PlayersController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Player>>> GetPlayers()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(Guid id)
        {
            return Ok();
        }
    }
}