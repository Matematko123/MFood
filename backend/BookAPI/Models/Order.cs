using BookAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace FoodAPI.Models
{
    public class Order
    {
        [Required]
        public int Id { get; set; }
        //public ICollection<Recipe> Recipes { get; set; } = new HashSet<Recipe>();
    }
}
