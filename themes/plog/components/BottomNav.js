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

      {/* 桌面端底部白色区域：添加框架标准的统计标签 + 保留版权 */}
      <div className="hidden md:block w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4 px-6">
        <div className="container mx-auto max-w-4xl flex flex-wrap justify-between items-center text-sm">
          {/* 新增：框架标准的统计展示标签（和busuanzi.js自动联动） */}
          <div className="text-gray-500 dark:text-gray-400 flex items-center space-x-4">
            <span className="busuanzi_container_site_pv whitespace-nowrap">
              👁️‍🗨️: <span className="busuanzi_value_site_pv">0</span>
            </span>
            <span className="busuanzi_container_site_uv whitespace-nowrap">
              ❤️: <span className="busuanzi_value_site_uv">0</span>
            </span>
          </div>

          {/* 版权信息（完全保留） */}
          <div className="text-gray-500 dark:text-gray-400 text-right">
            &copy; {new Date().getFullYear()} {siteConfig('AUTHOR')}. All rights reserved.
            <span className="ml-2">
              Powered by <a href="https://www.google.com" className="hover:underline">NotionNext {siteConfig('VERSION')}</a>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
