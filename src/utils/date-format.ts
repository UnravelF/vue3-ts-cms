import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// dayjs默认不支持utc格式时间  需要通过扩展方法extend加入
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}
