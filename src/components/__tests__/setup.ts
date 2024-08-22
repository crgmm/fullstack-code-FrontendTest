import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { setActivePinia, createPinia } from 'pinia'

setActivePinia(createPinia())
expect.extend(matchers)
