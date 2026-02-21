import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import { useEffect } from 'react' // Add this line

export const Footer = props => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  // Add this useEffect block
  useEffect(() => {
    // Define callback to receive busuanzi data
    window.BusuanziCallback_743303877881 = (data) => {
      const pvElement = document.querySelector('.busuanzi_value_site_pv')
      const uvElement = document.querySelector('.busuanzi_value_site_uv')
      if (pvElement && data.site_pv) {
        pvElement.textContent = data.site_pv
      }
      if (uvElement && data.site_uv) {
        uvElement.textContent = data.site_uv
      }
    }

    // Trigger busuanzi to reload data if script loaded
    if (window.busuanzi) {
      window.busuanzi.getPv()
      window.busuanzi.getUv()
    }
  }, [])

  return (
    <footer className='z-10 relative w-full bg-white px-6 border-t dark:border-hexo-black-gray dark:bg-hexo-black-gray '>
      <DarkModeButton className='text-center pt-4' />

      <div className='container mx-auto max-w-4xl py-6 md:flex flex-wrap md:flex-no-wrap md:justify-between items-center text-sm'>
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
