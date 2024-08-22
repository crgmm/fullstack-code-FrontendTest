import HomeView from '../../views/HomeView.vue'
import { render } from '@testing-library/vue';
describe('HomeView', () => {
  test('renders properly', () => {
    const {getByText} = render(HomeView)
    expect(getByText('Recipes Book')).toBeInTheDocument();
  })
})
