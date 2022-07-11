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
            return await _context.Events.ToListAsync();
        }
    }
}