#!/usr/bin/env bash
#
# Servidor de desarrollo del blog.
#
# Uso:
#   ./scripts/dev.sh
#   ./scripts/dev.sh --port 4001
#   ./scripts/dev.sh --drafts
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

find_ruby() {
  local candidate

  for candidate in "$(command -v ruby 2>/dev/null || true)" \
                   "/opt/homebrew/opt/ruby/bin/ruby" \
                   "/usr/local/opt/ruby/bin/ruby"; do
    [ -n "$candidate" ] && [ -x "$candidate" ] || continue

    if "$candidate" -e 'exit Gem::Version.new(RUBY_VERSION) >= Gem::Version.new("3.0.0")' 2>/dev/null; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  return 1
}

RUBY_BIN="$(find_ruby || true)"

if [ -z "$RUBY_BIN" ]; then
  cat >&2 <<'EOF'
Error: se necesita Ruby 3.x para ejecutar el blog.

En macOS con Homebrew:
  brew install ruby

Después vuelve a ejecutar este script.
EOF
  exit 1
fi

# Asegura que ruby y bundle sean del mismo entorno.
export PATH="$(dirname "$RUBY_BIN"):$PATH"

if ! command -v bundle >/dev/null 2>&1; then
  echo "Error: no se ha encontrado Bundler para Ruby $(ruby -e 'print RUBY_VERSION')." >&2
  echo "Instálalo con: gem install bundler" >&2
  exit 1
fi

if ! bundle check >/dev/null 2>&1; then
  echo "Instalando dependencias..."
  bundle install
fi

echo "Ruby:   $(ruby -e 'print RUBY_VERSION')"
echo "Jekyll: $(bundle exec jekyll -v)"
echo
echo "Iniciando el servidor de desarrollo..."
echo "Pulsa Ctrl+C para parar."
echo

exec bundle exec jekyll serve --livereload "$@"
