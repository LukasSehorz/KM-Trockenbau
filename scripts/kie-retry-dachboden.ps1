$ErrorActionPreference = "Stop"
$ApiKey = "48a4ef78b3d7b1468b8e604b1dd9a2a7"
$Base   = "https://api.kie.ai/api/v1/jobs"
$Headers = @{ "Authorization" = "Bearer $ApiKey"; "Content-Type" = "application/json" }

$OutPath = "c:\Users\lukas\OneDrive\Desktop\Webseiten\Erstgespr" + [char]0x00E4 + "ch anstehend\KM-Trockenbau\public\images\service-dachbodenausbau.jpg"

$Badge = 'IMPORTANT: His light grey t-shirt has the text "K.M. Trockenbau" silkscreened in blue ink directly onto the grey fabric in the upper left chest area. This is just BLUE INK PRINTED FLAT ON GREY FABRIC - the blue text sits directly on the visible grey shirt material with NOTHING behind it. Absolutely no white rectangle behind the text, no light coloured patch, no embroidered badge, no fabric label sewn on, no border, no outline, no box, no contrasting background. Just blue lettering on grey shirt fabric like a printed band t-shirt. The text is fairly large and clearly readable. He wears light grey work trousers.'

$Prompt = "Professional photorealistic construction photography. A male craftsman kneeling on the floor of an attic space, installing rock wool insulation material between exposed wooden roof beams. Skylight windows above letting in soft daylight. " + $Badge

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

if (-not $url) { Write-Host "Timeout" -ForegroundColor Red; exit 1 }

Invoke-WebRequest -Uri $url -OutFile $OutPath
Write-Host ("Saved " + [math]::Round((Get-Item $OutPath).Length/1024) + " KB")
