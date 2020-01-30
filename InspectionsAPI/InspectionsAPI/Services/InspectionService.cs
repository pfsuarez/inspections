using InspectionsAPI.Core;
using InspectionsAPI.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InspectionsAPI.Services
{
    public class InspectionService
    {
        private readonly IRepository<Inspection> repository;

        public InspectionService(IRepository<Inspection> repository)
        {
            this.repository = repository;
        }

        public async Task<bool> ValidateOnCreate(int? inspectorId, DateTime? inspectionDate)
        {
            if(inspectorId == null || inspectionDate == null)
            {
                throw new ApplicationException("Inspector and Date must be filled");
            }

            var inspection = await repository.GetAsync(x =>
                x.InspectorId == inspectorId.Value &&
                x.InspectionDate.Date.Equals(inspectionDate.Value.Date));

            if(inspection == null || inspection.Count() == 0)
            {
                return true;
            }

            return false;
        }
    }
}
