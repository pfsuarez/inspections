using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InspectionsAPI.Core.Models
{
    public class Inspection
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Customer { get; set; }

        [Required]
        public DateTime InspectionDate { get; set; }

        [Required]
        [MaxLength(500)]
        public string Address { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Observations { get; set; }

        [Required]
        public int InspectorId { get; set; }

        [Required]
        public int StatusId { get; set; }
        public virtual Inspector Inspector { get; set; }
        public virtual Status Status { get; set; }
    }
}
