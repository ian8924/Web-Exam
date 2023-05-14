import { ApiResponse } from '~~/types'

const HOST_URL = ' http://172.20.10.3:3000'

// get follow list api
const getFollowListApi = (): Promise<ApiResponse> => {
  return $fetch(`${HOST_URL}/following_list`)
}

// get for you list api
const getForYouListApi = (): Promise<ApiResponse> => {
  return $fetch(`${HOST_URL}/for_you_list`)
}

export {
  getFollowListApi,
  getForYouListApi
}
