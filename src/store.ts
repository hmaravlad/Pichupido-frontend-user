import Vue from 'vue';
import Vuex, {
  ActionContext, ActionTree, GetterTree, MutationTree, Store,
} from 'vuex';

const debug: boolean = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

class State {
  public cart: ICartDish[];

  constructor() {
    const state: any = JSON.parse(localStorage.getItem('state') || '{}');
    this.cart = (state && state.cart) || [];
  }
}

const actions: ActionTree<State, State> = {
  updateRestaurant({ commit }: ActionContext<State, State>, newRestaurant): void {
    commit('updateRestaurant', newRestaurant);
  },
};

const getters: GetterTree<State, State> = {
  cart(state: State) {
    return state.cart;
  },
};

function backUpState(state: any) {
  localStorage.setItem('state', JSON.stringify(state));
}

const mutations: MutationTree<State> = {
  addDish(state, dish) {
    state.cart.push(dish);
    backUpState(state);
  },
  deleteDish(state, index) {
    state.cart.splice(index, 1);
    backUpState(state);
  },
  updateDishPrice(state, dish) {
    state.cart[dish.index].price = dish.price;
    backUpState(state);
  },
  clearCart(state) {
    state.cart = [];
    backUpState(state);
  },
};

export interface ICartDish {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  amount: number;
  newPrice?: number;
}

export default new Store<State>({
  state: new State(),
  mutations,
  actions,
  getters,
  strict: debug,
});
