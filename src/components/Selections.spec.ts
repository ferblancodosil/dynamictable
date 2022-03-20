import { shallowMount } from '@vue/test-utils'
import Selections from '@/components/Selections.vue'
import { useMainStore } from '@/store'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Row } from '@/logic/Row'

const app = createApp({})
const pinia = createPinia()
app.use(pinia)

describe('Selections.vue', () => {
  it('validate no print selections', () => {
    const wrapper = shallowMount(Selections, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.findAll('.selected')).toHaveLength(0)
  })
  it('validate print selection if exist in store', () => {
    const mainStore = useMainStore()
    mainStore.addRow({
      key: 'id',
      row: new Row({
        id: 1,
        plate: '0000LBN',
        location: {
          country: 'Spain',
          city: 'Valencia',
          postal_code: '46004',
          address: 'Carrer de Colón',
        },
        speed: 25.56789,
        speed_average: 30.123456789,
        temperature_front: 19.5456789,
        temperature_back: 3.23456789,
      }),
    })

    const wrapper = shallowMount(Selections, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.findAll('.selected')).toHaveLength(1)
  })
})
