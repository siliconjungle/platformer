const audio = {}

export const loadAudio = async (soundsData) =>
  new Promise((resolve, reject) => {
    const sounds = {}
    soundsData.forEach(soundData => {
      const sound = new Audio(soundData.src)
      sounds[soundData.name] = sound
      audio[soundData.name] = sound
      if (Object.keys(sounds).length === soundsData.length) {
        resolve(sounds)
      }
    })
  })

export const getAudioByName = name => audio[name] || null
