module.exports = {
    apps: [
        {
            name: 'gta6portal',
            script: 'node_modules/.bin/next',
            args: 'start -p 3000',
            cwd: '/var/www/gta6portal',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                NEXT_PUBLIC_SUPABASE_URL: 'https://qbuahhhrzbkqftuxixrw.supabase.co',
                NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidWFoaGhyemJrcWZ0dXhpeHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTA2NjUsImV4cCI6MjA4NjY2NjY2NX0.Knb-S_V3nybjx_2La7eiRlXSXTple0DFEs69QyEo3aw',
            },
            watch: false,
            max_memory_restart: '300M',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            error_file: '/var/log/pm2/gta6portal-error.log',
            out_file: '/var/log/pm2/gta6portal-out.log',
        },
    ],
};
