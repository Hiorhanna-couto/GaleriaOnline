using GaleiraOnline.WebApi.Models;

namespace GaleiraOnline.WebApi.Interfaces
{
    public interface IImagemRepository
    {
        Task<IEnumerable<Imagem>> GetAllAsync();
        Task<Imagem> GetByidAsync(int id);
        Task<Imagem?> CreateAsync(Imagem imagem);
        Task<bool> UpdateAsync(Imagem imagem);
        Task<bool> DeleteAsync(int id);
       
    }
}
