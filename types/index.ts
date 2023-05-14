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

interface TabOption {
    label : string,
    value : string
}

export {
  TabType,
  ApiItem,
  ApiResponse,
  TabOption
}
