$ErrorActionPreference = "Stop"
$ApiKey = "48a4ef78b3d7b1468b8e604b1dd9a2a7"
$Base   = "https://api.kie.ai/api/v1/jobs"
$Headers = @{ "Authorization" = "Bearer $ApiKey"; "Content-Type" = "application/json" }

$OutPath = "c:\Users\lukas\OneDrive\Desktop\Webseiten\Erstgespr" + [char]0x00E4 + "ch anstehend\KM-Trockenbau\public\images\service-trockenbaudecke.jpg"

$Badge = 'On the upper left side of his chest / left shoulder area, the company name "K.M. Trockenbau" is screen-printed DIRECTLY onto the fabric in clear blue letters, medium size, like a real printed company workwear logo. NO patch, NO box outline, NO border around the text - just the text printed flat on the grey shirt fabric. Clearly legible. No other text or logo anywhere else on the shirt. He wears a clean light grey work shirt and light grey work trousers.'

$Prompt = "Professional photorealistic construction photography. A male craftsman standing on a small scaffolding platform inside a bright interior room, looking up at a partially installed suspended drywall ceiling. He holds a clipboard or tool. Large windows on both sides. White hard hat. " + $Badge

$body = @{
  model = "gpt-image-2-text-to-image"
  input = @{ prompt = $Prompt; aspect_ratio = "4:3"; resolution = "2K" }
} | ConvertTo-Json -Depth 5

$r = Invoke-RestMethod -Method POST -Uri "$Base/createTask" -Headers $Headers -Body $body
$taskId = $r.data.taskId
Write-Host ("taskId=" + $taskId)

$deadline = (Get-Date).AddMinutes(30)
$url = $null
$tick = 0
while ((Get-Date) -lt $deadline) {
  Start-Sleep -Seconds 10
  $tick++
  try {
    $q = Invoke-RestMethod -Method GET -Uri "$Base/recordInfo?taskId=$taskId" -Headers $Headers
  } catch { continue }
  $state = $q.data.state
  if ($state -eq "success") {
    $url = ($q.data.resultJson | ConvertFrom-Json).resultUrls[0]
    Write-Host ("[tick " + $tick + "] DONE") -ForegroundColor Green
    break
  } elseif ($state -eq "fail") {
    Write-Host ("FAIL: " + $q.data.failMsg) -ForegroundColor Red
    exit 1
  } elseif ($tick % 6 -eq 0) {
    Write-Host ("[tick " + $tick + "] state=" + $state)
  }
}

if (-not $url) { Write-Host "Timeout after 30 min" -ForegroundColor Red; exit 1 }

Invoke-WebRequest -Uri $url -OutFile $OutPath
$size = (Get-Item $OutPath).Length
Write-Host ("Saved " + [math]::Round($size/1024) + " KB")
