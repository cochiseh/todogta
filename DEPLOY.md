# GTA 6 Portal - Guía de Deploy en VPS

## Requisitos previos en el VPS
- Node.js 18+ (`node -v`)
- npm (`npm -v`)  
- PM2 (`npm install -g pm2`)
- Nginx (`sudo apt install nginx`)
- Git (`sudo apt install git`)

---

## Paso 1: Subir el proyecto

**Opción A — Git (recomendado)**
```bash
# En tu PC local (dentro de nextjs-migration):
git init
git add .
git commit -m "Initial commit - GTA 6 Portal"
git remote add origin https://github.com/TU_USUARIO/gta6portal.git
git push -u origin main
```

**Opción B — SCP directo**
```bash
# Desde tu PC:
scp -r ./nextjs-migration usuario@IP_VPS:/var/www/gta6portal
```

---

## Paso 2: Configurar el servidor

```bash
# Conectar al VPS
ssh usuario@IP_VPS

# Crear directorio
sudo mkdir -p /var/www/gta6portal
sudo chown $USER:$USER /var/www/gta6portal

# Clonar (si usas Git)
cd /var/www
git clone https://github.com/TU_USUARIO/gta6portal.git gta6portal
cd gta6portal

# Instalar dependencias
npm ci

# Build de producción
npm run build

# Crear directorio de logs
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2
```

---

## Paso 3: Iniciar con PM2

```bash
cd /var/www/gta6portal
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Seguir instrucciones para auto-inicio
```

Verificar: `curl http://localhost:3000` debe devolver HTML.

---

## Paso 4: Configurar Nginx

```bash
# Copiar config
sudo cp nginx.conf /etc/nginx/sites-available/gta6portal

# Editar: cambiar TU_DOMINIO_AQUI por tu dominio o IP
sudo nano /etc/nginx/sites-available/gta6portal

# Habilitar
sudo ln -s /etc/nginx/sites-available/gta6portal /etc/nginx/sites-enabled/

# Verificar y reiniciar
sudo nginx -t
sudo systemctl reload nginx
```

---

## Paso 5: SSL con Let's Encrypt (si tienes dominio)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com
```

Certbot configurará Nginx automáticamente con HTTPS.

---

## Actualizar la web

```bash
ssh usuario@IP_VPS
cd /var/www/gta6portal
bash deploy.sh
```

O crear un webhook en n8n para auto-deploy en cada push.

---

## Puertos

| Servicio | Puerto |
|----------|--------|
| Next.js (PM2) | 3000 (interno) |
| Nginx HTTP | 80 |
| Nginx HTTPS | 443 |
| n8n | 5678 (ya configurado) |
