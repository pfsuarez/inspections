using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InspectionsAPI.Controllers.Resources
{
    public class ValidateCreateInspectionResource
    {
        public int? InspectorId { get; set; }
        public DateTime? InspectionDate { get; set; }
    }
}
