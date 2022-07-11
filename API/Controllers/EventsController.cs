using Application.Events.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Events;

public class EventsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Event>>> GetEvents()
    {
        return await Mediator.Send(new List.Query());
    }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }    
}