import { ApiResponse } from '~~/types'

// get follow list api
const getFollowListApi = (): Promise<ApiResponse> => {
  return $fetch('http://localhost:3001/following_list')
}

// get for you list api
const getForYouListApi = (): Promise<ApiResponse> => {
  return $fetch('http://localhost:3001/for_you_list')
}

export {
  getFollowListApi,
  getForYouListApi
}
