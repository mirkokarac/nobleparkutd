using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Players is not null)
            {
                if (context.Players.Any()) return;
            }
            

            var players = new List<Player>
            {
                new Player
                {
                    FirstName = "Milica",
                    LastName = "Kuljanin",
                    Position = "GK"
                },
                new Player
                {
                    FirstName = "Riana",
                    LastName = "Giroleti",
                    Position = "CB"
                },
                new Player
                {
                    FirstName = "Mira",
                    LastName = "Bozic",
                    Position = "DM"
                },
                new Player
                {
                    FirstName = "Jovana",
                    LastName = "Ilic",
                    Position = "LB"
                },
                new Player
                {
                    FirstName = "Jannele",
                    LastName = "Jeronimo",
                    Position = "LB"
                },
                new Player
                {
                    FirstName = "Zeljka",
                    LastName = "Ostojic",
                    Position = "DM"
                },
                new Player
                {
                    FirstName = "Marie",
                    LastName = "Romano",
                    Position = "CF"
                },
                new Player
                {
                    FirstName = "Danica",
                    LastName = "Vukcevic",
                    Position = "CF"
                },
                new Player
                {
                    FirstName = "Dragana",
                    LastName = "Kuljanin",
                    Position = "AM"
                },
                new Player
                {
                    FirstName = "Jovana",
                    LastName = "Grujic",
                    Position = "RW"
                },
                new Player
                {
                    FirstName = "Sara",
                    LastName = "Starcevic",
                    Position = "RB"
                },
                new Player
                {
                    FirstName = "Maria",
                    LastName = "Alqaragooli",
                    Position = "RB"
                },
                new Player
                {
                    FirstName = "Katrina",
                    LastName = "Ristanovic",
                    Position = "CB"
                },
                new Player
                {
                    FirstName = "Maya",
                    LastName = "Stankovic",
                    Position = "CB"
                },
                new Player
                {
                    FirstName = "Eva",
                    LastName = "Banzora",
                    Position = "RW"
                },
                new Player
                {
                    FirstName = "Tamara",
                    LastName = "Mrkic",
                    Position = "LW"
                },
                new Player
                {
                    FirstName = "Jada",
                    LastName = "Yannas",
                    Position = "LB"
                },
                new Player
                {
                    FirstName = "Rhianna",
                    LastName = "Godsmark",
                    Position = "RW"
                },
                new Player
                {
                    FirstName = "Sanja",
                    LastName = "Ivetic",
                    Position = "CF"
                },
                new Player
                {
                    FirstName = "Sara",
                    LastName = "Basic",
                    Position = "CM"
                },
                new Player
                {
                    FirstName = "Dalia",
                    LastName = "Bailo",
                    Position = "LW"
                },
                new Player
                {
                    FirstName = "Ajah",
                    LastName = "Maler",
                    Position = "CM"
                }
            };

            players.OrderBy(x => x.FirstName);

            if(context.Players is not null)
            {
                await context.Players.AddRangeAsync(players);
            }
            
            await context.SaveChangesAsync();
        }
    }
}