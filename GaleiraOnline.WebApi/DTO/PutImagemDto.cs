namespace GaleiraOnline.WebApi.DTO
{
    public class PutImagemDto
    {
        public IFormFile? Arquivo { get; set; }
        public string? Nome { get; internal set; }
    }
}
