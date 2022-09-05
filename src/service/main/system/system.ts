import gfRequest from '../../index'

import { IDataType } from '../../types'

// 获取页面列表数据
export function getPageListData(url: string, queryInfo: any) {
  return gfRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
