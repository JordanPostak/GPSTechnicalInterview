using GPS.ApplicationManager.Web.Controllers.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace GPS.ApplicationManager.Web.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ApplicationManagerController : ControllerBase
  {
    private readonly ILogger<ApplicationManagerController> _logger;
    private static readonly string _filePath = "loanApplication.json";

    public ApplicationManagerController(ILogger<ApplicationManagerController> logger)
    {
      _logger = logger;
    }

    private async static Task<List<LoanApplication>> GetApplicationsFromFileAsync()
    {
      if (System.IO.File.Exists(_filePath))
      {
        var existingJson = await System.IO.File.ReadAllTextAsync(_filePath);
        return JsonSerializer.Deserialize<List<LoanApplication>>(existingJson) ?? new List<LoanApplication>();
      }
      return new List<LoanApplication>();
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> CreateApplication([FromBody] LoanApplication loanApplication)
    {
      if (loanApplication == null ||
          string.IsNullOrEmpty(loanApplication.PersonalInformation.Name.First) ||
          string.IsNullOrEmpty(loanApplication.PersonalInformation.Name.Last) ||
          string.IsNullOrEmpty(loanApplication.PersonalInformation.PhoneNumber) ||
          string.IsNullOrEmpty(loanApplication.PersonalInformation.Email) ||
          string.IsNullOrEmpty(loanApplication.ApplicationNumber) ||
          loanApplication.LoanTerms.Amount <= 0)
      {
        return BadRequest("Invalid application data. All fields are required and must be valid.");
      }

      loanApplication.DateApplied = DateTime.UtcNow;
      var applications = await GetApplicationsFromFileAsync();
      applications.Add(loanApplication);
      var json = JsonSerializer.Serialize(applications);
      await System.IO.File.WriteAllTextAsync(_filePath, json);
      return Ok(new { message = "Created Successfully." });
    }

    // TODO: Add your CRUD (Read, Update, Delete) methods here:
    [HttpGet("[action]")]
    public async Task<ActionResult<List<LoanApplication>>> GetApplications()
    {
        var applications = await GetApplicationsFromFileAsync();
        return Ok(applications);
    }

    [HttpPut("[action]/{applicationNumber}")]
    public async Task<IActionResult> UpdateApplication(string applicationNumber, [FromBody] LoanApplication updatedApplication)
    {
        if (string.IsNullOrWhiteSpace(applicationNumber) || updatedApplication == null)
            return BadRequest("Invalid application data.");

        // Ensure route id and body id match (or set it)
        updatedApplication.ApplicationNumber = applicationNumber;

        var applications = await GetApplicationsFromFileAsync();
        var existingIndex = applications.FindIndex(a => a.ApplicationNumber == applicationNumber);

        if (existingIndex < 0)
            return NotFound($"Application '{applicationNumber}' not found.");

        // Preserve DateApplied if you want to keep original submission time
        updatedApplication.DateApplied = applications[existingIndex].DateApplied;

        applications[existingIndex] = updatedApplication;

        var json = JsonSerializer.Serialize(applications);
        await System.IO.File.WriteAllTextAsync(_filePath, json);

        return Ok(new { message = "Updated Successfully." });
    }

    [HttpDelete("[action]/{applicationNumber}")]
    public async Task<IActionResult> DeleteApplication(string applicationNumber)
    {
        if (string.IsNullOrWhiteSpace(applicationNumber))
            return BadRequest("Application number is required.");

        var applications = await GetApplicationsFromFileAsync();
        var removedCount = applications.RemoveAll(a => a.ApplicationNumber == applicationNumber);

        if (removedCount == 0)
            return NotFound($"Application '{applicationNumber}' not found.");

        var json = JsonSerializer.Serialize(applications);
        await System.IO.File.WriteAllTextAsync(_filePath, json);

        return Ok(new { message = "Deleted Successfully." });
    } 

  }
}
