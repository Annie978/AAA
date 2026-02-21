import { usePlogGlobal } from '..'

export default function BottomNav(props) {
  const { setShowModal } = usePlogGlobal()
  const { posts } = props

  // 原有图片预览弹窗触发函数（保留）
  const openModal = (item) => {
    setShowModal(true)
  }

  return (
    <>
      {/* 移动端底部导航栏（保留原有代码） */}
      <div className="fixed bottom-0 z-10 w-full bg-white dark:bg-black dark:border-gray-800 border-t md:hidden">
        {/* 这里是你原有移动端 BottomNav 的按钮代码，完全保留 */}
      </div>

      {/* 桌面端底部白色区域：只保留版权信息，删除统计数字 */}
      <div className="hidden md:block w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4 px-6">
        <div className="container mx-auto max-w-4xl flex flex-wrap justify-between items-center text-sm">
          {/* 移除统计数字区域 */}

          {/* 右侧：版权信息（完全保留） */}
          <div className="text-gray-500 dark:text-gray-400 text-right">
            &copy; {new Date().getFullYear()} {siteConfig('AUTHOR')}. All rights reserved.
            <span className="ml-2">
              Powered by <a href="https://www.google.com" className="hover:underline">NotionNext {siteConfig('VERSION')}</a>
            </span>
          </div>
        </div>
      </div>

      {/* 彻底移除右下角感叹号按钮，这里留空即可 */}
    </>
  )
}
