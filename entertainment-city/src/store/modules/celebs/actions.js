import { APIKEY } from '../../../apiKey' 

export default {
    async loadCelebs(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${APIKEY}&language=en-US&page=${payload}`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setCelebs', responseData)
    },
    async loadCelebDetails(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/person/${payload}?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setCelebDetails', responseData)
    },
    async loadCelebCredits(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/person/${payload}/combined_credits?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setCelebCredits', responseData)
    },
}