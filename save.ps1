param(
  [Parameter(Position = 0)]
  [string]$Message = "Update site"
)

$ErrorActionPreference = "Stop"

function Run-Git {
  param([string[]]$GitArgs)

  git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
}

$repoRoot = git rev-parse --show-toplevel 2>$null
if ($LASTEXITCODE -ne 0) {
  throw "This script must be run inside a git repository."
}

Set-Location $repoRoot

$branch = git branch --show-current
Write-Host "Branch: $branch"

$changes = git status --short
if (-not $changes) {
  Write-Host "Nothing to commit."
  exit 0
}

Write-Host "Updating from remote..."
Run-Git @("pull", "--rebase", "--autostash")

Write-Host "Staging changes..."
Run-Git @("add", "-A")

$staged = git diff --cached --name-only
if (-not $staged) {
  Write-Host "Nothing staged after update."
  exit 0
}

Write-Host "Committing: $Message"
Run-Git @("commit", "-m", $Message)

Write-Host "Pushing..."
Run-Git @("push")

Write-Host "Done."
