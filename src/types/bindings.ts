export type CloudflareBindings = {
  DB: D1Database
  OPENAI_API_KEY?: string
  GOOGLE_CLIENT_ID?: string
  GOOGLE_CLIENT_SECRET?: string
  GOOGLE_REFRESH_TOKEN?: string
  XERO_CLIENT_ID?: string
  XERO_CLIENT_SECRET?: string
  XERO_TENANT_ID?: string
  ENVIRONMENT?: 'development' | 'staging' | 'production'
}

export type Env = {
  Bindings: CloudflareBindings
}
