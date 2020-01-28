using InspectionsAPI.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace InspectionsAPI.Persistance
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly InspectionDbContext context;

        public Repository(InspectionDbContext context)
        {
            this.context = context;
        }

        public async Task AddAsync(TEntity entity)
        {
            await context.Set<TEntity>().AddAsync(entity);
        }

        public void Update(TEntity entity)
        {
            context.Entry(entity).State = EntityState.Modified;
        }

        public async Task<TEntity> GetAsync(int id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);
            context.Entry(entity).State = EntityState.Detached;
            return entity;
        }

        public async Task<IEnumerable<TEntity>> GetAsync()
        {
            return await context.Set<TEntity>().ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> whereCondition = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, string includeProperties = "")
        {
            IQueryable<TEntity> query = context.Set<TEntity>();

            if (whereCondition != null)
            {
                query = query.Where(whereCondition);
            }

            foreach (var includeProperty in includeProperties.Split(',', StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }

        public async Task<TEntity> RemoveAsync(int id)
        {
            var entity = await context.Set<TEntity>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            context.Set<TEntity>().Remove(entity);

            return entity;
        }

        public async Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await context.Set<TEntity>().SingleOrDefaultAsync(predicate);
        }
    }
}
