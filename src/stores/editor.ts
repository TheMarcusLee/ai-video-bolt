import { create } from 'zustand'

interface Track {
  id: string
  clips: Array<{
    id: string
    start: number
    duration: number
  }>
}

interface EditorStore {
  composition: {
    component: React.ComponentType
    durationInFrames: number
  } | null
  tracks: Track[]
  setComposition: (composition: EditorStore['composition']) => void
  addTrack: () => void
  addClip: (trackId: string, clip: Track['clips'][0]) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  composition: null,
  tracks: [],
  setComposition: (composition) => set({ composition }),
  addTrack: () =>
    set((state) => ({
      tracks: [
        ...state.tracks,
        { id: Math.random().toString(), clips: [] },
      ],
    })),
  addClip: (trackId, clip) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === trackId
          ? { ...track, clips: [...track.clips, clip] }
          : track
      ),
    })),
}))
