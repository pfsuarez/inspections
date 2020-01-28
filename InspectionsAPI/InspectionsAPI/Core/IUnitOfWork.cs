using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InspectionsAPI.Core
{
    public interface IUnitOfWork : IDisposable
    {
        Task CommitAsync();
    }
}
