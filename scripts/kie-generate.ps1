$ErrorActionPreference = "Stop"

$ApiKey = "48a4ef78b3d7b1468b8e604b1dd9a2a7"
$Base   = "https://api.kie.ai/api/v1/jobs"
$Headers = @{
  "Authorization" = "Bearer $ApiKey"
  "Content-Type"  = "application/json"
}

$ImgRoot = "c:\Users\lukas\OneDrive\Desktop\Webseiten\Erstgespr" + [char]0x00E4 + "ch anstehend\KM-Trockenbau\public\images"

# CRITICAL: describe as silkscreen ink directly on fabric, not as a badge
$BadgePrompt = 'IMPORTANT: His light grey t-shirt has the text "K.M. Trockenbau" silkscreened in blue ink directly onto the grey fabric in the upper left chest area. This is just BLUE INK PRINTED FLAT ON GREY FABRIC - the blue text sits directly on the visible grey shirt material with NOTHING behind it. Absolutely no white rectangle behind the text, no light coloured patch, no embroidered badge, no fabric label sewn on, no border, no outline, no box, no contrasting background. Just blue lettering on grey shirt fabric like a printed band t-shirt. The text is fairly large and clearly readable. He wears light grey work trousers.'

$Jobs = @(
  @{
    name   = "service-trockenbau.jpg"
    prompt = "Professional photorealistic construction photography. A male craftsman in his 30s installing a large gypsum drywall panel against vertical metal stud framing using a cordless drill in his right hand. White hard hat. Indoor construction site, drywall panels leaning against the wall on the left, doorway visible on the right, dim moody lighting. " + $BadgePrompt
  },
  @{
    name   = "service-dachbodenausbau.jpg"
    prompt = "Professional photorealistic construction photography. A male craftsman kneeling on the floor of an attic space, installing rock wool insulation material between exposed wooden roof beams. Skylight windows above letting in soft daylight. " + $BadgePrompt
  },
  @{
    name   = "service-waermeschutz.jpg"
    prompt = "Professional photorealistic construction photography. A male craftsman applying or installing insulation material to a wall in a dark interior construction site. A bright portable work light on a stand illuminates him from the left. Metal stud framing surrounds him. White hard hat. " + $BadgePrompt
  },
  @{
    name   = "service-trockenbaudecke.jpg"
    prompt = "Professional photorealistic construction photography. A male craftsman standing on a small scaffolding platform inside a bright interior room, looking up at a partially installed suspended drywall ceiling. He holds a clipboard or tool. Large windows on both sides. White hard hat. " + $BadgePrompt
  }
)

Write-Host "Submitting 4 tasks..." -ForegroundColor Cyan
$Tasks = @()
foreach ($job in $Jobs) {
  $body = @{
    model = "gpt-image-2-text-to-image"
    input = @{
      prompt       = $job.prompt
      aspect_ratio = "4:3"
      resolution   = "2K"
    }
  } | ConvertTo-Json -Depth 5

  try {
    $resp = Invoke-RestMethod -Method POST -Uri "$Base/createTask" -Headers $Headers -Body $body
  } catch {
    Write-Host ("  ERROR submitting " + $job.name + ": " + $_.Exception.Message) -ForegroundColor Red
    continue
  }
  if ($resp.code -ne 200) {
    Write-Host ("  FAILED " + $job.name + ": " + $resp.msg) -ForegroundColor Red
    continue
  }
  Write-Host ("  " + $job.name + " -> taskId=" + $resp.data.taskId)
  $Tasks += [PSCustomObject]@{
    name   = $job.name
    taskId = $resp.data.taskId
    done   = $false
    url    = $null
  }
}

Write-Host ""
Write-Host "Polling (deadline 30 min)..." -ForegroundColor Cyan
$Deadline = (Get-Date).AddMinutes(30)
$tick = 0
while ((($Tasks | Where-Object { -not $_.done }).Count -gt 0) -and ((Get-Date) -lt $Deadline)) {
  Start-Sleep -Seconds 8
  $tick++
  foreach ($t in ($Tasks | Where-Object { -not $_.done })) {
    try {
      $r = Invoke-RestMethod -Method GET -Uri "$Base/recordInfo?taskId=$($t.taskId)" -Headers $Headers
    } catch {
      continue
    }
    $state = $r.data.state
    if ($state -eq "success") {
      $result = $r.data.resultJson | ConvertFrom-Json
      $t.url  = $result.resultUrls[0]
      $t.done = $true
      Write-Host ("  [tick " + $tick + "] " + $t.name + " DONE") -ForegroundColor Green
    } elseif ($state -eq "fail") {
      Write-Host ("  [tick " + $tick + "] " + $t.name + " FAIL: " + $r.data.failMsg) -ForegroundColor Red
      $t.done = $true
    } elseif ($tick % 8 -eq 0) {
      Write-Host ("  [tick " + $tick + "] " + $t.name + " state=" + $state)
    }
  }
}

Write-Host ""
Write-Host "Downloading..." -ForegroundColor Cyan
foreach ($t in $Tasks) {
  if ($t.url) {
    $outPath = Join-Path $ImgRoot $t.name
    Invoke-WebRequest -Uri $t.url -OutFile $outPath
    $size = (Get-Item $outPath).Length
    Write-Host ("  Saved " + $t.name + " (" + [math]::Round($size/1024) + " KB)")
  } else {
    Write-Host ("  " + $t.name + " - no URL") -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "Done." -ForegroundColor Green
