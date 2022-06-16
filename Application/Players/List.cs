using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Players
{
    public class List
    {
        public class Query : IRequest<List<Player>> { }

        public class Handler : IRequestHandler<Query, List<Player>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Player>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Players.ToListAsync();
            }
        }
    }
}