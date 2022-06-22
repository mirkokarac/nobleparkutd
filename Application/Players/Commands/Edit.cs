using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Players.Commands
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Player? Player { get; set; }
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

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Player is not null)
                {
                    var player = await _context.Players.FindAsync(request.Player.Id);

                    if (player is not null)
                    {
                        _mapper.Map(request.Player, player);
                        await _context.SaveChangesAsync();
                    }
                }

                return Unit.Value;
            }
        }
    }
}