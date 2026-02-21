// 只保留必要的导入：usePlogGlobal + siteConfig（版权信息需要）
import { usePlogGlobal } from '..'
import { siteConfig } from '@/lib/config'

export default function BottomNav(props) {
  const { setShowModal } = usePlogGlobal()
  const { posts } = props

  // 原有图片预览弹窗触发函数（保留）
  const openModal = (item) => {
    setShowModal(true)
  }

  return (
    <>
      {/* 移动端底部导航栏 */}
      <div className="fixed bottom-0 z-10 w-full bg-white dark:bg-black dark:border-gray-800 border-t md:hidden">
        {/* 这里是 BottomNav 的按钮代码 */}
      </div>

      {/* 桌面端底部白色区域 */}
      <div className="hidden md:block w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4 px-6">
        <div className="container mx-auto max-w-4xl flex flex-wrap justify-between items-center text-sm">
          {/* 移除统计数字区域（只删这部分，其余不变） */}

          {/* 右侧：版权信息 */}
          <div className="text-gray-500 dark:text-gray-400 text-right">
            &copy; {new Date().getFullYear()} {siteConfig('AUTHOR')}. All rights reserved.
            <span className="ml-2">
              Powered by <a href="https://www.google.com" className="hover:underline">NotionNext {siteConfig('VERSION')}</a>
            </span>
          </div>
        </div>
      </div>

      {/* 彻底移除右下角感叹号按钮 */}
    </>
  )
}
