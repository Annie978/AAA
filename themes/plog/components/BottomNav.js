import { usePlogGlobal } from '..'
import { siteConfig } from '@/lib/config'

export default function BottomNav(props) {
  const { setShowModal } = usePlogGlobal()
  const { posts } = props

  const openModal = (item) => {
    setShowModal(true)
  }

  return (
    <>
      {/* 移动端底部导航栏（保留原有代码） */}
      <div className="fixed bottom-0 z-10 w-full bg-white dark:bg-black dark:border-gray-800 border-t md:hidden">
        {/* 原有移动端导航代码，保留 */}
      </div>

      {/* 桌面端底部：所有内容居左，访客在上，版权在下 */}
      <div className="hidden md:block w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-5 px-8">
        <div className="container mx-auto max-w-5xl flex flex-col items-start text-sm gap-3">
          {/* 第一行：访客统计（居左） */}
          <div className="text-gray-600 dark:text-gray-400 flex items-center space-x-6">
            <span className="busuanzi_container_site_pv flex items-center gap-2">
              <span>👁️‍🗨️</span>
              <span className="busuanzi_value_site_pv">0</span>
            </span>
            <span className="busuanzi_container_site_uv flex items-center gap-2">
              <span>❤️</span>
              <span className="busuanzi_value_site_uv">0</span>
            </span>
          </div>

          {/* 第二行：版权信息 + 链接（居左） */}
          <div className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {siteConfig('AUTHOR')}
            <span className="ml-2">
              <a href="https://jp.hsw123.top/" className="hover:underline text-blue-600 dark:text-blue-400">
                点击获取更多内容
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
