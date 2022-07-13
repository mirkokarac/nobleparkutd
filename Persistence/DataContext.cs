using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Player>? Players { get; set; }
        public DbSet<Event>? Events { get; set; }
        public DbSet<Location>? Location { get; set; }
        public DbSet<Address>? Address { get; set; }
        public DbSet<Team>? Team { get; set; }
    }
}