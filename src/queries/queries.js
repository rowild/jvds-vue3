import fetchData from '../helpers/fetchData'
import { CatalogQuery } from './CatalogQuery'
import { CatalogCategoryQuery } from './CatalogCategoryQuery'

export const getCatalog = async () => {
  const data = await fetchData(
    CatalogQuery,
    {
      variables: {}
    }
  )

  return data.data.opus
}

export const getCatalogCategories = async () => {
  const data = await fetchData(
    CatalogQuery,
    {
      variables: {}
    }
  )

  return data.data.opus_categories
}