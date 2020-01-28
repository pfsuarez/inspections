using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InspectionsAPI.Core;
using InspectionsAPI.Core.Models;
using InspectionsAPI.Persistance;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InspectionsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InspectorsController : ControllerBase
    {
        private readonly IRepository<Inspector> repository;

        public InspectorsController(IRepository<Inspector> repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await repository.GetAsync());
        }
    }
}