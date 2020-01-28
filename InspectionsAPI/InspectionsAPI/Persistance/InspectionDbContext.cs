using InspectionsAPI.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InspectionsAPI.Persistance
{
    public class InspectionDbContext : DbContext
    {
        public InspectionDbContext(DbContextOptions<InspectionDbContext> options) : base(options)
        {
        }

        public DbSet<Inspection> Inspections { get; set; }
        public DbSet<Inspector> Inspectors { get; set; }
        public DbSet<Status> Statuses { get; set; }
    }
}
