enum TabType {
    Following = 'following',
    ForYou = 'for you'
}

interface ApiItem {
    title : string
    cover : string
    play_url : string
}

interface ApiResponse {
    items : ApiItem[]
}

interface VideoRef {
    // player : any
}

interface PlayerRef {
    player : any
}

interface TabOption {
    label : string,
    value : string
}

export {
  TabType,
  ApiItem,
  ApiResponse,
  VideoRef,
  PlayerRef,
  TabOption
}
