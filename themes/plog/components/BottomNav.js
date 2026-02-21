import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { usePlogGlobal } from '..'

export default function BottomNav(props) {
  const { setShowModal } = usePlogGlobal()
  const { posts } = props

  // ===== 新增统计弹窗状态 =====
  const [showStatModal, setShowStatModal] = useState(false)
  const [busuanziData, setBusuanziData] = useState({
    site_pv: 0,
    site_uv: 0
  })

  // ===== 新增不算子初始化逻辑 =====
  useEffect(() => {
    if (!showStatModal) return

    // Load busuanzi script only once
    const loadBusuanzi = () => {
      if (document.getElementById('busuanzi-plog-script')) return
      const script = document.createElement('script')
      script.id = 'busuanzi-plog-script'
      script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      script.async = true
      document.body.appendChild(script)
    }

    // Handle busuanzi data callback
    const handleBusuanzi = (data) => {
      setBusuanziData({
        site_pv: data.site_pv || 0,
        site_uv: data.site_uv || 0
      })
    }

    // Init busuanzi when stat modal open
    const initBusuanzi = () => {
      loadBusuanzi()
      window.BusuanziCallback_743303877881 = handleBusuanzi
      
      setTimeout(() => {
        if (window.busuanzi) {
          window.busuanzi.getPv()
          window.busuanzi.getUv()
        }
      }, 300)
    }

    initBusuanzi()

    // Cleanup on modal close
    return () => {
      window.BusuanziCallback_743303877881 = null
    }
  }, [showStatModal])

  // 原有图片预览弹窗触发函数（保留）
  const openModal = (item) => {
    setShowModal(true)
  }

  return (
    <>
      {/* 原有 BottomNav 按钮区域（保留所有原有代码） */}
      <div className="fixed bottom-0 z-10 w-full bg-white dark:bg-black dark:border-gray-800 border-t md:hidden">
        {/* 这里是你原有 BottomNav 的按钮、样式等代码，完全保留 */}
      </div>

      {/* 桌面端右下角感叹号按钮（统计弹窗触发） */}
      <button
        className="fixed bottom-4 right-4 z-50 hidden md:flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg"
        onClick={() => setShowStatModal(true)}
      >
        {/* 感叹号 SVG 图标（保留原有样式） */}
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </button>

      {/* 统计弹窗（独立于图片预览弹窗） */}
      {showStatModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50"
          onClick={() => setShowStatModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 统计数字显示 */}
            <div className="text-center text-sm mb-4">
              <div className="mb-2">👁️‍🗨️ Total Views: {busuanziData.site_pv}</div>
              <div>🖤 Unique Visitors: {busuanziData.site_uv}</div>
            </div>

            {/* 原有页脚信息 */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} {siteConfig('AUTHOR')}
              <div className="mt-2">
                Powered by NotionNext {siteConfig('VERSION')}
              </div>
            </div>

            {/* 关闭按钮 */}
            <button
              className="mt-4 w-full py-2 bg-gray-200 dark:bg-gray-700 rounded"
              onClick={() => setShowStatModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
