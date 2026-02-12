#!/usr/bin/env bash

set -u

NPM_REGISTRY="https://registry.npmjs.org/"
PORTS=(3000 3001 5432 6379 9000 9001 3100)
APP_PORTS=(3000 3001)
INFRA_PORTS=(5432 6379 9000 9001 3100)

has_command() {
  command -v "$1" >/dev/null 2>&1
}

is_port_busy() {
  local port="$1"

  if has_command ss; then
    ss -ltn "( sport = :$port )" 2>/dev/null | grep -q ":$port\\b"
    return $?
  fi

  if has_command lsof; then
    lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
    return $?
  fi

  return 1
}

all_ports_free() {
  local ports=("$@")
  local port

  for port in "${ports[@]}"; do
    if is_port_busy "$port"; then
      return 1
    fi
  done

  return 0
}

echo "🔎 Preflight checks"

node_ok=false
npm_ok=false
registry_ok=false
docker_ok=false
compose_ok=false

if has_command node; then
  node_ok=true
  echo "✅ node найден: $(node -v)"
else
  echo "❌ node не найден"
fi

if has_command npm; then
  npm_ok=true
  echo "✅ npm найден: $(npm -v)"
else
  echo "❌ npm не найден"
fi

if [ "$npm_ok" = true ]; then
  if npm ping --registry "$NPM_REGISTRY" >/dev/null 2>&1; then
    registry_ok=true
    echo "✅ npm registry доступен: $NPM_REGISTRY"
  else
    echo "❌ npm registry недоступен: $NPM_REGISTRY"
  fi
fi

if has_command docker; then
  docker_ok=true
  echo "✅ docker найден: $(docker --version | head -n 1)"
else
  echo "⚠️  docker не найден (infra/full compose недоступны)"
fi

if [ "$docker_ok" = true ]; then
  if docker compose version >/dev/null 2>&1; then
    compose_ok=true
    echo "✅ docker compose найден: $(docker compose version --short 2>/dev/null || docker compose version | head -n 1)"
  else
    echo "⚠️  docker compose не найден (infra/full compose недоступны)"
  fi
fi

echo

echo "🔌 Проверка портов"
busy_ports=()
for port in "${PORTS[@]}"; do
  if is_port_busy "$port"; then
    busy_ports+=("$port")
    echo "⚠️  Порт $port занят"
  else
    echo "✅ Порт $port свободен"
  fi
done

can_npm_dev=false
can_infra=false
can_full=false

if [ "$node_ok" = true ] && [ "$npm_ok" = true ] && [ "$registry_ok" = true ] && all_ports_free "${APP_PORTS[@]}"; then
  can_npm_dev=true
fi

if [ "$docker_ok" = true ] && [ "$compose_ok" = true ] && all_ports_free "${INFRA_PORTS[@]}"; then
  can_infra=true
fi

if [ "$can_npm_dev" = true ] && [ "$can_infra" = true ]; then
  can_full=true
fi

echo
echo "📋 Итог"
if [ "$can_full" = true ]; then
  echo "✅ Можно запускать полный compose (app + infra)."
else
  echo "❌ Полный compose сейчас недоступен."
fi

if [ "$can_npm_dev" = true ]; then
  echo "✅ Можно запускать только npm dev (api + web локально)."
else
  echo "❌ npm dev сейчас недоступен."
fi

if [ "$can_infra" = true ]; then
  echo "✅ Можно запускать только infra через docker compose --profile infra up -d."
else
  echo "❌ infra сейчас недоступна."
fi

if [ ${#busy_ports[@]} -gt 0 ]; then
  echo
  echo "Занятые порты: ${busy_ports[*]}"
fi
