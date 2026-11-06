# =====================================================================
#  Rangaswamy Yagateela — Portfolio publish helper
#  Pushes the current repo to GitHub and reminds you to enable Pages.
#
#  Run from PowerShell:    .\publish.ps1
#  Optional:               .\publish.ps1 -Token <YOUR_GITHUB_PAT>
#
#  Generate a PAT (classic) at:
#     https://github.com/settings/tokens
#     - Scopes:  repo, workflow
# =====================================================================

[CmdletBinding()]
param(
  [string] $Token = $env:GITHUB_TOKEN,
  [string] $Repo  = "rangaswamy-y/Profile",
  [string] $Branch = "main",
  [string] $UserName = "Rangaswamy Yagateela",
  [string] $UserEmail = "ranga75038@gmail.com"
)

$ErrorActionPreference = "Stop"

# 1. Ensure git is on PATH (use portable MinGit if needed).
$minGit = Join-Path $env:LOCALAPPDATA "MinGit\cmd"
if (Test-Path "$minGit\git.exe") {
  $env:Path = "$minGit;$env:Path"
}

try { $null = & git --version }
catch {
  Write-Host "git not found. Install Git for Windows: https://git-scm.com/download/win" -ForegroundColor Red
  exit 1
}

# 2. Init repo / remote if needed.
if (-not (Test-Path ".git")) {
  & git init -b $Branch | Out-Null
}

$existing = & git remote 2>$null
if ($existing -notcontains "origin") {
  & git remote add origin "https://github.com/$Repo.git"
}

# 3. Stage + commit any pending changes.
& git add . | Out-Null

$pending = (& git status --porcelain) -ne $null
if ($pending) {
  $env:GIT_AUTHOR_NAME    = $UserName
  $env:GIT_AUTHOR_EMAIL   = $UserEmail
  $env:GIT_COMMITTER_NAME = $UserName
  $env:GIT_COMMITTER_EMAIL = $UserEmail

  & git -c "user.name=$UserName" -c "user.email=$UserEmail" commit -m "chore: portfolio update"
}

# 4. Push.
if ($Token) {
  $remote = "https://x-access-token:$Token@github.com/$Repo.git"
  & git push $remote "$($Branch):$Branch" --force-with-lease
} else {
  Write-Host ""
  Write-Host "No -Token / GITHUB_TOKEN provided — using interactive auth." -ForegroundColor Yellow
  Write-Host "If a 'Connect to GitHub' window appears, click 'Sign in with your browser'." -ForegroundColor Yellow
  Write-Host ""
  & git push -u origin $Branch
}

if ($LASTEXITCODE -ne 0) {
  Write-Host "Push failed. See errors above." -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Pushed successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Final step — enable GitHub Pages:" -ForegroundColor Cyan
Write-Host "  1. Open https://github.com/$Repo/settings/pages"
Write-Host "  2. Source = 'Deploy from a branch'"
Write-Host "  3. Branch = '$Branch', Folder = '/ (root)'  → Save"
Write-Host "  4. Wait ~1 minute, then visit:"
Write-Host "     https://rangaswamy-y.github.io/Profile/" -ForegroundColor Green
