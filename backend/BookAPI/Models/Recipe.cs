using System.ComponentModel.DataAnnotations;

namespace BookAPI.Models
{
    public class Recipe
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public Category Category { get; set; }
        public string Img { get; set; }
        public int Calories { get; set; }
        public int NumberOfServings { get; set; }
        public int Price { get; set; }
    }

    public enum Category
    {
        Burger, Salad, Pizza, Drinks
    }
}

