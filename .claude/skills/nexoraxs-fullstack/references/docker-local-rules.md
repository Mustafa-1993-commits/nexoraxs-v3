# Docker and Local Development Rules

NexoraXS local development uses:
- Windows 11
- WSL2 Ubuntu
- Docker Desktop
- Laravel backend
- PostgreSQL
- Redis
- Next.js apps

## WSL Rule

Work inside Linux filesystem:

Correct:
```text
/home/mustafa/projects/nexoraxs-v3
```

Avoid:
```text
/mnt/c/...
/mnt/d/...
```

Reason:
- faster npm installs
- faster Next.js builds
- better Docker volume performance
- better file watching
- fewer permission issues

## Docker Rules

Preserve the working local Docker setup.

Do not casually change:
- service names
- volumes
- ports
- database credentials
- Redis config
- backend build image
- vendor/node_modules volume behavior

## Permission Issues

If node_modules/vendor were copied from Windows or another machine, clean them and reinstall inside WSL.

Useful cleanup:
```bash
rm -rf node_modules
find apps -name node_modules -type d -prune -exec rm -rf '{}' +
rm -rf backend/vendor
find . -name .next -type d -prune -exec rm -rf '{}' +
```

If permission denied:
```bash
sudo chown -R "$USER:$USER" .
chmod -R u+rwX .
```

Then retry cleanup.

## After Moving Machines

Run:
```bash
docker --version
docker compose version
node -v
npm -v
git --version
```

Then rebuild cleanly.
