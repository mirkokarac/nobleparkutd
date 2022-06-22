using Domain;
using MediatR;
using Persistence;

namespace Application.Players.Queries
{
    public class Details
    {
        public class Query : IRequest<Player>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Player>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Player> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Players.FindAsync(request.Id);
            }

        }
    }
}