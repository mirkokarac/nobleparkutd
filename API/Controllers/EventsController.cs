using Application.Events.Commands;
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

    [HttpPost]
    public async Task<IActionResult> CreateEvent(Event eventObj)
    {
        return Ok(await Mediator.Send(new Create.Command{Event = eventObj}));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditEvent(Guid id, Event eventObj)
    {
        eventObj.Id = id;

        return Ok(await Mediator.Send(new Edit.Command{Event = eventObj}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(Guid id)
    {
        return Ok(await Mediator.Send(new Delete.Command{Id = id}));
    }    
}