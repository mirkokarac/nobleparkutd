using Domain;
using MediatR;
using Persistence;

namespace Application.Events.Queries;

public class Details
{
    public class Query : IRequest<Event>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Event>
    {
        public DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Event> Handle(Query request, 
            CancellationToken cancellationToken)
        {
            var eventDTO = await _context.Events.FindAsync(request.Id);
            var location = await _context.Location!
                .FindAsync(eventDTO.LocationId);
            var address = await _context.Address!
                .FindAsync(location!.AddressId);
            var team = await _context.Team!
                .FindAsync(eventDTO.TeamId);
            eventDTO.Location = location;

            return eventDTO;
        }
    }
}