import io from 'socket.io-client'
import { apiUrl } from '../api'

const socket = io('https://asteroids.dev.mediasia.cn')
// const socket = io('http://localhost:3001')

export default socket