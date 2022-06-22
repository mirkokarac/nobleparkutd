using Domain;
using MediatR;
using Persistence;

namespace Application.Players.Commands
{
    public class Create
    {
        public class Command : IRequest
        {
            public Player? Player { get; set; }
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
                if (request.Player is not null)
                {
                    _context.Players.Add(request.Player);

                    await _context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }
    }
}