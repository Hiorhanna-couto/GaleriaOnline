using GaleiraOnline.WebApi.DbContextImagem;
using GaleiraOnline.WebApi.Interfaces;
using GaleiraOnline.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GaleiraOnline.WebApi.Repositories
{
    public class ImagemRepository : IImagemRepository
    {
        private readonly GaleriaOnlineDbContext _context;

        public ImagemRepository(GaleriaOnlineDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Imagem>> GetAllAsync()
        {
           return await _context.Imagens.ToListAsync();
        }

     

        public async Task<Imagem> CreateAsync(Imagem imagem)
        {
          _context.Imagens.Add(imagem);
            await _context.SaveChangesAsync();
            return imagem;
        }
        public async Task<bool> UpdateAsync(Imagem imagem)
        {
            _context.Imagens.Update(imagem);
            return await _context.SaveChangesAsync()>0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
          var imagem = await _context.Imagens.FindAsync(id);
            if (imagem == null) 
            { 
            return true;
            
            }

            _context.Imagens.Remove(imagem);
            return await _context.SaveChangesAsync() > 0;
        }

        internal async Task GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Imagem> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
