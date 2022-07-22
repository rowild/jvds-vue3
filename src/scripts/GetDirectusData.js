
const fetchData = url => {
  const HOST = 'http://localhost'
  const PORT = 8055
  const API = '/items'

  const data = fetch(`${HOST}:${PORT}${API}${url}`)
    .then((res) => res.json())

  console.log('fetchData: data =', data);

  return data
}


export const GetOpus = async (ctx) => {
  console.log('ctx =', ctx);

  const { slug } = ctx.query
  console.log('slug =', slug);

  const opus = await fetchData(
    '/opus?fields=*,categories.opus_categories_id.id,categories.opus_categories_id.title,categories.opus_categories_id.slug'
  )

  const opusCategories = await fetchData(
    '/opus_categories?fields=*,categories.opus_categories_id.id,categories.opus_categories_id.title,categories.opus_categories_id.slug'
  )

  return {
    props: {
      opus
    }
  }
}

export default GetOpus