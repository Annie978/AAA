import { useGlobal } from '@/lib/global'
// 移除日期格式化工具导入
import SmartLink from '@/components/SmartLink'

export const ArticleInfo = props => {
const { post } = props
const { locale } = useGlobal()

return (
<section className='w-full mx-auto mb-4'>
{/* 保留文章标题*/}
<h2 className='text-5xl font-semibold py-10 dark:text-white text-center'>{post?.title}</h2>
  <div className='flex gap-3 font-semibold text-sm items-center justify-center'>
    {/* 删除了时间代码块 */}

    {/* 保留分类展示逻辑 */}
    {post?.type !== 'Page' && (
      <>
        <SmartLink href={`/category/${post?.category}`} passHref className='cursor-pointer text-md mr-2 text-green-500'>
          {post?.category}
        </SmartLink>
      </>
    )}

    {/* 保留标签展示逻辑 */}
    <div className='flex py-1 space-x-3'>
      {post?.tags?.length > 0 && (
        <>
          {locale.COMMON.TAGS} <span>:</span>
        </>
      )}
      {post?.tags?.map(tag => {
        return (
          <SmartLink href={`/tag/${tag}`} key={tag} className='text-yellow-500 mr-2'>
            {tag}
          </SmartLink>
        )
      })}
    </div>
  </div>
</section>
)
}
