# GitROM Store

Vercel-hosted storefront that discovers games from a GitHub repository.

## Game structure

    Games/GameName/cover.png
    Games/GameName/Rom.gba

`Rom.*` may use any extension; the UI reports the detected extension.

## Vercel environment variables
- GITHUB_OWNER: GitHub account/organization
- GITHUB_REPO: repository name
- GITHUB_BRANCH: optional, defaults to main
- GITHUB_TOKEN: optional for public repos; recommended for API limits/private repos

## Deploy
Import this repository into Vercel, configure the environment variables, then deploy.

## Emulator note
This starter includes GitHub discovery, the game store UI, and ROM URLs. It deliberately leaves the actual emulator core as a replaceable integration point. Use only ROMs you are authorized to distribute/use.
