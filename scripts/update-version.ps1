param(
  [string]$IndexPath = "index.html"
)

$ErrorActionPreference = "Stop"

$resolvedPath = Resolve-Path -LiteralPath $IndexPath
$content = Get-Content -LiteralPath $resolvedPath -Raw
$version = Get-Date -Format "H.mm-yyyy-MM-dd"
$pattern = '(<span id="site-version">)[^<]*(</span>)'

if ($content -notmatch $pattern) {
  throw "Could not find the site version marker in $resolvedPath"
}

$updated = [regex]::Replace($content, $pattern, "`${1}$version`${2}", 1)

if ($updated -ne $content) {
  Set-Content -LiteralPath $resolvedPath -Value $updated -NoNewline
}

Write-Output $version
