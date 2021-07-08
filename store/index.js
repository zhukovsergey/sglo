export const state = () => ({
  dankov: ''
})

export const mutations = {
  updateDankov (state, value) {
    console.log(state.dankov)
    state.dankov = value
  }
}
