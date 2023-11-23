using TMedia.Core;
using TMedia.Data;


namespace TMedia.Service
{
    public class DBService : IDBService
    {
        private readonly IAppDbContext _context;

        public DBService(IAppDbContext context)
        {
            _context = context;
        }

        public IEntityService<T> GetEntityService<T>() where T : class
        {
            return new EntityService<T>(_context);
        }
    }
}
