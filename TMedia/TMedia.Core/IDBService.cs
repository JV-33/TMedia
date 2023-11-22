namespace TMedia.Core
{
    public interface IDBService
    {
        IEntityService<T> GetEntityService<T>() where T : class;
    }
}
