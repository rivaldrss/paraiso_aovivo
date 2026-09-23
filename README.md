# Rádio Paraíso FM 101,1 - Web App Redesenhado

Aplicativo web profissional, moderno e responsivo para a Rádio Paraíso FM 101,1 (Sobral/CE).

## Arquivos Prontos para o GitHub Pages

- `index.html`: Player principal com tema Glassmorphism Dark, Media Session API, Modo Sono, Grade de Programação e Carrossel de Notícias.
- `manifest.json`: Manifesto PWA configurado para instalação no Android e iOS.
- `service-worker.js`: Gerenciador de cache offline e atualizações instantâneas.
- `CNAME`: Configuração do domínio customizado `appradio.sistemaparaiso.com`.

## Como Atualizar no seu Repositório do GitHub:

### Opção 1: Pelo Navegador (GitHub Web)
1. Acesse o seu repositório no GitHub (onde está o site do `appradio.sistemaparaiso.com`).
2. Clique em **Add file** > **Upload files**.
3. Arraste e solte os arquivos:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `CNAME`
4. Clique em **Commit changes**.
5. Em 1 a 2 minutos, o GitHub Pages atualizará o domínio automaticamente!

### Opção 2: Pelo Git (Terminal)
No diretório local do seu repositório clonado:
```bash
git add index.html manifest.json service-worker.js CNAME
git commit -m "feat: redesign moderno do app da rádio com modo sono e grade completa"
git push origin main
```
