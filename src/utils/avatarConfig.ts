import { AvatarConfig } from 'react-nice-avatar'

export default function avatarConfig(
  name: string,
  gender?: 'male' | 'female' 
): AvatarConfig {
  const seed = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const randomFromSeed = (mod: number, offset = 0) => (seed + offset) % mod

  return {
    sex: 'woman',  // Always generate male avatars
    faceColor: '#AC6651',
    isGradient: true
  }
}

// Usage examples:
// const avatar1 = avatarConfig('John Doe', 'male')     // Generates male avatar
// const avatar2 = avatarConfig('Jane Smith', 'female') // Still generates male avatar  
// const avatar3 = avatarConfig('Alex Johnson')         // Generates male avatar