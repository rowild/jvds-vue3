export const CatalogQuery =
  /* GraphQL */
  `
  query Catalog {
    opus {
      id
      composer {
        composer_id {
          first_name
          last_name
        }
      }
      title
      description,
      categories {
        categories_id {
          first_name
          last_name
          brithday
        }
      }
    }
  }
`