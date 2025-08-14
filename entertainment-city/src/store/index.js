import { createStore } from "vuex"
import moviesModule from './modules/movies/index.js'
import tvModule from './modules/tv/index.js'
import celebModule from './modules/celebs/index.js'

const store = createStore({
    modules: {
        movies: moviesModule,
        tv: tvModule,
        celebs: celebModule
    },
    // state() {
    //     return {
    //         userId: 'c3'
    //     }
    // },
    // getters: {
    //     userId(state) {
    //         return state.userId
    //     }
    // }
})

export default store