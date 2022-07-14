using BookAPI.Models;
using FoodAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BookAPI.Data
{
    public class TutorialDbContext : DbContext
    {
        public TutorialDbContext(DbContextOptions<TutorialDbContext> options) : base(options) { }
        public DbSet<Issue> Issues { get; set; }
        public DbSet<Recipe> Recipe { get; set; }
        public DbSet<Order> Orders { get; set; }

    }
}
