# 🎵 Como substituir a música

O arquivo `music.mp3` neste diretório é um espaço reservado (placeholder).

Para usar sua própria música de fundo:

1. Substitua o arquivo `music.mp3` por sua música (mantenha o mesmo nome).
   - Formatos aceitos: `.mp3`, `.ogg`, `.wav`, `.m4a`
2. **OU** coloque seu arquivo aqui com outro nome e altere o caminho em
   `src/config.ts`:

   ```ts
   export const MUSIC_SRC = '/sua-musica.mp3';
   ```

Pronto — a música começa a tocar quando a pessoa clica em "Entrar".
