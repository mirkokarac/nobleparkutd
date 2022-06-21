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
            return await Mediator.Send(new Details.Query(){Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlayer(Player player)
        {
            return Ok(await Mediator.Send(new Create.Command(){Player = player}));
        }
    }
}