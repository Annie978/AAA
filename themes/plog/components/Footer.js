import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'

export const Footer = props => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  // State to store busuanzi data
  const [busuanziData, setBusuanziData] = useState({
    site_pv: 0,
    site_uv: 0
  })

  useEffect(() => {
    // Load busuanzi script if not loaded
    const loadBusuanziScript = () => {
      if (document.querySelector('#busuanzi-script')) return
      
      const script = document.createElement('script')
      script.id = 'busuanzi-script'
      script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      script.async = true
      document.body.appendChild(script)
    }

    // Define callback to receive data
    const handleBusuanziData = (data) => {
      if (data && (data.site_pv || data.site_uv)) {
        setBusuanziData({
          site_pv: data.site_pv || busuanziData.site_pv,
          site_uv: data.site_uv || busuanziData.site_uv
        })
      }
    }

    // Init busuanzi
    const initBusuanzi = () => {
      loadBusuanziScript()
      window.BusuanziCallback_743303877881 = handleBusuanziData
      
      // Force refresh data on mount/refresh
      setTimeout(() => {
        if (window.busuanzi) {
          window.busuanzi.getPv()
          window.busuanzi.getUv()
        }
      }, 300)
    }

    // Re-init on every mount (fix refresh issue)
    initBusuanzi()

    // Cleanup
    return () => {
      window.BusuanziCallback_743303877881 = null
    }
  }, [busuanziData])

  return (
    <footer className='z-10 relative w-full bg-white px-6 border-t dark:border-hexo-black-gray dark:bg-hexo-black-gray '>
      <DarkModeButton className='text-center pt-4' />

      <div className='container mx-auto max-w-4xl py-6 md:flex flex-wrap md:flex-no-wrap md:justify-between items-center text-sm'>
        <div className='text-center mb-3 md:mb-0 text-xs text-gray-500 dark:text-gray-400'>
          <span className="busuanzi_container_site_pv">
            👁️‍🗨️<span className="busuanzi_value_site_pv">{busuanziData.site_pv}</span>
          </span>
          &nbsp;&nbsp;
          <span className="busuanzi_container_site_uv">
            🖤<span className="busuanzi_value_site_uv">{busuanziData.site_uv}</span>
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
