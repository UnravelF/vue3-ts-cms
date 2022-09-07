import gfRequest from '../../index'

import { IDataType } from '../../types'

// 获取页面列表数据
export function getPageListData(url: string, queryInfo: any) {
  return gfRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 删除指定列表的Id用户数据请求
// url: /users/id
export function deletePageData(url: string) {
  return gfRequest.delete<IDataType>({
    url: url
  })
}

// 新建列表数据
export function createPageData(url: string, newData: any) {
  return gfRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑列表数据
export function editPageData(url: string, editData: any) {
  return gfRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
