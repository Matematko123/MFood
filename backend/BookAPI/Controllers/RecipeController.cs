using BookAPI.Data;
using BookAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly TutorialDbContext _context;
        public RecipeController(TutorialDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Recipe>> Get()
        {
            return await _context.Recipe.ToListAsync();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Recipe recipe)
        {
            await _context.Recipe.AddAsync(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(recipe), new { id = recipe.Id }, recipe);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, Recipe recipe)
        {
            if (id != recipe.Id) return BadRequest();

            _context.Entry(recipe).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<Recipe>>> Search(string name)
        {
            IQueryable<Recipe> query = _context.Recipe;

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(x => x.Name.ToLower().StartsWith(name.ToLower()));
            }

            return await query.ToListAsync();
        }


        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var recipeToDelete = await _context.Recipe.FindAsync(id);
            if (recipeToDelete == null) return NotFound();

            _context.Recipe.Remove(recipeToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
