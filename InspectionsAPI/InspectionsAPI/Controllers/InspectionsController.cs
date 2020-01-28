﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InspectionsAPI.Core;
using InspectionsAPI.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InspectionsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InspectionsController : ControllerBase
    {
        private readonly IRepository<Inspection> repository;
        private readonly IUnitOfWork unitOfWork;

        public InspectionsController(IRepository<Inspection> repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await repository.GetAsync(includeProperties: "Inspector,Status"));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var inspection = await repository.GetAsync(x => x.Id == id, includeProperties: "Inspector,Status");

            if (inspection == null || inspection.Count() == 0)
            {
                return NotFound();
            }

            return Ok(inspection);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            try
            {
                var inspection = await repository.RemoveAsync(id);
                await unitOfWork.CommitAsync();

                if (inspection == null)
                {
                    return NotFound();
                }

                return Ok(inspection);
            }
            catch (Exception ex)
            {
                return BadRequest("An error was thrown while trying to delete inspection.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Inspection inspection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model invalid");
            }

            try
            {
                inspection.InspectionDate = DateTime.Now;

                await repository.AddAsync(inspection);
                await unitOfWork.CommitAsync();

                return Ok(inspection);
            }
            catch (Exception)
            {
                return BadRequest("An error was thrown while trying to save inspection.");
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]Inspection inspection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model invalid");
            }

            if (id != inspection.Id)
            {
                return BadRequest();
            }

            var inspectionDB = await repository.GetAsync(id);

            if (inspectionDB == null)
            {
                return NotFound();
            }

            try
            {
                repository.Update(inspection);
                await unitOfWork.CommitAsync();
                return Ok(inspection);
            }
            catch (Exception ex)
            {
                return BadRequest("An error was thrown while trying to update inspection.");
            }
        }
    }
}