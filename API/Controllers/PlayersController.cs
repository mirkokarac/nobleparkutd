using Application.Players.Commands;
using Application.Players.Queries;
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
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlayer(Player player)
        {
            return Ok(await Mediator.Send(new Create.Command{Player = player}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPlayer(Guid id, Player player)
        {
            player.Id = id;

            return Ok(await Mediator.Send(new Edit.Command{Player = player}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}