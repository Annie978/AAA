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

  // 唯一的不算子初始化逻辑
  useEffect(() => {
    // 加载不算子脚本（全局只加载一次）
    if (document.getElementById('busuanzi-plog-script')) return
    const script = document.createElement('script')
    script.id = 'busuanzi-plog-script'
    script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    script.async = true
    document.body.appendChild(script)

    // 适配动态回调名（关键：不再写死回调名）
    script.onload = () => {
      // 监听所有全局 BusuanziCallback_* 函数
      const originalDefineProperty = Object.defineProperty
      Object.defineProperty = function (obj, prop, descriptor) {
        if (prop.startsWith('BusuanziCallback_') && typeof descriptor.value === 'function') {
          // 拦截回调，获取数据
          descriptor.value = (data) => {
            setBusuanziData({
              site_pv: data.site_pv || 0,
              site_uv: data.site_uv || 0
            })
            // 存到全局备用
            window.busuanziData = data
          }
        }
        return originalDefineProperty(obj, prop, descriptor)
      }

      // 强制请求数据
      setTimeout(() => {
        if (window.busuanzi) {
          window.busuanzi.getPv()
          window.busuanzi.getUv()
        }
      }, 500)
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
        {/* 原有移动端导航代码，保留 */}
      </div>

      {/* 桌面端底部白色区域：统计+版权（优化排版） */}
      <div className="hidden md:block w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-5 px-8">
        <div className="container mx-auto max-w-5xl flex flex-wrap justify-between items-center text-sm gap-4">
          {/* 左侧：统计数字（加大间距） */}
          <div className="text-gray-600 dark:text-gray-400 flex items-center space-x-8">
            <span className="flex items-center gap-2">
              <span>👁️‍🗨️</span>
              <span>总访问量: {busuanziData.site_pv}</span>
            </span>
            <span className="flex items-center gap-2">
              <span>🖤</span>
              <span>访客数: {busuanziData.site_uv}</span>
            </span>
          </div>

          {/* 右侧：版权信息（分行+加大间距） */}
          <div className="text-gray-600 dark:text-gray-400 flex flex-col md:flex-row items-center gap-3">
            <span>&copy; {copyrightDate} {siteConfig('AUTHOR')}. 保留所有权利。</span>
            <span>Powered by <a href="https://www.google.com" className="hover:underline text-blue-600 dark:text-blue-400">NotionNext {siteConfig('VERSION')}</a></span>
          </div>
        </div>
      </div>
    </>
  )
}
