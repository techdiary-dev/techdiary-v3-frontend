const hljs = require('highlight.js')

const wrap = (code, lang) =>
  `<pre><code class="hljs ${lang}">${code}</code></pre>`

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    lang: 'bn',
    titleTemplate: '%s - Tech Diary',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'বাংলার প্রোগ্রামিং নেটওয়ার্ক',
      },
      { hid: 'theme-color', name: 'theme-color', content: '#1F2936' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito&family=Roboto&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
    ],
    script: [
      {
        src: 'https://analytics.graphland.dev/js/plausible.js',
        'data-domain': 'techdiary.dev',
        defer: true,
        async: true,
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/app.scss', 'highlight.js/styles/shades-of-purple.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/urlHost.js',
    '@/plugins/visibility-observer.js',
    '@/plugins/select.client.js',
    '@/plugins/clickaway.js',
    '@/plugins/bn.js',
    '@/plugins/echo.client.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/dotenv', { systemvars: true }],
    '@nuxtjs/color-mode',
    '@nuxtjs/moment',
    '@nuxtjs/google-analytics',
    '@nuxt/image',
    '@nuxtjs/svg'
  ],
  toast: {
    position: 'top-center',
    duration: 2000
  },
  // sentry: {
  //   dsn: 'https://7b6d6083b18746e8ad5a773e9d4a1846@o584876.ingest.sentry.io/5779471', // Enter your project's DSN here
  //   // Additional Module Options go here
  //   // https://sentry.nuxtjs.org/sentry/options
  //   config: {
  //     // Add native Sentry config here
  //     // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
  //   }
  // },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/cloudinary',
    // '@nuxtjs/sentry',
    '@nuxtjs/toast',
    '@nuxt/content',
    [
      '@netsells/nuxt-hotjar',
      {
        id: 1886608,
        sv: 6
      }
    ]
  ],

  axios: {
    baseURL: process.env.NUXT_ENV_APP_URL_CLIENT,
  },

  colorMode: {
    classSuffix: '',
  },

  auth: {
    cookie: {
      options: {
        sameSite: 'lax'
      }
    },
    strategies: {
      local: {
        token: {
          propertyName: 'token',
          required: true,
          type: 'Bearer'
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/user', method: 'get', propertyName: null }
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/dashboard/diaries'
    }
  },

  moment: {
    defaultLocale: 'bn',
    locales: ['bn'],
  },

  tailwindcss: {
    cssPath: '~/assets/styles/app.scss',
  },
  cloudinary: {
    cloudName: process.env.NUXT_APP_CLOUDINARY_CLOUDNAME,
    useComponent: true,
  },
  googleAnalytics: {
    id: process.env.NUXT_ENV_GOOGLE_ANALYTICS_ID,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },

  content: {
    markdown: {
      highlighter(rawCode, lang) {
        if (!lang) {
          return wrap(hljs.highlightAuto(rawCode).value, lang)
        }
        return wrap(hljs.highlight(lang, rawCode).value, lang)
      },
    },
  },

  server: {
    host: '0.0.0.0',
  },
}
