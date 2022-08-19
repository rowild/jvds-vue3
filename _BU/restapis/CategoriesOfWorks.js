
// REST API query
const opusCategoriesFields = 'id,title,slug,opus.opus_id.title&filter[status][_eq]=published'

const getCategoriesOfWorks = () => {
  return `/opus_categories?fields=${opusCategoriesFields}`
}

export default getCategoriesOfWorks