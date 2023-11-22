using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Threading;
using System.Threading.Tasks;
using TMedia.Models;

namespace TMedia.Data
{
    public interface IAppDbContext
    {
        DbSet<Device> Devices { get; set; }

        // Other DbSet properties

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;

        // Add Set method
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
    }
}
