import { jwtVerify } from 'jose'

const isAuthenticated = async (token, rol) => {
    if (!token) return false
    try {
        const {payload} = await jwtVerify(token.value, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET))
        console.log('isAuthenticated.ts: payload', payload)
        if (payload.rol !== rol) return false
        return true 
    } catch (error) {
        console.error('isAuthenticated.ts: error', error)
        return false
    }
}

export default isAuthenticated