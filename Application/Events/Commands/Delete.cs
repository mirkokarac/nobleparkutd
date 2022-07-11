using MediatR;
using Persistence;

namespace Application.Events.Commands
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var eventObj = await _context.Events.FindAsync(request.Id);

                if(eventObj is not null)
                {
                    _context.Remove(eventObj);
                    await _context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }          
    }
}