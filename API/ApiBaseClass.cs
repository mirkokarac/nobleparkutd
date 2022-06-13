using System.Diagnostics;
using Humanizer;
using Humanizer.Localisation;

namespace API
{
    public class ApiBaseClass
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        private readonly Stopwatch _timer = Stopwatch.StartNew();
        public string Duration => _timer.Elapsed.Humanize(maxUnit: TimeUnit.Millisecond).Replace(" milliseconds", "ms");
    }
}