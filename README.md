## YUME Cloud DEMO

### Stack
## Backend
- Django
- Docker
- Postgres

## Frotend
- React
- ShadcnUI (Tailwinds CSS)

- Caddy as reverse proxy

### RUN:
```
# cd frontend
# npm i
sudo docker compose -f docker-compose-dev.yml build
sudo docker compose -f docker-compose-dev.yml up
```

and access app on http://localhost:6513
