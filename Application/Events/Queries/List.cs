using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events.Queries;

public class List
{
    public class Query : IRequest<List<Event>> { }

    public class Handler : IRequestHandler<Query, List<Event>>
    {
        public DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Event>> Handle(Query request, CancellationToken cancellationToken)
        {
            // TODO
            // create EventDTO
            // create LocationDTO
            // create AddressDTO
            // create TeamDTO
            // DTO's to only have data that is to be returned
            var events = await _context.Events!.ToListAsync();

            foreach(Event eventDTO in events)
            {
                var location = await _context.Location!
                    .FindAsync(eventDTO.LocationId);
                var address = await _context.Address!
                    .FindAsync(location!.AddressId);
                var team = await _context.Team!
                    .FindAsync(eventDTO.TeamId);
                eventDTO.Location = location;
            }

            return events;
        }
    }
}