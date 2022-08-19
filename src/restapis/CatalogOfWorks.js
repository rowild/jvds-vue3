
// REST API query
const opusFields = 'id,title,slug,additional_title,scoring,creation_start_end,creation_date_end_addon,creation_date_end_display,opus.opus_id.opus_categories.slug,opus.opus_id.opus_categories.title&filter[status][_eq]=published'

const composerDataFields = ['first_name', 'last_name','birthday']

let composerDBFields = ""
for(const field of composerDataFields) {
  composerDBFields += `composers.persons_id.${field},`
}

const categoryDataFields = ['title', 'slug']

let categoryDBFields = ""
for(const [index, field] of categoryDataFields.entries()) {
  categoryDBFields += `categories.opus_categories_id.${field}`
  if(categoryDataFields.length -1 !== index) {
     categoryDBFields += ','
  }
}

const getOpus = `/opus?fields=id,title,additional_title,${composerDBFields}${categoryDBFields}`

const getCatalogOfWorks = () => {
  // console.log('getOpus =', getOpus);
  return getOpus
}

export default getCatalogOfWorks