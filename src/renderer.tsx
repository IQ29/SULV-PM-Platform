import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }, c) => {
  const pageTitle = c.get('title') ?? 'SULV Project Platform'
  const fullTitle = `${pageTitle}｜SULV Group`

  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="SULV Construction Intelligence Platform：整合 Gmail、Daily Log、任务与 AI 洞察的轻量化项目管理中枢。"
        />
        <title>{fullTitle}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0ea5e9',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#38d3f6',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1'
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  }
}`
          }}
        ></script>
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography" defer></script>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
        <script type="module" src="/static/app.js"></script>
      </body>
    </html>
  )
})
