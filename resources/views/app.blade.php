<!DOCTYPE html>
<html lang="ar" dir="rtl" class="bg-background">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title inertia>{{ config('app.name', 'لام') }}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Tajawal:wght@300;400;500;700;800;900&display=swap"
            rel="stylesheet"
        />
        @routes
        @inertiaHead
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="font-sans antialiased min-h-svh bg-background text-foreground selection:bg-primary/30">
        @inertia
    </body>
</html>
