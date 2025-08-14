export default {
    setCelebs(state, payload) {
        console.log('payload: ', payload)
        state.celebs = payload.results
    },
    setCelebDetails(state, payload) {
        state.celebDetails = payload
    },
    setCelebCredits(state, payload) {
        state.celebCredits = payload.cast
    }
}