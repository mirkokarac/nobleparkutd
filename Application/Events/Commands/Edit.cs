using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events.Commands
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Event? Event { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public DataContext _context { get; }
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                if (request.Event is not null)
                {
                    var eventObj = await _context.Events.FindAsync(request.Event.Id);

                    if (eventObj is not null)
                    {
                        _mapper.Map(request.Event, eventObj);
                        await _context.SaveChangesAsync();
                    }
                }

                return Unit.Value;
            }
        }           
    }
}