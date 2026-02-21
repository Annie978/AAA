import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import { useEffect } from 'react'

export const Footer = props => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  // 全局初始化不算子，脱离弹窗依赖
  useEffect(() => {
    // 1. 加载不算子脚本（全局只加载一次）
    if (!document.getElementById('busuanzi-global-script')) {
      const script = document.createElement('script')
      script.id = 'busuanzi-global-script'
      script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      script.async = true
      document.body.appendChild(script)

      // 2. 全局数据存储 + 自动更新所有标签
      script.onload = () => {
        // 定义全局回调，接收不算子数据
        window.BusuanziCallback_743303877881 = (data) => {
          // 把数据存到全局，任何地方都能取
          window.busuanziData = data
          
          // 更新页面上所有不算子标签（Footer + 弹窗）
          document.querySelectorAll('.busuanzi_value_site_pv').forEach(el => {
            el.textContent = data.site_pv || 0
          })
          document.querySelectorAll('.busuanzi_value_site_uv').forEach(el => {
            el.textContent = data.site_uv || 0
          })
        }

        // 3. 定时刷新数据，避免弹窗打开时数据过期
        setInterval(() => {
          if (window.busuanzi) {
            window.busuanzi.getPv()
            window.busuanzi.getUv()
          }
        }, 5000) // 每5秒刷新一次，可调整
      }
    }

    // 4. 组件挂载时强制刷新一次数据
    setTimeout(() => {
      if (window.busuanzi) {
        window.busuanzi.getPv()
        window.busuanzi.getUv()
      }
    }, 500)
  }, [])

  return (
    <footer className='z-10 relative w-full bg-white px-6 border-t dark:border-hexo-black-gray dark:bg-hexo-black-gray '>
      <DarkModeButton className='text-center pt-4' />

      <div className='container mx-auto max-w-4xl py-6 md:flex flex-wrap md:flex-no-wrap md:justify-between items-center text-sm'>
        {/* 统计数字直接显示在Footer（核心：脱离弹窗） */}
        <div className='text-center mb-3 md:mb-0 text-xs text-gray-500 dark:text-gray-400'>
          <span className="busuanzi_container_site_pv">
            👁️‍🗨️<span className="busuanzi_value_site_pv">0</span>
          </span>
          &nbsp;&nbsp;
          <span className="busuanzi_container_site_uv">
            🖤<span className="busuanzi_value_site_uv">0</span>
          </span>
        </div>

        <div className='text-center'>
          &copy;{`${copyrightDate}`} {siteConfig('AUTHOR')}. All rights
          reserved.
        </div>
        <div className='md:p-0 text-center md:text-right text-xs'>
          {siteConfig('BEI_AN') && (
            <a
              href={siteConfig('BEI_AN_LINK')}
              className='text-black dark:text-gray-200 no-underline hover:underline ml-4'>
              {siteConfig('BEI_AN')}
            </a>
          )}
          <BeiAnGongAn />
          <span className='dark:text-gray-200 no-underline ml-4'>
            Powered by
            <a
              href='https://www.google.com'
              className='hover:underline'>
              NotionNext {siteConfig('VERSION')}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
