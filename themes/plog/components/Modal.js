import { useState, useEffect } from 'react'
import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import { siteConfig } from '@/lib/config'

export default function Modal(props) {
  const { showModal, setShowModal } = props
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate = parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  const [busuanziData, setBusuanziData] = useState({
    site_pv: 0,
    site_uv: 0
  })

  useEffect(() => {
    if (!showModal) return

    const loadScript = () => {
      if (document.getElementById('busuanzi-modal-script')) return
      const script = document.createElement('script')
      script.id = 'busuanzi-modal-script'
      script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
      script.async = true
      document.body.appendChild(script)
    }

    const callback = (data) => {
      setBusuanziData({
        site_pv: data.site_pv || 0,
        site_uv: data.site_uv || 0
      })
    }

    const init = () => {
      loadScript()
      window.BusuanziCallback_743303877881 = callback
      setTimeout(() => {
        if (window.busuanzi) {
          window.busuanzi.getPv()
          window.busuanzi.getUv()
        }
      }, 300)
    }

    init()

    return () => {
      window.BusuanziCallback_743303877881 = null
    }
  }, [showModal])

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowModal(false)}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span className="busuanzi_container_site_pv">
            👁️‍🗨️<span className="busuanzi_value_site_pv">{busuanziData.site_pv}</span>
          </span>
          &nbsp;&nbsp;
          <span className="busuanzi_container_site_uv">
            🖤<span className="busuanzi_value_site_uv">{busuanziData.site_uv}</span>
          </span>
        </div>

        <div className="text-center mb-4">
          &copy;{`${copyrightDate}`} {siteConfig('AUTHOR')}. All rights reserved.
        </div>

        <div className="text-center text-xs">
          {siteConfig('BEI_AN') && (
            <a
              href={siteConfig('BEI_AN_LINK')}
              className="text-black dark:text-gray-200 no-underline hover:underline ml-4">
              {siteConfig('BEI_AN')}
            </a>
          )}
          <BeiAnGongAn />
          <span className="dark:text-gray-200 no-underline ml-4">
            Powered by
            <a
              href="https://www.google.com"
              className="hover:underline">
              NotionNext {siteConfig('VERSION')}
            </a>
          </span>
        </div>

        <button className="mt-4 w-full py-2 bg-gray-200 dark:bg-gray-700 rounded" onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </div>
  )
}
