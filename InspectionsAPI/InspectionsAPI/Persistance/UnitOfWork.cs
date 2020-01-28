using InspectionsAPI.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InspectionsAPI.Persistance
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly InspectionDbContext context;

        public UnitOfWork(InspectionDbContext context)
        {
            this.context = context;
        }

        public async Task CommitAsync()
        {
            await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
