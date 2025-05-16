using System.Text;
using System.Text.Json;

namespace CodeBattleArena.Server.Services.Judge0
{
    public class Judge0Client
    {
        private readonly HttpClient _httpClient;

        public Judge0Client(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Add("x-rapidapi-host", config["Judge0:ApiHost"]);
            _httpClient.DefaultRequestHeaders.Add("x-rapidapi-key", config["Judge0:ApiKey"]);
        }

        public async Task<ExecutionResult> CheckAsync(string sourceCode, string languageId, string stdin, string expectedOutput)
        {
            try
            {
                var doc = await SubmitAndGetRawResponseAsync(sourceCode, languageId, stdin, expectedOutput);
                return ParseResult(doc);
            }
            catch (Exception ex)
            {
                return new ExecutionResult
                {
                    CompileOutput = $"Error: Request failed with message: {ex.Message}"
                };
            }
        }

        private async Task<JsonDocument> SubmitAndGetRawResponseAsync(string sourceCode, string languageId, string stdin, string expectedOutput)
        {
            var payload = new Judge0SubmissionRequest
            {
                source_code = sourceCode,
                language_id = languageId,
                stdin = stdin,
                expected_output = expectedOutput
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"API error: {response.StatusCode}, content: {errorContent}");
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonDocument.Parse(responseContent);
        }

        private ExecutionResult ParseResult(JsonDocument doc)
        {
            var root = doc.RootElement;
            var status = root.GetProperty("status").GetProperty("id").GetInt32();

            if (status == 3) // Accepted
            {
                string time = root.TryGetProperty("time", out var timeProp) ? timeProp.GetString() : "N/A";
                int? memory = root.TryGetProperty("memory", out var memoryProp) ? memoryProp.GetInt32(): null;

                return new ExecutionResult
                {
                    Time = time,
                    Memory = memory,
                    CompileOutput = null
                };
            }
            else
            {
                string error = root.TryGetProperty("stderr", out var stderrProp) ? stderrProp.GetString() : "No stderr output";
                string compileOutput = root.TryGetProperty("compile_output", out var compileOutputProp) ? compileOutputProp.GetString() : "No compile output";

                return new ExecutionResult
                {
                    Time = null,
                    Memory = null,
                    CompileOutput = $"Error: {error}\nCompile Output: {compileOutput}"
                };
            }
        }
    }
}