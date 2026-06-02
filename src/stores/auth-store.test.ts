import { beforeEach, describe, expect, it, vi } from 'vitest'

async function importAuthStore() {
  const { useAuthStore } = await import('./auth-store')
  return useAuthStore
}

const sampleSession = {
  access_token: 'test-access-token',
  refresh_token: 'test-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: {
    id: 'user-123',
    email: 'user@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  },
} as any

describe('useAuthStore', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('starts with null session and user', async () => {
    const useAuthStore = await importAuthStore()

    expect(useAuthStore.getState().auth.session).toBeNull()
    expect(useAuthStore.getState().auth.user).toBeNull()
  })

  it('setSession updates session and user', async () => {
    const useAuthStore = await importAuthStore()

    useAuthStore.getState().auth.setSession(sampleSession)

    expect(useAuthStore.getState().auth.session).toEqual(sampleSession)
    expect(useAuthStore.getState().auth.user).toEqual(sampleSession.user)
  })

  it('setSession with null clears session and user', async () => {
    const useAuthStore = await importAuthStore()

    useAuthStore.getState().auth.setSession(sampleSession)
    useAuthStore.getState().auth.setSession(null)

    expect(useAuthStore.getState().auth.session).toBeNull()
    expect(useAuthStore.getState().auth.user).toBeNull()
  })

  it('reset clears session and user', async () => {
    const useAuthStore = await importAuthStore()

    useAuthStore.getState().auth.setSession(sampleSession)
    useAuthStore.getState().auth.reset()

    expect(useAuthStore.getState().auth.session).toBeNull()
    expect(useAuthStore.getState().auth.user).toBeNull()
  })
})
