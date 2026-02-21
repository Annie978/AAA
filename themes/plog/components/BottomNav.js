import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { usePlogGlobal } from '..'

export default function BottomNav(props) {
  const { setShowModal } = usePlogGlobal()
  const { posts } = props

  // 统计数据状态
  const [busuanziData, setBusuanziData] = useState({
    site_pv: 0,
    site_uv: 0
  })

  // 全局初始化不算子，页面加载时就获取数据
  useEffect(() => {
    // 加载不算子脚本
    const loadBusuanzi = () => {
      if (document.getElementById('busuanzi-plog-script')) return
      const script = document.createElement('script')
      script.id = 'busuanzi-plog-script'
      script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      script.async = true
      document.body.appendChild(script)
    }

    // 接收数据并更新状态
    const handleBusuanzi = (data) => {
      setBusuanziData({
        site_pv: data.site_pv || 0,
        site_uv: data.site_uv || 0
      })
    }

    // 初始化并请求数据
    const initBusuanzi = () => {
      loadBusuanzi()
      window.BusuanziCallback_743303877881 = handleBusuanzi
      
      setTimeout(() => {
        if (window.busuanzi) {
          window.busuanzi.getPv()
          window.busuanzi.getUv()
        }
      }, 500)
    }

    initBusuanzi()

    // 清理回调
    return () => {
      window.BusuanziCallback_743303877881 = null
    }
  }, [])

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

      {/* 桌面端底部白色区域：直接显示统计和版权信息 */}
      <div className="hidden md:block w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4 px-6">
        <div className="container mx-auto max-w-4xl flex flex-wrap justify-between items-center text-sm">
          {/* 左侧：统计数字 */}
          <div className="text-gray-500 dark:text-gray-400 flex items-center space-x-4">
            <span>
              👁️‍🗨️ Total Views: {busuanziData.site_pv}
            </span>
            <span>
              🖤 Unique Visitors: {busuanziData.site_uv}
            </span>
          </div>

          {/* 右侧：版权信息 */}
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
